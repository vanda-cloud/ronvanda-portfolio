import type { SVGProps } from "react";

/**
 * lucide-react dropped all brand/logo icons (Facebook, Instagram, Linkedin,
 * Github, plain Send) a while back — only generic UI icons remain. Rather
 * than pull in a whole extra icon package for five logos, these are small
 * hand-rolled stand-ins that inherit color via `currentColor` like the rest
 * of the icon usage on this site.
 */
type IconProps = SVGProps<SVGSVGElement> & { size?: number };

function createBadgeIcon(letter: string, fontSize: number, displayName: string) {
  function BadgeIcon({ size = 18, ...props }: IconProps) {
    return (
      <svg
        viewBox="0 0 24 24"
        width={size}
        height={size}
        aria-hidden
        {...props}
      >
        <rect x="1.5" y="1.5" width="21" height="21" rx="6" fill="currentColor" />
        <text
          x="12"
          y="16.3"
          textAnchor="middle"
          fontSize={fontSize}
          fontWeight={700}
          fill="var(--background)"
          fontFamily="system-ui, -apple-system, sans-serif"
        >
          {letter}
        </text>
      </svg>
    );
  }
  BadgeIcon.displayName = displayName;
  return BadgeIcon;
}

export const FacebookIcon = createBadgeIcon("f", 13, "FacebookIcon");
export const LinkedinIcon = createBadgeIcon("in", 9, "LinkedinIcon");

export function InstagramIcon({ size = 18, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      {...props}
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="0.6" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function GithubIcon({ size = 18, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="currentColor"
      aria-hidden
      {...props}
    >
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  );
}
