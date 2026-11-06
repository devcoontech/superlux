// SVG wordmark — PLACEHOLDER matching the reference (see ASSET-MAP.md).
export function Logo({ height = 44 }: { height?: number }) {
  return (
    <svg viewBox="0 0 230 58" role="img" aria-label="Superluxe.uk" style={{ height, width: "auto", display: "block" }}>
      <path d="M40 22 C70 6 150 6 196 18" fill="none" stroke="#FFD700" strokeWidth="2.2" strokeLinecap="round" />
      <circle cx="96" cy="15.5" r="2.4" fill="#FFD700" /><circle cx="120" cy="14.5" r="2.4" fill="#FFD700" />
      <text x="36" y="46" fontFamily="var(--font-serif),serif" fontSize="30" fontWeight="600" fill="#fff">Superluxe</text>
      <text x="196" y="54" fontFamily="var(--font-sans),sans-serif" fontSize="12" fontWeight="600" fill="#FFD700" letterSpacing="2">.uk</text>
    </svg>
  );
}
