import React, { useEffect, useState } from "react";
import {
  checkUserUpdate,
  uploadPortfolio,
  usersPortfolio,
} from "@/app/lib/user";
import { ChartLine, Eye, Heart, LinkIcon, SearchSlash } from "lucide-react";
import { PortfolioType } from "@/types";
import Image from "next/image";
import { auth } from "@/app/lib/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

interface Props {
  user_id: string;
}
const Portfolio = ({ user_id }: Props) => {
  const [user, loading] = useAuthState(auth);
  const [portfolioTemp, setPortfolioTemp] = useState<string | null>(null);
  const [portfolio, setPortfolio] = useState<PortfolioType | null>(null);
  const [isCheckingPortfolio, setIsCheckingPortfolio] = useState<boolean>(true);
  const [update, setUpdate] = useState<{
    status: string;
    statusCode: number;
    statusMessage: string;
  } | null>(null);
  const validURL = new RegExp('^(https?://)?([a-zA-Z0-9.-]+).([a-zA-Z]{2,})(/[^\s]*)?$')

  useEffect(() => {
    const checkPortfolio = async () => {
      await handleUsersPortfolio();
      setIsCheckingPortfolio(false);
    };

    checkPortfolio();
    startUpdateLoop();
  }, [user_id]);

  function startUpdateLoop() {
    setUpdate(null);
    setPortfolio(null);
    const intervalId = setInterval(async () => {
      try {
        const response = await checkUserUpdate(user_id);
        if (response && response.statusCode !== 0) {
          setUpdate({
            status: response.status,
            statusCode: response.statusCode,
            statusMessage: response.statusMessage,
          });
          if (response.statusCode === 200) {
            handleUsersPortfolio();
          }
          clearInterval(intervalId);
        } else if (response) {
          setUpdate({
            status: response.status,
            statusCode: response.statusCode,
            statusMessage: response.statusMessage,
          });
        } else if (!response && !portfolio) {
          setUpdate({
            status: "",
            statusCode: -1,
            statusMessage: "No update in db",
          });

          clearInterval(intervalId);
        }
      } catch (error) {
        console.log("Error checking user updates");
      }
    }, 10000);

    return () => clearInterval(intervalId);
  }
  async function handleUploadPortfolio() {
    const firebase_id = await user!.getIdToken();
    startUpdateLoop();
    const response = await uploadPortfolio(
      portfolioTemp!,
      user_id,
      firebase_id,
    );
    if (response) {
      handleUsersPortfolio();
    }
  }

  async function handleUsersPortfolio() {
    const response = await usersPortfolio(user_id);
    if (!response) return null;
    setPortfolio({
      likes: response.likes,
      photoURL: response.photoURL,
      portfolioURL: response.portfolioURL,
      user_id: response.user_id,
      totalViews: response.totalViews,
      uniqueViews: response.uniqueViews,
    });
  }

  return (
    <div className="space-y-[23px]">
      <div className="space-y-3">
        <div className="flex-[1] flex flex-col space-y-[3px]">
          <label className="text-sm">Portfolio URL</label>
          <input
            type="text"
            placeholder={
              portfolio?.portfolioURL
                ? portfolio.portfolioURL
                : "https://www.example.com"
            }
            className="input input-bordered"
            onChange={(e: any) => setPortfolioTemp(e.target.value)}
          />
        </div>
        <div className="flex justify-end">
          <button
            className="btn btn-primary btn-sm"
            onClick={() => handleUploadPortfolio()}
          >
            Upload Portfolio
          </button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row-reverse justify-between gap-5">
        <div className="flex-[0.3] flex flex-col gap-5">
          <div className="border border-[color:#DBDBDB] h-fit rounded-md p-4 space-y-3">
            <div className="flex justify-between items-center">
              <h2 className="text-sm">Portfolio Status</h2>
              <div
                className={`badge badge-sm badge-outline ${!update ? "badge-neutral" : update?.statusCode === 0 ? "badge-warning" : update?.statusCode === 200 ? "badge-success" : "badge-error"}`}
              >
                {!update ? "Loading" : update.status}
              </div>
            </div>
            <div className="flex justify-between items-center">
              <h2 className="text-sm flex-[0.5]">Portfolio URL</h2>
              <a
                target="_blank"
                href={portfolio?.portfolioURL}
                className="text-xs text-end flex-[0.5] w-min truncate link link-primary"
              >
                {portfolio?.portfolioURL}
              </a>
            </div>
          </div>
          <div className="border border-[color:#DBDBDB] h-fit rounded-md p-4 space-y-3">
            <div className="text-sm flex justify-between flex-wrap">
              <h2>Unique Visits</h2>
              <p>{portfolio?.uniqueViews}</p>
            </div>
            <div className="text-sm flex justify-between flex-wrap">
              <h2>Total Visits</h2>
              <p>{portfolio?.totalViews}</p>
            </div>
          </div>
        </div>

        {!isCheckingPortfolio && portfolio ? (
          <div className="space-y-[23px] w-full flex-[0.7]">
            <div className="relative">
              <div className="w-full h-full aspect-video border border-[color:#DBDBDB] relative rounded-md">
                <Image
                  className="rounded-md"
                  src={portfolio?.photoURL[0]}
                  fill
                  alt="portfolio preview"
                />
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
            {/* <div className="w-full p-6 border border-[color:#DBDBDB] rounded-md"> */}
            {/*   <span className="flex justify-between items-center"> */}
            {/*     <p className="text-sm font-medium">Post Impressions</p> */}
            {/*     <div role="tablist" className="tabs tabs-boxed tabs-xs"> */}
            {/*       <a role="tab" className="tab tab-active"> */}
            {/*         Monthly */}
            {/*       </a> */}
            {/*       <a role="tab" className="tab"> */}
            {/*         Daily */}
            {/*       </a> */}
            {/*     </div> */}
            {/*   </span> */}
            {/* </div> */}
          </div>
        ) : (
          <div className="space-y-[23px] flex-[0.7]">
            <div className="relative">
              <div className="w-full h-full aspect-video border border-[color:#DBDBDB] relative rounded-md">
                <div className="w-full h-full flex justify-center items-center">
                  <div className="flex items-center gap-3 text-[color:#B0B0B0]">
                    <SearchSlash size={24} />
                    No Portfolio Found
                  </div>
                </div>{" "}
              </div>
            </div>
            {/* <div className="w-full p-6 border border-[color:#DBDBDB] rounded-md"> */}
            {/*   <span className="flex justify-between items-center"> */}
            {/*     <p className="text-sm font-medium">Post Impressions</p> */}
            {/*     <div role="tablist" className="tabs tabs-boxed tabs-xs"> */}
            {/*       <a role="tab" className="tab tab-active"> */}
            {/*         Monthly */}
            {/*       </a> */}
            {/*       <a role="tab" className="tab"> */}
            {/*         Daily */}
            {/*       </a> */}
            {/*     </div> */}
            {/*   </span> */}
            {/*   <div className="flex justify-center items-center gap-3 text-[color:#B0B0B0]"> */}
            {/*     <ChartLine size={24} /> */}
            {/*     No Data Available */}
            {/*   </div> */}
            {/* </div> */}
          </div>
        )}
      </div>
    </div>
  );
};

export default Portfolio;
