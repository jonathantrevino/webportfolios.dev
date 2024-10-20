import { PortfolioType } from "@/types";
import Nav from "./components/nav";
import RecentPortfolios from "./components/recentPortfolios";
import { getRecentPortfolios } from "./lib/portfolio";
import Reason from "./components/reason";
import { Book, Lightbulb, Puzzle, Users } from "lucide-react";
import JoinCta from "./components/joinCta";
import Footer from "./components/footer";
import Link from "next/link";


export default async function Home() {
  const portfoliosList = await getRecentPortfolios(null);
  return (
    <>
      <Nav />
      <main className="mx-[25px] overflow-x-hidden">
        <section className="flex-[1] space-y-[47px]  bg-[length:150%_150%] shadow-xl animate-gradient-animation  bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-error-content/95 via-neutral to-error-content  flex flex-col justify-start py-32 items-center h-full   rounded-3xl px-[20px] " aria-label='Explore Developer Portfolios and Resources'>
          <header className="space-y-[13px] max-w-[630px]">
            <div className='justify-center flex'>
              <div className="badge badge-ghost !bg-opacity-20 !border-opacity-10 text-base-300 text-opacity-70 ">Join the Launch 🚀</div>
            </div>
            <h1 className="text-center text-4xl mx-auto leading-tight">
              <span className="font-semibold text-base-300">Simplifying Your Portfolio Journey</span>
            </h1>
            <p className='text-center text-base-300/90'>Discover developer portfolios, explore pre-built JSX components, and access guides to elevate your online presence.</p>
            <div className='justify-center gap-4 flex'>
              <Link href='/portfolios' className='btn btn-sm btn-primary'>Browse Portfolios</Link>
              <Link href='/guides' className='btn btn-sm btn-outline !border-base-300/50 !text-base-300 hover:bg-base-300/5'>View Guides</Link>
            </div>
          </header>
        </section>
        <section className='py-[50px] space-y-[23.5px]' aria-label='Recently Uploaded Developer Portfolios'>
          <span className='space-y-[13px]'>
            <h2 className="badge badge-sm badge-ghost !bg-primary-content/80 !text-primary/80 p-3 !border-primary-content shadow-sm">Recently Added</h2>
            <h3 className='text-2xl'>Preview The Latest Developer Portfolios</h3>
          </span>
          <RecentPortfolios portfoliosList={portfoliosList} />
        </section>
        <section className='py-[50px] space-y-[23.5px]' aria-label='Recently Uploaded Developer Portfolios'>
          <div className='space-y-[13px] flex flex-col justify-between items-center'>
            <h2 className="badge badge-sm badge-ghost !bg-primary-content/80 !text-primary/80 p-3 !border-primary-content shadow-sm">Why Choose Us?</h2>
            <h3 className='text-2xl w-fit'>Everything You Need For Your Portfolio In One Place</h3>
          </div>
          <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 w-full gap-5'>
            <Reason
              title={'Inspiration for Developers'}
              body={'Explore diverse portfolios to ignite your creativity as a software engineer, front-end developer, and more.'}
              icon={<Lightbulb size={32} />}
              icon_color={'#FFC700'}
              bg_color={'#FFFEDB'}
            />

            <Reason
              title={'Diverse Portfolios, Greater Opportunities'}
              body={'Uploading your portfolio enhances your visibility for new opportunities while enriching the diverse collection of developer portfolios'}
              icon={<Users size={32} />}
              icon_color={'#4D00FF'}
              bg_color={'#D2DBFF'}
            />

            <Reason
              title={'Ready-to-use JSX Components'}
              body={'Access a library of pre-built JSX components for quick integration'}
              icon={<Puzzle />}
              icon_color={'#28A745'}
              bg_color={'#C3E6CB'}
            />

            <Reason
              title={'Step-By-Step Guides'}
              body={'Access a wide range of guides, from simple walkthroughs to advanced techniques, tailored to any stage of your portfolio journey.'}
              icon={<Book />}
              icon_color={'#FF0300'}
              bg_color={'#FFB2B2'}
            />

          </div>
        </section>
        <JoinCta />
        <Footer />
      </main>
    </>
  );
}
