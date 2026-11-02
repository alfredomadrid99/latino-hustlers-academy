type EventName =
  | "program_interest_click"
  | "form_start"
  | "form_step_complete"
  | "form_blocked_job_only"
  | "lead_submit_success";
let adapter: ((name: EventName, data: { step?: number }) => void) | undefined;
export function configureAnalytics(provider: typeof adapter, consent: boolean) {
  adapter = consent ? provider : undefined;
}
export function track(name: EventName, data: { step?: number } = {}) {
  adapter?.(name, data);
}
