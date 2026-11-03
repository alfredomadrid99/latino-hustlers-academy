/* eslint-disable @next/next/no-img-element */
"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Check, Menu, X } from "lucide-react";
import copy from "../lib/sales-copy.json";
import spec from "../lib/programs.json";
import { launchOffer } from "../lib/offer";
import { track } from "../lib/analytics";
import type { Program } from "../lib/validation";
import { Brand, Footer } from "./program-landing";
import { LeadForm } from "./lead-form";
export function SalesLanding({ program }: { program: Program }) {
  const english = program === "english",
    page = english ? copy.english_page : copy.careers_page,
    cta = english
      ? copy.global_cta_system.english
      : copy.global_cta_system.careers,
    form = english ? spec.forms.english : spec.forms.careers,
    old = english ? spec.english_landing : spec.careers_landing;
  const [menu, setMenu] = useState(false);
  useEffect(() => {
    track("landing_view", { program_type: program, form_id: form.id });
  }, [program, form.id]);
  const action = (label: string) => (
    <a className="button" href={cta.destination}>
      {label}
      <ArrowUpRight size={18} />
    </a>
  );
  const problem = page.problem_section,
    investment = page.investment_section,
    final = page.final_cta_section;
  return (
    <>
      <a className="skip" href="#contenido">
        Saltar al contenido
      </a>
      <header>
        <div className="container nav">
          <Brand />
          <nav
            id="program-navigation"
            className={menu ? "opened" : ""}
            aria-label="Navegación principal"
          >
            {old.header.links.map((l) => (
              <a key={l.href} href={l.href} onClick={() => setMenu(false)}>
                {l.label}
              </a>
            ))}
          </nav>
          <a className="button nav-cta" href={cta.destination}>
            {english
              ? cta.primary
              : copy.global_cta_system.careers.compact_primary}
            <ArrowUpRight size={16} />
          </a>
          <button
            className="menu-button"
            aria-label={menu ? "Cerrar menú" : "Abrir menú"}
            aria-controls="program-navigation"
            aria-expanded={menu}
            onClick={() => setMenu(!menu)}
          >
            {menu ? <X /> : <Menu />}
          </button>
        </div>
      </header>
      <main id="contenido">
        <section
          className={`container hero program-hero ${english ? "english-hero" : "careers-hero"}`}
        >
          <div>
            <div className="eyebrow">{page.hero.eyebrow}</div>
            <h1>{page.hero.headline}</h1>
            <p className="hero-description">{page.hero.description}</p>
            {action(cta.primary)}
            <a className="text-link" href={english ? "#modalidad" : "#areas"}>
              {cta.secondary}
            </a>
            <p className="section-note">{cta.microcopy}</p>
          </div>
          <div className="hero-visual">
            <div className="photo-frame">
              <img
                src="/images/learning.jpg"
                alt={
                  english
                    ? "Imagen ilustrativa de aprendizaje de inglés en línea"
                    : "Imagen ilustrativa de servicios profesionales remotos"
                }
                width={1200}
                height={1500}
                fetchPriority="high"
              />
            </div>
            <div className="visual-bottom">
              <span className="micro-label">
                {english
                  ? "QUE EL IDIOMA DEJE DE SER UNA BARRERA"
                  : "CONVERTÍ TU INGLÉS EN UNA VENTAJA"}
              </span>
              {page.hero.benefits.map((b) => (
                <div key={b}>
                  <Check size={16} />
                  {b}
                </div>
              ))}
            </div>
            <span className="image-note">Fotografía ilustrativa</span>
          </div>
        </section>
        <p className="container section-note">
          {english
            ? copy.english_page.hero.status
            : copy.careers_page.hero.clarification}
        </p>
        <section
          className="container section sales-problem"
          id={english ? "programa" : "preparacion"}
        >
          <div>
            <div className="eyebrow">
              {english
                ? copy.english_page.problem_section.eyebrow
                : "TU INGLÉS ES EL PUNTO DE PARTIDA"}
            </div>
            <h2>{problem.headline}</h2>
          </div>
          <div>
            {problem.paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
            <p className="sales-closing">{problem.closing_line}</p>
            {action(problem.cta)}
          </div>
        </section>
        {english ? (
          <>
            <section className="method section">
              <div className="container">
                <h2>{copy.english_page.benefits_section.headline}</h2>
                <div className="steps">
                  {copy.english_page.benefits_section.items.map((b, i) => (
                    <article key={b.title}>
                      <span className="step-num">0{i + 1}</span>
                      <h3>{b.title}</h3>
                      <p>{b.description}</p>
                    </article>
                  ))}
                </div>
              </div>
            </section>
            <section id="modalidad" className="container section sales-problem">
              <div>
                <h2>{copy.english_page.modality_section.headline}</h2>
                <p className="program-copy">
                  {copy.english_page.modality_section.description}
                </p>
                <p className="section-note">
                  {copy.english_page.modality_section.supporting_line}
                </p>
                {action(copy.english_page.modality_section.cta)}
              </div>
              <div>
                <h3>{copy.english_page.audience_section.headline}</h3>
                <ul className="check-list">
                  {copy.english_page.audience_section.items.map((s) => (
                    <li key={s}>
                      <Check size={18} />
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            </section>
            <section className="container sales-mentor-brief section">
              <div className="eyebrow">TRAYECTORIA DEL MENTOR</div>
              <h2>{copy.english_page.mentor_section.headline}</h2>
              <p className="program-copy">
                {copy.english_page.mentor_section.description}
              </p>
              <Link className="text-link" href="/carreras-remotas">
                Conocé la formación en carreras remotas{" "}
                <ArrowUpRight size={16} />
              </Link>
            </section>
          </>
        ) : (
          <>
            <section className="container section" id="areas">
              <h2>{copy.careers_page.career_areas_section.headline}</h2>
              <p className="program-copy">
                {copy.careers_page.career_areas_section.description}
              </p>
              <div className="career-paths">
                {copy.careers_page.career_areas_section.items.map((a, i) => (
                  <article className="path" key={a.title}>
                    <div className="eyebrow">0{i + 1}</div>
                    <h3>{a.title}</h3>
                    <p className="sales-closing">{a.hook}</p>
                    <p>{a.description}</p>
                  </article>
                ))}
              </div>
              <div className="section-action">
                {action(copy.careers_page.career_areas_section.cta)}
              </div>
            </section>
            <section className="method section" id="metodologia">
              <div className="container">
                <h2>{copy.careers_page.practical_training_section.headline}</h2>
                <div className="steps">
                  {copy.careers_page.practical_training_section.items.map(
                    (a, i) => (
                      <article key={a.title}>
                        <span className="step-num">0{i + 1}</span>
                        <h3>{a.title}</h3>
                        <p>{a.description}</p>
                      </article>
                    ),
                  )}
                </div>
                <p className="section-note">
                  {copy.careers_page.practical_training_section.degree_note}
                </p>
                <div className="section-action">
                  {action(copy.careers_page.practical_training_section.cta)}
                </div>
              </div>
            </section>
            <section className="container section mentor-section" id="mentor">
              <div>
                <div className="eyebrow">
                  {copy.careers_page.mentor_section.eyebrow}
                </div>
                <h2>{copy.careers_page.mentor_section.name}</h2>
                <p className="program-copy">
                  {copy.careers_page.mentor_section.description}
                </p>
                <a
                  className="text-link"
                  href="https://ExclusiveAssist.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  ExclusiveAssist.com <ArrowUpRight size={16} />
                </a>
              </div>
              <div>
                <h3>{copy.careers_page.mentor_section.headline}</h3>
                <div className="mentor-record">
                  {copy.careers_page.mentor_section.proof_points.map((p) => (
                    <div key={p.value}>
                      <strong>{p.value}</strong>
                      <span>{p.label}</span>
                    </div>
                  ))}
                </div>
                <p className="program-copy">
                  {copy.careers_page.mentor_section.closing_line}
                </p>
                <div className="section-action">
                  {action(copy.careers_page.mentor_section.cta)}
                </div>
                {copy.careers_page.mentor_section.notes.map((n) => (
                  <p className="help" key={n}>
                    {n}
                  </p>
                ))}
              </div>
            </section>
            <section className="container section sales-agency">
              <h2>{copy.careers_page.agency_section.headline}</h2>
              <p className="program-copy">
                {copy.careers_page.agency_section.description}
              </p>
              <p className="program-copy">
                {copy.careers_page.agency_section.supporting_line}
              </p>
              <p className="section-note">
                {copy.careers_page.agency_section.clarification}
              </p>
              <div className="section-action">
                {action(copy.careers_page.agency_section.cta)}
              </div>
            </section>
          </>
        )}
        <section className="container investment" id="inversion">
          <div>
            <div className="eyebrow">{investment.eyebrow}</div>
            <h2>{investment.headline}</h2>
            <p>{investment.description}</p>
            <p className="help">{investment.status_note}</p>
            {!english && (
              <p className="help">
                {copy.careers_page.investment_section.separation_note}
              </p>
            )}
          </div>
          <div className="price-card">
            <span className="pill">{launchOffer.title}</span>
            <div className="price">
              {launchOffer.monthly}
              <span> / mes</span>
            </div>
            <p>Matrícula única de {launchOffer.enrollment}</p>
            {!english && <p>5 meses de formación</p>}
            {action(investment.cta)}
            <p>{investment.microcopy}</p>
            <p>{launchOffer.note}</p>
          </div>
        </section>
        <section className="container section faq" id="preguntas">
          <div>
            <div className="eyebrow">RESOLVÉ TUS DUDAS</div>
            <h2>
              Tu siguiente paso,
              <br />
              con más claridad.
            </h2>
          </div>
          <div>
            {old.faq.map((q, i) => {
              const item =
                !english && i === 0
                  ? copy.careers_page.faq_direction.priority_question
                  : q;
              return (
                <details key={item.question}>
                  <summary>
                    {item.question}
                    <span className="plus">+</span>
                  </summary>
                  <p>{item.answer}</p>
                </details>
              );
            })}
          </div>
        </section>
        <section className="method section">
          <div className="container sales-final">
            <h2>{final.headline}</h2>
            <p className="program-copy">{final.description}</p>
            {action(final.cta)}
            <p className="section-note">{final.microcopy}</p>
          </div>
        </section>
        <section className="form-section section" id={form.anchor}>
          <div className="container form-layout">
            <div className="form-intro">
              <h2>{page.form_wrapper.headline}</h2>
              <p>{page.form_wrapper.description}</p>
              <div className="eyebrow form-original-title">{form.title}</div>
              <h3>{form.headline}</h3>
              {(Array.isArray(form.introduction)
                ? form.introduction
                : [form.introduction]
              ).map((t) => (
                <p key={t}>{t}</p>
              ))}
              <Link className="text-link" href={old.header.cross_link.href}>
                {old.header.cross_link.label}
              </Link>
            </div>
            <LeadForm key={program} program={program} />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
