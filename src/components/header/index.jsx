"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import Link from "next/link";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

function Header({ openModal, setOpenModal }) {
  const header = useRef([]);
  const logo = useRef(null);
  const navLeft = useRef(null);
  const navRight = useRef(null);
  const menu = useRef(null);

  const closeOpen = () => {
    if (openModal) {
      setOpenModal(false);
    } else {
      setOpenModal(true);
    }
  };

  useEffect(() => {
    const isMobile = window.innerWidth < 1024;

    gsap.set(header.current, {
      height: "100%",
      willChange: "height",
      backgroundColor: "white",
      backdropFilter: "blur(10px)",
    });

    gsap.set(logo.current, {
      scale: 3,
      willChange: "transform",
    });

    gsap.set(navRight.current, {
      opacity: 0,
      y: 20,
    });

    gsap.set(navLeft.current, {
      opacity: 0,
      y: 20,
    });

    gsap.set(menu.current, {
      opacity: 0,
      y: 20,
    });

    const tl = gsap.timeline({
      defaults: {
        delay: 1,
        duration: 1,
        ease: "power3.inOut",
        stagger: 0.2,
        smoothOrigin: true,
      },
    });

    tl.to(
      header.current,
      {
        height: isMobile ? "80px" : "100px",
        duration: 3,
      },
      "end"
    );

    tl.to(
      logo.current,
      {
        scale: 1,
        duration: 1.4,
      },
      "1"
    );

    tl.to(
      menu.current,
      {
        opacity: 1,
        y: 0,
        duration: 1.4,
      },
      "1.4"
    );

    tl.to(
      navRight.current,
      {
        opacity: 1,
        y: 0,
        duration: 1.4,
      },
      "1.4"
    );
    tl.to(
      navLeft.current,
      {
        opacity: 1,
        y: 0,
        duration: 1.4,
      },
      "1.4"
    );

    // Scroll-triggered hide/show
    const scrollAnim = gsap
      .to(header.current, {
        yPercent: -100,
        duration: 0.5,
        ease: "power2.inOut",
        paused: true,
      })
      .progress(0);

    ScrollTrigger.create({
      start: 0,
      end: "max",
      onUpdate: (self) => {
        if (self.direction === 1) {
          scrollAnim.play(); // scroll down
        } else {
          scrollAnim.reverse(); // scroll up
        }
      },
    });

    return () => {
      ScrollTrigger.killAll();
    };
  }, []);

  return (
    <header>
      <div
        ref={header}
        className="header-row bg-white fixed top-0 left-0 z-50 overflow-hidden w-full py-4 md:py-6 lg:py-8 flex justify-between items-center will-change-transform"
      >
        <div className="container">
          <div className="flex justify-between items-center relative">
            <div className="lg:hidden"></div>

            <div ref={navLeft} className="hidden lg:flex gap-4">
              <Link
                className="hover:text-[#ffc045] transition-all duration-300 ease-in-out"
                href={"/"}
              >
                ASOSIY
              </Link>
              <Link
                className="hover:text-[#ffc045] transition-all duration-300 ease-in-out"
                href={"#about"}
              >
                BIZ HAQIMIZDA
              </Link>
              <Link
                className="hover:text-[#ffc045] transition-all duration-300 ease-in-out"
                href={"#projects"}
              >
                XONADONLAR
              </Link>
            </div>

            <div className="top-2/4 left-2/4 transform-gpu -translate-x-2/4 -translate-y-2/4 absolute">
              <Link href={"/"}>
                <Image
                  width={100}
                  height={100}
                  ref={logo}
                  src="/logo.svg"
                  alt="logo"
                  className="w-14 lg:w-20 object-contain"
                />
              </Link>
            </div>

            <button
              onClick={() => closeOpen()}
              ref={menu}
              className="lg:hidden relative w-10 h-2 focus:outline-none"
              aria-label="Toggle menu"
            >
              <div className="relative w-full h-full flex justify-center items-center">
                {/* Top line */}
                <span
                  className={`w-10 h-0.5 bg-black absolute transition-all duration-500 ease-in-out 
        ${
          openModal
            ? "rotate-26 translate-y-0 top-1/2"
            : "top-0 -translate-y-1/2"
        }`}
                ></span>

                <span
                  className={`w-10 h-0.5 bg-black absolute transition-all duration-500 ease-in-out 
        ${
          openModal
            ? "-rotate-26 translate-y-0 top-1/2"
            : "top-full -translate-y-1/2"
        }`}
                ></span>
              </div>
            </button>

            <div ref={navRight} className="hidden lg:flex gap-4">
              <Link
                className="hover:text-[#ffc045] transition-all duration-300 ease-in-out"
                href={"/tour"}
              >
                360° SAYOHAT
              </Link>
              <Link
                className="hover:text-[#ffc045] transition-all duration-300 ease-in-out"
                href={"#info"}
              >
                FAOLIYAT
              </Link>
              <Link
                className="hover:text-[#ffc045] transition-all duration-300 ease-in-out"
                href={"#contact"}
              >
                ALOQA
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
