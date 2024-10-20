import { MetadataRoute } from "next";
import { paginatePortfolios } from "./lib/user";
import { PortfolioType } from "@/types";
import { getAllPortfolios } from "./lib/portfolio";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const response = await getAllPortfolios();
  const portfolios: MetadataRoute.Sitemap = response
    ? response.map((portfolio) => ({
      url: `https://www.webportfolios.dev/portfolios/${portfolio.id}`,
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
      url: `https://www.webportfolios.dev/guides`,
    },
    {
      url: `https://www.webportfolios.dev/guides/launch-website-in-under-5-minutes`,
    },

    {
      url: `https://www.webportfolios.dev/get-started`,
    },
    ...portfolios,
  ];
}
