"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useAuth } from "react-firebase-hooks";
import { auth } from "../lib/firebase";
import { useRouter } from "next/navigation";
import {
  getAdditionalUserInfo,
  isSignInWithEmailLink,
  signInWithEmailLink,
  updateProfile,
} from "firebase/auth";
import { updateUsersName } from "../lib/user";

const page = () => {
  const [newUser, setNewUser] = useState<boolean | null>(true);
  const [timer, setTimer] = useState<number | null>(5);
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const user = auth.currentUser;
  const router = useRouter();

  // Confirm the link is a sign-in with email link.
  useEffect(() => {
    if (isSignInWithEmailLink(auth, window.location.href)) {
      let email = window.localStorage.getItem("emailForSignIn");
      if (!email) {
        email = window.prompt("Please provide your email for confirmation");
        console.log(email);
      }
      if (!email) return;

      signInWithEmailLink(auth, email, window.location.href)
        .then((result) => {
          // Clear email from storage.
          window.localStorage.removeItem("emailForSignIn");

          if (getAdditionalUserInfo(result)?.isNewUser) {
            setNewUser(true);
          } else {
            setNewUser(false);
          }
          console.log(result);
        })
        .catch((error) => {
          // Some error occurred, you can inspect the code: error.code
          // Common errors could be invalid email and invalid or expired OTPs.
        });
    }
  }, []);

  // timer if user already exists
  useEffect(() => {
    if (!newUser && timer !== null && timer > 0) {
      const intervalId = setInterval(() => {
        setTimer((prevTimer) => {
          if (prevTimer !== null) {
            return prevTimer - 1;
          } else {
            return null;
          }
        });
      }, 1000); // Update timer state every second

      return () => clearInterval(intervalId); // Cleanup interval on component unmount
    }
  }, [newUser, timer]);

  // watching timer til it completes countdown
  useEffect(() => {
    if (timer === 0) {
      router.push("/profile");
    }
  }, [timer]);

  async function completeProfile() {
    setLoading(true);
    await updateProfile(auth.currentUser!, {
      displayName: firstName + " " + lastName,
    });
    await updateUsersName(firstName, lastName, user!.uid);
    setLoading(false);
    router.push("/profile");
  }

  console.log(user);
  return (
    <>
      <Link
        href="/"
        className="m-[25px] flex gap-[10px] border-b border-transparent w-fit"
      >
        <Image src="/logo.png" width={30} height={30} alt="linkfolio logo" />
        <div className="font-medium text-lg">Linkfolio</div>
      </Link>
      <main className="pt-24 mx-auto max-w-[460px] relative">
        <div className="relative w-full flex justify-center">
          <motion.div
            initial={{ y: 0, opacity: 1, display: "block" }}
            animate={{ y: 20, opacity: 0, display: "hidden" }}
            transition={{ delay: 2 }}
          >
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="text-lg font-medium gap-[5px] flex h-[20px] justify-center"
            >
              You have been verified
            </motion.div>
          </motion.div>

          <AnimatePresence>
            {!newUser && (
              <h1 className="flex h-[28px] justify-center gap-1 overflow-hidden text-center text-[14px] font-light absolute top-0">
                <motion.div
                  initial={{ opacity: 0, y: "100px" }}
                  animate={{ opacity: 1, y: "0px" }}
                  transition={{ delay: 2, duration: 0.5, ease: "easeOut" }}
                >
                  Redirecting you in {timer}
                </motion.div>{" "}
              </h1>
            )}
          </AnimatePresence>
          {newUser && (
            <motion.div
              initial={{ y: 20, opacity: 0, visibility: "hidden" }}
              animate={{ y: 0, opacity: 1, visibility: "visible" }}
              transition={{ delay: 2.5 }}
              className="space-y-[23px] absolute top-0"
            >
              <div className="space-y-[6px]">
                <div className="text-lg font-semibold">
                  Complete Your Profile
                </div>
                <p className="text-sm">
                  Enter your first and last name to get started
                </p>
              </div>
              <div className="mx-auto">
                <div className="flex w-full bg-red-50">
                  <input
                    type="text"
                    className="input input-bordered input-sm mx-auto rounded-r-none flex-[0.5]"
                    placeholder="First Name"
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                  <input
                    type="text"
                    className="input input-bordered input-sm mx-auto rounded-l-none flex-[0.5]"
                    placeholder="Last Name"
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>
              </div>
              <button
                className="btn btn-primary btn-sm w-full"
                disabled={!firstName || !lastName || loading}
                onClick={completeProfile}
              >
                {loading ? "Completing Profile" : "Complete Profile"}
              </button>
            </motion.div>
          )}
        </div>
      </main>
    </>
  );
};

export default page;
