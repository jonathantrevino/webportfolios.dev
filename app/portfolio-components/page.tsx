import React from 'react'
import Nav from '../components/nav'
import Footer from '../components/footer'
import Link from 'next/link'

const page = () => {
  return (
    <>
      <Nav />
      <main className='px-[25px] space-y-5 h-screen mb-[50px] py-[96px]'>
        <div className='h-full flex flex-col items-center space-y-3'>
          <div className='badge badge-warning bg-opacity-40 badge-md'>Coming Soon 🚧</div>
          <h1 className='text-center text-4xl'>
            Page Is Currently Under Construction
          </h1>
          <p>In the meantime, feel free to explore our <Link href='/' className='link'>homepage</Link> or check out our <Link href='/portfolios' className='link'>latest portfolios</Link>.</p>
          <p className='text-sm font-light'>Expected completion date is October 21st 2024</p>
        </div>
        <Footer />
      </main>
    </>
  )
}

export default page
