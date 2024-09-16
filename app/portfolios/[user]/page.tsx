"use client";
import Nav from "@/app/components/nav";
import { usersPortfolio, viewPortfolio } from "@/app/lib/user";
import { PortfolioType } from "@/types";
import { Eye, Heart, LinkIcon } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const page = ({ params }: { params: { user: string } }) => {
  const [portfolio, setPortfolio] = useState<PortfolioType | null>(null);
  const [isCheckingPortfolio, setIsCheckingPortfolio] = useState<boolean>(true);

  useEffect(() => {
    console.log(params.user);
    const checkPortfolio = async () => {
      await handleUsersPortfolio();
      setIsCheckingPortfolio(false);
    };
    checkPortfolio();
  }, [params.user]);

  async function handleUsersPortfolio() {
    const response = await viewPortfolio(params.user);

    console.log("before");
    if (!response) return null;
    console.log("after");
    setPortfolio({
      likes: response.likes,
      photoURL: response.photoURL,
      portfolioURL: response.portfolioURL,
      user_id: response.user_id,
      views: response.views,
    });
  }

  return (
    <>
      <Nav />
      <main className="flex break:flex-row max-w-[1440px] w-3/4 mx-auto flex-col h-full lg:h-[calc(100vh-97px)] gap-10 lg:gap-0">
        <section className="pt-24 w-full">
          {!isCheckingPortfolio && portfolio && (
            <div className="space-y-[23px]">
              <div className="flex justify-end gap-2">
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
              </div>
            </div>
          )}
        </section>
      </main>
    </>
  );
};

export default page;
