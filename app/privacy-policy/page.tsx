import React from 'react'
import Nav from '../components/nav'
import Footer from '../components/footer'
import Link from 'next/link'
import { ChevronUp } from 'lucide-react'

const page = () => {
  return (
    <>
      <Nav />
      <main className='mx-[25px] space-y-10'>
        <span className='space-y-1'>
          <h1 className='text-6xl text-center'>Privacy Policy</h1>
          <p className='text-center text-sm'>Last Updated October 17th, 2024</p>

        </span>
        <div className='flex md:flex-row flex-col-reverse gap-5'>
          <article className='flex-[0.8] space-y-5'>
            <p className='text-2xl font-medium'>Your privacy is important to us. This Privacy Policy outlines how we handle your information when you use our app.</p>
            <div id='information' className='space-y-2'>
              <h2 className='text-lg font-medium'>Information We Collect</h2>
              <p>We do not collect personal information unless you provide it voluntarily, such as when you create an account or submit your portfolio.</p>
            </div>
            <div id='use-information' className='space-y-2'>
              <h2 className='text-lg font-medium'>How We Use Your Information</h2>
              <p>The information you provide is used solely to operate and improve our app. We do not sell or share your personal information with third parties.</p>
            </div>
            <div id='data-security' className='space-y-2'>
              <h2 className='text-lg font-medium'>Data Security</h2>
              <p>We take reasonable measures to protect your information from unauthorized access and disclosure.</p>
            </div>
            <div id='your-rights' className='space-y-2'>
              <h2 className='text-lg font-medium'>Your Rights</h2>
              <p>You have the right to access and request the deletion of your information at any time. Please contact us at <span className='font-medium'>support@webportfolios.dev</span> if you have any questions or requests.</p>
            </div>
            <div id='changes' className='space-y-2'>
              <h2 className='text-lg font-medium'>Changes to This Privacy Policy</h2>
              <p>We may update this policy occasionally. We will notify you of any significant changes by updating the date at the top of this policy.</p>
            </div>
            <div id='contact-us' className='space-y-2'>
              <h2 className='text-lg font-medium'>Contact Us</h2>
              <p>If you have any questions about this Privacy Policy, please contact us:</p>
              <ul>
                <li>Email: <span className='font-medium'>support@webportfolios.dev</span></li>
              </ul>
            </div>
          </article>
          <aside className='flex-[0.3] relative'>
            <div className='sticky top-4 space-y-5'>
              <h3 className='text-xl font-medium'>Table of contents</h3>
              <div className='flex flex-col gap-1'>
                <Link href='#information' className='link'>1. Information We Collect</Link>
                <Link href='#use-information' className='link'>2. How We Use Your Information</Link>
                <Link href='#data-security' className='link'>3. Data Security</Link>
                <Link href='#your-rights' className='link'>4. Your Rights</Link>
                <Link href='#changes' className='link'>5. Changes to This Privacy Policy</Link>
                <Link href='#contact-us' className='link'>6. Contact Us</Link>
              </div>
              <hr />
              <Link href='/privacy-policy' className='md:flex gap-5 hidden'>
                <ChevronUp />
                Back To Top
              </Link>
            </div>
          </aside>
        </div>
        <Footer />
      </main>
    </>
  )
}

export default page
