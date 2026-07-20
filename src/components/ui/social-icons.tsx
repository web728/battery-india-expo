import type { SVGProps } from "react";

// lucide-react removed trademarked brand/logo icons, so social glyphs are
// defined here as minimal inline SVGs instead.
type IconProps = SVGProps<SVGSVGElement>;

export function LinkedInIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.38-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45z" />
    </svg>
  );
}

export function TwitterIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M18.9 3H21l-6.55 7.49L22.2 21h-6.3l-4.94-6.46L5.28 21H3.15l7.01-8.01L1.8 3h6.46l4.46 5.9L18.9 3zm-1.1 16.17h1.16L7.28 4.76H6.03l11.77 14.41z" />
    </svg>
  );
}

export function FacebookIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5 3.66 9.15 8.44 9.94v-7.03H7.9v-2.9h2.54V9.85c0-2.5 1.49-3.89 3.77-3.89 1.09 0 2.23.2 2.23.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.78l-.44 2.9h-2.34V22c4.78-.79 8.44-4.94 8.44-9.94z" />
    </svg>
  );
}

export function InstagramIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...props}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function YouTubeIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M21.6 7.2s-.21-1.49-.86-2.15c-.82-.87-1.74-.87-2.16-.92C15.6 4 12 4 12 4h-.01s-3.6 0-6.58.13c-.42.05-1.34.05-2.16.92-.65.66-.86 2.15-.86 2.15S2.18 8.94 2.18 10.68v1.63c0 1.74.21 3.48.21 3.48s.21 1.49.85 2.15c.82.87 1.9.84 2.38.94 1.73.16 7.36.21 7.36.21s3.6-.01 6.58-.14c.42-.05 1.34-.05 2.16-.92.65-.66.86-2.15.86-2.15s.21-1.74.21-3.48v-1.63c0-1.74-.21-3.48-.21-3.48zM9.98 14.65V8.9l5.4 2.88-5.4 2.87z" />
    </svg>
  );
}
