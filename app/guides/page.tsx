import React from 'react'
import Nav from '../components/nav'
import Footer from '../components/footer'
import GuidePreview from '../components/guidePreview'

const page = () => {
  return (
    <>
      <Nav />
      <main className='px-[25px] space-y-5 mb-[50px]'>
        <div className='h-full space-y-5'>
          <span className='text-center'>
            <h1 className='font-medium text-4xl'>Elevate Your Portfolio with Our Curated Guides</h1>
            <p>Explore resources designed for every stage of your journey.</p>
          </span>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 h-fit'>
            <GuidePreview image_url={'/thumbnail.webp'} redirect_url={'/guides/launch-website-in-under-5-minutes'} title={'Launch a website in under 5 minutes'} description={'Learn how to upload your website for free in under 5 minutes with minimal programming knowledge using GitHub Pages! This guide provides simple steps to get your site live quickly and easily, perfect for beginners.'} badges={['Beginner']} />
          </div>
        </div>
        <Footer />
      </main>
    </>
  )
}

export default page