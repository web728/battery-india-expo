"use client";

import { useCallback, useState, type FormEvent } from "react";
import { Loader2, CheckCircle2, RotateCcw, MessageSquare } from "lucide-react";
import { contactFormSchema } from "@/lib/validations/forms";
import { TextField, SelectField, TextAreaField, CheckboxField } from "@/components/ui/form-fields";
import { Button } from "@/components/ui/button";
import { Recaptcha } from "@/components/ui/recaptcha";
import { departmentOptions } from "@/lib/content/form-options";

const initialState = {
  name: "",
  email: "",
  phone: "",
  company: "",
  department: "General Enquiry" as (typeof departmentOptions)[number],
  message: "",
  privacyConsent: false,
  recaptchaToken: "",
};

export function ContactForm({ defaultDepartment }: { defaultDepartment?: string }) {
  const [values, setValues] = useState({
    ...initialState,
    department: (defaultDepartment as (typeof departmentOptions)[number]) ?? initialState.department,
  });
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
    const parsed = contactFormSchema.safeParse(values);
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
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Submission failed");
      setReferenceNumber(json.referenceNumber);
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setServerError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-2xl border border-green/30 bg-green/5 p-10 text-center shadow-sm">
        <CheckCircle2 className="mx-auto mb-4 h-12 w-12 text-green" aria-hidden="true" />
        <h3 className="font-heading text-xl font-bold text-navy-dark">Message Sent</h3>
        <p className="mt-2 text-sm text-grey-medium">
          Thank you. Your reference is <strong>{referenceNumber}</strong>. We will respond as soon as possible.
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
          <RotateCcw className="h-4 w-4" /> Send Another Message
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="flex flex-col gap-6">
      <div className="rounded-2xl border border-navy-dark/10 bg-white p-6 shadow-sm sm:p-8">
        <div className="mb-6 flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-red/10 text-red">
            <MessageSquare className="h-4 w-4" />
          </span>
          <h3 className="font-heading text-lg font-bold text-navy-dark">Get in Touch</h3>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <TextField id="c-name" label="Name" required value={values.name} onChange={(e) => update("name", e.target.value)} error={errors.name} />
          <TextField id="c-email" type="email" label="Email" required value={values.email} onChange={(e) => update("email", e.target.value)} error={errors.email} />
          <TextField id="c-phone" type="tel" label="Phone" hint="Optional" value={values.phone} onChange={(e) => update("phone", e.target.value)} error={errors.phone} />
          <TextField id="c-company" label="Company" hint="Optional" value={values.company} onChange={(e) => update("company", e.target.value)} error={errors.company} />
        </div>

        <div className="mt-5">
          <SelectField
            id="c-department"
            label="Interest"
            required
            value={values.department}
            onChange={(e) => update("department", e.target.value as (typeof initialState)["department"])}
            error={errors.department}
            options={departmentOptions.map((d) => ({ label: d, value: d }))}
          />
        </div>

        <div className="mt-5">
          <TextAreaField id="c-message" label="Message" required value={values.message} onChange={(e) => update("message", e.target.value)} error={errors.message} />
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <CheckboxField
          id="c-privacyConsent"
          required
          label={<>I accept the <a href="/privacy-policy" className="underline text-red">Privacy Policy</a>.</>}
          checked={values.privacyConsent}
          onChange={(e) => update("privacyConsent", e.target.checked)}
          error={errors.privacyConsent}
        />

        <Recaptcha onChange={onRecaptchaChange} error={errors.recaptchaToken} />

        {serverError && <p role="alert" className="text-sm font-medium text-red">{serverError}</p>}

        <Button type="submit" disabled={status === "loading"} className="self-start">
          {status === "loading" && <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />}
          Send Message
        </Button>
      </div>
    </form>
  );
}