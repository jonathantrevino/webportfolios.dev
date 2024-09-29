import React from "react";
import Image from "next/image";

const Profile = ({
  postUser,
}: {
  postUser: { user_photoURL: string; displayName: string; title: string };
}) => {
  return (
    <div className="flex relative items-center gap-4">
      <div className="relative w-[40px] h-[40px] overflow-hidden bg-[color:#FEFEFE] flex justify-center items-center rounded-full border border-base-300">
        <Image
          src={postUser.user_photoURL}
          className="absolute object-cover rounded-full rounded-full"
          width={64}
          height={64}
          alt="portfolio owner"
        />
      </div>
      <div className="">
        <h1 className="text-lg font-semibold">{postUser.displayName}</h1>
        <p>{postUser.title}</p>
      </div>
    </div>
  );
};

export default Profile;
