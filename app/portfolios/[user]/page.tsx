"use client";
import Nav from "@/app/components/nav";
import Profile from "@/app/components/profile";
import { auth } from "@/app/lib/firebase";
import { updateVisits, usersPortfolio, viewPortfolio } from "@/app/lib/user";
import { PortfolioType } from "@/types";
import { Eye, Heart, LinkIcon, Pause, Play } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

interface VisitRecord {
  [key: string]: boolean;
}

const page = ({ params }: { params: { user: string } }) => {
  const [portfolio, setPortfolio] = useState<PortfolioType | null>(null);
  const [postUser, setPostUser] = useState<{
    user_photoURL: string;
    displayName: string;
    title: string;
  } | null>(null);
  const [user, loading] = useAuthState(auth);
  const [isCheckingPortfolio, setIsCheckingPortfolio] = useState<boolean>(true);
  const [clicked, setClicked] = useState<boolean>(false);
  const [imageSrc, setImageSrc] = useState<string>("");
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState<number>(1);

  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (user?.uid === portfolio?.user_id) {
      return;
    }
    const visits: VisitRecord = JSON.parse(
      sessionStorage.getItem("uniqueVisits") || "{}",
    );

    // update uniqueVisits counter / session storage
    if (!visits[params.user]) {
      visits[params.user] = true;
      sessionStorage.setItem("uniqueVisits", JSON.stringify(visits));
      updateVisits(params.user, "unique");
    } else {
      // update views counter / session storage
      updateVisits(params.user, "views");
    }
  }, []);

  // Handle rotating highlighted image
  useEffect(() => {
    if (
      portfolio &&
      portfolio.photoURL &&
      portfolio.photoURL.length > 0 &&
      !clicked
    ) {
      const intervalId = setInterval(() => {
        setCurrentPhotoIndex(
          (prevIndex) => (prevIndex + 1) % portfolio.photoURL.length,
        );
        setProgress(0); // Reset progress for the new image
      }, 4000);

      const progressIntervalId = setInterval(() => {
        setProgress((prevProgress) => (prevProgress + 1) % 101); // Increment progress every second
      }, 40); // Adjust the interval to match the desired smoothness of the progress bar

      return () => {
        clearInterval(intervalId);
        clearInterval(progressIntervalId);
      };
    }
  }, [portfolio, currentPhotoIndex, clicked]);

  useEffect(() => {
    const checkPortfolio = async () => {
      await handleUsersPortfolio();
      setIsCheckingPortfolio(false);
    };
    checkPortfolio();
  }, [params.user]);

  async function handleUsersPortfolio() {
    const response = await viewPortfolio(params.user);

    if (!response) return null;
    setPostUser({
      user_photoURL: response.user_photoURL,
      displayName: response.displayName,
      title: response.title,
    });

    setPortfolio({
      likes: response.likes,
      photoURL: response.photoURL,
      portfolioURL: response.portfolioURL,
      user_id: response.user_id,
      totalViews: 0,
      uniqueViews: 0,
    });
  }

  return (
    <>
      <Nav />
      <main className="flex break:flex-row max-w-[1440px] w-3/4 mx-auto flex-col   gap-10 lg:gap-0">
        <section className="py-24 w-full h-full">
          {!isCheckingPortfolio && portfolio && (
            <div className="space-y-[23px] h-full">
              <div className="flex justify-between items-center">
                {postUser && <Profile postUser={postUser} />}
                <div className="flex justify-end gap-2">
                  {/* <div className="tooltip" data-tip="Like Portfolio"> */}
                  {/* <a */}
                  {/*   role="button" */}
                  {/*   target="_blank" */}
                  {/*   href={portfolio?.portfolioURL} */}
                  {/*   className="btn btn-md" */}
                  {/* > */}
                  {/*   <Heart /> */}
                  {/*   Like Portfolio */}
                  {/* </a> */}
                  {/* </div> */}
                  {/* <div className="tooltip" data-tip="View Portfolio"> */}
                  <a
                    role="button"
                    target="_blank"
                    href={portfolio?.portfolioURL}
                    className="btn btn-md"
                  >
                    <LinkIcon />
                    View Portfolio
                  </a>
                  {/* </div> */}
                </div>
              </div>
              <div className="relative">
                <div className="w-full h-full aspect-video border border-[color:#DBDBDB] rounded-md relative">
                  <Image
                    src={portfolio?.photoURL[currentPhotoIndex]}
                    className="rounded-md"
                    fill
                    alt="portfolio preview"
                  />

                  <div
                    className="radial-progress absolute bottom-2 right-2 z-[5] cursor-pointer"
                    style={
                      {
                        "--value": progress,
                        "--size": "2rem",
                      } as React.CSSProperties
                    }
                    role="progressbar"
                    onClick={() => {
                      setClicked(!clicked);
                      setProgress(0);
                    }}
                  >
                    {clicked ? <Play size={16} /> : <Pause size={16} />}
                  </div>
                </div>

                {/* <div */}
                {/*   className="tooltip absolute top-4 left-4" */}
                {/*   data-tip="Portfolio Status" */}
                {/* > */}
                {/*   <div className="badge badge-success badge-outline !rounded-md"> */}
                {/*     Active */}
                {/*   </div> */}
                {/* </div> */}
              </div>

              <div className="grid grid-cols-2 gap-5 lg:grid-cols-4">
                {portfolio.photoURL.map((src, index) => (
                  <div
                    className=" relative aspect-video cursor-pointer transition-all ease-in-out hover:scale-[1.01] hover:shadow-lg"
                    onClick={() => {
                      setClicked(true);
                      setImageSrc(src);
                      setCurrentPhotoIndex(index);
                    }}
                  >
                    <Image
                      src={src}
                      fill
                      alt="smaller portfolio"
                      draggable={false}
                      className="border border-[color:#DBDBDB]/40 rounded-md"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>
      </main>
    </>
  );
};

export default page;
