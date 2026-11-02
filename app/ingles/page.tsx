import { ProgramLanding } from "../../components/program-landing";
import spec from "../../lib/programs.json";
export const metadata = {
  ...spec.english_landing.seo,
  openGraph: { ...spec.english_landing.seo, locale: "es_CR" },
};
export default function English() {
  return <ProgramLanding program="english" />;
}
