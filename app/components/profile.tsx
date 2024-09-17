import React, { useEffect } from "react";
import { usersProfile } from "../lib/user";
import Image from "next/image";

const Profile = ({
  postUser,
}: {
  postUser: { user_photoURL: string; displayName: string; title: string };
}) => {
  return (
    <div className="flex items-center gap-4">
      <Image
        src={postUser.user_photoURL}
        className="rounded-full"
        width={64}
        height={64}
        alt="portfolio owner"
      />
      <div className="">
        <h1 className="text-lg font-semibold">{postUser.displayName}</h1>
        <p>{postUser.title}</p>
      </div>
    </div>
  );
};

export default Profile;
