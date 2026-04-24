/**
 * Inspired by the mark on Jonny's truck: house silhouette with crossed tools inside.
 * Placeholder until we receive the real logo file. Swap by replacing this component
 * or by dropping a file in /public/logo.svg and updating the Navbar.
 */
export function TruckLogo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      {/* House outline */}
      <path
        d="M8 30 L32 10 L56 30 V54 H8 Z"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinejoin="round"
        fill="none"
      />
      {/* Hammer — diagonal left */}
      <g stroke="currentColor" strokeWidth="3" strokeLinecap="round">
        <line x1="22" y1="24" x2="40" y2="42" />
        <rect
          x="16"
          y="20"
          width="10"
          height="7"
          rx="1"
          transform="rotate(45 21 23.5)"
          fill="currentColor"
        />
      </g>
      {/* Wrench — diagonal right */}
      <g stroke="currentColor" strokeWidth="3" strokeLinecap="round" fill="none">
        <line x1="42" y1="24" x2="26" y2="42" />
        <circle cx="44" cy="22" r="3.5" fill="currentColor" />
      </g>
    </svg>
  );
}

export function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}
