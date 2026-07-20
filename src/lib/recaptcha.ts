// Verifies a reCAPTCHA v2 token against Google's siteverify endpoint.
// If RECAPTCHA_SECRET_KEY isn't set (local dev before you've configured it),
// verification is skipped so the form still works — same fallback pattern
// used for Mongo/Resend elsewhere in this project.
export async function verifyRecaptcha(token: string | null | undefined): Promise<boolean> {
  const secret = process.env.RECAPTCHA_SECRET_KEY;

  if (!secret) {
    console.info("[recaptcha] RECAPTCHA_SECRET_KEY not configured — skipping verification");
    return true;
  }

  if (!token) return false;

  try {
    const res = await fetch("https://www.google.com/recaptcha/api/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ secret, response: token }),
    });
    const data = await res.json();
    return !!data.success;
  } catch (error) {
    console.error("[recaptcha] verification request failed", error);
    return false;
  }
}