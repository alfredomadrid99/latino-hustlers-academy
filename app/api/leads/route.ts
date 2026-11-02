import { env } from "cloudflare:workers";
import { parsePhoneNumberFromString } from "libphonenumber-js";
import {
  validate,
  getSteps,
  type Program,
  type Answers,
} from "../../../lib/validation";
const json = (value: unknown, status = 200) =>
  Response.json(value, { status, headers: { "Cache-Control": "no-store" } });
async function digest(value: string) {
  return Array.from(
    new Uint8Array(
      await crypto.subtle.digest("SHA-256", new TextEncoder().encode(value)),
    ),
  )
    .map((x) => x.toString(16).padStart(2, "0"))
    .join("");
}
export async function POST(request: Request) {
  try {
    const origin = request.headers.get("origin");
    if (origin && origin !== new URL(request.url).origin)
      return json({ error: "Origen no permitido." }, 403);
    const body = await request.text();
    if (body.length > 12000)
      return json({ error: "Solicitud demasiado grande." }, 413);
    let raw;
    try {
      raw = JSON.parse(body);
    } catch {
      return json({ error: "Solicitud inválida." }, 400);
    }
    if (!raw || typeof raw !== "object" || Array.isArray(raw))
      return json({ error: "Solicitud inválida." }, 400);
    if (
      raw.website ||
      !Number.isFinite(raw.startedAt) ||
      Date.now() - raw.startedAt < 2500
    )
      return json({ error: "Revisá el formulario e intentá de nuevo." }, 400);
    const errors = validate(raw);
    if (Object.keys(errors).length) return json({ errors }, 422);
    const id = request.headers.get("Idempotency-Key");
    if (!id || !/^[a-f0-9-]{36}$/i.test(id))
      return json({ error: "Identificador inválido." }, 400);
    if (!env.DB)
      return json(
        { error: "El registro no está disponible en este momento." },
        503,
      );
    const data: Answers = {
      program_type: raw.program_type,
      form_id:
        raw.program_type === "english"
          ? "english_interest"
          : "remote_careers_interest",
    };
    const steps = getSteps(raw.program_type as Program);
    for (const f of steps.flatMap((s) => s.fields)) {
      const v = raw[f.id];
      data[f.id] = typeof v === "string" ? v.trim() : v;
    }
    data.whatsapp = parsePhoneNumberFromString(data.whatsapp as string)!.number;
    data.email = (data.email as string).toLowerCase();
    const payload = JSON.stringify(data);
    const fingerprint = await digest(payload);
    const previous = await env.DB.prepare(
      "SELECT fingerprint FROM leads WHERE id = ?",
    )
      .bind(id)
      .first<{ fingerprint: string }>();
    if (previous)
      return previous.fingerprint === fingerprint
        ? json({ saved: true })
        : json({ error: "El registro ya fue procesado." }, 409);
    const now = Date.now();
    const window = Math.floor(now / 3600000);
    const key = await digest(
      `${request.headers.get("cf-connecting-ip") || "local"}:${window}`,
    );
    const rate = await env.DB.prepare(
      "INSERT INTO rate_limits (key,count,expires_at) VALUES (?,1,?) ON CONFLICT(key) DO UPDATE SET count=count+1 RETURNING count",
    )
      .bind(key, now + 3600000)
      .first<{ count: number }>();
    if ((rate?.count || 0) > 10)
      return json({ error: "Demasiados intentos. Intentá más tarde." }, 429);
    await env.DB.prepare("DELETE FROM rate_limits WHERE expires_at < ?")
      .bind(now)
      .run();
    await env.DB.prepare(
      "INSERT INTO leads (id,payload,fingerprint,classification,created_at) VALUES (?,?,?,?,?) ON CONFLICT(id) DO NOTHING",
    )
      .bind(
        id,
        payload,
        fingerprint,
        String(data.english_level).startsWith("No hablo inglés")
          ? "english_from_zero"
          : "training_interest",
        now,
      )
      .run();
    const saved = await env.DB.prepare(
      "SELECT fingerprint FROM leads WHERE id = ?",
    )
      .bind(id)
      .first<{ fingerprint: string }>();
    return saved?.fingerprint === fingerprint
      ? json({ saved: true }, 201)
      : json({ error: "No pudimos confirmar el registro." }, 409);
  } catch {
    return json(
      {
        error:
          "El registro no está disponible en este momento. Intentá más tarde.",
      },
      503,
    );
  }
}
