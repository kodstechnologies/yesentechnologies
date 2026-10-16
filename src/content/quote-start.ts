/** Prefilled context must never skip the service-confirmation step. */
export function quoteStart<T extends { service?: string }>(initial: T) {
  return { step: 0, service: initial.service ?? null };
}