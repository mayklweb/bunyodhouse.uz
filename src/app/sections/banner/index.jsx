"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";

function Banner() {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.play().catch((err) => {
        console.warn("Video autoplay failed:", err);
      });
    }
  }, []);

  return (
    <section id="/">
      <div className="w-full h-screen overflow-hidden">
        <div className="w-full h-full relative flex flex-col items-center justify-center">
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover absolute top-[50%] left-[50%] -translate-y-2/4 -translate-x-2/4"
          >
            <source src="/banner.mp4" type="video/mp4" />
          </video>

          <div className="w-full absolute top-6/8 left-1/2 h-full -translate-x-2/4 -translate-y-2/4 flex flex-col items-center justify-center">
            <Link
              href={"/tour"}
              className="w-[300px] h-[60px] text-[#FFC045] bg-white text-xl flex items-center justify-center border cursor-pointer hover:scale-110 transition-all duration-500"
            >
              360° SAYOHAT
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Banner;
