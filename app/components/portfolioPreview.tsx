import { PortfolioType } from '@/types'
import { LinkIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

import React from 'react'

const PortfoioPreview = ({ portfolio }: { portfolio: PortfolioType }) => {
  return (
    <div className="space-y-3">
      <Link
        href={`/portfolios/${portfolio.user_id}`}
        target='_blank'
        className="relative"
      >
        <div className="w-full h-fit hover:scale-[1.01] hover:shadow-lg transition-all aspect-video border border-[color:#dbdbdb] relative rounded-md">
          <Image
            className="rounded-md"
            src={portfolio?.photoURL[0]}
            fill
            draggable={false}
            alt="portfolio preview"
          />
        </div>
      </Link>
      <div className="flex justify-between items-center gap-4">
        <div className='flex items-center gap-4'>
          <div className='relative w-[32px] h-[32px] overflow-hidden rounded-full'>
            <Image
              src={portfolio.user_photoURL! || "/default.png"}
              className="absolute w-full object-cover object-center"
              width={32}
              height={32}
              draggable={false}
              alt="portfolio owner"
            />
          </div>
          <div className="">
            <h1 className="text-sm font-semibold">
              {portfolio.user_displayName!}
            </h1>
            <p className="text-xs">{portfolio.user_title!}</p>
          </div>
        </div>
      </div>

    </div>)
}

export default PortfoioPreview
