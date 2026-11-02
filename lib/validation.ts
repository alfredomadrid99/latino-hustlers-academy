import content from "./content.json";
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
export const steps: { id: string; title: string; fields: Field[] }[] =
  content.lead_form.steps;
export function validate(data: Answers, step?: number) {
  const errors: Record<string, string> = {};
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
          v.some((x) => ["english_only", "undecided"].includes(x))))
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
    (step === undefined || step === 0) &&
    data.training_acknowledgement !== "understands_training"
  )
    errors.training_acknowledgement =
      content.lead_form.conditional_logic.employment_only.message;
  if (step === undefined || step === 3) {
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
  return ["english_only", "undecided"].includes(value)
    ? [value]
    : [
        ...current.filter((x) => !["english_only", "undecided"].includes(x)),
        value,
      ];
}
