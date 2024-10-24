import Nav from "../components/nav";
import { paginatePortfolios } from "../lib/user";
import Footer from "../components/footer";
import { Metadata } from "next";
import PortfolioSection from "../components/portfolioSection";

export const generateMetadata = (): Metadata => {
  return {
    title: 'Portfolios',
    description: 'Browse a comprehensive list of filterable developer portfolio examples from software engineers, web developers, and designers. Find inspiration and explore real-world projects.',
    keywords: 'developer portfolio examples, software engineer portfolios, web developer portfolios, tech portfolios'
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
  const hasMore = response ? response.portfolios.length === 6 : false;
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
