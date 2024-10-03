import { MetadataRoute } from "next";
import { paginatePortfolios } from "./lib/user";
import { PortfolioType } from "@/types";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const response = await paginatePortfolios(null);
  const portfolios: MetadataRoute.Sitemap = response
    ? response.map((portfolio: PortfolioType) => ({
        url: `https://www.webportfolios.dev/portfolios/${portfolio.user_id}`,
      }))
    : [];
  return [
    {
      url: `https://www.webportfolios.dev/profile`,
    },
    {
      url: `https://www.webportfolios.dev/portfolios`,
    },
    {
      url: `https://www.webportfolios.dev/get-started`,
    },

    ...portfolios,
  ];
}
