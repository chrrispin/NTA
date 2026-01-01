import React from "react";

const BadgeLive: React.FC = () => (
  <div
    className="absolute bottom-2 left-2 inline-flex items-center justify-center gap-1 px-2 py-1 rounded-lg bg-red-600/90 text-white shadow-md"
    aria-label="Live now"
  >
    <i className="bi bi-dot text-white text-xl" />
    <span className="text-xs font-bold tracking-wide leading-none">LIVE</span>
  </div>
);

export default BadgeLive;
