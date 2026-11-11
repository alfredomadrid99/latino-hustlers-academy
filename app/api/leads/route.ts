import { validate } from "../../../lib/validation";

const json = (value: unknown, status = 200) =>
  Response.json(value, { status, headers: { "Cache-Control": "no-store" } });
export async function POST(request: Request) {
  try {
    const origin = request.headers.get("origin");
    const url = new URL(request.url);
    const host = request.headers.get("host") ?? url.host;
    const protocol = request.headers.get("x-forwarded-proto") ?? url.protocol.slice(0, -1);
    if (origin && origin !== `${protocol}://${host}`)
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
  } catch {
    return registrationUnavailable();
  }
  return registrationUnavailable();
}

function registrationUnavailable() {
  return json(
    { error: "El registro no está disponible en este momento. Intentá más tarde." },
    503,
  );
}
