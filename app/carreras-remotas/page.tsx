import { SalesLanding } from "../../components/sales-landing";
import spec from "../../lib/sales-copy.json";
export const metadata = {
  ...spec.careers_page.seo,
  openGraph: { ...spec.careers_page.seo, locale: "es_CR" },
};
export default function Careers() {
  return <SalesLanding program="remote_careers" />;
}
