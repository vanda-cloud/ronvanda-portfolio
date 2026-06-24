/**
 * SectionBackground
 * Soft floating orbs using a single accent colour — consistent with the hero
 * liquid-blob motif. Each section gets a unique position/timing so they feel
 * alive without competing with content.
 */

type Variant = "skills" | "experience" | "projects" | "contact";

interface Blob {
  className: string;
  style: React.CSSProperties;
}

const BLOBS: Record<Variant, Blob[]> = {
  skills: [
    {
      className: "section-blob",
      style: { width: "28rem", height: "28rem", top: "-12%", left: "-6%", animationDelay: "0s" },
    },
    {
      className: "section-blob section-blob-b",
      style: { width: "20rem", height: "20rem", bottom: "-8%", right: "-4%", animationDelay: "-10s" },
    },
  ],
  experience: [
    {
      className: "section-blob section-blob-b",
      style: { width: "30rem", height: "30rem", top: "-10%", right: "-8%", animationDelay: "-4s" },
    },
    {
      className: "section-blob section-blob-c",
      style: { width: "20rem", height: "20rem", bottom: "-6%", left: "-4%", animationDelay: "-12s" },
    },
  ],
  projects: [
    {
      className: "section-blob",
      style: { width: "26rem", height: "26rem", top: "-8%", right: "-6%", animationDelay: "-2s" },
    },
    {
      className: "section-blob section-blob-b",
      style: { width: "22rem", height: "22rem", bottom: "-10%", left: "-5%", animationDelay: "-8s" },
    },
  ],
  contact: [
    {
      className: "section-blob section-blob-c",
      style: { width: "24rem", height: "24rem", top: "-10%", left: "-5%", animationDelay: "-6s" },
    },
    {
      className: "section-blob",
      style: { width: "20rem", height: "20rem", bottom: "-8%", right: "-4%", animationDelay: "-3s" },
    },
  ],
};

export function SectionBackground({ variant }: { variant: Variant }) {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden" aria-hidden>
      {BLOBS[variant].map((blob, i) => (
        <div
          key={i}
          className={blob.className}
          style={{ background: "var(--accent)", ...blob.style }}
        />
      ))}
    </div>
  );
}
