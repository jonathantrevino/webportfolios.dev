'use client'
import { getRecentPortfolios } from '../lib/portfolio';
import { PortfolioType } from '@/types';
import Link from 'next/link';
import PortfoioPreview from './portfolioPreview';
import PortfolioLoad from './portfolioLoad';

const RecentPortfolios = ({ portfoliosList }: { portfoliosList: PortfolioType[] }) => {
  console.log(portfoliosList)
  return (
    <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      {portfoliosList && portfoliosList?.map((portfolio, index) => (
        <PortfoioPreview portfolio={portfolio} key={index} />
      ))
      }
      {portfoliosList && portfoliosList.length > 0 && (
        <li>
          <Link href='/portfolios' className='w-full min-h-[44px] h-[calc(100%-44px)] bg-primary-content/50 border border-primary/50 text-primary rounded-lg flex justify-center items-center space-x-2 relative transition-all ease-in-out hover:shadow-md group'>
            <p className='group-hover:scale-[1.05] delay-100 ease-in transition-all'>View 127 More</p>        </Link>
        </li>
      )}
    </ul >
  );
};


export default RecentPortfolios