
import {
  exhibitorEnquirySchema,
  visitorRegistrationSchema,
} from "@/lib/validations/forms";

export const exhibitorRegistrationSchema =
  exhibitorEnquirySchema;

export { visitorRegistrationSchema };

export type ExhibitorRegistrationValues =
  typeof exhibitorRegistrationSchema._output;

export type VisitorRegistrationValues =
  typeof visitorRegistrationSchema._output;
