"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Nav from "../components/nav";
import { ScanFace } from "lucide-react";
import { sendMagicLink } from "@/app/lib/auth";

const page = () => {
  const [email, setEmail] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  function handleMagicLink() {
    setLoading(true);
    sendMagicLink(email);
    setLoading(false);
    router.push("/magic-link-sent");
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
          <p className="text-sm mx-auto text-center max-w-[480px]">
            Just enter your email, and we'll send you a magic link to get
            started, whether you're signing in or creating a new account.
          </p>
        </div>
        <div className="mx-auto w-fit px-8 space-y-5 md:space-y-0">
          <input
            type="email"
            className="input input-bordered input-sm  justify-center w-full  md:w-[360px] md:rounded-r-none"
            placeholder="example@domain.com"
            onChange={(e) => setEmail(e.target.value)}
          />
          <button
            className="btn btn-primary btn-sm mx-auto md:!rounded-l-none w-full md:w-fit"
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
