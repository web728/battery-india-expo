
import {
  useId,
  type InputHTMLAttributes,
  type ReactNode,
  type SelectHTMLAttributes,
  type TextareaHTMLAttributes,
} from "react";

import { ChevronDown } from "lucide-react";

import { cn } from "@/lib/utils";

/* ==================================================
   INDIA BATTERY INTERNATIONAL SHOW

   SHARED FORM FIELDS
   Hybrid Industrial Editorial

   Components:
   - TextField
   - TextAreaField
   - SelectField
   - CheckboxField
   - CheckboxGroupField

   Design:
   - White surfaces
   - Neutral borders
   - Charcoal typography
   - Industrial red focus states
   - Clear validation errors
   - Accessible labels and descriptions

   No additional client-side dependencies.
================================================== */

/* --------------------------------------------------
   SHARED DESIGN CLASSES
-------------------------------------------------- */

const labelClasses = [
  "block font-heading text-[13px]",
  "font-semibold leading-5",
  "text-foreground",
].join(" ");

const fieldClasses = [
  "block min-h-12 w-full",
  "rounded-md border border-[#DAD8D4]",
  "bg-white px-4 py-3",
  "font-body text-sm leading-6",
  "text-foreground",
  "placeholder:text-[#92949A]",
  "outline-none",
  "transition-[border-color,box-shadow,background-color]",
  "duration-200",
  "hover:border-[#BAB8B4]",
  "focus:border-brand-red",
  "focus:ring-[3px]",
  "focus:ring-brand-red/10",
  "disabled:cursor-not-allowed",
  "disabled:border-[#E4E2DE]",
  "disabled:bg-[#F2F1EE]",
  "disabled:text-muted",
].join(" ");

const errorFieldClasses = [
  "border-[#C62832]",
  "bg-[#FFF9F9]",
  "focus:border-brand-red",
  "focus:ring-brand-red/10",
].join(" ");

const checkboxClasses = [
  "mt-0.5 h-[18px] w-[18px]",
  "shrink-0 cursor-pointer",
  "rounded-[4px]",
  "border border-[#BDBBB7]",
  "accent-[#C62832]",
  "focus-visible:outline-2",
  "focus-visible:outline-offset-2",
  "focus-visible:outline-brand-red",
  "disabled:cursor-not-allowed",
  "disabled:opacity-50",
].join(" ");

/* ==================================================
   FIELD WRAPPER
================================================== */

type FieldWrapperProps = {
  label: string;
  htmlFor: string;
  error?: string;
  required?: boolean;
  hint?: string;
  hintId: string;
  errorId: string;
  children: ReactNode;
};

function FieldWrapper({
  label,
  htmlFor,
  error,
  required = false,
  hint,
  hintId,
  errorId,
  children,
}: FieldWrapperProps) {
  return (
    <div className="flex min-w-0 flex-col gap-2">
      {/* LABEL */}

      <label htmlFor={htmlFor} className={labelClasses}>
        {label}

        {required && (
          <span
            aria-hidden="true"
            className="ml-1 text-brand-red"
          >
            *
          </span>
        )}
      </label>

      {/* FIELD */}

      {children}

      {/* HELPER TEXT */}

      {hint && !error && (
        <p
          id={hintId}
          className="font-body text-xs leading-[1.6] text-muted"
        >
          {hint}
        </p>
      )}

      {/* VALIDATION ERROR */}

      {error && (
        <p
          id={errorId}
          role="alert"
          className="font-body text-xs font-medium leading-[1.6] text-brand-red"
        >
          {error}
        </p>
      )}
    </div>
  );
}

/* ==================================================
   TEXT FIELD
================================================== */

export type TextFieldProps =
  InputHTMLAttributes<HTMLInputElement> & {
    label: string;
    error?: string;
    hint?: string;
  };

export function TextField({
  label,
  error,
  hint,
  id,
  className,
  required,
  "aria-describedby": ariaDescribedBy,
  ...rest
}: TextFieldProps) {
  const generatedId = useId();
  const fieldId = id ?? generatedId;

  const hintId = `${fieldId}-hint`;
  const errorId = `${fieldId}-error`;

  const describedBy = [
    ariaDescribedBy,
    error ? errorId : hint ? hintId : undefined,
  ]
    .filter(Boolean)
    .join(" ") || undefined;

  return (
    <FieldWrapper
      label={label}
      htmlFor={fieldId}
      error={error}
      required={required}
      hint={hint}
      hintId={hintId}
      errorId={errorId}
    >
      <input
        {...rest}
        id={fieldId}
        required={required}
        aria-required={required || undefined}
        aria-invalid={Boolean(error)}
        aria-describedby={describedBy}
        className={cn(
          fieldClasses,
          error && errorFieldClasses,
          className
        )}
      />
    </FieldWrapper>
  );
}

/* ==================================================
   TEXTAREA FIELD
================================================== */

export type TextAreaFieldProps =
  TextareaHTMLAttributes<HTMLTextAreaElement> & {
    label: string;
    error?: string;
    hint?: string;
  };

export function TextAreaField({
  label,
  error,
  hint,
  id,
  className,
  required,
  rows = 5,
  "aria-describedby": ariaDescribedBy,
  ...rest
}: TextAreaFieldProps) {
  const generatedId = useId();
  const fieldId = id ?? generatedId;

  const hintId = `${fieldId}-hint`;
  const errorId = `${fieldId}-error`;

  const describedBy = [
    ariaDescribedBy,
    error ? errorId : hint ? hintId : undefined,
  ]
    .filter(Boolean)
    .join(" ") || undefined;

  return (
    <FieldWrapper
      label={label}
      htmlFor={fieldId}
      error={error}
      required={required}
      hint={hint}
      hintId={hintId}
      errorId={errorId}
    >
      <textarea
        {...rest}
        id={fieldId}
        required={required}
        rows={rows}
        aria-required={required || undefined}
        aria-invalid={Boolean(error)}
        aria-describedby={describedBy}
        className={cn(
          fieldClasses,
          "min-h-[130px] resize-y",
          error && errorFieldClasses,
          className
        )}
      />
    </FieldWrapper>
  );
}

/* ==================================================
   SELECT FIELD
================================================== */

export type SelectFieldProps =
  SelectHTMLAttributes<HTMLSelectElement> & {
    label: string;
    error?: string;
    hint?: string;
    options: readonly {
      label: string;
      value: string;
    }[];
    placeholder?: string;
  };

export function SelectField({
  label,
  error,
  hint,
  id,
  className,
  required,
  options,
  placeholder,
  "aria-describedby": ariaDescribedBy,
  ...rest
}: SelectFieldProps) {
  const generatedId = useId();
  const fieldId = id ?? generatedId;

  const hintId = `${fieldId}-hint`;
  const errorId = `${fieldId}-error`;

  const describedBy = [
    ariaDescribedBy,
    error ? errorId : hint ? hintId : undefined,
  ]
    .filter(Boolean)
    .join(" ") || undefined;

  return (
    <FieldWrapper
      label={label}
      htmlFor={fieldId}
      error={error}
      required={required}
      hint={hint}
      hintId={hintId}
      errorId={errorId}
    >
      <div className="relative min-w-0">
        <select
          {...rest}
          id={fieldId}
          required={required}
          aria-required={required || undefined}
          aria-invalid={Boolean(error)}
          aria-describedby={describedBy}
          className={cn(
            fieldClasses,
            "appearance-none pr-11",
            "cursor-pointer",
            error && errorFieldClasses,
            className
          )}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}

          {options.map((option) => (
            <option
              key={`${option.value}-${option.label}`}
              value={option.value}
            >
              {option.label}
            </option>
          ))}
        </select>

        <ChevronDown
          aria-hidden="true"
          className="pointer-events-none absolute right-4 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-[#777A80]"
          strokeWidth={1.8}
        />
      </div>
    </FieldWrapper>
  );
}

/* ==================================================
   CHECKBOX FIELD
================================================== */

export type CheckboxFieldProps =
  Omit<
    InputHTMLAttributes<HTMLInputElement>,
    "type"
  > & {
    label: ReactNode;
    error?: string;
  };

export function CheckboxField({
  label,
  error,
  id,
  required,
  className,
  "aria-describedby": ariaDescribedBy,
  ...rest
}: CheckboxFieldProps) {
  const generatedId = useId();
  const fieldId = id ?? generatedId;
  const errorId = `${fieldId}-error`;

  const describedBy = [
    ariaDescribedBy,
    error ? errorId : undefined,
  ]
    .filter(Boolean)
    .join(" ") || undefined;

  return (
    <div className="min-w-0">
      <div className="flex items-start gap-3">
        <input
          {...rest}
          type="checkbox"
          id={fieldId}
          required={required}
          aria-required={required || undefined}
          aria-invalid={Boolean(error)}
          aria-describedby={describedBy}
          className={cn(
            checkboxClasses,
            error && "border-brand-red",
            className
          )}
        />

        <label
          htmlFor={fieldId}
          className="cursor-pointer font-body text-[13px] leading-[1.8] text-muted sm:text-sm"
        >
          {label}

          {required && (
            <span
              aria-hidden="true"
              className="ml-1 text-brand-red"
            >
              *
            </span>
          )}
        </label>
      </div>

      {error && (
        <p
          id={errorId}
          role="alert"
          className="mt-2 pl-[30px] font-body text-xs font-medium leading-[1.6] text-brand-red"
        >
          {error}
        </p>
      )}
    </div>
  );
}

/* ==================================================
   CHECKBOX GROUP FIELD
================================================== */

export type CheckboxGroupOption = {
  label: string;
  value: string;
};

export type CheckboxGroupFieldProps = {
  legend: string;
  error?: string;
  required?: boolean;
  options: readonly CheckboxGroupOption[];
  values: readonly string[];
  onToggle: (value: string) => void;
};

export function CheckboxGroupField({
  legend,
  error,
  required = false,
  options,
  values,
  onToggle,
}: CheckboxGroupFieldProps) {
  const groupId = useId();
  const errorId = `${groupId}-error`;

  return (
    <fieldset
      aria-invalid={Boolean(error)}
      aria-describedby={error ? errorId : undefined}
      className="min-w-0"
    >
      <legend className={cn(labelClasses, "mb-3")}>
        {legend}

        {required && (
          <span
            aria-hidden="true"
            className="ml-1 text-brand-red"
          >
            *
          </span>
        )}
      </legend>

      <div className="grid gap-3 sm:grid-cols-2">
        {options.map((option) => {
          const checked = values.includes(option.value);

          return (
            <label
              key={option.value}
              className={cn(
                "group flex min-h-12 cursor-pointer",
                "items-center gap-3",
                "rounded-md border border-[#E4E2DE]",
                "bg-white px-4 py-3",
                "transition-[border-color,background-color]",
                "duration-200",
                "hover:border-[#C7C3BE]",
                checked && [
                  "border-brand-red/40",
                  "bg-[#FFF9F9]",
                ]
              )}
            >
              <input
                type="checkbox"
                name={groupId}
                value={option.value}
                checked={checked}
                onChange={() => onToggle(option.value)}
                className={checkboxClasses}
              />

              <span className="font-body text-sm leading-6 text-foreground">
                {option.label}
              </span>
            </label>
          );
        })}
      </div>

      {error && (
        <p
          id={errorId}
          role="alert"
          className="mt-3 font-body text-xs font-medium leading-[1.6] text-brand-red"
        >
          {error}
        </p>
      )}
    </fieldset>
  );
}
