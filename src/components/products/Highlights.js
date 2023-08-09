import React from "react";

const Highlights = ({ highlights }) => {
  return (
    <div className="mt-4">
      <ul className="list-disc space-y-2 pl-4 text-sm">
        {highlights.map((highlight) => (
          <li key={highlight} className="text-gray-400">
            <span className="text-gray-600">{highlight}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Highlights;
