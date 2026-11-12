/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowUpRight,
  BriefcaseBusiness,
  CalendarCheck,
  ClipboardList,
  Globe2,
  Laptop,
  Menu,
  MessagesSquare,
  Search,
  UsersRound,
  X,
} from "lucide-react";
import copy from "../lib/sales-copy.json";
import spec from "../lib/programs.json";
import { getOffer, launchOffer, regularPrice } from "../lib/offer";
import { track } from "../lib/analytics";
import type { Program } from "../lib/validation";
import { Brand, Footer } from "./program-landing";
import { LeadForm } from "./lead-form";
import { OfferCountdown } from "./offer-countdown";

const englishIcons = [MessagesSquare, BriefcaseBusiness, Globe2];
const careersIcons = [ClipboardList, CalendarCheck, UsersRound];

function ProgramVideo({ src, label }: { src: string | null; label: string }) {
  if (!src) return null;

  return (
    <video
      className="sales-video"
      src={src}
      aria-label={label}
      controls
      playsInline
      preload="none"
    />
  );
}

export function SalesLanding({
  program,
  offer = getOffer(),
}: {
  program: Program;
  offer?: ReturnType<typeof getOffer>;
}) {
  const english = program === "english";
  const page = english ? copy.english_page : copy.careers_page;
  const form = english ? spec.forms.english : spec.forms.careers;
  const crossLink = (english ? spec.english_landing : spec.careers_landing)
    .header.cross_link;
  const { mentor, upwork } = copy.careers_page;
  const { modality } = copy.english_page;
  const resultIcons = english ? englishIcons : careersIcons;
  const [menu, setMenu] = useState(false);

  useEffect(() => {
    track("landing_view", { program_type: program, form_id: form.id });
  }, [program, form.id]);

  const action = (label: string) => (
    <a className="button" href={`#${form.anchor}`}>
      {label} <ArrowUpRight size={18} aria-hidden="true" />
    </a>
  );

  return (
    <>
      <a className="skip" href="#contenido">
        Saltar al contenido
      </a>
      {!offer.closed && (
        <aside className="offer-banner" aria-label="Oferta de lanzamiento">
          <div className="offer-banner-summary">
            <strong>{launchOffer.title}</strong>
            <span>
              <span className="sr-only">Precio regular </span>
              <s>
                {regularPrice.monthly}/mes + {regularPrice.enrollment} matrícula
              </s>
              <span className="sr-only"> Precio promocional </span>
              <b>
                {launchOffer.monthly}/mes + {launchOffer.enrollment} matrícula
              </b>
            </span>
          </div>
          <OfferCountdown />
          <a href={`#${form.anchor}`}>
            Registrá tu interés <ArrowUpRight size={15} aria-hidden="true" />
          </a>
          <p>
            El reloj es una guía para registrarte. El cupo se confirma con la
            matrícula.
          </p>
        </aside>
      )}
      <header className="sales-header">
        <div className="container nav">
          <Brand lockup />
          <nav
            id="program-navigation"
            className={menu ? "opened" : ""}
            aria-label="Navegación principal"
          >
            <a
              href={english ? "#modalidad" : "#mentor"}
              onClick={() => setMenu(false)}
            >
              {english ? "Modalidad" : "Tu coach"}
            </a>
            <a href="#inversion" onClick={() => setMenu(false)}>
              {offer.closed ? "Precio" : "Oferta"}
            </a>
            <a href="#preguntas" onClick={() => setMenu(false)}>
              Preguntas frecuentes
            </a>
          </nav>
          <a className="button nav-cta" href={`#${form.anchor}`}>
            Registrá tu interés
          </a>
          <button
            type="button"
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
      <main id="contenido" className="sales-landing">
        <section
          className={`container hero program-hero ${english ? "english-hero" : "careers-hero"}`}
        >
          <div>
            <div className="eyebrow">{page.hero.eyebrow}</div>
            <h1>{page.hero.headline.replace("EE. UU.", "EE.\u00a0UU.")}</h1>
            <p className="hero-description">{page.hero.description}</p>
            <div className="sales-hero-actions">
              {action(page.hero.primary_cta)}
              <a
                className="text-link"
                href={english ? "#inversion" : "#mentor"}
              >
                {english && offer.closed
                  ? "Ver información de matrícula"
                  : page.hero.secondary_cta}
              </a>
            </div>
            {!english && !offer.closed && (
              <a className="text-link sales-offer-link" href="#inversion">
                Ver la oferta de los primeros 50
              </a>
            )}
          </div>
          <figure className="sales-hero-photo">
            <img
              src={
                english
                  ? "/images/hero-ingles.webp"
                  : "/images/hero-carreras-playa.webp"
              }
              alt={
                english
                  ? "Persona practicando inglés en una videollamada"
                  : "Un trabajador en un call center y una profesional con su laptop frente al mar en Costa Rica"
              }
              width={1120}
              height={840}
              fetchPriority="high"
            />
            {english ? (
              <figcaption>Imagen ilustrativa</figcaption>
            ) : (
              <figcaption className="careers-photo-caption">
                <span className="careers-photo-label">
                  <BriefcaseBusiness aria-hidden="true" size={18} />
                  <span>Vos en un trabajo mal pagado</span>
                </span>
                <span className="careers-photo-versus">vs.</span>
                <span className="careers-photo-label careers-photo-label-remote">
                  <Globe2 aria-hidden="true" size={18} />
                  <span>Vos trabajando desde donde querás</span>
                </span>
              </figcaption>
            )}
          </figure>
        </section>

        {!english && (
          <section className="sales-cream" id="mentor">
            <div className="container section mentor-section">
              <div>
                <div className="eyebrow">{mentor.eyebrow}</div>
                <h2>{mentor.name}</h2>
                <p>{mentor.description}</p>
                {mentor.portrait && (
                  <img
                    className="mentor-portrait"
                    src={mentor.portrait}
                    alt={mentor.name}
                    width={560}
                    height={694}
                    loading="lazy"
                  />
                )}
                {mentor.profile && (
                  <a className="text-link" href={mentor.profile}>
                    Ver su perfil en Upwork
                  </a>
                )}
              </div>
              <div>
                <h3>{mentor.headline}</h3>
                <dl className="mentor-record">
                  {mentor.proof.map(({ value, label }) => (
                    <div key={value}>
                      <dt>{label}</dt>
                      <dd>{value}</dd>
                    </div>
                  ))}
                </dl>
                <p className="section-note">{mentor.context}</p>
                <figure className="mentor-upwork">
                  <a
                    href={mentor.upwork_screenshot}
                    aria-label="Ver captura completa del perfil de Alberto en Upwork"
                  >
                    <img
                      src={mentor.upwork_screenshot}
                      alt="Perfil de Alberto en Upwork con US$100.000 o más en ingresos, 37 trabajos, 8.242 horas, 100% Job Success y la distinción Top Rated Plus."
                      width={794}
                      height={306}
                      loading="lazy"
                    />
                  </a>
                  <figcaption>
                    Captura del perfil de Alberto en Upwork. Seleccioná la
                    imagen para verla a tamaño completo.
                  </figcaption>
                </figure>
              </div>
            </div>
          </section>
        )}

        <section className="sales-offer" id="inversion">
          <div className="container section sales-offer-grid">
            <div>
              <p className="eyebrow">
                {english ? "CURSO DE INGLÉS" : "CARRERAS REMOTAS"}
              </p>
              <h2>{offer.title}</h2>
              <p>{offer.note}</p>
              {!offer.closed && (
                <p className="offer-shared">
                  Los 50 cupos se comparten entre Inglés y Carreras Remotas.
                </p>
              )}
            </div>
            <div className="sales-price">
              {offer.price && (
                <>
                  {!offer.closed && (
                    <p className="sales-regular-price">
                      Precio regular{" "}
                      <s>
                        {regularPrice.monthly} al mes +{" "}
                        {regularPrice.enrollment} de matrícula
                      </s>
                    </p>
                  )}
                  <p>
                    <strong>{offer.price.monthly}</strong> al mes
                    {!offer.closed && " durante todo el curso"}
                  </p>
                  <p>
                    <b>{offer.price.enrollment}</b> de matrícula única
                  </p>
                </>
              )}
              {action(offer.cta)}
            </div>
          </div>
        </section>

        <section className="sales-cream" id="resultados">
          <div className="container section">
            <h2>{page.results.headline}</h2>
            {!english && (
              <p className="program-copy">
                {copy.careers_page.results.description}
              </p>
            )}
            <div className="career-paths">
              {page.results.items.map(({ title, description }, i) => {
                const Icon = resultIcons[i];
                return (
                  <article className="sales-result" key={title}>
                    <span className="sales-result-icon">
                      <Icon size={30} strokeWidth={1.7} aria-hidden="true" />
                    </span>
                    <h3>{title}</h3>
                    <p>{description}</p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {english ? (
          <section
            className="container section sales-agency sales-illustrated"
            id="modalidad"
          >
            <div>
              <h2>{modality.headline}</h2>
              <p className="program-copy">{modality.description}</p>
              <ProgramVideo
                src={modality.video}
                label="Modalidad del curso de inglés"
              />
              <div className="section-action">{action(modality.cta)}</div>
            </div>
            <div className="sales-illustration" aria-hidden="true">
              <Laptop size={112} strokeWidth={1.15} />
              <MessagesSquare size={48} strokeWidth={1.5} />
            </div>
          </section>
        ) : (
          <section
            className="container section sales-agency sales-illustrated"
            id="upwork"
          >
            <div>
              <h2>{upwork.headline}</h2>
              <p className="program-copy">{upwork.description}</p>
              <p className="program-copy">{upwork.supporting_line}</p>
              <div className="section-action">{action(upwork.cta)}</div>
            </div>
            <div className="sales-illustration" aria-hidden="true">
              <Globe2 size={112} strokeWidth={1.15} />
              <Search size={48} strokeWidth={1.5} />
            </div>
          </section>
        )}

        <section className="sales-cream" id="preguntas">
          <div className="container section faq">
            <div>
              {!english && (
                <ProgramVideo
                  src={copy.careers_page.video}
                  label="Formación en carreras remotas"
                />
              )}
              <div className="eyebrow">RESOLVÉ TUS DUDAS</div>
              <h2>Preguntas frecuentes</h2>
            </div>
            <div>
              {page.faq.map(([question, answer]) => (
                <details key={question}>
                  <summary>
                    {question}
                    <span className="plus" aria-hidden="true">
                      +
                    </span>
                  </summary>
                  <p>{answer}</p>
                </details>
              ))}
              <details>
                <summary>
                  ¿Cuál es el precio del programa?
                  <span className="plus" aria-hidden="true">
                    +
                  </span>
                </summary>
                <p>
                  Consultá las condiciones de matrícula en el{" "}
                  <a className="text-link" href="#inversion">
                    bloque de precios
                  </a>
                  .
                </p>
              </details>
            </div>
          </div>
        </section>

        <section className="form-section section" id={form.anchor}>
          <div className="container form-layout">
            <div className="form-intro">
              <h2>{page.final.headline}</h2>
              <p>{page.final.description}</p>
              <a className="button" href={`#${form.anchor}-campos`}>
                {page.final.button}
                <ArrowUpRight size={18} aria-hidden="true" />
              </a>
              <div className="eyebrow form-original-title">{form.title}</div>
              <h3>{form.headline}</h3>
              {(Array.isArray(form.introduction)
                ? form.introduction
                : [form.introduction]
              ).map((t) => (
                <p key={t}>{t}</p>
              ))}
              <Link className="text-link" href={crossLink.href}>
                {crossLink.label}
              </Link>
            </div>
            <div className="sales-form-panel" id={`${form.anchor}-campos`}>
              <p className="sales-form-note">
                {offer.closed ? offer.title : launchOffer.formNote}
              </p>
              <LeadForm key={program} program={program} />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
