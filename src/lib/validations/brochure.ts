
import { z } from "zod";

export const brochureDownloadSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Please enter your full name.")
    .max(120, "Name is too long."),

  companyName: z
    .string()
    .trim()
    .min(2, "Please enter your company name.")
    .max(160, "Company name is too long."),

  designation: z
    .string()
    .trim()
    .max(100, "Designation is too long."),

  businessEmail: z
    .email("Please enter a valid business email.")
    .max(254, "Email address is too long."),

  mobileNumber: z
    .string()
    .trim()
    .min(8, "Please enter a valid phone number.")
    .max(25, "Phone number is too long.")
    .refine(
      (value) =>
        /^[+()\d\s-]+$/.test(value) &&
        value.replace(/\D/g, "").length >= 8,
      "Please enter a valid phone number."
    ),

  country: z
    .string()
    .trim()
    .min(2, "Please select your country.")
    .max(100),

  privacyConsent: z.literal(
    true,
    "You must accept the Privacy Policy."
  ),

  recaptchaToken: z
    .string()
    .min(1, "Please complete the reCAPTCHA verification."),
});

export type BrochureDownloadValues = {
  name: string;
  companyName: string;
  designation: string;
  businessEmail: string;
  mobileNumber: string;
  country: string;
  privacyConsent: boolean;
  recaptchaToken: string;
};
