/* eslint-disable @next/next/no-img-element */
"use client";

import Link from "next/link";

export function Brand({ lockup = false }: { lockup?: boolean }) {
  return (
    <Link
      href="/"
      className={lockup ? "brand brand-lockup" : "brand"}
      aria-label="Latino Hustlers Academy, inicio"
    >
      <img
        className="brand-logo"
        src="/images/latino-hustlers-logo.png"
        alt={lockup ? "" : "Latino Hustlers Academy"}
        width={1254}
        height={1254}
      />
      {lockup && (
        <span className="brand-name">
          Latino Hustlers<small>Academy</small>
        </span>
      )}
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
