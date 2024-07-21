export function validateEmail(email: string): boolean {
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  return regex.test(email);
}

export function validateDuplicity(email: string, emails: string[]): boolean {
  return emails.some((mail) => mail.toLowerCase() === email.toLowerCase());
}
