import Link from "next/link";
import { Brand, Footer } from "../components/program-landing";
import { ArrowUpRight, Languages, Laptop } from "lucide-react";
export const metadata = {
  title: "Elegí tu formación | Latino Hustlers Academy",
  description:
    "Conocé nuestros programas independientes de inglés y formación en carreras remotas.",
};
export default function Home() {
  return (
    <>
      <header>
        <div className="container nav">
          <Brand />
          <span>Desde Costa Rica. Con visión internacional.</span>
        </div>
      </header>
      <main className="container section chooser">
        <div className="eyebrow">TU SIGUIENTE CAPÍTULO</div>
        <h1>
          Elegí lo que querés
          <br /> <span>desarrollar.</span>
        </h1>
        <p>Dos programas. Un punto de partida: tus ganas de aprender.</p>
        <div className="paths">
          <Link className="path" href="/ingles">
            <Languages size={32} />
            <h2>Aprender inglés</h2>
            <p>
              Desde principiante hasta avanzado. Clases virtuales y en vivo para
              desarrollar tu comunicación.
            </p>
            <span className="text-link">
              Conocé el programa <ArrowUpRight size={18} />
            </span>
          </Link>
          <Link className="path" href="/carreras-remotas">
            <Laptop size={32} />
            <h2>Formación en carreras remotas</h2>
            <p>
              Desarrollá habilidades profesionales y preparate para ofrecer
              servicios a clientes internacionales.
            </p>
            <span className="text-link">
              Explorá tu siguiente etapa <ArrowUpRight size={18} />
            </span>
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
