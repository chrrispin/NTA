import React from "react";

const BadgeLive: React.FC = () => (
  <div className="absolute top-26 left-0 bg-white flex items-center justify-between p-1.5 w-22">
    <i className="bi bi-dot text-red-600 text-3xl -m-3" />
    <b className="text-xs text-red-500">LIVE UPDATES</b>
  </div>
);

export default BadgeLive;
