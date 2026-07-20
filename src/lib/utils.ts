import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: string | Date) {
  return new Date(date).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function generateReferenceNumber(prefix: string) {
  const random = Math.random().toString(36).slice(2, 8).toUpperCase();
  const timestamp = Date.now().toString(36).toUpperCase().slice(-4);
  return `${prefix}-${timestamp}${random}`;
}
