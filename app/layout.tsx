import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Latino Hustlers Academy | Inglés y habilidades remotas",
  description:
    "Aprendé inglés y desarrollá habilidades profesionales desde Costa Rica. Formación virtual en vivo y acompañamiento para tu futuro remoto.",
  openGraph: {
    title: "Latino Hustlers Academy",
    description: "Desde Costa Rica. Con visión internacional.",
    locale: "es_CR",
    type: "website",
    images: [
      {
        url: "/images/learning.jpg",
        alt: "Formación virtual en Latino Hustlers Academy",
      },
    ],
  },
  icons: {
    icon: "/images/latino-hustlers-logo.png",
    shortcut: "/images/latino-hustlers-logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es-CR">
      <body className="antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "EducationalOrganization",
              name: "Latino Hustlers Academy",
              areaServed: "Costa Rica",
              address: {
                "@type": "PostalAddress",
                addressLocality: "San José",
                addressCountry: "CR",
              },
            }),
          }}
        />
        {children}
      </body>
    </html>
  );
}
