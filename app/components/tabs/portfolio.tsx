import React, { useState } from "react";
import UploadCta from "../uploadcta";
import { uploadPortfolio } from "@/app/lib/user";
import { EllipsisVertical } from "lucide-react";

interface Props {
  user_id: string;
}
const Portfolio = ({ user_id }: Props) => {
  const [portfolio, setPortfolio] = useState(null);
  const [portfolioTemp, setPortfolioTemp] = useState(null);

  return (
    <div className="space-y-[23px]">
      <UploadCta area={"profile-portfolio"} />
      <div className="space-y-3">
        <div className="flex-[1] flex flex-col space-y-[3px]">
          <label className="text-sm">Portfolio URL</label>
          <input
            type="text"
            placeholder={"https://www.example.com"}
            className="input input-bordered"
            onChange={(e: any) => setPortfolioTemp(e.target.value)}
          />
        </div>
        <div className="flex justify-end">
          <button
            className="btn btn-primary btn-sm"
            disabled={
              portfolioTemp
                ? portfolioTemp && portfolioTemp.includes(".")
                  ? false
                  : true
                : true
            }
            onClick={() => uploadPortfolio(portfolioTemp!, user_id)}
          >
            Upload Portfolio
          </button>
        </div>
      </div>
      <div></div>
      <div className="w-full p-6 border border-[color:#DBDBDB] rounded-md">
        <span className="flex justify-between items-center">
          <p className="text-sm font-medium">Post Impressions</p>
          <div role="tablist" className="tabs tabs-boxed tabs-xs">
            <a role="tab" className="tab tab-active">
              Monthly
            </a>
            <a role="tab" className="tab">
              Daily
            </a>
          </div>
        </span>
      </div>
    </div>
  );
};

export default Portfolio;
