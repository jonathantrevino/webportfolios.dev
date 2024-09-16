"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Menu, User } from "lucide-react";
import { auth } from "../lib/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

const Nav = () => {
  const [user, loading] = useAuthState(auth);
  return (
    <nav className="p-[25px] flex justify-between items-center bg-[color:#FAFAFA] border boder-[color:#DBDBDB]">
      <div className="flex gap-[30px] items-center h-[40px]">
        <Link href="/" className="flex gap-[10px]">
          <div className="font-medium text-lg">webportfolios.dev</div>
        </Link>
        <ul className="hidden gap-[20px] text-[color:#363636] sm:flex">
          <li className="hover:text-[color:#000000]">
            <Link href="/portfolios">Portfolios</Link>
          </li>
          <li className="hover:text-[color:#000000]">
            <Link href="/components">Components</Link>
          </li>
          <li className="hover:text-[color:#000000]">
            <Link href="/newsletter">Newsletter</Link>
          </li>
        </ul>
      </div>
      <div className="flex gap-[20px] items-center">
        {user && !loading && (
          <Link
            href="/profile"
            className="hover:scale-105 hover:drop-shadow-md transition-all"
            role="button"
          >
            <div className="w-[40px] h-[40px] bg-[color:#FEFEFE] flex justify-center items-center rounded-full border border-base-300">
              {user?.photoURL && (
                <Image
                  src={user?.photoURL}
                  width={100}
                  height={100}
                  className="bg-[color:#FEFEFE] rounded-full border border-base-300"
                  alt="user"
                />
              )}
              <User />
            </div>
          </Link>
        )}
        {!user && !loading && (
          <Link
            href="/get-started"
            className="btn btn-primary btn-sm m-1"
            role="button"
          >
            Get Started
          </Link>
        )}
        <div className="dropdown sm:hidden block dropdown-end">
          <div tabIndex={0} role="button" className="m-1">
            <Menu />
          </div>
          <ul
            tabIndex={0}
            className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow !text-[color:#363636]"
          >
            <li className="hover:text-[color:#000000]">
              <Link href="/portfolios">Portfolios</Link>
            </li>
            <li className="hover:text-[color:#000000]">
              <Link href="/components">Components</Link>
            </li>
            <li className="hover:text-[color:#000000]">
              <Link href="/newsletter">Newsletter</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
export default Nav;
