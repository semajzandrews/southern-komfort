"use client";

import { useState } from "react";

/**
 * Graded free-stock photo with a graceful fallback. If the remote image fails,
 * the labelled jewel-tone placeholder remains (flagged for an owner-photo swap).
 */
export default function Photo({
  src,
  alt,
  label,
  tint = false,
  className = "",
  style,
}: {
  src: string;
  alt: string;
  label: string;
  tint?: boolean;
  className?: string;
  style?: React.CSSProperties;
}) {
  const [ok, setOk] = useState(true);

  return (
    <div className={`photo ${className}`} style={style}>
      <span className="ph-label">{label}</span>
      {ok && (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          decoding="async"
          onError={() => setOk(false)}
        />
      )}
      {tint && ok && <span className="ph-tint" />}
    </div>
  );
}
