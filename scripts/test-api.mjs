import assert from "node:assert/strict";
const base = process.env.TEST_BASE_URL || "http://127.0.0.1:5173";
const sample = {
  training_acknowledgement: "understands_training",
  english_level: "zero",
  learning_goal: "both",
  career_interests: ["virtual_assistant"],
  location: "perez_zeledon",
  investment_willingness: "outside_budget",
  start_timeline: "researching",
  virtual_comfort: "prefer_in_person",
  full_name: "  Prueba técnica Á  ",
  whatsapp: "+506 8888 8888",
  email: "  qa@example.invalid  ",
  contact_consent: true,
  website: "",
  startedAt: Date.now() - 60000,
};
async function send(body, key = crypto.randomUUID(), extra = {}) {
  const response = await fetch(`${base}/api/leads`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Idempotency-Key": key,
      ...extra,
    },
    body: JSON.stringify(body),
  });
  const text = await response.text();
  let data;
  try {
    data = JSON.parse(text);
  } catch {
    data = { message: text };
  }
  return { status: response.status, data };
}
const id = crypto.randomUUID();
let result = await send(sample, id);
assert.equal(result.status, 201, JSON.stringify(result));
assert.equal(result.data.saved, true);
console.log(
  "PASS: cero inglés, presupuesto bajo y modalidad presencial permiten guardar",
);
result = await send(sample, id);
assert.equal(result.status, 200);
assert.equal(result.data.saved, true);
console.log("PASS: reintento idempotente");
result = await send({ ...sample, full_name: "Otro registro" }, id);
assert.equal(result.status, 409);
console.log("PASS: conflicto de idempotencia");
for (const [label, patch] of [
  ["solo empleo", { training_acknowledgement: "seeking_job_only" }],
  ["aceptación ausente", { training_acknowledgement: undefined }],
  [
    "intereses exclusivos",
    { career_interests: ["english_only", "virtual_assistant"] },
  ],
  [
    "interés indeciso exclusivo",
    { career_interests: ["undecided", "project_manager"] },
  ],
  ["enum inválido", { english_level: "inventado" }],
  ["consentimiento ausente", { contact_consent: false }],
  ["teléfono inválido", { whatsapp: "123" }],
  ["correo inválido", { email: "mal" }],
  ["nombre vacío", { full_name: "   " }],
  [
    "intereses duplicados",
    { career_interests: ["virtual_assistant", "virtual_assistant"] },
  ],
]) {
  result = await send({ ...sample, ...patch });
  assert.equal(result.status, 422, label);
  console.log(`PASS: rechazo ${label}`);
}
result = await send({ ...sample, website: "spam.test" });
assert.equal(result.status, 400);
console.log("PASS: honeypot");
result = await send({ ...sample, startedAt: Date.now() });
assert.equal(result.status, 400);
console.log("PASS: envío automatizado inmediato");
result = await send(sample, crypto.randomUUID(), {
  Origin: "https://otro.example",
});
assert.equal(result.status, 403);
console.log("PASS: origen ajeno");
console.log(
  "All API checks passed. Synthetic test lead stays in LOCAL database only.",
);
