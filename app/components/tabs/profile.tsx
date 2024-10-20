"use client";
import { auth } from "@/app/lib/firebase";
import {
  getUserInfo,
  updateUsersProfilePic,
  updateUsersTitle,
} from "@/app/lib/user";
import { UserType } from "@/types";
import { updateCurrentUser, updateProfile } from "firebase/auth";
import { User } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

const Profile = () => {
  const [user, loading] = useAuthState(auth);
  const [userData, setUserData] = useState<UserType | null>(null);
  const [editing, setEditing] = useState<boolean>(false);
  const [tempProfilePic, setTempProfilePic] = useState<string | null>(null);
  const [title, setTitle] = useState<string>("");
  const [updateLoading, setUpdateLoading] = useState<boolean>(false);
  const [updatePicLoading, setUpdatePicLoading] = useState<boolean>(false);

  const fileRef = useRef<HTMLInputElement | null>(null);

  function updateTempProfilePic() {
    if (fileRef.current && fileRef.current.files) {
      const file = fileRef.current.files[0];
      if (file) {
        const objectUrl = URL.createObjectURL(file);
        setTempProfilePic(objectUrl);

        // Clean up object URL after component unmounts or file changes
        return () => URL.revokeObjectURL(objectUrl);
      }
    }
  }

  async function handleUpdateProfilePic() {
    setUpdateLoading(true);
    const picRef = await updateUsersProfilePic(tempProfilePic!, user!.uid);
    if (picRef && user) {
      await updateProfile(user, { photoURL: picRef });
    }
    setTempProfilePic(null);
    setUpdateLoading(false);
  }

  async function handleUpdateTitle() {
    setUpdateLoading(true);
    await updateUsersTitle(title, user!.uid);
    await getUserExtra();
    setUpdateLoading(false);
    setEditing(false);
  }

  function refreshFields() {
    setTitle("");
    setTempProfilePic(null);
  }

  async function getUserExtra() {
    if (user) {
      const data = await getUserInfo(user.uid);
      if (data) {
        setUserData(data);
      }
    }
  }

  useEffect(() => {
    getUserExtra();
  }, [user]);
  return (
    <div className="space-y-[23px]">
      <div className="flex justify-between items-end">
        <div className="flex gap-3 items-center">
          <div className="relative w-[100px] h-[100px] overflow-hidden bg-[color:#FEFEFE] flex justify-center items-center rounded-full border border-base-300">
            {(user?.photoURL || tempProfilePic) && (
              <div>
                <Image
                  src={
                    tempProfilePic
                      ? tempProfilePic
                      : user?.photoURL
                        ? user?.photoURL
                        : ""
                  }
                  width={100}
                  height={100}
                  className="bg-[color:#FEFEFE] rounded-full border border-base-300"
                  alt="user"
                />
              </div>
            )}
            {!user?.photoURL && !tempProfilePic && !loading && (
              <div className="w-[100px] h-[100px] bg-[color:#FEFEFE] flex justify-center items-center rounded-full border border-base-300">
                <User size={50} />
              </div>
            )}
            {loading && (
              <div className="w-[100px] h-[100px] skeleton rounded-full"></div>
            )}
          </div>
          <div className="space-y-[6px]">
            <p className="text-sm font-medium">Profile Picture</p>
            <input
              ref={fileRef}
              type="file"
              role="input"
              className="file-input file-input-bordered file-input-xs cursor-pointer"
              max={1}
              onChange={() => updateTempProfilePic()}
            />
          </div>
        </div>
        <div className="flex gap-3 mb-6">
          {tempProfilePic && (
            <>
              <button
                className="btn btn-primary btn-sm"
                onClick={handleUpdateProfilePic}
                disabled={updatePicLoading}
              >
                {updatePicLoading
                  ? "Updating Profile Picture"
                  : "Update Profile Picture"}
              </button>

              <button
                className="btn btn-outline !border-[color:#DBDBDB] !bg-[color:#FAFAFA] !text-[color:#363636] !font-normal btn-sm"
                onClick={() => setTempProfilePic(null)}
              >
                Cancel
              </button>
            </>
          )}
        </div>
      </div>
      <form className="space-y-3 p-6">
        <div className="flex flex-col space-y-[3px]">
          <label className="text-sm">Email Address</label>
          <input
            type="text"
            placeholder={user?.email || ""}
            className="input input-bordered"
            disabled
          />
        </div>
        <div className="flex flex-col space-y-[3px]">
          <label className="text-sm">Full Name</label>
          <input
            type="text"
            placeholder={user?.displayName || ""}
            className="input input-bordered"
            disabled
          />
        </div>
        <div className="flex flex-col space-y-[3px]">
          <label className="text-sm">Title</label>
          <select
            className="select select-bordered w-full"
            disabled={!editing}
            value={title || userData?.title || ""}
            onChange={(e) => setTitle(e.target.value)}
          >
            <option disabled></option>
            <option>Software Engineer</option>
            <option>Front End Developer</option>
            <option>Back End Developer</option>
            <option>Full Stack Developer</option>
            <option>Web Developer</option>
          </select>{" "}
        </div>
        <div className="flex justify-end">
          {!editing && (
            <button
              className="btn btn-primary btn-sm"
              type="button"
              onClick={() => setEditing(true)}
            >
              Edit Details
            </button>
          )}
          {editing && (
            <div className="flex gap-3">
              <button
                className="btn btn-primary btn-sm"
                type="button"
                onClick={handleUpdateTitle}
                disabled={updateLoading}
              >
                {updateLoading ? "Saving Changes" : "Save Changes"}
              </button>
              <button
                className="btn btn-outline !border-[color:#DBDBDB] !bg-[color:#FAFAFA] !text-[color:#363636] !font-normal btn-sm"
                type="button"
                onClick={() => {
                  setEditing(false);
                  refreshFields();
                }}
              >
                Cancel
              </button>{" "}
            </div>
          )}
        </div>
      </form>
    </div>
  );
};

export default Profile;
