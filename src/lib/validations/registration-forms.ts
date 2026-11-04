
import { z } from "zod";

const requiredText = (label: string) =>
  z.string().trim().min(1, `${label} is required.`);

const emailField = z
  .string()
  .trim()
  .min(1, "Email is required.")
  .email("Enter a valid email address.");

const phoneField = z
  .string()
  .trim()
  .min(1, "Mobile / WhatsApp number is required.")
  .refine(
    (value) => {
      const digits = value.replace(/\D/g, "");
      return digits.length >= 7 && digits.length <= 15;
    },
    "Enter a valid mobile / WhatsApp number."
  );

const consentField = z.boolean().refine(
  (value) => value === true,
  "Please accept the Privacy Policy."
);

const recaptchaField = z
  .string()
  .min(1, "Please complete the verification.");

export const exhibitorRegistrationSchema = z.object({
  companyName: requiredText("Company name"),
  designation: requiredText("Designation"),
  contactPerson: requiredText("Contact person"),
  businessEmail: emailField,
  mobileNumber: phoneField,
  country: requiredText("Country"),

  // No minimum character/word count.
  productsServices: requiredText("Products & services"),

  // Booth size is optional.
  preferredBoothSize: z.string().optional(),

  privacyConsent: consentField,
  recaptchaToken: recaptchaField,
});

export const visitorRegistrationSchema = z.object({
  name: requiredText("Full name"),
  companyName: requiredText("Company / organisation"),
  designation: requiredText("Designation"),
  mobileNumber: phoneField,
  businessEmail: emailField,

  // Optional business/category field.
  businessCategory: z.string().trim().optional(),

  country: requiredText("Country"),

  privacyConsent: consentField,
  recaptchaToken: recaptchaField,
});

export type ExhibitorRegistrationValues = z.infer<
  typeof exhibitorRegistrationSchema
>;

export type VisitorRegistrationValues = z.infer<
  typeof visitorRegistrationSchema
>;
