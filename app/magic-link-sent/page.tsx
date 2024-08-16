"use client";
import { BadgeCheck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { motion } from "framer-motion";

const page = () => {
  const message = [" lets", "get", "started"];
  return (
    <>
      <Link
        href="/"
        className="m-[25px] flex gap-[10px] border-b border-transparent w-fit"
      >
        <Image src="/logo.png" width={30} height={30} alt="linkfolio logo" />
        <div className="font-medium text-lg">Linkfolio</div>
      </Link>
      <main className="pt-24 mx-auto max-w-[460px]">
        <div className="relative w-full">
          <motion.div
            initial={{ y: 0, opacity: 1, display: "block" }}
            animate={{ y: 20, opacity: 0, display: "hidden" }}
            transition={{ delay: 2 }}
            className="relative text-center flex justify-center"
          >
            <div className="text-lg font-medium gap-[5px] flex h-[20px] justify-center">
              <motion.div
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
              >
                Welcome,{" "}
              </motion.div>
              <div className="flex gap-[5px]">
                {message.map((msg, index) => (
                  <motion.p
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.1 * index + 1 }}
                    key={index}
                  >
                    {msg}
                  </motion.p>
                ))}
              </div>
            </div>
          </motion.div>
          <motion.div
            initial={{ y: 50, opacity: 0, visibility: "hidden" }}
            animate={{ y: 0, opacity: 1, visibility: "visible" }}
            transition={{ delay: 2.5, ease: "linear" }}
            className="absolute top-0 space-y-[23px]"
          >
            <div className="space-y-[6px]">
              <div className="font-semibold text-lg flex gap-[10px] items-start">
                <BadgeCheck className="text-indigo-500" />
                Verification has been sent
              </div>
              <div>
                <p className="text-sm">
                  A magic link has been sent to{" "}
                  <span className="font-medium underline">
                    yeahimjt@gmail.com.
                  </span>
                  Please check your spam folder as well.
                </p>
              </div>
            </div>
            <button className="btn btn-primary btn-sm !w-full">
              Resend Magic Link
            </button>
          </motion.div>
        </div>
      </main>
    </>
  );
};
export default page;