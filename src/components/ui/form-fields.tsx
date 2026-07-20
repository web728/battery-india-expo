import { cn } from "@/lib/utils";
import type { InputHTMLAttributes, ReactNode, SelectHTMLAttributes, TextareaHTMLAttributes } from "react";

function FieldWrapper({
  label,
  htmlFor,
  error,
  required,
  hint,
  children,
}: {
  label: string;
  htmlFor: string;
  error?: string;
  required?: boolean;
  hint?: string;
  children: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={htmlFor} className="text-sm font-semibold text-navy-dark">
        {label}
        {required && <span className="text-red" aria-hidden="true"> *</span>}
      </label>
      {children}
      {hint && !error && <p className="text-xs text-grey-medium">{hint}</p>}
      {error && (
        <p role="alert" className="text-xs font-medium text-red">
          {error}
        </p>
      )}
    </div>
  );
}

const fieldClasses =
  "w-full rounded-md border border-silver bg-white px-4 py-2.5 text-navy-dark placeholder:text-grey-medium focus-visible:outline focus-visible:outline-2 focus-visible:outline-red focus-visible:border-red disabled:bg-grey-light";

type TextFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  error?: string;
  hint?: string;
};

export function TextField({ label, error, hint, id, className, required, ...rest }: TextFieldProps) {
  return (
    <FieldWrapper label={label} htmlFor={id!} error={error} required={required} hint={hint}>
      <input
        id={id}
        aria-invalid={!!error}
        aria-required={required}
        className={cn(fieldClasses, error && "border-red", className)}
        {...rest}
      />
    </FieldWrapper>
  );
}

type TextAreaFieldProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label: string;
  error?: string;
  hint?: string;
};

export function TextAreaField({ label, error, hint, id, className, required, ...rest }: TextAreaFieldProps) {
  return (
    <FieldWrapper label={label} htmlFor={id!} error={error} required={required} hint={hint}>
      <textarea
        id={id}
        aria-invalid={!!error}
        aria-required={required}
        rows={5}
        className={cn(fieldClasses, "resize-y", error && "border-red", className)}
        {...rest}
      />
    </FieldWrapper>
  );
}

type SelectFieldProps = SelectHTMLAttributes<HTMLSelectElement> & {
  label: string;
  error?: string;
  hint?: string;
  options: { label: string; value: string }[];
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
  ...rest
}: SelectFieldProps) {
  return (
    <FieldWrapper label={label} htmlFor={id!} error={error} required={required} hint={hint}>
      <select
        id={id}
        aria-invalid={!!error}
        aria-required={required}
        className={cn(fieldClasses, error && "border-red", className)}
        {...rest}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </FieldWrapper>
  );
}

export function CheckboxField({
  label,
  error,
  id,
  required,
  ...rest
}: InputHTMLAttributes<HTMLInputElement> & { label: ReactNode; error?: string }) {
  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-start gap-2.5">
        <input
          type="checkbox"
          id={id}
          aria-invalid={!!error}
          aria-required={required}
          className="mt-1 h-4 w-4 shrink-0 rounded border-silver text-red focus-visible:outline focus-visible:outline-2 focus-visible:outline-red"
          {...rest}
        />
        <label htmlFor={id} className="text-sm text-navy-dark">
          {label}
          {required && <span className="text-red" aria-hidden="true"> *</span>}
        </label>
      </div>
      {error && (
        <p role="alert" className="ml-6 text-xs font-medium text-red">
          {error}
        </p>
      )}
    </div>
  );
}

export function CheckboxGroupField({
  legend,
  error,
  required,
  options,
  values,
  onToggle,
}: {
  legend: string;
  error?: string;
  required?: boolean;
  options: { label: string; value: string }[];
  values: string[];
  onToggle: (value: string) => void;
}) {
  return (
    <fieldset className="flex flex-col gap-2">
      <legend className="mb-1 text-sm font-semibold text-navy-dark">
        {legend}
        {required && <span className="text-red" aria-hidden="true"> *</span>}
      </legend>
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
        {options.map((opt) => (
          <label key={opt.value} className="flex items-center gap-2 text-sm text-navy-dark">
            <input
              type="checkbox"
              checked={values.includes(opt.value)}
              onChange={() => onToggle(opt.value)}
              className="h-4 w-4 rounded border-silver text-red focus-visible:outline focus-visible:outline-2 focus-visible:outline-red"
            />
            {opt.label}
          </label>
        ))}
      </div>
      {error && (
        <p role="alert" className="text-xs font-medium text-red">
          {error}
        </p>
      )}
    </fieldset>
  );
}
