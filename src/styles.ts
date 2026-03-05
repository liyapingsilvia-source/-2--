import React from 'react';

export const glassStyle: React.CSSProperties = {
  background: "linear-gradient(180deg, rgba(255, 255, 255, 0.5) 0%, rgba(255, 255, 255, 0.2) 100%)",
  backdropFilter: "blur(24px) saturate(180%)",
  WebkitBackdropFilter: "blur(24px) saturate(180%)",
  border: "1px solid rgba(255, 255, 255, 0.6)",
  boxShadow: `
    0 12px 32px 0 rgba(31, 38, 135, 0.1),
    inset 0 0 0 1px rgba(255, 255, 255, 0.3),
    inset 0 4px 6px rgba(255, 255, 255, 0.9),
    inset 0 -4px 6px rgba(0, 0, 0, 0.05)
  `,
};
