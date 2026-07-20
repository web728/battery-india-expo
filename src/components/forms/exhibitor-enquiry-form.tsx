"use client";

import { useCallback, useState, type FormEvent } from "react";
import { Loader2, CheckCircle2, RotateCcw, User, Building2 } from "lucide-react";
import { exhibitorEnquirySchema } from "@/lib/validations/forms";
import { TextField, TextAreaField, CheckboxField } from "@/components/ui/form-fields";
import { Button } from "@/components/ui/button";
import { Recaptcha } from "@/components/ui/recaptcha";
import { trackEvent, AnalyticsEvents } from "@/lib/analytics";

const initialState = {
  fullName: "",
  companyName: "",
  designation: "",
  businessEmail: "",
  phone: "",
  country: "",
  city: "",
  companyWebsite: "",
  sponsorshipInterest: false,
  message: "",
  privacyConsent: false,
  marketingConsent: false,
  recaptchaToken: "",
};

export function ExhibitorEnquiryForm() {
  const [values, setValues] = useState(initialState);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [referenceNumber, setReferenceNumber] = useState<string | null>(null);
  const [serverError, setServerError] = useState<string | null>(null);

  function update<K extends keyof typeof initialState>(key: K, value: (typeof initialState)[K]) {
    setValues((prev) => ({ ...prev, [key]: value }));
  }

  const onRecaptchaChange = useCallback((token: string | null) => {
    setValues((prev) => ({ ...prev, recaptchaToken: token ?? "" }));
  }, []);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setServerError(null);

    const parsed = exhibitorEnquirySchema.safeParse(values);
    if (!parsed.success) {
      const fieldErrors: Record<string, string> = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0] as string;
        if (!fieldErrors[key]) fieldErrors[key] = issue.message;
      }
      setErrors(fieldErrors);
      return;
    }
    setErrors({});
    setStatus("loading");

    try {
      const res = await fetch("/api/exhibitor-enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Submission failed");

      setReferenceNumber(json.referenceNumber);
      setStatus("success");
      trackEvent(AnalyticsEvents.EXHIBITOR_ENQUIRY_SUBMIT);
    } catch (err) {
      setStatus("error");
      setServerError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-2xl border border-green/30 bg-green/5 p-10 text-center shadow-sm">
        <CheckCircle2 className="mx-auto mb-4 h-12 w-12 text-green" aria-hidden="true" />
        <h3 className="font-heading text-xl font-bold text-navy-dark">Enquiry Received</h3>
        <p className="mt-2 text-sm text-grey-medium">
          Thank you. Your enquiry reference is <strong>{referenceNumber}</strong>. Our exhibitor sales team
          will contact you shortly with stand options and rates.
        </p>
        <Button
          variant="outline"
          size="sm"
          className="mt-6"
          onClick={() => {
            setValues(initialState);
            setStatus("idle");
          }}
        >
          <RotateCcw className="h-4 w-4" /> Submit Another Enquiry
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="flex flex-col gap-6">
      {/* Section 1 — About you */}
      <section className="rounded-2xl border border-navy-dark/10 bg-white p-6 shadow-sm sm:p-8">
        <div className="mb-6 flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-red/10 text-red">
            <User className="h-4 w-4" />
          </span>
          <h3 className="font-heading text-lg font-bold text-navy-dark">Your Details</h3>
        </div>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <TextField id="fullName" label="Full Name" required value={values.fullName} onChange={(e) => update("fullName", e.target.value)} error={errors.fullName} />
          <TextField id="designation" label="Designation" required value={values.designation} onChange={(e) => update("designation", e.target.value)} error={errors.designation} />
          <TextField id="businessEmail" type="email" label="Email" required value={values.businessEmail} onChange={(e) => update("businessEmail", e.target.value)} error={errors.businessEmail} />
          <TextField id="phone" type="tel" label="Phone" required value={values.phone} onChange={(e) => update("phone", e.target.value)} error={errors.phone} />
        </div>
      </section>

      {/* Section 2 — Company */}
      <section className="rounded-2xl border border-navy-dark/10 bg-white p-6 shadow-sm sm:p-8">
        <div className="mb-6 flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-red/10 text-red">
            <Building2 className="h-4 w-4" />
          </span>
          <h3 className="font-heading text-lg font-bold text-navy-dark">Company</h3>
        </div>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <TextField id="companyName" label="Company Name" required value={values.companyName} onChange={(e) => update("companyName", e.target.value)} error={errors.companyName} />
          <TextField id="companyWebsite" type="url" label="Website URL" hint="Optional" value={values.companyWebsite} onChange={(e) => update("companyWebsite", e.target.value)} error={errors.companyWebsite} />
          <TextField id="country" label="Country" required value={values.country} onChange={(e) => update("country", e.target.value)} error={errors.country} />
          <TextField id="city" label="City" required value={values.city} onChange={(e) => update("city", e.target.value)} error={errors.city} />
        </div>
      </section>

      <TextAreaField id="message" label="Message" hint="Optional" value={values.message} onChange={(e) => update("message", e.target.value)} error={errors.message} />

      <div className="flex flex-col gap-4">
        <CheckboxField
          id="sponsorshipInterest"
          label="I am also interested in sponsorship opportunities"
          checked={values.sponsorshipInterest}
          onChange={(e) => update("sponsorshipInterest", e.target.checked)}
        />
        <CheckboxField
          id="marketingConsent"
          label="I agree to receive marketing communications about the event"
          checked={values.marketingConsent}
          onChange={(e) => update("marketingConsent", e.target.checked)}
        />
        <CheckboxField
          id="privacyConsent"
          required
          label={<>I accept the <a href="/privacy-policy" className="underline text-red">Privacy Policy</a> and consent to my data being processed for this enquiry.</>}
          checked={values.privacyConsent}
          onChange={(e) => update("privacyConsent", e.target.checked)}
          error={errors.privacyConsent}
        />

        <Recaptcha onChange={onRecaptchaChange} error={errors.recaptchaToken} />

        {serverError && (
          <p role="alert" className="text-sm font-medium text-red">
            {serverError}
          </p>
        )}

        <Button type="submit" disabled={status === "loading"} className="self-start">
          {status === "loading" && <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />}
          Submit Exhibitor Enquiry
        </Button>
      </div>
    </form>
  );
}