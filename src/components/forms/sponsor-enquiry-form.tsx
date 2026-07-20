"use client";

import { useState, type FormEvent } from "react";
import { Loader2, CheckCircle2, RotateCcw } from "lucide-react";
import { sponsorEnquirySchema } from "@/lib/validations/forms";
import { TextField, TextAreaField, CheckboxField } from "@/components/ui/form-fields";
import { Button } from "@/components/ui/button";
import { trackEvent, AnalyticsEvents } from "@/lib/analytics";

const initialState = {
  companyName: "",
  contactPerson: "",
  businessEmail: "",
  phone: "",
  packageInterest: "",
  message: "",
  privacyConsent: false,
};

export function SponsorEnquiryForm() {
  const [values, setValues] = useState(initialState);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [referenceNumber, setReferenceNumber] = useState<string | null>(null);
  const [serverError, setServerError] = useState<string | null>(null);

  function update<K extends keyof typeof initialState>(key: K, value: (typeof initialState)[K]) {
    setValues((prev) => ({ ...prev, [key]: value }));
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setServerError(null);
    const parsed = sponsorEnquirySchema.safeParse(values);
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
      const res = await fetch("/api/sponsor-enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Submission failed");
      setReferenceNumber(json.referenceNumber);
      setStatus("success");
      trackEvent(AnalyticsEvents.SPONSOR_ENQUIRY, { packageInterest: values.packageInterest });
    } catch (err) {
      setStatus("error");
      setServerError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-xl border border-green/30 bg-green/5 p-8 text-center">
        <CheckCircle2 className="mx-auto mb-4 h-12 w-12 text-green" aria-hidden="true" />
        <h3 className="font-heading text-xl font-bold text-navy-dark">Enquiry Received</h3>
        <p className="mt-2 text-sm text-grey-medium">
          Thank you. Your enquiry reference is <strong>{referenceNumber}</strong>. Our partnerships team will
          follow up with a tailored proposal.
        </p>
        <Button variant="outline" size="sm" className="mt-6" onClick={() => { setValues(initialState); setStatus("idle"); }}>
          <RotateCcw className="h-4 w-4" /> Submit Another Enquiry
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="flex flex-col gap-5">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <TextField id="s-companyName" label="Company Name" required value={values.companyName} onChange={(e) => update("companyName", e.target.value)} error={errors.companyName} />
        <TextField id="s-contactPerson" label="Contact Person" required value={values.contactPerson} onChange={(e) => update("contactPerson", e.target.value)} error={errors.contactPerson} />
        <TextField id="s-businessEmail" type="email" label="Business Email" required value={values.businessEmail} onChange={(e) => update("businessEmail", e.target.value)} error={errors.businessEmail} />
        <TextField id="s-phone" type="tel" label="Phone" required value={values.phone} onChange={(e) => update("phone", e.target.value)} error={errors.phone} />
      </div>
      <TextField
        id="s-packageInterest"
        label="What Are You Interested in Sponsoring?"
        required
        placeholder="e.g. registration desk, networking area, awards"
        value={values.packageInterest}
        onChange={(e) => update("packageInterest", e.target.value)}
        error={errors.packageInterest}
      />
      <TextAreaField id="s-message" label="Message" hint="Optional" value={values.message} onChange={(e) => update("message", e.target.value)} error={errors.message} />
      <CheckboxField
        id="s-privacyConsent"
        required
        label={<>I accept the <a href="/privacy-policy" className="underline text-red">Privacy Policy</a>.</>}
        checked={values.privacyConsent}
        onChange={(e) => update("privacyConsent", e.target.checked)}
        error={errors.privacyConsent}
      />
      {serverError && <p role="alert" className="text-sm font-medium text-red">{serverError}</p>}
      <Button type="submit" disabled={status === "loading"} className="self-start">
        {status === "loading" && <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />}
        Request Proposal
      </Button>
    </form>
  );
}
