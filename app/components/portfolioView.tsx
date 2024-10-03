"use client";
import { PortfolioType } from "@/types";
import React, { useEffect, useState } from "react";
import Profile from "./profile";
import { LinkIcon, Pause, Play } from "lucide-react";
import { useAuthState } from "react-firebase-hooks/auth";
import Image from "next/image";
import { auth } from "../lib/firebase";
import { updateVisits } from "../lib/user";

interface VisitRecord {
  [key: string]: boolean;
}

const PortfolioView = ({
  portfolio,
  postUser,
}: {
  portfolio: PortfolioType;
  postUser: { user_photoURL: string; displayName: string; title: any };
}) => {
  const [user, loading] = useAuthState(auth);
  const [clicked, setClicked] = useState<boolean>(false);
  const [imageSrc, setImageSrc] = useState<string>("");
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState<number>(1);

  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (user?.uid === portfolio?.user_id) return;

    const visits: VisitRecord = JSON.parse(
      sessionStorage.getItem("uniqueVisits") || "{}",
    );

    if (!visits[portfolio.user_id]) {
      visits[portfolio.user_id] = true;
      sessionStorage.setItem("uniqueVisits", JSON.stringify(visits));
      updateVisits(portfolio.user_id, "unique");
    } else {
      updateVisits(portfolio.user_id, "views");
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

  return (
    <>
      <div className="space-y-[23px] h-full">
        <div className="flex gap-5 flex-wrap justify-between items-center">
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
              alt={`${portfolio.user_displayName}'s portfolio`}
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
              key={index}
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
                alt={`more of ${portfolio.user_displayName}'s portfolio`}
                draggable={false}
                className="border border-[color:#DBDBDB]/40 rounded-md"
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
export default PortfolioView;
