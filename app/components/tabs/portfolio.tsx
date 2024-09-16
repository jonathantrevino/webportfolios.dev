import React, { useEffect, useState } from "react";
import UploadCta from "../uploadcta";
import { uploadPortfolio, usersPortfolio } from "@/app/lib/user";
import { Eye, Heart, LinkIcon } from "lucide-react";
import { PortfolioType } from "@/types";
import Image from "next/image";

interface Props {
  user_id: string;
}
const Portfolio = ({ user_id }: Props) => {
  const [portfolioTemp, setPortfolioTemp] = useState(null);
  const [portfolio, setPortfolio] = useState<PortfolioType | null>(null);
  const [isCheckingPortfolio, setIsCheckingPortfolio] = useState<boolean>(true);

  useEffect(() => {
    const checkPortfolio = async () => {
      await handleUsersPortfolio();
      setIsCheckingPortfolio(false);
    };
    checkPortfolio();
  }, [user_id]);

  async function handleUploadPortfolio() {
    const response = await uploadPortfolio(portfolioTemp!, user_id);
  }

  async function handleUsersPortfolio() {
    const response = await usersPortfolio(user_id);

    if (!response) return null;
    setPortfolio({
      likes: response.likes,
      photoURL: response.photoURL,
      portfolioURL: response.portfolioURL,
      user_id: response.user_id,
      views: response.views,
    });
  }

  return (
    <div className="space-y-[23px]">
      {!isCheckingPortfolio && !portfolio && (
        <UploadCta area={"profile-portfolio"} />
      )}

      {!isCheckingPortfolio && portfolio && (
        <div className="space-y-[23px]">
          <div className="relative">
            <div className="w-full h-full aspect-video border border-[color:#DBDBDB] relative">
              <Image
                src={portfolio?.photoURL[0]}
                fill
                alt="portfolio preview"
              />
            </div>

            <div
              className="tooltip absolute top-4 left-4"
              data-tip="Portfolio Status"
            >
              <div className="badge badge-success badge-outline !rounded-md">
                Active
              </div>
            </div>

            <div className="absolute bottom-4 right-4 flex gap-2">
              <div className="tooltip" data-tip="View Post">
                <a
                  role="button"
                  href={`/portfolios/${portfolio.user_id}`}
                  className="btn btn-sm"
                >
                  <Eye />
                </a>
              </div>
              <div className="tooltip" data-tip="Like Portfolio">
                <a
                  role="button"
                  target="_blank"
                  href={portfolio?.portfolioURL}
                  className="btn btn-sm"
                >
                  <Heart />
                </a>
              </div>
              <div className="tooltip" data-tip="View Portfolio">
                <a
                  role="button"
                  target="_blank"
                  href={portfolio?.portfolioURL}
                  className="btn btn-sm"
                >
                  <LinkIcon />
                </a>
              </div>
            </div>
          </div>
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
      )}
      <div className="space-y-3">
        <div className="flex-[1] flex flex-col space-y-[3px]">
          <label className="text-sm">Portfolio URL</label>
          <input
            type="text"
            value={
              portfolioTemp
                ? portfolioTemp
                : portfolio
                  ? portfolio.portfolioURL
                  : "https://www.example.com"
            }
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
            onClick={() => handleUploadPortfolio()}
          >
            Upload Portfolio
          </button>
        </div>
      </div>
    </div>
  );
};

export default Portfolio;
