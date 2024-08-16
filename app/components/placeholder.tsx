import React from "react";

type PlaceholderProps = {
  index: number;
};
const Placeholder = ({ index }: PlaceholderProps) => {
  return (
    <div
      className={`w-[180px] h-[250px] lg:w-[280px] skeleton  lg:h-[350px]  !rounded-xl shadow-md`}
      // className={` w-[180px] h-[250px] lg:w-[280px] skeleton  lg:h-[350px]  !rounded-xl`}
    ></div>
  );
};

export default Placeholder;
