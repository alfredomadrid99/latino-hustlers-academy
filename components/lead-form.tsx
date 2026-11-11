"use client";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, ArrowLeft, Check, ShieldCheck } from "lucide-react";
import content from "../lib/content.json";
import spec from "../lib/programs.json";
import sales from "../lib/sales-copy.json";
import {
  getSteps,
  getForm,
  type Program,
  validate,
  selectInterest,
  type Answers,
  type Field,
} from "../lib/validation";
import { track } from "../lib/analytics";
const copy = content.lead_form;
export function LeadForm({ program }: { program: Program }) {
  const steps = getSteps(program),
    config = getForm(program);
  const eventData = { program_type: program, form_id: config.id };
  const [step, setStep] = useState(0),
    [data, setData] = useState<Answers>({ whatsapp: "+506 " }),
    [errors, setErrors] = useState<Record<string, string>>({}),
    [busy, setBusy] = useState(false),
    [done, setDone] = useState(false),
    [failure, setFailure] = useState("");
  const id = useRef(""),
    started = useRef(0),
    lock = useRef(false),
    tracked = useRef(false),
    heading = useRef<HTMLHeadingElement>(null);
  function change(key: string, value: Answers[string]) {
    if (!tracked.current) {
      track("form_start", eventData);
      tracked.current = true;
    }
    setData((d) => ({ ...d, [key]: value }));
    setErrors((e) => ({ ...e, [key]: "" }));
    if (key === "training_acknowledgement" && value === "seeking_job_only")
      track("form_blocked_job_only", eventData);
  }
  useEffect(() => {
    started.current = Date.now();
  }, []);
  const answers: Answers = {
    ...data,
    program_type: program,
  };
  function focusStep(next: number) {
    setStep(next);
    setTimeout(() => heading.current?.focus(), 30);
  }
  function showErrors(next: Record<string, string>) {
    setErrors(next);
    setTimeout(
      () =>
        document.getElementById(`${program}-${Object.keys(next)[0]}`)?.focus(),
      30,
    );
  }
  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (lock.current) return;
    const next = validate(answers, step);
    if (Object.keys(next).length) {
      showErrors(next);
      return;
    }
    if (step < steps.length - 1) {
      focusStep(step + 1);
      return;
    }
    const all = validate(answers);
    if (Object.keys(all).length) {
      focusStep(steps.findIndex((s) => s.fields.some((f) => all[f.id])));
      showErrors(all);
      return;
    }
    lock.current = true;
    setBusy(true);
    setFailure("");
    if (!id.current) id.current = crypto.randomUUID();
    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Idempotency-Key": id.current,
        },
        body: JSON.stringify({
          ...answers,
          startedAt: started.current,
          website: data.website || "",
        }),
      });
      if (response.status === 503) {
        setFailure("El registro no está disponible en este momento. Intentá más tarde.");
        return;
      }
      const result = (await response.json()) as { saved?: boolean };
      if (!response.ok || result.saved !== true)
        throw new Error(
          response.status === 429
            ? "Realizaste varios intentos. Intentá más tarde."
            : copy.errors.submission,
        );
      setDone(true);
      track("form_submit_success", eventData);
      setTimeout(() => heading.current?.focus(), 30);
    } catch {
      setFailure(copy.errors.submission);
    } finally {
      lock.current = false;
      setBusy(false);
    }
  }
  if (done)
    return (
      <div className="form-card success" role="status">
        <span className="success-icon">
          <Check size={32} />
        </span>
        <h3 ref={heading} tabIndex={-1}>
          {copy.success.title}
        </h3>
        <p>{config.success.message}</p>
        <p>{copy.success.clarification}</p>
      </div>
    );
  function field(f: Field) {
    const v = answers[f.id],
      error = errors[f.id];
    const described =
      [f.help ? `${f.id}-help` : "", error ? `${f.id}-error` : ""]
        .filter(Boolean)
        .join(" ") || undefined;
    return (
      <div className="field" key={f.id}>
        {f.options && f.type !== "select" ? (
          <fieldset aria-describedby={described} aria-invalid={!!error}>
            <legend>{f.label}</legend>
            {f.help && (
              <p id={`${f.id}-help`} className="help">
                {f.help}
              </p>
            )}
            <div className="choices">
              {f.options.map((o, i) => (
                <label className="choice" key={o.value}>
                  <input
                    id={
                      i === 0 ? `${program}-${f.id}` : `${program}-${f.id}-${i}`
                    }
                    type={f.type === "checkbox_group" ? "checkbox" : "radio"}
                    name={`${program}-${f.id}`}
                    value={o.value}
                    checked={
                      Array.isArray(v) ? v.includes(o.value) : v === o.value
                    }
                    onChange={() =>
                      change(
                        f.id,
                        f.type === "checkbox_group"
                          ? selectInterest(Array.isArray(v) ? v : [], o.value)
                          : o.value,
                      )
                    }
                  />
                  <span>{o.label}</span>
                </label>
              ))}
            </div>
          </fieldset>
        ) : f.type === "checkbox" ? (
          <label className="consent">
            <input
              id={`${program}-${f.id}`}
              type="checkbox"
              checked={v === true}
              onChange={(e) => change(f.id, e.target.checked)}
              aria-describedby={described}
              aria-invalid={!!error}
            />
            <span>
              Autorizo a Latino Hustlers Academy a contactarme por WhatsApp o
              correo para brindarme información sobre los programas de mi
              interés. Leí el{" "}
              <a href="/privacidad" target="_blank" rel="noopener">
                aviso de privacidad
              </a>
              .
            </span>
          </label>
        ) : (
          <>
            <label htmlFor={`${program}-${f.id}`}>{f.label}</label>
            {f.type === "select" ? (
              <select
                id={f.id}
                value={typeof v === "string" ? v : ""}
                onChange={(e) => change(f.id, e.target.value)}
                aria-describedby={described}
                aria-invalid={!!error}
              >
                <option value="">Seleccioná una opción</option>
                {f.options?.map((o) => (
                  <option value={o.value} key={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
            ) : (
              <input
                id={f.id}
                type={f.type}
                autoComplete={f.autocomplete}
                maxLength={250}
                value={typeof v === "string" ? v : ""}
                onChange={(e) => change(f.id, e.target.value)}
                aria-describedby={described}
                aria-invalid={!!error}
              />
            )}
            {f.id === "whatsapp" && (
              <p className="help">
                Incluí el código de tu país. Podés cambiar +506 por otro código
                internacional.
              </p>
            )}
            {f.help && (
              <p id={`${f.id}-help`} className="help">
                {f.help}
              </p>
            )}
          </>
        )}
        {error && (
          <p role="alert" className="error" id={`${f.id}-error`}>
            {error}
          </p>
        )}
        {f.id === "english_level" && v === "zero" && (
          <p className="notice" role="status">
            {copy.conditional_logic.zero_english.message}
          </p>
        )}
      </div>
    );
  }
  const blocked =
    program === "remote_careers" &&
    data.training_acknowledgement === "seeking_job_only";
  return (
    <form id={config.id} className="form-card" onSubmit={submit} noValidate>
      <div className="form-progress">
        <span>
          PASO {step + 1} DE {steps.length}
        </span>
        <span>{steps[step].title}</span>
      </div>
      <div className="progress-bars" aria-hidden="true">
        {steps.map((s, i) => (
          <span key={s.id} className={i <= step ? "active" : ""} />
        ))}
      </div>
      <h3 tabIndex={-1} ref={heading} aria-live="polite">
        {steps[step].title}
      </h3>
      <div className="honey" aria-hidden="true">
        <label>
          Sitio web
          <input
            tabIndex={-1}
            autoComplete="off"
            value={String(data.website || "")}
            onChange={(e) => change("website", e.target.value)}
          />
        </label>
      </div>
      {(steps[step].fields as Field[]).map(field)}
      {blocked && (
        <p className="notice" role="status">
          {spec.forms.careers.conditional_logic.negative_answer_message}
        </p>
      )}
      {failure && (
        <p className="error" role="alert">
          {failure}
        </p>
      )}
      <div className="form-actions">
        {step > 0 && (
          <button
            type="button"
            className="back"
            disabled={busy}
            onClick={() => focusStep(step - 1)}
          >
            <ArrowLeft size={17} /> Atrás
          </button>
        )}
        <button className="button" disabled={blocked || busy} type="submit">
          {busy
            ? copy.submit_button.loading
            : step < steps.length - 1
              ? "Continuar"
              : failure
                ? copy.submit_button.retry
                : program === "english"
                  ? sales.global_cta_system.english.form_submit
                  : sales.global_cta_system.careers.form_submit}
          <ArrowRight size={17} />
        </button>
      </div>
      <p className="form-security">
        <ShieldCheck size={15} /> Tus datos se usan para atender tu interés en
        formación.
      </p>
    </form>
  );
}
