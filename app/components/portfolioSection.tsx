'use client'
import React, { useEffect, useState } from 'react'
import { paginatePortfolios } from '../lib/user';
import { PortfolioType } from '@/types';
import { Loader } from 'lucide-react';
import PortfolioPreview from './portfolioPreview';
import PortfolioLoad from './portfolioLoad';

const PortfolioSection = ({ initialPortfolios, lastDocument, hasMoreInitially }: { initialPortfolios: any[], lastDocument: any, hasMoreInitially: boolean }) => {
  const [loading, setLoading] = useState<boolean>(false)
  const [portfolios, setPortfolios] = useState<PortfolioType[] | null>(initialPortfolios);
  const [portfolioCategory, setPortfolioCategory] = useState(null);
  const [lastPortfolio, setLastPortfolio] = useState<any>(lastDocument ? lastDocument : null)
  const [shouldFetch, setShouldFetch] = useState(false)
  const [hasMore, setHasMore] = useState(hasMoreInitially);
  console.log(lastPortfolio)

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
  }, [shouldFetch]);
  async function handlePortfolios() {
    setLoading(true)
    const response = await paginatePortfolios(portfolioCategory, lastPortfolio);

    console.log(response)

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
      <span className='text-center bg-red-50'>
        <h1 className='font-medium text-4xl'>Diverse Portfolios For Your Inspiration</h1>
        <p>Browse real developer portfolios.</p>
      </span>
      <div className='flex justify-between items-end gap-5'>

        <div className='space-y-3' aria-label='Portfolio Search Filters'>
          <select className="select select-bordered w-fit " value={portfolioCategory ? portfolioCategory : 'Category'} onChange={(e: any) => { setPortfolioCategory(e.target.value) }}>
            <option disabled>Category</option>
            <option>Software Engineer</option>
            <option>Front End Developer</option>
            <option>Back End Developer</option>
            <option>Full Stack Developer</option>
            <option>Web Developer</option>
          </select>
        </div>
        <button className={`link text-sm ${!portfolioCategory ? 'hidden' : ''}`} onClick={() => { setPortfolioCategory(null); setHasMore(true); }}>Clear Filters</button>
      </div>
      <section className="w-full grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5 pb-[30px] min-h-[624px]">
        {portfolios ?
          portfolios.map((portfolio: PortfolioType, index: number) => (
            <PortfolioPreview portfolio={portfolio} key={index} />
          )) :
          !portfolios && !loading &&
          <div className='flex justify-center col-span-1 lg:col-span-2 xl:col-span-3'><p>No portfolios found for <span className='font-medium'>{portfolioCategory}</span></p></div>
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
    </>

  )
}

export default PortfolioSection
