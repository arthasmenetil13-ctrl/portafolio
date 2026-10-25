import {
  siClaude,
  siDocker,
  siFastapi,
  siGithub,
  siGithubactions,
  siNextdotjs,
  siPostgresql,
  siPython,
  siReact,
  siRender,
  siResend,
  siTypescript,
  siWhatsapp,
  type SimpleIcon,
} from "simple-icons";

const brands: Record<string, SimpleIcon> = {
  claude: siClaude,
  docker: siDocker,
  fastapi: siFastapi,
  github: siGithub,
  githubactions: siGithubactions,
  nextdotjs: siNextdotjs,
  postgresql: siPostgresql,
  python: siPython,
  react: siReact,
  render: siRender,
  resend: siResend,
  typescript: siTypescript,
  whatsapp: siWhatsapp,
};

export function BrandIcon({ slug, className = "size-5" }: { slug: string; className?: string }) {
  // Wompi has no public mark in Simple Icons; a filled card in the same solid style stands in.
  if (slug === "card") {
    return (
      <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true" focusable="false">
        <path
          fillRule="evenodd"
          d="M3.5 4h17A2.5 2.5 0 0 1 23 6.5v11a2.5 2.5 0 0 1-2.5 2.5h-17A2.5 2.5 0 0 1 1 17.5v-11A2.5 2.5 0 0 1 3.5 4ZM3 8.5v2.5h18V8.5H3Zm2 6v2h6v-2H5Z"
        />
      </svg>
    );
  }
  const icon = brands[slug];
  if (!icon) return null;
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true" focusable="false">
      <path d={icon.path} />
    </svg>
  );
}

// A painter's corner filete: one scroll, one curl and a leaf, in the sign's red with a cobalt keyline.
export function Flourish({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} fill="none" aria-hidden="true" focusable="false">
      <path d="M6 58C6 30 20 10 46 6" stroke="var(--color-cobalto)" strokeWidth="6" strokeLinecap="round" />
      <path d="M6 58C6 30 20 10 46 6" stroke="var(--color-rojo)" strokeWidth="3" strokeLinecap="round" />
      <path
        d="M46 6c8-1 12 4 10 9-2 4-8 4-9 0-1-3 2-5 4-4"
        stroke="var(--color-rojo)"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path d="M17 26c-6-2-9-8-7-13 5 1 9 6 7 13Z" fill="var(--color-cobalto)" />
      <path d="M26 15c1-6 6-9 11-8-1 5-5 9-11 8Z" fill="var(--color-rojo)" />
      <circle cx="6" cy="58" r="3.5" fill="var(--color-tinta)" />
    </svg>
  );
}

// Simple Icons dropped the LinkedIn mark, so this one is drawn here: the "in" cut out of a rounded tile.
export function LinkedInIcon({ className = "size-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true" focusable="false">
      <path
        fillRule="evenodd"
        d="M5 2h14a3 3 0 0 1 3 3v14a3 3 0 0 1-3 3H5a3 3 0 0 1-3-3V5a3 3 0 0 1 3-3Zm1.6 7.4v8.4h2.8V9.4H6.6Zm1.4-4.3a1.6 1.6 0 1 0 0 3.2 1.6 1.6 0 0 0 0-3.2Zm3.3 4.3v8.4h2.8v-4.4c0-1.2.4-2 1.5-2s1.4.9 1.4 2v4.4h2.8v-5c0-2.5-1.3-3.6-3.2-3.6-1.3 0-2.1.6-2.5 1.3V9.4h-2.8Z"
      />
    </svg>
  );
}
