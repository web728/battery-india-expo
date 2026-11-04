
import { z } from "zod";

const consentRequired = z
  .boolean()
  .refine((value) => value === true, {
    message: "Please accept the Privacy Policy.",
  });

const requiredText = (label: string, max = 200) =>
  z
    .string()
    .trim()
    .min(1, `${label} is required.`)
    .max(max, `${label} is too long.`);

const emailRequired = z
  .string()
  .trim()
  .min(1, "Email address is required.")
  .email("Enter a valid email address.");

const mobileRequired = z
  .string()
  .trim()
  .min(1, "Mobile / WhatsApp number is required.")
  .refine(
    (value) => {
      const digits = value.replace(/\D/g, "");
      return digits.length >= 7 && digits.length <= 15;
    },
    {
      message: "Enter a valid mobile / WhatsApp number.",
    }
  );

const recaptchaRequired = z
  .string()
  .min(1, "Please complete the verification.");

/* -----------------------------------------
   VISITOR REGISTRATION
----------------------------------------- */

export const visitorRegistrationSchema = z.object({
  name: requiredText("Full name", 150),

  companyName: requiredText(
    "Company / organisation",
    200
  ),

  designation: requiredText("Designation", 150),

  mobileNumber: mobileRequired,

  businessEmail: emailRequired,

  businessCategory: z
    .string()
    .trim()
    .max(200)
    .optional(),

  country: requiredText("Country", 150),

  privacyConsent: consentRequired,

  recaptchaToken: recaptchaRequired,
});

export type VisitorRegistrationInput = z.infer<
  typeof visitorRegistrationSchema
>;

/* -----------------------------------------
   EXHIBITOR ENQUIRY
----------------------------------------- */

export const exhibitorEnquirySchema = z.object({
  companyName: requiredText("Company name", 200),

  contactPerson: requiredText(
    "Contact person",
    150
  ),

  designation: requiredText("Designation", 150),

  businessEmail: emailRequired,

  mobileNumber: mobileRequired,

  country: requiredText("Country", 150),

  // No minimum character count except non-blank.
  productsServices: z
    .string()
    .trim()
    .min(1, "Products & services is required."),

  preferredBoothSize: z
    .string()
    .trim()
    .optional(),

  privacyConsent: consentRequired,

  recaptchaToken: recaptchaRequired,
});

export type ExhibitorEnquiryInput = z.infer<
  typeof exhibitorEnquirySchema
>;

/* -----------------------------------------
   SPONSORSHIP ENQUIRY
----------------------------------------- */

export const sponsorEnquirySchema = z.object({
  companyName: z
    .string()
    .min(1, "Company name is required")
    .max(200),

  contactPerson: z
    .string()
    .min(1, "Contact person is required")
    .max(150),

  businessEmail: z
    .string()
    .email("Enter a valid business email"),

  phone: z
    .string()
    .min(7, "Enter a valid phone number")
    .max(20),

  packageInterest: z
    .string()
    .min(
      1,
      "Tell us what you are interested in sponsoring"
    ),

  message: z
    .string()
    .max(2000)
    .optional()
    .or(z.literal("")),

  privacyConsent: consentRequired,
});

export type SponsorEnquiryInput = z.infer<
  typeof sponsorEnquirySchema
>;

/* -----------------------------------------
   CONTACT FORM
----------------------------------------- */

export const contactFormSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .max(150),

  email: z
    .string()
    .email("Enter a valid email"),

  phone: z
    .string()
    .optional()
    .or(z.literal("")),

  company: z
    .string()
    .optional()
    .or(z.literal("")),

  department: z.enum([
    "Exhibiting",
    "Visitor Registration",
    "Sponsorship",
    "Media",
    "General Enquiry",
  ]),

  message: z
    .string()
    .min(1, "Message is required")
    .max(2000),

  privacyConsent: consentRequired,

  recaptchaToken: recaptchaRequired,
});

export type ContactFormInput = z.infer<
  typeof contactFormSchema
>;

/* -----------------------------------------
   NEWSLETTER
----------------------------------------- */

export const newsletterSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .max(150),

  businessEmail: z
    .string()
    .email("Enter a valid business email"),

  company: z
    .string()
    .optional()
    .or(z.literal("")),

  interests: z
    .array(z.string())
    .optional(),

  consent: consentRequired,
});

export type NewsletterInput = z.infer<
  typeof newsletterSchema
>;
