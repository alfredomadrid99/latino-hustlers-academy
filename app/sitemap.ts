import type { MetadataRoute } from "next";
export default function sitemap(): MetadataRoute.Sitemap {
  return ["", "/ingles", "/carreras-remotas", "/privacidad"].map((path) => ({
    url: `https://latino-hustlers-academy.a-es-madrid99.chatgpt.site${path}`,
  }));
}
