import React from "react";
import Placeholder from "./placeholder";

const PlaceholderGrid = () => {
  return (
    <div className="h-full  w-fit grid grid-cols-2 md:grid-cols-3 break:grid-cols-2 gap-2  overflow-hidden relative -z-10 2xl:grid-cols-3 2xl:w-[900px] pl-6">
      {Array(9)
        .fill(0)
        .map((item, index) => (
          <Placeholder index={index} key={index} />
        ))}
    </div>
  );
};

export default PlaceholderGrid;
