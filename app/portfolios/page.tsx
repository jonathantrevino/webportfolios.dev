"use client";
import React, { useEffect, useState } from "react";
import Nav from "../components/nav";
import { PortfolioType } from "@/types";
import { paginatePortfolios } from "../lib/user";
import Image from "next/image";
import { Eye, LinkIcon } from "lucide-react";
import Profile from "../components/profile";
import Link from "next/link";

const page = () => {
  const [portfolios, setPortfolios] = useState<PortfolioType[] | null>(null);
  useEffect(() => {
    handlePortfolios();
  }, []);
  async function handlePortfolios() {
    const response = await paginatePortfolios(null);
    if (!response) return;
    setPortfolios(response);
  }
  return (
    <>
      <Nav />
      <main className="flex break:flex-row max-w-[1440px] w-3/4 mx-auto flex-col  gap-10 lg:gap-0">
        <section className="pt-24 w-full grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
          {portfolios &&
            portfolios.map((portfolio: PortfolioType) => (
              <div className="space-y-3">
                <Link
                  href={`/portfolios/${portfolio.user_id}`}
                  className="relative"
                >
                  <div className="w-full h-fit hover:scale-[1.01] hover:shadow-lg transition-all aspect-video border border-[color:#DBDBDB] relative rounded-md">
                    <Image
                      className="rounded-md"
                      src={portfolio?.photoURL[0]}
                      fill
                      draggable={false}
                      alt="portfolio preview"
                    />
                  </div>

                  <div className="absolute bottom-4 right-4 flex gap-2">
                    {/* <div className="tooltip" data-tip="View Post"> */}
                    {/*   <a */}
                    {/*     role="button" */}
                    {/*     href={`/portfolios/${portfolio.user_id}`} */}
                    {/*     className="btn btn-sm " */}
                    {/*   > */}
                    {/*     <Eye /> */}
                    {/*   </a> */}
                    {/* </div> */}
                    <div className="tooltip" data-tip="View Portfolio">
                      <a
                        href={portfolio?.portfolioURL}
                        target="_blank"
                        className="btn btn-sm"
                        onClick={(e: any) => e.stopPropagation()}
                      >
                        <LinkIcon />
                      </a>
                    </div>
                  </div>
                </Link>
                <div className="flex items-center gap-4">
                  <Image
                    src={portfolio.user_photoURL!}
                    className="rounded-full"
                    width={32}
                    height={32}
                    draggable={false}
                    alt="portfolio owner"
                  />
                  <div className="">
                    <h1 className="text-sm font-semibold">
                      {portfolio.user_displayName!}
                    </h1>
                    <p className="text-xs">{portfolio.user_title!}</p>
                  </div>
                </div>
              </div>
            ))}
        </section>
      </main>
    </>
  );
};

export default page;
