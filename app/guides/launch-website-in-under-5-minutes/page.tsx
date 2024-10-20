import Footer from '@/app/components/footer'
import Nav from '@/app/components/nav'
import { ChevronUp, Images } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import Image from 'next/image'

export const metadata = {
  title: 'How to Launch and Host a Website for Free in Under 5 minutes',
  description: 'Learn how to launch and host a website for free in under 5 minutes using GitHub Pages. Perfect for beginners and anyone looking for free web hosting.',
  openGraph: {
    title: 'How to Launch and Host a Website for Free in Under 5 minutes',
    description: 'Learn how to launch and host a website for free in under 5 minutes using GitHub Pages. Perfect for beginners and anyone looking for free web hosting.',
    images: [
      {
        url: '/thumbnail.webp',
        width: 1200,
        height: 630,
        alt: 'Thumbnail for launching a website for free in under 5 minutes'
      }
    ]

  }
}

const page = () => {
  return (
    <>
      <Nav />
      <main className='mx-[25px] space-y-10 mb-[50px]'>
        <span className='space-y-1'>
          <div className='aspect-video object-cover relative overflow-hidden mb-5'>
            <Image className='object-cover border' src='/thumbnail.webp' fill alt="Thumbnail" />
          </div>
          <h1 className='text-4xl text-center'>How to Launch and Host a Website for Free in Under 5 minutes</h1>
          <p className='text-center text-sm'>Updated October 17th, 2024</p>

        </span>
        <div className='flex md:flex-row flex-col-reverse gap-5'>
          <article className='flex-[0.8] space-y-5'>
            <div id='introduction' className='space-y-2'>
              <h2 className='text-lg font-medium'>Introduction</h2>
              <p>Are you ready to launch a website for free? Whether you're just starting out or looking for a quick, budget-friendly solution, this guide will show you how to get a website live in under 5 minutes. Using GitHub Pages and Visual Studio Code, you'll have access to free web hosting, and the best part? It's easy and beginner-friendly. Follow along with these simple steps, and you’ll have your site up and running in no time.</p>
            </div>
            <div id='install-visual-studio' className='space-y-6'>
              <div className='space-y-2'>
                <h2 className='text-lg font-medium'>Step 1. Download and Install Visual Studio Code</h2>
                <p>Before creating your website, you will need a reliable code editor. Visual Studio Code (VS Code) is a free, lightweight, and powerful code editor developed by Microsoft. It's widely used by developers for its ease of use, vast extensions library, and built-in support for Git, making it a perfect tool for launching and managing websites</p>
              </div>
              <div className='space-y-2'>
                <h3 className='font-medium'>How to Download VS Code:</h3>
                <ul className='list-decimal pl-8 space-y-1'>
                  <li>Head over to the <a href='https://code.visualstudio.com/' target='_blank' className='link link-primary'>Visual Studio Code Website</a></li>
                  <div className='relative w-full aspect-video'><Image src='/visual_studio_code_homepage.webp' fill alt='Visual Studio Codes Website Homepage' /></div>
                  <li className='pt-5'>Click on the <strong>Download</strong> button and choose your operating system (Windows, macOS, or Linux)</li>
                  <li>Once downloaded, follow the installation instructions to set it up on your computer</li>
                </ul>
              </div>
            </div>
            <div id='create-github-account' className='space-y-6'>
              <div className='space-y-2'>
                <h2 className='text-lg font-medium'>Step 2. Create a Free GitHub Account</h2>
                <p>First, head over to <a href='https://www.github.com' target='_blank' className='link link-primary'>GitHub</a> and create a free account. GitHub is a powerful platform not only for developers but also for hosting websites for free using GitHub Pages. Once your account is set up, you're ready to start hosting your website.</p>
              </div>
            </div>
            <div id='connect-github-account' className='space-y-6'>
              <div className='space-y-2'>
                <h2 className='text-lg font-medium'>Step 3. Connect Your GitHub Account to Visual Studio Code</h2>
                <p>By connecting your GitHub account to Visual Studio Code, you will be able to take advantage of Visual Studio Code's built-in support for Git making it easier to manage your repositories.</p>
              </div>
              <div className='space-y-2'>
                <h3 className='font-medium'>How to Connect GitHub to VS Code:</h3>
                <ul className='list-decimal pl-8 space-y-1'>
                  <li>Find the profile icon in Visual Studio Code window, and click on <strong>Backup and Sync Settings</strong>.</li>
                  <div className='relative w-full aspect-video'><Image src='/backup_and_sync_settings_menu.webp' fill alt='Visual Studio Code Backup and Sync Settings Menu' /></div>
                  <li className='pt-5'>Then click on the <strong>Sign In</strong> button.</li>
                  <div className='relative w-full aspect-video'><Image src='/backup_and_sync_settings_menu_options.webp' fill alt='Visual Studio Code Backup and Sync Settings Options' /></div>
                  <li className='pt-5'>Select the <strong>GitHub Option</strong>.</li>
                  <li>Enter your GitHub credentials for your account.</li>
                </ul>
              </div>
            </div>
            <div id='create-website' className='space-y-6'>
              <div className='space-y-2'>
                <h2 className='text-lg font-medium'>Step 4. Create a basic Website to Upload to GitHub</h2>
                <p className='text-primary/70'>If you already have a website you would like to launch and host you can skip this step.</p>
              </div>
              <div className='space-y-2'>
                <h3 className='font-medium'>Set Up Your Workspace:</h3>
                <ul className='list-decimal pl-8 space-y-1'>
                  <li>Make sure Visual Studio Code is open.</li>
                  <li>Click on <strong>Open Folder</strong>, then create or select a folder where you want to store your website files. This will be your project folder (e.g., my website)</li>
                  <div className='relative w-full aspect-video'><Image src='/open_folder.webp' fill alt='Opening Folder For Visual Studio Code Workspace' /></div>
                  <li className='pt-5'>Once the folder is open, you can create a new file by clicking <strong>File &gt; New File</strong> or using the keyboard shortcut CTRL+N (Windows) or Cmd+N (Mac).</li>
                  <li>Name this file index.html-this will be the main file for your website</li>
                </ul>
              </div>
              <div className='space-y-2'>
                <h3 className='font-medium'>Create Your Website:</h3>
                <ul className='list-decimal pl-8 space-y-1'>
                  <li>Inside index.html, enter 'doc' and select the auto suggestion from Emmet Abbreviation, this will fill your file with the basic HTML structure.</li>
                  <div className='relative w-full aspect-video'><Image src='/use_doc_emmet_shortcut_for_html_structure.webp' fill alt='Using doc Emmet Abbreviation Autocomplete To Fill Out Basic HTML Format' /></div>
                  <li className='pt-5'>From here you can insert any HTML for your website, for a guide on HTML follow <a href='https://developer.mozilla.org/en-US/docs/Learn/HTML/Introduction_to_HTML/Document_and_website_structure' target='_blank' className='link link-primary'>this link.</a></li>
                </ul>
              </div>
            </div>
            <div id='upload-to-github' className='space-y-6'>
              <div className='space-y-2'>
                <h2 className='text-lg font-medium text-primary/60'>Step 5. Upload Your Website to GitHub and Enable GitHub Pages</h2>
                <p>
                  After you have written your website and are satisfied with how it looks, it’s time to upload your files to GitHub and enable GitHub Pages to make your website live. This step will guide you through the process of pushing your local code to your GitHub repository and configuring GitHub Pages so that anyone can access your site online. With just a few simple clicks, you'll share your creation with the world!
                </p>
              </div>
              <div className='space-y-2'>
                <h3 className='font-medium'>Create New Repository Inside Visual Studio Code:</h3>
                <ul className='list-decimal pl-8 space-y-1'>
                  <li>Click on <strong>Terminal &gt; New Terminal</strong>, then copy and paste the the code found in <strong>...or create a new repository on the command line</strong></li>
                  <div className='relative w-full aspect-video'><Image src='/open_new_terminal.webp' fill alt='Opening New Terminal From macOS Terminal Dropdown' /></div>
                  <li className='pt-5'>Once that is complete, you will be able to use <strong>Source Control</strong> in Visual Studio Code where you will see your repository changes</li>
                  <li>It is important that you have all changes seen in Source Control within the Staged Changes section</li>
                  <li>Now you can enter any message along with your Commit, and click <strong>Commit</strong> button</li>
                  <div className='relative w-full aspect-video'><Image src='/source_control_section.webp' fill alt='Ready To Commit Changes To GitHub' /></div>

                </ul>
              </div>
              <div className='space-y-2'>
                <h3 className='font-medium'>Enable GitHub Pages In Your GitHub Repository:</h3>
                <ul className='list-decimal pl-8 space-y-1'>
                  <li>Navigate to GitHub's website and go to your Profile.</li>
                  <li>Within your Profile click on the <strong>Repositories</strong> tab.</li>
                  <li>Find your repository that you created for your website and click on it.</li>
                  <li>Navigate to the <strong>Settings</strong> tab.</li>
                  <div className='relative w-full aspect-video'><Image src='/github_settings_location.webp' fill alt='Ready To Commit Changes To GitHub' /></div>
                  <li className='pt-5'>Click on <strong>Pages</strong> menu option.</li>
                  <div className='relative w-full aspect-video'><Image src='/github_pages_page.webp' fill alt='Ready To Commit Changes To GitHub' /></div>
                  <li className='pt-5'>Under the <strong>Branch</strong> section select the <strong>None</strong> dropdown menu and select <strong>main</strong> option, then hit the <strong>Save</strong> button</li>
                  <li>GitHub will take a few minutes to launch your webiste. After this period refresh the page and you will see a banner that has the <strong>Visit Site</strong> button.</li>
                  <li>You now have a live link of your website that was launched and hosted to GitHub Pages for free.</li>
                  <div className='relative w-full aspect-video'><Image src='/live_site_message_update.webp' fill alt='Ready To Commit Changes To GitHub' /></div>

                </ul>
              </div>

            </div>
          </article>
          <aside className='flex-[0.3] relative'>
            <div className='sticky top-4 space-y-5'>
              <h3 className='text-xl font-medium'>Table of contents</h3>
              <div className='flex flex-col gap-1'>
                <Link href='#install-visual-studio' className='link'>1. Download and Install Visual Studio Code</Link>
                <Link href='#create-github-account' className='link'>2. Create a Free GitHub Account</Link>
                <Link href='#connect-github-account' className='link'>3. Connect Your GitHub Account to Visual Studio Code</Link>
                <Link href='#create-website' className='link'>4. Create a basic Website to Upload to GitHub</Link>
                <Link href='#upload-to-github' className='link'>5. Upload Your Website to Github and Enable GitHub Pages</Link>
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
