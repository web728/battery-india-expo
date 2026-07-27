"use client";

import { useCallback, useState, type FormEvent } from "react";
import { Loader2, CheckCircle2, User, Building2, MapPinned, Tags } from "lucide-react";
import { visitorRegistrationSchema } from "@/lib/validations/forms";
import { TextField, SelectField, CheckboxField, CheckboxGroupField } from "@/components/ui/form-fields";
import { Button } from "@/components/ui/button";
import { Recaptcha } from "@/components/ui/recaptcha";
import { trackEvent, AnalyticsEvents } from "@/lib/analytics";
import { countryOptions, areasOfInterestOptions } from "@/lib/content/form-options";

const initialState = {
  name: "",
  businessEmail: "",
  mobileNumber: "",
  designation: "",
  companyName: "",
  country: "India",
  companyWebsite: "",
  city: "",
  state: "",
  areasOfInterest: [] as string[],
  privacyConsent: false,
  recaptchaToken: "",
};

export function VisitorRegistrationForm() {
  const [values, setValues] = useState(initialState);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [referenceNumber, setReferenceNumber] = useState<string | null>(null);
  const [serverError, setServerError] = useState<string | null>(null);
  const [started, setStarted] = useState(false);

  function update<K extends keyof typeof initialState>(key: K, value: (typeof initialState)[K]) {
    if (!started) {
      setStarted(true);
      trackEvent(AnalyticsEvents.VISITOR_REG_START);
    }
    setValues((prev) => ({ ...prev, [key]: value }));
  }

  function toggleInterest(value: string) {
    update(
      "areasOfInterest",
      values.areasOfInterest.includes(value)
        ? values.areasOfInterest.filter((v) => v !== value)
        : [...values.areasOfInterest, value]
    );
  }

  const onRecaptchaChange = useCallback((token: string | null) => {
    setValues((prev) => ({ ...prev, recaptchaToken: token ?? "" }));
  }, []);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setServerError(null);

    const parsed = visitorRegistrationSchema.safeParse(values);
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
      const res = await fetch("/api/visitor-registration", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Submission failed");

      setReferenceNumber(json.referenceNumber);
      setStatus("success");
      trackEvent(AnalyticsEvents.VISITOR_REG_COMPLETE);
    } catch (err) {
      setStatus("error");
      setServerError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    }
  }

  const handleReset = () => {
    setValues(initialState);
    setStatus("idle");
    setReferenceNumber(null);
    setStarted(false);
  };

  // ---- CLEAN SUCCESS SCREEN ----
  if (status === "success") {
    return (
      <div className="flex flex-col items-center text-center p-8 rounded-2xl border border-navy-dark/10 bg-white shadow-sm my-6">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-600 mb-4">
          <CheckCircle2 className="h-10 w-10 text-green-600" />
        </div>
        
        <h3 className="font-heading text-2xl font-bold text-navy-dark">
          Form Submitted Successfully!
        </h3>
        
        <p className="mt-2 max-w-md text-sm text-grey-medium">
          Thank you, <span className="font-semibold text-navy-dark">{values.name}</span>. Your response has been recorded.
        </p>

        {referenceNumber && (
          <div className="mt-4 rounded-lg bg-gray-50 border border-gray-200 px-4 py-2 text-xs font-mono text-gray-600">
            Reference No: <span className="font-bold text-navy-dark">{referenceNumber}</span>
          </div>
        )}

        <p className="mt-3 text-xs text-grey-medium">
          A confirmation email has been sent to <span className="font-medium text-navy-dark">{values.businessEmail}</span>.
        </p>

        <Button onClick={handleReset} variant="outline" size="sm" className="mt-6">
          Submit Another Response
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="flex flex-col gap-8">
      {/* Section 1 — About you */}
      <section className="rounded-2xl border border-navy-dark/10 bg-white p-6 shadow-sm sm:p-8">
        <div className="mb-6 flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-red/10 text-red">
            <User className="h-4 w-4" />
          </span>
          <h3 className="font-heading text-lg font-bold text-navy-dark">Your Details</h3>
        </div>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <TextField id="v-name" label="Name" required value={values.name} onChange={(e) => update("name", e.target.value)} error={errors.name} />
          <TextField id="v-designation" label="Designation" required value={values.designation} onChange={(e) => update("designation", e.target.value)} error={errors.designation} />
          <TextField id="v-businessEmail" type="email" label="Email" required value={values.businessEmail} onChange={(e) => update("businessEmail", e.target.value)} error={errors.businessEmail} />
          <TextField id="v-mobileNumber" type="tel" label="Phone" required value={values.mobileNumber} onChange={(e) => update("mobileNumber", e.target.value)} error={errors.mobileNumber} />
        </div>
      </section>

      {/* Section 2 — Company & location */}
      <section className="rounded-2xl border border-navy-dark/10 bg-white p-6 shadow-sm sm:p-8">
        <div className="mb-6 flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-red/10 text-red">
            <Building2 className="h-4 w-4" />
          </span>
          <h3 className="font-heading text-lg font-bold text-navy-dark">Company</h3>
        </div>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <TextField id="v-companyName" label="Company" required value={values.companyName} onChange={(e) => update("companyName", e.target.value)} error={errors.companyName} />
          <TextField id="v-companyWebsite" type="url" label="Website URL" hint="Optional" value={values.companyWebsite} onChange={(e) => update("companyWebsite", e.target.value)} error={errors.companyWebsite} />
        </div>
        <div className="mt-5 flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-red/10 text-red">
            <MapPinned className="h-4 w-4" />
          </span>
          <h4 className="font-heading text-sm font-bold uppercase tracking-wide text-navy-dark/70">Location</h4>
        </div>
        <div className="mt-4 grid grid-cols-1 gap-5 sm:grid-cols-3">
          <SelectField id="v-country" label="Country" hint="Optional" value={values.country} onChange={(e) => update("country", e.target.value)} error={errors.country} options={countryOptions.map((c) => ({ label: c, value: c }))} />
          <TextField id="v-state" label="State" hint="Optional" value={values.state} onChange={(e) => update("state", e.target.value)} error={errors.state} />
          <TextField id="v-city" label="City" hint="Optional" value={values.city} onChange={(e) => update("city", e.target.value)} error={errors.city} />
        </div>
      </section>

      {/* Section 3 — Interests */}
      <section className="rounded-2xl border border-navy-dark/10 bg-white p-6 shadow-sm sm:p-8">
        <div className="mb-6 flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-red/10 text-red">
            <Tags className="h-4 w-4" />
          </span>
          <h3 className="font-heading text-lg font-bold text-navy-dark">Areas of Interest</h3>
          <span className="text-xs text-grey-medium">Optional</span>
        </div>
        <CheckboxGroupField
          legend=""
          options={areasOfInterestOptions}
          values={values.areasOfInterest}
          onToggle={toggleInterest}
          error={errors.areasOfInterest}
        />
      </section>

      <div className="flex flex-col gap-4">
        <CheckboxField
          id="v-privacyConsent"
          required
          label={<>I accept the <a href="/privacy-policy" className="underline text-red">Privacy Policy</a> and consent to my data being processed for registration.</>}
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

        <Button type="submit" disabled={status === "loading"} size="lg" className="self-start">
          {status === "loading" && <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />}
          Complete Registration
        </Button>
      </div>
    </form>
  );
}