/* eslint-disable @next/next/no-img-element */
"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Check, Menu, X, Languages, Laptop } from "lucide-react";
import spec from "../lib/programs.json";
import { LeadForm } from "./lead-form";
import { launchOffer } from "../lib/offer";
import { track } from "../lib/analytics";
import type { Program } from "../lib/validation";
export function Brand() {
  return (
    <Link
      href="/"
      className="brand"
      aria-label="Latino Hustlers Academy, inicio"
    >
      <img
        className="brand-logo"
        src="/images/latino-hustlers-logo.png"
        alt="Latino Hustlers Academy"
        width={1254}
        height={1254}
      />
    </Link>
  );
}
export function Footer() {
  return (
    <footer>
      <div className="container footer-top">
        <Brand />
        <p>
          Desde Costa Rica.
          <br />
          Con visión internacional.
        </p>
        <Link href="/ingles">Inglés</Link>
        <Link href="/carreras-remotas">Carreras remotas</Link>
      </div>
      <div className="container footer-bottom">
        <span>Latino Hustlers Academy · San José, Costa Rica</span>
        <Link href="/privacidad">Aviso de privacidad</Link>
      </div>
    </footer>
  );
}
function Mentor({ secondary = false }: { secondary?: boolean }) {
  const m = spec.mentor;
  return (
    <section id="mentor" className="container section mentor-section">
      <div>
        <div className="eyebrow">
          {secondary ? "TRAYECTORIA DEL MENTOR" : "CONOCÉ A TU MENTOR"}
        </div>
        <h2>{m.name}</h2>
        <p>{m.description}</p>
        <p className="help">{m.source_note}</p>
      </div>
      <div>
        <h3>{m.headline}</h3>
        <div className="mentor-record">
          {m.track_record.map((r, index) => (
            <div key={r.value}>
              <strong>{r.value}</strong>
              <span>{r.label}</span>
              <p>
                {
                  [
                    "Monto acumulado en Upwork.",
                    "Trayectoria reportada por la academia.",
                    "Trabajos remotos y en inglés.",
                    "Negocio con una cifra reportada de US$360.000 al año.",
                    "Comenzó sin experiencia previa.",
                  ][index]
                }
              </p>
            </div>
          ))}
        </div>
        <a
          className="text-link"
          href="https://ExclusiveAssist.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          Conocé ExclusiveAssist.com <ArrowUpRight size={16} />
        </a>
        <p className="disclaimer">{m.results_note}</p>
      </div>
    </section>
  );
}
export function ProgramLanding({ program }: { program: Program }) {
  const english = program === "english",
    page = english ? spec.english_landing : spec.careers_landing,
    form = english ? spec.forms.english : spec.forms.careers;
  const [menu, setMenu] = useState(false);
  useEffect(() => {
    track("landing_view", { program_type: program, form_id: form.id });
  }, [program, form.id]);
  const invest = english
    ? spec.english_landing.sections[3]
    : spec.careers_landing.investment;
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
            {page.header.links.map((l) => (
              <a href={l.href} key={l.href} onClick={() => setMenu(false)}>
                {l.label}
              </a>
            ))}
          </nav>
          <a className="button nav-cta" href={`#${form.anchor}`}>
            Registrá tu interés <ArrowUpRight size={16} />
          </a>
          <button
            className="menu-button"
            aria-controls="program-navigation"
            aria-expanded={menu}
            aria-label={menu ? "Cerrar menú" : "Abrir menú"}
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
            <a className="button" href={`#${form.anchor}`}>
              {english
                ? "Quiero aprender inglés"
                : "Quiero desarrollar habilidades remotas"}{" "}
              <ArrowUpRight size={18} />
            </a>
            <a className="text-link" href={english ? "#programa" : "#areas"}>
              {page.hero.secondary_cta}
            </a>
          </div>
          <div className="hero-visual">
            <div className="photo-frame">
              <img
                src="/images/learning.jpg"
                alt={
                  english
                    ? "Imagen ilustrativa de aprendizaje en línea"
                    : "Imagen ilustrativa de trabajo profesional remoto"
                }
                width={1200}
                height={1500}
                fetchPriority="high"
              />
            </div>
            <div className="visual-bottom">
              <span className="micro-label">
                {english
                  ? "EL IDIOMA ES TU PUNTO DE PARTIDA"
                  : "TU SIGUIENTE ETAPA PROFESIONAL"}
              </span>
              {page.hero.highlights.map((h) => (
                <div key={h}>
                  <Check size={16} />
                  {h}
                </div>
              ))}
            </div>
            <span className="image-note">Fotografía ilustrativa</span>
          </div>
        </section>
        <div className="container feature-strip">
          {page.hero.highlights.map((h) => (
            <span key={h}>
              {english ? <Languages /> : <Laptop />}
              {h}
            </span>
          ))}
        </div>
        <p className="container section-note">
          {english
            ? spec.english_landing.hero.status
            : spec.careers_landing.hero.clarification}
        </p>
        {english ? (
          <>
            <section id="programa" className="container section">
              <div className="eyebrow">TU PUNTO DE PARTIDA</div>
              <div className="section-heading">
                <h2>{spec.english_landing.sections[0].title}</h2>
                <p>{spec.english_landing.sections[0].description}</p>
              </div>
              <ul className="check-list">
                {spec.english_landing.sections[0].highlights?.map((h) => (
                  <li key={h}>
                    <Check size={18} />
                    {h}
                  </li>
                ))}
              </ul>
            </section>
            <section id="modalidad" className="method section">
              <div className="container">
                <div className="eyebrow">INGLÉS EN TIEMPO REAL</div>
                <h2>{spec.english_landing.sections[1].title}</h2>
                <p className="program-copy">
                  {spec.english_landing.sections[1].description}
                </p>
              </div>
            </section>
            <section id="proyeccion" className="container section">
              <h2>{spec.english_landing.sections[2].title}</h2>
              <p className="program-copy">
                {spec.english_landing.sections[2].description}
              </p>
              <p className="section-note">
                {spec.english_landing.sections[2].clarification}
              </p>
              <Link href="/carreras-remotas" className="text-link">
                Conocé también nuestra formación en carreras remotas{" "}
                <ArrowUpRight size={16} />
              </Link>
            </section>
            <Mentor secondary />
          </>
        ) : (
          <>
            <section className="container section" id="areas">
              <div className="eyebrow">ÁREAS DE FORMACIÓN</div>
              <h2>{spec.careers_landing.career_areas.title}</h2>
              <div className="career-paths">
                {spec.careers_landing.career_areas.items.map((a, i) => (
                  <article className="path" key={a.title}>
                    <div className="eyebrow">
                      0{i + 1} / {a.subtitle}
                    </div>
                    <h3>{a.title}</h3>
                    <ul>
                      {a.skills.map((s) => (
                        <li key={s}>
                          <Check size={16} />
                          {s}
                        </li>
                      ))}
                    </ul>
                  </article>
                ))}
              </div>
            </section>
            <section className="method section" id="metodologia">
              <div className="container">
                <div className="eyebrow">APRENDÉ HACIENDO</div>
                <h2>{spec.careers_landing.methodology.title}</h2>
                <div className="steps">
                  {spec.careers_landing.methodology.items.map((s, i) => (
                    <article key={s.title}>
                      <span className="step-num">0{i + 1}</span>
                      <h3>{s.title}</h3>
                      <p>{s.description}</p>
                    </article>
                  ))}
                </div>
              </div>
            </section>
            <Mentor />
            <section className="container section">
              <h2>{spec.careers_landing.agency_connection.title}</h2>
              <p className="program-copy">
                {spec.careers_landing.agency_connection.description}
              </p>
              <p className="section-note">
                {spec.careers_landing.agency_connection.clarification}
              </p>
            </section>
          </>
        )}
        <section className="container investment" id="inversion">
          <div>
            <div className="eyebrow">{invest.status}</div>
            <h2>{invest.title}</h2>
            <p>{invest.note}</p>
          </div>
          <div className="price-card">
            <span className="pill">{launchOffer.title}</span>
            <div className="price">
              {launchOffer.monthly} <span>/ mes</span>
            </div>
            <p>Matrícula única de {launchOffer.enrollment}</p>
            <p className="help">{launchOffer.note}</p>
            {!english && <p>5 meses de formación</p>}
            <a className="button" href={`#${form.anchor}`}>
              Registrá tu interés <ArrowUpRight size={18} />
            </a>
          </div>
        </section>
        <section className="container section faq" id="preguntas">
          <div>
            <div className="eyebrow">CON TODA CLARIDAD</div>
            <h2>Antes de empezar.</h2>
            <p>
              Estamos evaluando la apertura de los programas en Pérez Zeledón.
            </p>
          </div>
          <div>
            {page.faq.map((q) => (
              <details key={q.question}>
                <summary>
                  {q.question}
                  <span className="plus">+</span>
                </summary>
                <p>{q.answer}</p>
              </details>
            ))}
          </div>
        </section>
        <section className="form-section section" id={form.anchor}>
          <div className="container form-layout">
            <div className="form-intro">
              <div className="eyebrow">{form.title}</div>
              <h2>{form.headline}</h2>
              {(Array.isArray(form.introduction)
                ? form.introduction
                : [form.introduction]
              ).map((t) => (
                <p key={t}>{t}</p>
              ))}
              <p className="help">
                Este registro no confirma una matrícula, un cupo ni una oferta
                de empleo.
              </p>
              <Link href={page.header.cross_link.href} className="text-link">
                {page.header.cross_link.label}
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
