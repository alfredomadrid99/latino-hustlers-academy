import { SalesLanding } from "../../components/sales-landing";
import spec from "../../lib/sales-copy.json";
export const metadata = {
  ...spec.english_page.seo,
  openGraph: { ...spec.english_page.seo, locale: "es_CR" },
};
export default function English() {
  return <SalesLanding program="english" />;
}
