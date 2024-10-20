import React from 'react'

const PortfolioLoad = () => {
  return (
    <div className='w-full col-span-1 space-y-3'>
      <div className='aspect-video skeleton bg-opacity-40'></div>
      <div className="flex items-center gap-4">
        <div className='relative skeleton w-[32px] h-[32px] overflow-hidden rounded-full'>
        </div>
        <div className="space-y-1">
          <h1 className="skeleton w-[120px] h-[15px]">
          </h1>
          <p className="skeleton w-[80px] h-[10px]"></p>
        </div>
      </div>

    </div>
  )
}

export default PortfolioLoad
