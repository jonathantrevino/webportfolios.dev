import Nav from "../components/nav";
import { paginatePortfolios } from "../lib/user";
import Footer from "../components/footer";
import { Metadata } from "next";
import PortfolioSection from "../components/portfolioSection";

export const generateMetadata = (): Metadata => {
  return {
    title: 'Portfolios',
    description: 'Explore portfolio examples from Software Engineers, Web Developers, and more. Find inspiration and showcase your own projects on webportfolios.dev.',
  };
};


// Helper function to serialize Firestore Timestamps and documents
function serializePortfoliosResponse(response: any) {
  console.log(response)
  return {
    portfolios: response.portfolios.map((portfolio: any) => ({
      ...portfolio,
      uploaded: portfolio.uploaded && portfolio.uploaded.seconds
        ? new Date(portfolio.uploaded.seconds * 1000).toISOString()
        : null,  // Handle invalid or missing timestamps
    })),
    // Serialize lastDocument by converting it to JSON, or exclude it if needed
    lastDocument: response.lastDocument ? response.lastDocument : null,
  };
}


const page = async () => {
  // Fetch initial portfolios server-side
  const response = await paginatePortfolios(null, null);
  const { portfolios, lastDocument } = serializePortfoliosResponse(response);
  const hasMore = response ? response.portfolios.length >= 5 : false;
  console.log(lastDocument)
  return (
    <>
      <Nav />
      <main className="px-[25px] space-y-5 mb-[50px]">
        <PortfolioSection initialPortfolios={portfolios} lastDocument={lastDocument} hasMoreInitially={hasMore} />
        <Footer />
      </main>
    </>
  );
};

export default page;
