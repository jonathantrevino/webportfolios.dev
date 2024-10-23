import { Mail } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const Footer = () => {
  return (
    <footer className='my-[50px] grid grid-cols-3 md:grid-cols-5 gap-5'>
      <div className='col-span-3 md:col-span-2 space-y-5'>
        <Link href="/" className="flex gap-[10px] w-fit">
          <div className="font-medium text-2xl">
            <span className="font-semibold text-primary">.dev</span>
          </div>
        </Link>
        <div className='space-y-2'>
          <span className='flex gap-3 items-center font-light'>
            <Mail size={16} />
            support@webportfolios.dev
          </span>
        </div>
      </div>
      <div className='col-span-1 space-y-5 font-light text-base-content/90'>
        <h5 className='text-sm font-light'>Navigation</h5>
        <div className='space-y-2 flex flex-col text-sm'>
          <Link href='/portfolios' className='hover:text-base-content w-fit'>Portfolios</Link>
          <Link href='/portfolio-components' className='hover:text-base-content w-fit'>Components</Link>
          <Link href='/guides' className='hover:text-base-content w-fit'>Guides</Link>
          <Link href='/roadmap' className='hover:text-base-content w-fit'>Roadmap</Link>
        </div>
      </div>
      {/**
      <div className='col-span-1 space-y-5 font-light text-base-content/90'>
        <h5 className='text-sm font-light'>Company</h5>
        <div className='space-y-2 flex flex-col text-sm'>
          <Link href='/' className='hover:text-base-content w-fit'>Features</Link>
          <Link href='/' className='hover:text-base-content w-fit'>Why Us</Link>
        </div>
      </div>
      **/}
      <div className='col-span-1 space-y-5 font-light text-base-content/90'>
        <h5 className='text-sm font-light'>Support</h5>
        <div className='space-y-2 flex flex-col text-sm'>
          <Link href='/privacy-policy' className='hover:text-base-content w-fit'>Privacy Policy</Link>
          <Link href='/terms-of-service' className='hover:text-base-content w-fit'>Terms of Service</Link>
        </div>
      </div>
      <div className='col-span-3 md:col-span-5 font-light text-base-content/90 text-end'>&copy; 2024 webportfolios.dev</div>
    </footer>
  )
}

export default Footer
