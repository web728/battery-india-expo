import { z } from "zod";

const consentRequired = z
  .boolean()
  .refine((v) => v === true, { message: "You must accept this to continue" });

export const visitorRegistrationSchema = z.object({
  name: z.string().min(1, "Name is required").max(150),
  businessEmail: z.string().email("Enter a valid business email"),
  mobileNumber: z.string().min(7, "Enter a valid mobile number").max(20),
  designation: z.string().min(1, "Designation is required").max(150),
  companyName: z.string().min(1, "Company name is required").max(200),
  country: z.string().optional().or(z.literal("")),
  companyWebsite: z.string().url("Enter a valid URL").optional().or(z.literal("")),
  city: z.string().optional().or(z.literal("")),
  state: z.string().optional().or(z.literal("")),
  areasOfInterest: z.array(z.string()).optional(),
  privacyConsent: consentRequired,
  recaptchaToken: z.string().min(1, "Please verify you're not a robot"),
});
export type VisitorRegistrationInput = z.infer<typeof visitorRegistrationSchema>;

export const exhibitorEnquirySchema = z.object({
  fullName: z.string().min(1, "Full name is required").max(150),
  companyName: z.string().min(1, "Company name is required").max(200),
  designation: z.string().min(1, "Designation is required").max(150),
  businessEmail: z.string().email("Enter a valid business email"),
  phone: z.string().min(7, "Enter a valid phone number").max(20),
  country: z.string().min(1, "Country is required"),
  city: z.string().min(1, "City is required"),
  companyWebsite: z.string().url("Enter a valid URL").optional().or(z.literal("")),
  sponsorshipInterest: z.boolean().optional(),
  message: z.string().max(2000).optional().or(z.literal("")),
  privacyConsent: consentRequired,
  marketingConsent: z.boolean().optional(),
  recaptchaToken: z.string().min(1, "Please verify you're not a robot"),
});
export type ExhibitorEnquiryInput = z.infer<typeof exhibitorEnquirySchema>;

export const sponsorEnquirySchema = z.object({
  companyName: z.string().min(1, "Company name is required").max(200),
  contactPerson: z.string().min(1, "Contact person is required").max(150),
  businessEmail: z.string().email("Enter a valid business email"),
  phone: z.string().min(7, "Enter a valid phone number").max(20),
  packageInterest: z.string().min(1, "Tell us what you're interested in sponsoring"),
  message: z.string().max(2000).optional().or(z.literal("")),
  privacyConsent: consentRequired,
});
export type SponsorEnquiryInput = z.infer<typeof sponsorEnquirySchema>;

export const contactFormSchema = z.object({
  name: z.string().min(1, "Name is required").max(150),
  email: z.string().email("Enter a valid email"),
  phone: z.string().optional().or(z.literal("")),
  company: z.string().optional().or(z.literal("")),
  department: z.enum([
    "Exhibiting",
    "Visitor Registration",
    "Sponsorship",
    "Media",
    "General Enquiry",
  ]),
  message: z.string().min(1, "Message is required").max(2000),
  privacyConsent: consentRequired,
  recaptchaToken: z.string().min(1, "Please verify you're not a robot"),
});
export type ContactFormInput = z.infer<typeof contactFormSchema>;

export const newsletterSchema = z.object({
  name: z.string().min(1, "Name is required").max(150),
  businessEmail: z.string().email("Enter a valid business email"),
  company: z.string().optional().or(z.literal("")),
  interests: z.array(z.string()).optional(),
  consent: consentRequired,
});
export type NewsletterInput = z.infer<typeof newsletterSchema>;