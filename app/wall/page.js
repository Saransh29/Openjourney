"use client";
import Gallery from "react-photo-gallery";
import Footer from "@/main/components/footer";

// all the photos from public folder
const photos = [
  {
    src: "https://openjourney-next.vercel.app/1231.png",
    width: 3,
    height: 4,
  },
  {
    src: "https://openjourney-next.vercel.app/download (9).png",
    width: 1,
    height: 1,
  },
  {
    src: "https://openjourney-next.vercel.app/1232.png",
    width: 3,
    height: 4,
  },

  {
    src: "https://openjourney-next.vercel.app/download (14).png",
    width: 1,
    height: 1,
  },

  {
    src: "https://openjourney-next.vercel.app/download (2).png",
    width: 4,
    height: 4,
  },
  {
    src: "https://openjourney-next.vercel.app/download (3).png",
    width: 4,
    height: 4,
  },
  {
    src: "https://openjourney-next.vercel.app/1233.png",
    width: 3,
    height: 4,
  },
  {
    src: "https://openjourney-next.vercel.app/download.png",
    width: 4,
    height: 4,
  },

  {
    src: "https://openjourney-next.vercel.app/og.png",
    width: 4,
    height: 4,
  },

  {
    src: "https://openjourney-next.vercel.app/download (10).png",
    width: 4,
    height: 4,
  },
  {
    src: "https://openjourney-next.vercel.app/download (11).png",
    width: 4,
    height: 4,
  },

  {
    src: "https://openjourney-next.vercel.app/download (12).png",
    width: 4,
    height: 4,
  },
  {
    src: "https://openjourney-next.vercel.app/download (13).png",
    width: 4,
    height: 4,
  },
  {
    src: "https://openjourney-next.vercel.app/download (21).png",
    width: 4,
    height: 4,
  },

  {
    src: "https://openjourney-next.vercel.app/download (24).png",
    width: 4,
    height: 4,
  },
  {
    src: "https://openjourney-next.vercel.app/download (17).png",
    width: 4,
    height: 4,
  },

  {
    src: "https://openjourney-next.vercel.app/1235.png",
    width: 3,
    height: 4,
  },
  {
    src: "https://openjourney-next.vercel.app/download (23).png",
    width: 4,
    height: 4,
  },
  {
    src: "https://openjourney-next.vercel.app/download (20).png",
    width: 2,
    height: 2,
  },
  {
    src: "https://openjourney-next.vercel.app/download (25).png",
    width: 4,
    height: 4,
  },
  {
    src: "https://openjourney-next.vercel.app/download (16).png",
    width: 2,
    height: 2,
  },
  {
    src: "https://openjourney-next.vercel.app/download (26).png",
    width: 4,
    height: 4,
  },
  {
    src: "https://openjourney-next.vercel.app/download (18).png",
    width: 2,
    height: 2,
  },
  {
    src: "https://openjourney-next.vercel.app/download (27).png",
    width: 4,
    height: 4,
  },
  {
    src: "https://openjourney-next.vercel.app/download (19).png",
    width: 2,
    height: 2,
  },
];

export default function Wall() {
  return (
    <div>
      <div className="w-full flex flex-row items-center justify-center text-center text-1xl px-6 pt-24">
        <Gallery photos={photos} />
      </div>
      <Footer />
    </div>
  );
}
