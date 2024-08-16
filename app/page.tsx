import Image from "next/image";
import Nav from "./components/nav";
import PlaceholderGrid from "./components/placeholderGrid";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Nav />
      <main className="flex  break:flex-row flex-col h-full lg:h-[calc(100vh-97px)] gap-10 lg:gap-0">
        <section className="flex-[0.25] break:flex-[0.5] 2xl:flex-[0.4] space-y-[47px] flex flex-col justify-start pt-24 break:pt-56 items-center h-full  px-[20px]">
          <div className="space-y-[13px]">
            <h1 className="max-w-[310px] text-center text-[29px] mx-auto leading-tight">
              <span className="font-light">Explore & Create</span>
              <span className="font-semibold"> Remarkable Portfolios</span>
            </h1>
            <p className="text-sm text-center max-w-[476px]">
              Launch your portfolio effortlessly with Linkfolio’s JSX components
              using TailwindCSS, or find inspiration from real-world portfolios.
            </p>
          </div>
          <span className="flex gap-[16px] mx-auto w-fit">
            <Link
              href="/portfolios"
              role="button"
              className="btn btn-primary !px-[15px] !py-[10px] !text-sm"
            >
              Discover Portfolios
            </Link>
            <button className="btn btn-outline !border-[color:#DBDBDB] !bg-[color:#FAFAFA] !text-[color:#363636] !font-normal">
              View Component Library
            </button>
          </span>
        </section>
        <section className="flex-[0.75] break:flex-[0.5] 2xl:flex-[0.6] flex items-end justify-center overflow-hidden lg:min-w-[565px]">
          <PlaceholderGrid />
        </section>
      </main>
    </>
  );
}
