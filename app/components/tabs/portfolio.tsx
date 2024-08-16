import { FileWarning } from "lucide-react";
import React, { useState } from "react";

const Portfolio = () => {
  const [portfolio, setPortfolio] = useState(null);
  return (
    <div className="space-y-3">
      <div className="flex-[1] flex flex-col space-y-[3px]">
        <label className="text-sm">Portfolio URL</label>
        <input
          type="text"
          placeholder={"https://www.example.com"}
          className="input input-bordered"
        />
      </div>
      <div className="flex justify-end">
        <button className="btn btn-primary btn-sm">Upload Portfolio</button>
      </div>
    </div>
  );
};

export default Portfolio;
