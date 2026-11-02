export type EventName =
  | "landing_view"
  | "form_start"
  | "form_submit_success"
  | "form_blocked_job_only";
type Properties = {
  program_type: "english" | "remote_careers";
  form_id: string;
};
let adapter: ((name: EventName, data: Properties) => void) | undefined;
export function configureAnalytics(provider: typeof adapter, consent: boolean) {
  adapter = consent ? provider : undefined;
}
export function track(name: EventName, data: Properties) {
  adapter?.(name, data);
}
