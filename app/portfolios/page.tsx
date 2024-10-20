"use client";
import React, { useEffect, useState } from "react";
import Nav from "../components/nav";
import { PortfolioType } from "@/types";
import PortfolioPreview from '@/app/components/portfolioPreview';

import { paginatePortfolios } from "../lib/user";
import Image from "next/image";
import { Eye, LinkIcon, Loader } from "lucide-react";
import Link from "next/link";
import Footer from "../components/footer";
import PortfolioLoad from "../components/portfolioLoad";

const page = () => {
  const [loading, setLoading] = useState<boolean>(true)
  const [portfolios, setPortfolios] = useState<PortfolioType[] | null>(null);
  const [portfolioCategory, setPortfolioCategory] = useState(null);
  const [lastPortfolio, setLastPortfolio] = useState<any>(null)
  const [shouldFetch, setShouldFetch] = useState(false)
  const [hasMore, setHasMore] = useState(true);
  useEffect(() => {
    if (!portfolios) {
      handlePortfolios();
    }
  }, []);

  useEffect(() => {
    // When portfolioCategory changes, reset portfolios and lastPortfolio
    setPortfolios(null);
    setLastPortfolio(null);
    setShouldFetch(true); // Trigger the fetching
  }, [portfolioCategory]);

  useEffect(() => {
    // Fetch portfolios only when shouldFetch is true
    if (shouldFetch) {
      handlePortfolios();
      setShouldFetch(false); // Reset the flag after fetching
    }
  }, [shouldFetch]); async function handlePortfolios() {
    setLoading(true)
    const response = await paginatePortfolios(portfolioCategory, lastPortfolio);


    if (!response) { setLoading(false); setHasMore(false); return };

    if (response.portfolios.length < 5) {
      setHasMore(false)
    }

    setPortfolios(prevPortfolios => {
      // Create a new array to avoid mutating the previous state
      const updatedPortfolios = prevPortfolios ? [...prevPortfolios] : [];

      // Create a set of existing user_ids
      const existingIds = new Set(updatedPortfolios.map(p => p.user_id));

      // Push new portfolios into the new array only if the user_id is unique
      for (const newPortfolio of response.portfolios) {
        if (!existingIds.has(newPortfolio.user_id)) {
          updatedPortfolios.push(newPortfolio);
        }
      }

      // Return the updated array
      return updatedPortfolios;
    });
    setLastPortfolio(response.lastDocument)
    setLoading(false)
  }
  return (
    <>
      <Nav />
      <main className="px-[25px] space-y-5 mb-[50px]">
        <div className='flex justify-between items-end gap-5'>
          <div className='space-y-3'>
            <p className='font-medium'>
              Filters
            </p>
            <select className="select select-bordered w-fit " value={portfolioCategory ? portfolioCategory : 'Category'} onChange={(e: any) => { setPortfolioCategory(e.target.value) }}>
              <option disabled>Category</option>
              <option>Software Engineer</option>
              <option>Front End Developer</option>
              <option>Back End Developer</option>
              <option>Full Stack Developer</option>
              <option>Web Developer</option>
            </select>
          </div>
          <button className='link text-sm' onClick={() => { setPortfolioCategory(null); setHasMore(true) }}>Clear Fliters</button>
        </div>
        <section className="w-full grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5 pb-[30px]">
          {portfolios ?
            portfolios.map((portfolio: PortfolioType, index: number) => (
              <PortfolioPreview portfolio={portfolio} key={index} />
            )) :
            ''
          }

          {loading ? Array.from({ length: 6 }).map((_, index) => (
            <div key={index}>
              <PortfolioLoad />
            </div>
          )) : ''}

          {portfolios && hasMore ?
            <div className='flex justify-center col-span-1 lg:col-span-2 xl:col-span-3'>
              {!loading ?
                <button className='btn btn-primary w-full' onClick={handlePortfolios}>Load More</button>
                :
                <div className='flex gap-3 text-base-content'><Loader className='animate-spin' /><p>Loading More</p></div>
              }

            </div>
            : loading && <div className='h-[48px] w-full skeleton col-span-1 lg:col-span-2 xl:col-span-3'></div>
          }
        </section>
        <Footer />
      </main>
    </>
  );
};

export default page;
