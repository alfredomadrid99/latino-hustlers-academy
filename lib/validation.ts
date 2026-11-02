import content from "./content.json";
import spec from "./programs.json";
import { parsePhoneNumberFromString } from "libphonenumber-js";
export type Answers = Record<string, string | string[] | boolean>;
export type Field = {
  id: string;
  type: string;
  label: string;
  required: boolean;
  help?: string;
  autocomplete?: string;
  options?: { value: string; label: string }[];
};
export type Program = "english" | "remote_careers";
export function getForm(program: Program) {
  return program === "english" ? spec.forms.english : spec.forms.careers;
}
export function getSteps(
  program: Program,
): { id: string; title: string; fields: Field[] }[] {
  const form = getForm(program);
  const fields: Field[] = form.fields.map((f) => ({
    ...f,
    options: f.options.map((o) =>
      typeof o === "string" ? { value: o, label: o } : o,
    ),
  }));
  return [
    { id: "qualification", title: "Tu interés en la formación", fields },
    {
      id: "contact",
      title: "Datos de contacto",
      fields: [
        ...form.contact_section.fields,
        {
          id: "contact_consent",
          type: "checkbox",
          label: "Autorización de contacto",
          required: true,
        },
      ],
    },
  ];
}
export function validate(data: Answers, step?: number) {
  const errors: Record<string, string> = {};
  if (data.program_type !== "english" && data.program_type !== "remote_careers")
    return { program_type: "Seleccioná un programa válido." };
  const steps = getSteps(data.program_type);
  const fields = (step === undefined ? steps : [steps[step]]).flatMap(
    (s) => s.fields,
  ) as Field[];
  for (const f of fields) {
    const v = data[f.id];
    if (
      !v ||
      (Array.isArray(v) && !v.length) ||
      (typeof v === "string" && !v.trim())
    ) {
      errors[f.id] = content.lead_form.errors.required;
      continue;
    }
    if (
      f.options &&
      (Array.isArray(v)
        ? v.some((x) => !f.options!.some((o) => o.value === x))
        : !f.options.some((o) => o.value === v))
    )
      errors[f.id] = "Elegí una opción válida.";
    if (
      f.type === "checkbox_group" &&
      (!Array.isArray(v) ||
        new Set(v).size !== v.length ||
        (v.length > 1 &&
          v.some((x) => ["Todavía no estoy seguro(a)"].includes(x))))
    )
      errors[f.id] = "Elegí especialidades o una sola opción de orientación.";
    if (
      f.type !== "checkbox_group" &&
      f.type !== "checkbox" &&
      typeof v !== "string"
    )
      errors[f.id] = "Revisá este campo.";
    if (typeof v === "string" && v.length > 250)
      errors[f.id] = "Usá un máximo de 250 caracteres.";
  }
  if (
    data.program_type === "remote_careers" &&
    (step === undefined || step === 0) &&
    data.training_acknowledgement !== "understands_training"
  )
    errors.training_acknowledgement =
      spec.forms.careers.conditional_logic.negative_answer_message;
  if (step === undefined || step === 1) {
    if (
      typeof data.email !== "string" ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim())
    )
      errors.email = content.lead_form.errors.invalid_email;
    if (
      typeof data.whatsapp !== "string" ||
      !parsePhoneNumberFromString(data.whatsapp)?.isValid()
    )
      errors.whatsapp = content.lead_form.errors.invalid_phone;
    if (data.contact_consent !== true)
      errors.contact_consent = "Necesitamos tu autorización para contactarte.";
  }
  return errors;
}
export function selectInterest(current: string[], value: string) {
  if (current.includes(value)) return current.filter((x) => x !== value);
  return ["Todavía no estoy seguro(a)"].includes(value)
    ? [value]
    : [
        ...current.filter((x) => !["Todavía no estoy seguro(a)"].includes(x)),
        value,
      ];
}
