import React from 'react'
import Nav from '../components/nav'
import Footer from '../components/footer'
import Link from 'next/link'
import { ChevronUp } from 'lucide-react'

const page = () => {
  return (
    <>
      <Nav />
      <main className='mx-[25px] mb-[50px] space-y-10'>
        <span className='space-y-1'>
          <h1 className='text-6xl text-center'>Terms of Service</h1>
          <p className='text-center text-sm'>Last Updated October 17th, 2024</p>

        </span>
        <div className='flex md:flex-row flex-col-reverse gap-5'>
          <article className='flex-[0.8] space-y-5'>
            <p className='text-2xl font-medium'>These Terms of Service outline the rules and guidelines for your use of our platform. By accessing or using our platform, you agree to comply with these Terms. If you do not agree with any part of these Terms, please do not use our services.</p>
            <div id='acceptance' className='space-y-2'>
              <h2 className='text-lg font-medium'>Acceptance of Terms</h2>
              <p>By using <span className='font-medium'>webportfolios.dev</span>, you agree to these Terms and any additional guidelines or policies that we may establish from time to time.</p>
            </div>
            <div id='services' className='space-y-2'>
              <h2 className='text-lg font-medium'>Services Provided</h2>
              <div className='space-y-2'>
                <p><span className='font-medium'>webportfolios.dev</span> provides a platform for users to:</p>
                <ul className='list-disc pl-6'>
                  <li>Explore real-world portfolio websites for inspiration.</li>
                  <li>Upload their own portfolios for exposure.</li>
                  <li>Utilize pre-buuilt JSX components for portfolio development.</li>
                  <li>Access analytics of total and unique views of their portfolio.</li>
                </ul>
              </div>
            </div>
            <div id='user-responsibilities' className='space-y-2'>
              <h2 className='text-lg font-medium'>User Responsibilities</h2>
              <div className='space-y-2'>
                <p>While using <span className='font-medium'>webportfolios.dev</span> you agree to:</p>
                <ul className='list-disc pl-6'>
                  <li>You respect the rights and privacy of other users.</li>
                  <li>Share content that is relevant and appropriate.</li>
                  <li>Not engage in any illegal activities or violate any applicable laws.</li>
                </ul>
              </div>
            </div>
            <div id='ownership' className='space-y-2'>
              <h2 className='text-lg font-medium'>Content Ownership and License</h2>
              <p>You retain ownership of any content you upload to <span className='font-medium'>webportfolios.dev</span>. By using our services, you grant us a worldwide, non-exclusive, royalty-free license to dispaly your content in connection with our platform.</p>
            </div>
            <div id='termination' className='space-y-2'>
              <h2 className='text-lg font-medium'>Termination</h2>
              <p>We reserve the right to suspend or terminate your account and access to <span className='font-medium'>webportfolios.dev</span> at any time and for any reason, without prior notice.</p>
            </div>
            <div id='disclaimers' className='space-y-2'>
              <h2 className='text-lg font-medium'>Disclaimers</h2>
              <p><span className='font-medium'>webportfolios.dev</span> is provided "as is" without any warranties of any kind. We do not  guarantee that the platform will be uninterrupted or error-free. We are not liable for any indrect, incidental, or consequential damages arising from your use of our services.</p>
            </div>
            <div id='changes' className='space-y-2'>
              <h2 className='text-lg font-medium'>Changes to These Terms</h2>
              <p>We may update these Terms from time to time. If we make changes, we will notify you by revising the "Effective Date" at the top of this document. Your continued use of <span className='font-medium'>webportfolios.dev</span> after any changes constitutes your acceptance of the new Terms.</p>
            </div>
            <div id='contact-us' className='space-y-2'>
              <h2 className='text-lg font-medium'>Contact Us</h2>
              <p>If you have any questions about these Terms, please contact us at <span className='font-medium'>webportfolios.dev</span>.</p>
            </div>

          </article>
          <aside className='flex-[0.3] relative'>
            <div className='sticky top-4 space-y-5'>
              <h3 className='text-xl font-medium'>Table of contents</h3>
              <div className='flex flex-col gap-1'>
                <Link href='#acceptance' className='link'>1. Acceptance of Terms</Link>
                <Link href='#services' className='link'>2. Services Provided</Link>
                <Link href='#user-responsibilities' className='link'>3. User Responsibilities</Link>
                <Link href='#ownership' className='link'>4. Content Ownership and License</Link>
                <Link href='#termination' className='link'>5. Termination</Link>
                <Link href='#disclaimers' className='link'>6. Disclaimers</Link>
                <Link href='#changes' className='link'>7. Changes to These Terms</Link>
                <Link href='#contact-us' className='link'>8. Contact Us</Link>
              </div>
              <hr />
              <Link href='/terms-of-service' className='md:flex gap-5 hidden'>
                <ChevronUp />
                Back To Top
              </Link>
            </div>
          </aside>
        </div >
        <Footer />
      </main >
    </>
  )
}

export default page
