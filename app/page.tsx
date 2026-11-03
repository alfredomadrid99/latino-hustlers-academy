import Link from "next/link";
import copy from "../lib/sales-copy.json";
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
        <div className="eyebrow">{copy.home_page.eyebrow}</div>
        <h1>{copy.home_page.headline}</h1>
        <p>{copy.home_page.description}</p>
        <div className="paths">
          {copy.home_page.options.map((option, index) => (
            <Link className="path" href={option.href} key={option.href}>
              {index === 0 ? <Languages size={32} /> : <Laptop size={32} />}
              <h2>{option.title}</h2>
              <p className="sales-closing">{option.hook}</p>
              <p>{option.description}</p>
              <span className="text-link">
                {option.cta}
                <ArrowUpRight size={18} />
              </span>
            </Link>
          ))}
        </div>
        <p className="section-note">{copy.home_page.location_line}</p>
      </main>{" "}
      <Footer />
    </>
  );
}
