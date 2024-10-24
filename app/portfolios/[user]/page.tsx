import Nav from "@/app/components/nav";
import { PortfolioType } from "@/types";
import { Metadata } from "next";
import PortfolioView from "@/app/components/portfolioView";
import { viewPortfolio } from "@/app/lib/user";
import Footer from "@/app/components/footer";

export async function generateMetadata({
  params,
}: {
  params: { user: string };
}): Promise<Metadata> {
  const response = await viewPortfolio(params.user);
  return {
    title: `${response?.displayName}'s Portfolio`,
    description: `Explore Abdullah Ayoola's impressive portfolio featuring innovative projects and professional achievements. ${response?.title ? 'Discover unique insights and inspiration from a skilled ' + response?.title : ''}`,
    keywords: `developer portfolio, ${response?.title ? response?.title + ' portfolio example, ' : ''} coding portfolio, portfolio inspiration`,
    openGraph: {
      images: [
        {
          url: response?.photoURL[0],
        },
      ],
    },
  };
}

const page = async ({ params }: { params: { user: string } }) => {
  const response = await viewPortfolio(params.user);
  const portfolio: PortfolioType | null = response
    ? {
      likes: response.likes,
      photoURL: response.photoURL,
      portfolioURL: response.portfolioURL,
      user_id: response.user_id,
      totalViews: 0,
      uniqueViews: 0,
      uploaded: response.uploaded,
    }
    : null;

  const postUser = response
    ? {
      user_photoURL: response.user_photoURL,
      displayName: response.displayName,
      title: response.title,
    }
    : null;
  return (
    <>
      <Nav />
      <main className="px-[25px] mb-[50px] space-y-5">
        <section className="py-24 w-full h-full">
          {portfolio && postUser ? (
            <PortfolioView portfolio={portfolio} postUser={postUser} />
          ) : (
            ""
          )}
        </section>
        <Footer />
      </main>
    </>
  );
};

export default page;
