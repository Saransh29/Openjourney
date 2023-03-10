"use client";
import React from "react";
import { Link } from "react-scroll/modules";

const NAV_ITEMS = [
  // {
  //   label: "Home",
  //   page: "home",
  // },
  {
    label: "About",
    page: "about",
  },
  {
    label: "Community",
    page: "Community",
  },
];

export default function Navbar() {
  return (
    <header className="w-full mx-auto  px-4 sm:px-20 fixed top-0 z-50  bg-transparent shadow dark:backdrop-blur">
      <div className="justify-between md:items-center md:flex">
        <div>
          <div className="flex items-center justify-between py-2 md:py-2 md:block">
            <div className="md:py-2 md:block">
              <h2 className="text-4xl font-bold text-black ">
                Stable Diffusion
              </h2>
            </div>
          </div>
        </div>
        <div>
          <div className="flex-1 justify-self-center pb-2 mt-8 md:block md:pb-0 md:mt-0  ">
            <div className="items-center justify-center space-y-8 md:flex md:space-x-6 md:space-y-0">
              {NAV_ITEMS.map((item, idx) => {
                return (
                  <Link
                    key={idx}
                    to={item.page}
                    className={
                      "block lg:inline-block text-black  hover:text-neutral-500 text-2-xl"
                    }
                    activeClass="active"
                    spy={true}
                    smooth={true}
                    offset={-100}
                    duration={500}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
