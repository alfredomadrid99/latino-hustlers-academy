/* eslint-disable @next/next/no-img-element -- Sized, compressed local editorial asset; no image transformation service required. */
"use client";
import { useState } from "react";

import {
  ArrowUpRight,
  ArrowRight,
  Check,
  Globe2,
  Laptop,
  Languages,
  Menu,
  X,
  CalendarDays,
  Headphones,
  Layers3,
  Users,
  ChartNoAxesCombined,
  MapPin,
  GraduationCap,
} from "lucide-react";
import content from "../lib/content.json";
import { LeadForm } from "../components/lead-form";
import { track } from "../lib/analytics";
const c = content.site_structure;
const icons = [Headphones, Layers3, Users, ChartNoAxesCombined];
function Brand() {
  return (
    <a
      className="brand"
      href="#inicio"
      aria-label="Latino Hustlers Academy, inicio"
    >
      <span className="brand-symbol">
        LH<span>↗</span>
      </span>
      <span>
        LATINO HUSTLERS<small>ACADEMY</small>
      </span>
    </a>
  );
}
export default function Home() {
  const [menu, setMenu] = useState(false),
    [prefill, setPrefill] = useState("");
  function interest(value: string) {
    setPrefill(value);
    track("program_interest_click");
  }
  return (
    <>
      <a className="skip" href="#contenido">
        Saltar al contenido
      </a>
      <header>
        <div className="container nav">
          <Brand />
          <nav
            id="navigation"
            className={menu ? "opened" : ""}
            aria-label="Navegación principal"
          >
            {c.header.links.map((l) => (
              <a key={l.href} href={l.href} onClick={() => setMenu(false)}>
                {l.label}
              </a>
            ))}
          </nav>
          <a className="button nav-cta" href="#formulario">
            Registrá tu interés <ArrowUpRight size={16} />
          </a>
          <button
            className="menu-button"
            aria-label={menu ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={menu}
            aria-controls="navigation"
            onClick={() => setMenu(!menu)}
          >
            {menu ? <X /> : <Menu />}
          </button>
        </div>
      </header>
      <main id="contenido">
        <section className="hero container" id="inicio">
          <div className="hero-copy">
            <div className="eyebrow">
              <span className="tiny-line" />
              DESDE COSTA RICA. CON VISIÓN INTERNACIONAL.
            </div>
            <h1>
              Aprendé inglés. <br />
              Desarrollá <br />
              habilidades. <br />
              <span>
                Prepará tu <br />
                futuro remoto.
              </span>
            </h1>
            <p className="hero-description">{c.hero.description}</p>
            <a className="button hero-cta" href="#formulario">
              {c.hero.primary_cta.label}
              <ArrowUpRight size={19} />
            </a>
            <a className="text-link" href="#programas">
              Explorar áreas de formación <ArrowRight size={16} />
            </a>
          </div>
          <div className="hero-visual">
            <div className="photo-frame">
              <img
                src="/images/learning.jpg"
                alt="Imagen ilustrativa de una mujer estudiando con una laptop en casa"
                width="1200"
                height="1500"
                fetchPriority="high"
              />
              <div className="photo-caption">
                <span className="live-dot" /> TU PRÓXIMO CAPÍTULO EMPIEZA CON
                VOS
              </div>
            </div>
            <div className="visual-top">
              <span className="round-icon">
                <Globe2 size={22} />
              </span>
              <div>
                Talento local. <br />
                <strong>Visión global.</strong>
              </div>
              <ArrowUpRight size={24} />
            </div>
            <div className="visual-bottom">
              <span className="micro-label">
                UN CAMINO, NUEVAS POSIBILIDADES
              </span>
              <div>
                <span>01</span> Inglés <Check size={15} />
              </div>
              <div>
                <span>02</span> Habilidades profesionales <Check size={15} />
              </div>
              <div>
                <span>03</span> Clientes internacionales{" "}
                <ArrowUpRight size={16} />
              </div>
            </div>
            <span className="image-note">Fotografía ilustrativa</span>
          </div>
        </section>
        <div className="container">
          <div className="feature-strip">
            <span>
              <Languages /> Inglés desde cero
            </span>
            <span>
              <GraduationCap /> Formación práctica
            </span>
            <span>
              <Laptop /> 100% virtual y en vivo
            </span>
            <span className="from-cr">
              <span className="cr-flag" /> Desde Costa Rica
            </span>
          </div>
          <p className="hero-clarification">{c.hero.clarification}</p>
        </div>
        <section className="section container" id="programas">
          <div className="section-top">
            <div className="eyebrow">01 / TU RUTA DE APRENDIZAJE</div>
            <span className="section-side">
              Empezá donde estás. Avanzá con intención.
            </span>
          </div>
          <div className="section-heading">
            <h2>
              Tu punto de partida no define <br />
              hasta dónde <span>podés llegar.</span>
            </h2>
            <p>{c.learning_paths.description}</p>
          </div>
          <div className="paths">
            {c.learning_paths.paths.map((p, i) => (
              <article className="path" key={p.form_prefill}>
                <div className="path-top">
                  <span className="icon-box">
                    {i === 0 ? <Languages /> : <Laptop />}
                  </span>
                  <span className="micro-label">
                    {i === 0
                      ? "INGLÉS Y COMUNICACIÓN"
                      : "HABILIDADES PROFESIONALES"}
                  </span>
                  <span className="path-number">0{i + 1}</span>
                </div>
                <h3>{p.title}</h3>
                <p>{p.description}</p>
                <ul>
                  {p.details.map((d) => (
                    <li key={d}>
                      <Check size={16} />
                      {d}
                    </li>
                  ))}
                </ul>
                <a href="#formulario" onClick={() => interest(p.form_prefill)}>
                  {p.cta}
                  <ArrowUpRight size={18} />
                </a>
              </article>
            ))}
          </div>
          <p className="section-note">{c.learning_paths.note}</p>
        </section>
        <section className="specialties section">
          <div className="container">
            <div className="eyebrow">02 / ÁREAS DE FORMACIÓN</div>
            <div className="section-heading">
              <h2>
                Habilidades concretas. <br />
                <span>Posibilidades internacionales.</span>
              </h2>
              <p>
                Descubrí las áreas en las que podés desarrollar tu perfil
                profesional.
              </p>
            </div>
            <div className="specialty-grid">
              {c.career_specialties.cards.map((s, i) => {
                const Icon = icons[i];
                return (
                  <article key={s.title}>
                    <div className="specialty-top">
                      <Icon size={27} />
                      <span>0{i + 1}</span>
                    </div>
                    <span className="micro-label">{s.subtitle}</span>
                    <h3>{s.title}</h3>
                    <p>{s.description}</p>
                    <ul>
                      {s.skills.map((t) => (
                        <li key={t}>{t}</li>
                      ))}
                    </ul>
                  </article>
                );
              })}
            </div>
            <p className="section-note">{c.career_specialties.note}</p>
          </div>
        </section>
        <section className="method section" id="metodologia">
          <div className="container">
            <div className="eyebrow">03 / DE APRENDER A HACER</div>
            <div className="section-heading">
              <h2>
                Aprendé haciendo, <br />
                con acompañamiento.
              </h2>
              <p>
                Una experiencia práctica, con personas que te acompañan en cada
                paso.
              </p>
            </div>
            <div className="steps">
              {c.methodology.steps.map((s) => (
                <article key={s.number}>
                  <span className="step-num">{s.number}</span>
                  <h3>{s.title}</h3>
                  <p>{s.description}</p>
                </article>
              ))}
            </div>
            <div className="method-bottom">
              <span>
                <CalendarDays size={18} /> Clases virtuales en vivo
              </span>
              <span>
                <Users size={18} /> Interacción con instructores
              </span>
              <span>
                <Layers3 size={18} /> Ejercicios y casos aplicados
              </span>
            </div>
          </div>
        </section>
        <section className="section container opportunities" id="oportunidades">
          <div className="connection-art" aria-hidden="true">
            <div className="orbit orbit-one" />
            <div className="orbit orbit-two" />
            <Globe2 size={142} strokeWidth={0.6} />
            <span className="connection-label label-cr">
              <span className="live-dot" /> COSTA RICA
            </span>
            <span className="connection-label label-us">
              CLIENTES INTERNACIONALES <ArrowUpRight size={15} />
            </span>
            <span className="connection-center">
              Tu preparación <br />
              <strong>abre posibilidades.</strong>
            </span>
          </div>
          <div>
            <div className="eyebrow">04 / UNA CONEXIÓN CON EL MUNDO REAL</div>
            <h2>
              El aprendizaje es el inicio. <br />
              <span>Tu preparación, el puente.</span>
            </h2>
            <p>{c.agency_connection.description}</p>
            <ul className="check-list">
              {c.agency_connection.highlights.map((h) => (
                <li key={h}>
                  <Check size={18} />
                  {h}
                </li>
              ))}
            </ul>
            <p className="disclaimer">{c.agency_connection.disclaimer}</p>
          </div>
        </section>
        <section className="container investment">
          <div>
            <div className="eyebrow">INVERTÍ EN TU PREPARACIÓN</div>
            <h2>
              Conocé la propuesta <br />
              de formación.
            </h2>
            <p>{c.investment.description}</p>
            <p className="help">{c.investment.english_note}</p>
          </div>
          <div className="price-card">
            <div className="price-top">
              <span>{c.investment.program}</span>
              <span className="pill">En evaluación</span>
            </div>
            <div className="price">
              ₡39.000 <span>/ mes</span>
            </div>
            <div className="price-details">
              <span>
                <CalendarDays size={17} /> 5 meses de formación
              </span>
              <span>Matrícula única de ₡20.000</span>
            </div>
            <a
              href="#formulario"
              className="button"
              onClick={() => interest("remote_careers")}
            >
              Registrar mi interés <ArrowUpRight size={18} />
            </a>
            <p>Propuesta de inversión sujeta a confirmación.</p>
          </div>
        </section>
        <section className="section container location">
          <MapPin size={30} />
          <div>
            <h3>{c.location.title}</h3>
            <p>{c.location.description}</p>
          </div>
          <div className="location-note">
            <span className="micro-label">PÉREZ ZELEDÓN · EN EVALUACIÓN</span>
            <p>{c.location.perez_zeledon_note}</p>
          </div>
        </section>
        <section className="section container faq" id="preguntas">
          <div>
            <div className="eyebrow">CON TODA CLARIDAD</div>
            <h2>
              Antes de dar <br />
              el primer paso.
            </h2>
            <p>Resolvamos algunas de tus preguntas.</p>
          </div>
          <div>
            {c.faq.items.map((f, i) => (
              <details key={f.question}>
                <summary>
                  <span className="faq-num">0{i + 1}</span>
                  {f.question}
                  <span className="plus">+</span>
                </summary>
                <p>{f.answer}</p>
              </details>
            ))}
          </div>
        </section>
        <section className="form-section section" id="formulario">
          <div className="container form-layout">
            <div className="form-intro">
              <div className="eyebrow">TU SIGUIENTE PASO</div>
              <h2>
                Un nuevo camino <br />
                empieza con <br />
                <span>una decisión.</span>
              </h2>
              <p>{content.lead_form.subtitle}</p>
              <p>{content.lead_form.introduction}</p>
              <div className="form-aside">
                <span className="icon-box">
                  <GraduationCap />
                </span>
                <p>
                  No necesitás tener todas las respuestas. <br />
                  <strong>Solo las ganas de empezar a aprender.</strong>
                </p>
              </div>
              <p className="help">
                El registro es de interés y no confirma una matrícula, un cupo
                ni una oferta de empleo.
              </p>
            </div>
            <LeadForm prefill={prefill} />
          </div>
        </section>
      </main>
      <footer>
        <div className="container footer-top">
          <Brand />
          <p>
            Desde Costa Rica. <br />
            <strong>Hacia lo que podés llegar a ser.</strong>
          </p>
          <a href="#inicio" className="back-top">
            Volver arriba <ArrowUpRight size={18} />
          </a>
        </div>
        <div className="container footer-bottom">
          <span>© {new Date().getFullYear()} Latino Hustlers Academy</span>
          <span>San José, Costa Rica · Formación virtual</span>
          <a href="/privacidad">Aviso de privacidad</a>
        </div>
      </footer>
    </>
  );
}
