import Nav from "@/app/components/nav";
import { PortfolioType } from "@/types";
import { Metadata } from "next";
import PortfolioView from "@/app/components/portfolioView";
import { viewPortfolio } from "@/app/lib/user";

export async function generateMetadata({
  params,
}: {
  params: { user: string };
}): Promise<Metadata> {
  const response = await viewPortfolio(params.user);
  return {
    title: `${response?.displayName}'s Portfolio`,
    description: `Check out ${response?.displayName}'s portfolio`,
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
      <main className="flex break:flex-row max-w-[1440px] w-3/4 mx-auto flex-col   gap-10 lg:gap-0">
        <section className="py-24 w-full h-full">
          {portfolio && postUser ? (
            <PortfolioView portfolio={portfolio} postUser={postUser} />
          ) : (
            ""
          )}
        </section>
      </main>
    </>
  );
};

export default page;
