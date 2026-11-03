/* eslint-disable @next/next/no-img-element */
"use client";

import Link from "next/link";

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
