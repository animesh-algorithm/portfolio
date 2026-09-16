const emailPattern = /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/gi;
const phonePattern =
  /(?<![A-Za-z0-9])(?:\+?\d[\s().-]*){10,15}(?![A-Za-z0-9])/g;

export function redactVisitorContact(text: string) {
  return text
    .replace(emailPattern, "[visitor email redacted]")
    .replace(phonePattern, "[visitor phone redacted]");
}
