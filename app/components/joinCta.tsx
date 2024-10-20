import Link from 'next/link'
import React from 'react'

const JoinCta = () => {
  return (
    <div className='my-[50px] animate-gradient-opposite-animation delay-500 shadow-xl rounded-3xl bg-[length:150%_150%] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-error-content/95 via-neutral to-error-content p-24 py-12 flex flex-col items-center space-y-[13px]'>
      <h5 className='text-3xl text-base-300 text-center'>
        Ready to Showcase?
      </h5>
      <p className='text-md text-base-300/90 text-center'>
        Sign Up, Upload Your Portfolio, and Boost Your Visibility to New Opportunities
      </p>
      <Link href='/get-started' className='btn btn-primary btn-md'>
        Get Started
      </Link>
    </div>
  )
}

export default JoinCta
