"use client";
import React, { useState } from "react";
import { Link } from "react-scroll/modules";
import { IoMdMenu, IoMdClose } from "react-icons/io";

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
  const [navbar, setNavbar] = useState(false);

  return (
    <header className="w-full mx-auto  px-4 sm:px-20 fixed top-0 z-50  bg-transparent shadow dark:backdrop-blur">
      <div className="justify-between md:items-center md:flex">
        <div>
          <div className="flex items-center justify-between py-3 md:py-3 md:block">
            <div className="md:py-1 md:block">
              <h2 className="text-4xl font-bold  text-inherit ">
                Saransh Bibiyan
              </h2>
            </div>
            <div className="md:hidden">
              <button
                onClick={() => {
                  setNavbar(!navbar);
                }}
              >
                {navbar ? (
                  <IoMdClose className=" fill-black " size={30} />
                ) : (
                  <IoMdMenu className=" fill-black " size={30} />
                )}
              </button>
            </div>
          </div>
        </div>
        <div>
          <div
            className={`flex-1 justify-self-center pb-3 mt-8 md:block md:pb-0 md:mt-0  ${
              navbar ? "block" : "hidden"
            }`}
          >
            <div className="items-center justify-center space-y-8 md:flex md:space-x-6 md:space-y-0">
              {NAV_ITEMS.map((item, idx) => {
                return (
                  <Link
                    key={idx}
                    to={item.page}
                    className={
                      "block lg:inline-block text-inherit  cursor-pointer"
                    }
                    activeClass="active"
                    spy={true}
                    smooth={true}
                    offset={-100}
                    duration={500}
                    cursor="pointer"
                    onClick={() => setNavbar(!navbar)}
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
