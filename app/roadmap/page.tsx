import React from 'react'
import Nav from '../components/nav'
import Footer from '../components/footer'
import NewsletterCta from '../components/newsletterCta'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Development Roadmap',
  description: "Stay updated on the progress of our web app. Explore the features we're currently working on, what's coming next, and completed milestones. Join us on our journey to enhance your experience.",
  keywords: "development roadmap, web app features, project progress, upcoming features, completed milestones, software development, feature updates"
}


const page = () => {
  return (
    <>
      <Nav />
      <main className='px-[25px] space-y-5 mb-[50px]'>
        <span className='text-center'>
          <h1 className='font-medium text-4xl'>Roadmap</h1>
          <p className=''>Features we are working on and planning to work on in the future.</p>
        </span>
        <div id='in-progress' className='space-y-5 py-5'>
          <div>
            <h2 className='text-3xl font-medium'>In progress now</h2>
            <p className='text-primary text-sm'>We are working on these features now.</p>
          </div>
          <hr />
          <ul className='space-y-6'>
            <li>
              <div className='space-y-1'>
                <div className='badge badge-primary'>In Progress</div>
                <h3 className='text-xl'>Optimize images taken</h3>
                <p className='font-light'>Increase site experience by reducing image size of images taken when uploading  portfolio.</p>
              </div>
            </li>
            <li>
              <div className='space-y-1'>
                <div className='badge badge-primary'>In Progress</div>
                <h3 className='text-xl'>Increase volume of guides</h3>
                <p className='font-light'>Including more guides to help users at any level to launch/improve their portfolio.</p>
              </div>
            </li>
            <li>
              <div className='space-y-1'>
                <div className='badge badge-primary'>In Progress</div>
                <h3 className='text-xl'>Develop Portfolio Components</h3>
                <p className='font-light'>Start developing portfolio components to add to the site for users to copy/paste into their own portfolio.</p>
              </div>
            </li>

          </ul>
        </div>
        <div id='next' className='space-y-5 py-5'>
          <div>
            <h2 className='text-3xl font-medium'>Next Planned</h2>
            <p className='text-primary text-sm'>Features planned for the next few months.</p>
          </div>
          <hr />
          <ul className='space-y-6'>
            <li>
              <div className='space-y-1'>
                <h3 className='text-xl'>Recognizing a color palette from portfolio url</h3>
                <p className='font-light'>When portfolio is uploaded, alert user if color palette returned is correct. Allow user to change colors returned and confirm color palette.</p>
              </div>
            </li>
            <li>
              <div className='space-y-1'>
                <h3 className='text-xl'>Implement filtering portfolios by specific color</h3>
                <p className='font-light'>Allow users to browse portfolios and filter by a specific color that must be included or close to the portfolios returned.</p>
              </div>
            </li>
          </ul>
        </div>
        <div id='completed' className='space-y-5 py-5'>
          <div>
            <h2 className='text-3xl font-medium'>Completed</h2>
            <p className='text-primary text-sm'>Features that are live on the site now.</p>
          </div>
          <hr />
          <ul className='space-y-6'>
            <li>
              <div className='space-y-1'>
                <div className='badge badge-primary'>Done</div>
                <h3 className='text-xl'>Add guide to launch website (portfolio) for free</h3>
                <p className='font-light'>Portfolios start with knowing how to launch websites to the internet, this basic guide will allow users to know how to do it for free.</p>
              </div>
            </li>
            <li>
              <div className='space-y-1'>
                <div className='badge badge-primary'>Done</div>
                <h3 className='text-xl'>Allow users to upload their portfolio through their portfolio url</h3>
                <p className='font-light'>Users only need to provide their portfolio url for a post to be made on the site. Images  will be taken for you of your site to maintain the same image quality and sizing throughout the site.</p>
              </div>
            </li>

            <li>
              <div className='space-y-1'>
                <div className='badge badge-primary'>Done</div>
                <h3 className='text-xl'>Implement passwordless sign in</h3>
                <p className='font-light'>The site promises that you can upload a portfolio fast. Having an overly complicated sign in process is a negative experience. Passwordless sign in allows for faster sign in/up with no security downsides.</p>
              </div>
            </li>
          </ul>
        </div>

        <NewsletterCta />
        <Footer />
      </main >
    </>
  )
}

export default page
