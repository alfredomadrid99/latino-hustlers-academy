import assert from "node:assert/strict";
import fs from "node:fs";
const spec = JSON.parse(fs.readFileSync("lib/programs.json", "utf8"));
const base = process.argv[2] ?? "http://localhost:8787";

for (const path of ["/ingles", "/carreras-remotas"]) {
  const response = await fetch(`${base}${path}`, { redirect: "error" });
  assert.equal(response.status, 200);
  assert.match(await response.text(), /<form\b/);
  console.log(`PASS ${path}: acceso directo al formulario`);
}

async function send(data, id = crypto.randomUUID()) {
  const r = await fetch(`${base}/api/leads`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Idempotency-Key": id,
      Origin: new URL(base).origin,
    },
    body: JSON.stringify(data),
  });
  return {
    status: r.status,
    body: await r.json(),
    cacheControl: r.headers.get("cache-control"),
  };
}
for (const program of ["english", "remote_careers"]) {
  const f = program === "english" ? spec.forms.english : spec.forms.careers;
  const data = {
    program_type: program,
    full_name: "Prueba técnica Á",
    email: "dual@example.invalid",
    whatsapp: "+50688888888",
    contact_consent: true,
    website: "",
    startedAt: Date.now() - 60000,
  };
  for (const field of f.fields) {
    const first = field.options[0];
    data[field.id] =
      field.type === "checkbox_group"
        ? [first]
        : typeof first === "string"
          ? first
          : first.value;
  }
  data.investment_willingness = f.fields.find(
    (x) => x.id === "investment_willingness",
  ).options[2];
  data.virtual_comfort = f.fields.find(
    (x) => x.id === "virtual_comfort",
  ).options[2];
  const id = crypto.randomUUID();
  let r = await send(data, id);
  assert.equal(r.status, 201, JSON.stringify(r));
  assert.equal(r.cacheControl, "no-store");
  assert.deepEqual(r.body, { saved: true });
  r = await send(data, id);
  assert.equal(r.status, 200);
  assert.deepEqual(r.body, { saved: true });
  r = await send({ ...data, email: "other@example.invalid" }, id);
  assert.equal(r.status, 409);
  console.log(
    `PASS ${program}: guardado, reintento y conflicto de idempotencia`,
  );
  for (const patch of [
    { english_level: "inventado" },
    { contact_consent: false },
    { email: "mal" },
    { whatsapp: "123" },
    { program_type: "invalid" },
  ]) {
    r = await send({ ...data, ...patch });
    assert.equal(r.status, 422);
  }
  if (program === "remote_careers")
    for (const patch of [
      { training_acknowledgement: "seeking_job_only" },
      { training_acknowledgement: undefined },
      {
        career_interests: [
          "Todavía no estoy seguro(a)",
          "Virtual Assistant / Asistente virtual",
        ],
      },
      { career_interests: ["Marketing digital"] },
    ]) {
      r = await send({ ...data, ...patch });
      assert.equal(r.status, 422);
    }
  console.log(`PASS ${program}: validación estricta y reglas específicas`);
}
