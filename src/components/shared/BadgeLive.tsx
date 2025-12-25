import React from "react";

const BadgeLive: React.FC = () => (
  <div className="absolute bottom-2 left-2 flex items-center justify-between p-1.5 w-15 rounded shadow">
    <i className="bi bi-dot text-red-600 text-3xl -m-3" />
    <b className="text-xL text-red-500">NOW</b>
  </div>
);

export default BadgeLive;
