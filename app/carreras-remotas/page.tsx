import { ProgramLanding } from "../../components/program-landing";
import spec from "../../lib/programs.json";
export const metadata = {
  ...spec.careers_landing.seo,
  openGraph: { ...spec.careers_landing.seo, locale: "es_CR" },
};
export default function Careers() {
  return <ProgramLanding program="remote_careers" />;
}
