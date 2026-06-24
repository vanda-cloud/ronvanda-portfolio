/**
 * PageBackground
 * Sits inside a full-height relative wrapper in page.tsx.
 * Uses position:absolute so it stretches to the total document height —
 * blobs at top/mid/bottom percentages map to actual page positions,
 * not the viewport, so every section gets ambient background glow.
 */
export function PageBackground() {
  return (
    <div
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      aria-hidden
    >
      {/* ── Top zone (Hero / Skills) ── */}
      <div
        className="section-blob"
        style={{ width: "36rem", height: "36rem", top: "1%", left: "-8%", animationDelay: "0s", animationDuration: "22s" }}
      />
      <div
        className="section-blob section-blob-b"
        style={{ width: "28rem", height: "28rem", top: "3%", right: "-6%", animationDelay: "-8s", animationDuration: "26s" }}
      />

      {/* ── Upper-mid zone (Skills / Experience) ── */}
      <div
        className="section-blob section-blob-c"
        style={{ width: "30rem", height: "30rem", top: "22%", left: "-5%", animationDelay: "-14s", animationDuration: "20s" }}
      />
      <div
        className="section-blob section-blob-b"
        style={{ width: "24rem", height: "24rem", top: "28%", right: "-6%", animationDelay: "-5s", animationDuration: "24s" }}
      />

      {/* ── Mid zone (Experience / Projects) ── */}
      <div
        className="section-blob"
        style={{ width: "32rem", height: "32rem", top: "48%", left: "-7%", animationDelay: "-18s", animationDuration: "21s" }}
      />
      <div
        className="section-blob section-blob-c"
        style={{ width: "26rem", height: "26rem", top: "52%", right: "-5%", animationDelay: "-10s", animationDuration: "19s" }}
      />

      {/* ── Bottom zone (Contact / Footer) ── */}
      <div
        className="section-blob section-blob-b"
        style={{ width: "28rem", height: "28rem", top: "74%", left: "-5%", animationDelay: "-3s", animationDuration: "23s" }}
      />
      <div
        className="section-blob"
        style={{ width: "24rem", height: "24rem", top: "78%", right: "-4%", animationDelay: "-16s", animationDuration: "25s" }}
      />
    </div>
  );
}
