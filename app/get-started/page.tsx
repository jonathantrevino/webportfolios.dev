"use client";
import React, { useState } from "react";
import Nav from "../components/nav";
import { ScanFace } from "lucide-react";
import { sendMagicLink } from "@/app/lib/auth";

const page = () => {
  const [email, setEmail] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  function handleMagicLink() {
    setLoading(true);
    sendMagicLink(email);
    setLoading(false);
  }
  return (
    <>
      <Nav />
      <main className="pt-24 space-y-[23px]">
        <div className="space-y-[6px]">
          <div className="mx-auto w-[45px] h-[45px] flex items-center bg-primary-content text-primary rounded-full justify-center">
            <ScanFace />
          </div>
          <h1 className="font-semibold text-[29px] text-center ">
            Get Started
          </h1>
          <p className="text-sm mx-auto text-center w-[480px]">
            Just enter your email, and we'll send you a magic link to get
            started, whether you're signing in or creating a new account.
          </p>
        </div>
        <div className="mx-auto w-fit">
          <input
            type="email"
            className="input input-bordered input-sm mx-auto w-[360px] rounded-r-none"
            placeholder="example@domain.com"
            onChange={(e) => setEmail(e.target.value)}
          />
          <button
            className="btn btn-primary btn-sm !rounded-l-none"
            disabled={!email && loading ? true : false}
            onClick={handleMagicLink}
          >
            {loading ? "Sending Magic Link" : "Send Magic Link"}
          </button>
        </div>
      </main>
    </>
  );
};

export default page;
