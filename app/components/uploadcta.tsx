import React from "react";

const UploadCta = () => {
  return (
    <div role="alert" className="alert shadow-lg">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        className="stroke-info h-6 w-6 shrink-0"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        ></path>
      </svg>
      <div>
        <h3 className="font-bold">Upload Your Own Portfolio</h3>
        <div className="text-xs">
          Ready to showcase your portfolio and make a memorable impression? With
          just a simple URL, you can have your portfolio transformed into a
          stunning visual showcase - automatically!
        </div>
      </div>
      <button className="btn btn-sm">See</button>
    </div>
  );
};
export default UploadCta;
