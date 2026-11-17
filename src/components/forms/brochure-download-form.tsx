
"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type FormEvent,
} from "react";

import Link from "next/link";

import {
  CheckCircle2,
  Download,
  FileDown,
  Loader2,
  RotateCcw,
  ShieldCheck,
} from "lucide-react";

import {
  TextField,
  SelectField,
  CheckboxField,
} from "@/components/ui/form-fields";

import { Recaptcha } from "@/components/ui/recaptcha";
import { countryOptions } from "@/lib/content/form-options";

import {
  brochureDownloadSchema,
  type BrochureDownloadValues,
} from "@/lib/validations/brochure";

/* ==================================================
   BROCHURE DOWNLOAD FORM

   - Zod validation
   - reCAPTCHA
   - MongoDB / Sheets / email via API
   - Actual PDF download on API success
   - Duplicate submission protection
   - Download-again option
================================================== */

type Status = "idle" | "loading" | "success" | "error";

const FILE_NAME =
  "India-Battery-International-Show-2027-Brochure.pdf";

function initialValues(): BrochureDownloadValues {
  return {
    name: "",
    companyName: "",
    designation: "",
    businessEmail: "",
    mobileNumber: "",
    country: "India",
    privacyConsent: false,
    recaptchaToken: "",
  };
}

export function BrochureDownloadForm() {
  const [values, setValues] =
    useState<BrochureDownloadValues>(initialValues);

  const [errors, setErrors] =
    useState<Record<string, string>>({});

  const [status, setStatus] =
    useState<Status>("idle");

  const [serverError, setServerError] =
    useState<string | null>(null);

  const [downloadUrl, setDownloadUrl] =
    useState<string | null>(null);

  const [referenceNumber, setReferenceNumber] =
    useState<string | null>(null);

  const [recaptchaKey, setRecaptchaKey] =
    useState(0);

  const submittingRef = useRef(false);
  const downloadUrlRef = useRef<string | null>(null);

  /* CLEAN UP GENERATED DOWNLOAD URL */

  useEffect(() => {
    return () => {
      if (downloadUrlRef.current) {
        URL.revokeObjectURL(downloadUrlRef.current);
      }
    };
  }, []);

  function update<K extends keyof BrochureDownloadValues>(
    field: K,
    value: BrochureDownloadValues[K]
  ) {
    setValues((previous) => ({
      ...previous,
      [field]: value,
    }));

    setErrors((previous) => {
      if (!previous[field]) return previous;

      const next = { ...previous };
      delete next[field];
      return next;
    });

    setServerError(null);

    if (status === "error") {
      setStatus("idle");
    }
  }

  const handleCaptcha = useCallback(
    (token: string | null) => {
      setValues((previous) => ({
        ...previous,
        recaptchaToken: token ?? "",
      }));

      setErrors((previous) => {
        if (!previous.recaptchaToken) {
          return previous;
        }

        const next = { ...previous };
        delete next.recaptchaToken;
        return next;
      });
    },
    []
  );

  function triggerDownload(url: string) {
    const anchor = document.createElement("a");

    anchor.href = url;
    anchor.download = FILE_NAME;

    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
  }

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    if (
      submittingRef.current ||
      status === "success"
    ) {
      return;
    }

    setServerError(null);

    const parsed =
      brochureDownloadSchema.safeParse(values);

    if (!parsed.success) {
      const nextErrors: Record<string, string> = {};

      for (const issue of parsed.error.issues) {
        const field = String(issue.path[0] ?? "");

        if (field && !nextErrors[field]) {
          nextErrors[field] = issue.message;
        }
      }

      setErrors(nextErrors);
      setStatus("idle");
      return;
    }

    submittingRef.current = true;

    setErrors({});
    setStatus("loading");

    try {
      const response = await fetch(
        "/api/brochure-download",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(parsed.data),
        }
      );

      if (!response.ok) {
        const result = await response
          .json()
          .catch(() => null);

        throw new Error(
          typeof result?.error === "string"
            ? result.error
            : "Unable to process the brochure request."
        );
      }

      const contentType =
        response.headers.get("content-type") ?? "";

      if (!contentType.includes("application/pdf")) {
        throw new Error(
          "Unexpected download response. Please try again."
        );
      }

      const file = await response.blob();

      if (file.size === 0) {
        throw new Error("The brochure file is empty.");
      }

      const objectUrl = URL.createObjectURL(file);

      if (downloadUrlRef.current) {
        URL.revokeObjectURL(downloadUrlRef.current);
      }

      downloadUrlRef.current = objectUrl;

      setDownloadUrl(objectUrl);

      setReferenceNumber(
        response.headers.get(
          "X-Brochure-Reference"
        )
      );

      setStatus("success");

      triggerDownload(objectUrl);
    } catch (error) {
      setStatus("error");

      setServerError(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again."
      );
    } finally {
      submittingRef.current = false;
    }
  }

  function resetForm() {
    if (submittingRef.current) return;

    if (downloadUrlRef.current) {
      URL.revokeObjectURL(downloadUrlRef.current);
      downloadUrlRef.current = null;
    }

    setDownloadUrl(null);
    setReferenceNumber(null);
    setValues(initialValues());
    setErrors({});
    setServerError(null);
    setStatus("idle");
    setRecaptchaKey((key) => key + 1);
  }

  /* SUCCESS CONFIRMATION */

  if (status === "success" && downloadUrl) {
    return (
      <div
        role="status"
        className="rounded-lg border border-[#DDE8E0] bg-[#F7FBF8] px-5 py-10 text-center sm:px-9"
      >
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-white text-[#26784B]">
          <CheckCircle2
            className="h-9 w-9"
            strokeWidth={1.8}
            aria-hidden="true"
          />
        </div>

        <h3 className="mt-5 font-heading text-2xl font-bold tracking-[-0.035em] text-foreground">
          Your Brochure Is Ready
        </h3>

        <p className="mx-auto mt-3 max-w-sm text-sm leading-7 text-muted">
          Your details have been submitted
          successfully. The brochure download
          has been initiated.
        </p>

        {referenceNumber && (
          <div className="mx-auto mt-5 max-w-sm rounded-md border border-[#E4E2DE] bg-white px-4 py-3">
            <p className="text-xs text-muted">
              Reference Number
            </p>

            <p className="mt-1 break-all font-heading text-sm font-bold text-foreground">
              {referenceNumber}
            </p>
          </div>
        )}

        <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a
            href={downloadUrl}
            download={FILE_NAME}
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-button bg-brand-red px-6 font-heading text-sm font-bold text-white transition-colors hover:bg-brand-red-hover"
          >
            <Download
              className="h-4 w-4"
              aria-hidden="true"
            />
            Download Again
          </a>

          <button
            type="button"
            onClick={resetForm}
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-button border border-[#D9D7D3] bg-white px-6 font-heading text-sm font-bold text-foreground hover:border-brand-red hover:text-brand-red"
          >
            <RotateCcw
              className="h-4 w-4"
              aria-hidden="true"
            />
            New Request
          </button>
        </div>

        <p className="mt-5 text-xs leading-6 text-muted">
          If the download did not start,
          select Download Again.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      aria-busy={status === "loading"}
      className="space-y-7"
    >
      <div>
        <p className="font-heading text-xs font-bold uppercase tracking-[0.12em] text-brand-red">
          Contact Information
        </p>

        <p className="mt-2 text-sm leading-7 text-muted">
          Fill in your professional details
          to access the exhibition brochure.
        </p>
      </div>

      <div className="grid gap-x-5 gap-y-5 sm:grid-cols-2">
        <TextField
          id="brochure-name"
          label="Full Name"
          autoComplete="name"
          required
          value={values.name}
          onChange={(event) =>
            update("name", event.target.value)
          }
          error={errors.name}
        />

        <TextField
          id="brochure-company"
          label="Company / Organisation"
          autoComplete="organization"
          required
          value={values.companyName}
          onChange={(event) =>
            update("companyName", event.target.value)
          }
          error={errors.companyName}
        />

        <TextField
          id="brochure-email"
          label="Business Email"
          type="email"
          autoComplete="email"
          required
          value={values.businessEmail}
          onChange={(event) =>
            update(
              "businessEmail",
              event.target.value
            )
          }
          error={errors.businessEmail}
        />

        <TextField
          id="brochure-mobile"
          label="Mobile / WhatsApp Number"
          type="tel"
          autoComplete="tel"
          required
          value={values.mobileNumber}
          onChange={(event) =>
            update(
              "mobileNumber",
              event.target.value
            )
          }
          error={errors.mobileNumber}
        />

        <TextField
          id="brochure-designation"
          label="Designation"
          hint="Optional"
          value={values.designation}
          onChange={(event) =>
            update("designation", event.target.value)
          }
          error={errors.designation}
        />

        <SelectField
          id="brochure-country"
          label="Country"
          required
          value={values.country}
          options={countryOptions.map((country) => ({
            label: country,
            value: country,
          }))}
          onChange={(event) =>
            update("country", event.target.value)
          }
          error={errors.country}
        />
      </div>

      <div className="space-y-5 border-t border-[#E4E2DE] pt-7">
        <p className="font-heading text-xs font-bold uppercase tracking-[0.12em] text-brand-red">
          Privacy &amp; Verification
        </p>

        <CheckboxField
          id="brochure-privacy"
          required
          checked={values.privacyConsent}
          onChange={(event) =>
            update(
              "privacyConsent",
              event.target.checked
            )
          }
          error={errors.privacyConsent}
          label={
            <>
              I agree to the{" "}
              <Link
                href="/privacy-policy"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-brand-red underline underline-offset-2"
              >
                Privacy Policy
              </Link>
              {" "}and consent to the use of my
              details to process this brochure request.
            </>
          }
        />

        <Recaptcha
          key={recaptchaKey}
          onChange={handleCaptcha}
          error={errors.recaptchaToken}
        />

        <div className="flex items-start gap-3">
          <ShieldCheck
            aria-hidden="true"
            className="mt-0.5 h-4 w-4 shrink-0 text-muted"
          />

          <p className="text-xs leading-6 text-muted">
            The organizer will use your details
            to process this request and contact
            you regarding your enquiry, in
            accordance with the Privacy Policy.
          </p>
        </div>
      </div>

      {serverError && (
        <p
          role="alert"
          className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm leading-6 text-red-700"
        >
          {serverError}
        </p>
      )}

      <div className="border-t border-[#E4E2DE] pt-7">
        <button
          type="submit"
          disabled={status === "loading"}
          className="inline-flex min-h-12 w-full items-center justify-center gap-2.5 rounded-button bg-brand-red px-7 py-3.5 font-heading text-sm font-bold text-white transition-colors hover:bg-brand-red-hover disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
        >
          {status === "loading" ? (
            <>
              <Loader2
                className="h-4 w-4 animate-spin"
                aria-hidden="true"
              />
              Processing Request...
            </>
          ) : (
            <>
              <FileDown
                className="h-4 w-4"
                aria-hidden="true"
              />
              Submit &amp; Download Brochure
            </>
          )}
        </button>

        <p
          aria-live="polite"
          className="mt-3 text-xs leading-6 text-muted"
        >
          {status === "loading"
            ? "Saving your request and preparing the brochure."
            : "The brochure will download after successful verification."}
        </p>
      </div>
    </form>
  );
}
