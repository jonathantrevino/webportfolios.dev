"use client";
import React, { useEffect, useState } from "react";
import Nav from "../components/nav";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../lib/firebase";
import { useRouter } from "next/navigation";
import Profile from "../components/tabs/profile";
import { signOut } from "firebase/auth";
import Portfolio from "../components/tabs/portfolio";

const page = () => {
  const [user, loading] = useAuthState(auth);
  const [tab, setTab] = useState<
    {
      title: string;
      active: boolean;
    }[]
  >([
    {
      title: "Profile",
      active: true,
    },
    {
      title: "Portfolio",
      active: false,
    },

    {
      title: "Preferences",
      active: false,
    },
  ]);

  const router = useRouter();
  useEffect(() => {
    if (!user && !loading) {
      router.push("/");
    }
  }, [loading]);

  function changeTab(index: number) {
    setTab((prevTabs) =>
      prevTabs.map((tab, i) => ({
        ...tab,
        active: i === index,
      })),
    );
  }

  const getActiveTab = () => {
    return tab.find((tab) => tab.active)?.title;
  };

  const renderTabs = () => {
    const active = getActiveTab();

    switch (active) {
      case "Profile":
        return <Profile />;
      case "Portfolio":
        return <Portfolio />;
    }
  };

  if (loading && !user)
    return (
      <>
        <Nav />
      </>
    );
  else if (user) {
    return (
      <>
        <Nav />
        <main className="pt-24 w-3/4 max-w-[1440px] mx-auto space-y-[23px]">
          <div className="flex justify-between items-end">
            <div className="space-y-[6px]">
              <h1 className="text-lg font-medium">Account</h1>
              <p className="text-sm">Set your account settings below</p>
            </div>
            <div
              role="button"
              className="text-red-500 underline text-sm font-light w-fit hover:text-red-800 transition-all ease-in-out"
              onClick={() => signOut(auth)}
            >
              Log Out
            </div>
          </div>

          <div role="tablist" className="tabs tabs-boxed gap-2">
            {tab.map((current, index) => (
              <a
                key={index}
                role="tab"
                className={`${current.active ? "tab-active" : "hover:bg-primary/20"} transition-all ease-in-out tab`}
                onClick={() => changeTab(index)}
              >
                {current.title}
              </a>
            ))}
          </div>
          {renderTabs()}
          <div className="flex justify-end"></div>
        </main>
      </>
    );
  }
};

export default page;
