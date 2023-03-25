"use client";
import Photo from "@/main/components/item";
import Image from "next/image";
import { useState, useEffect } from "react";
import { AiOutlineGithub, AiOutlineLinkedin } from "react-icons/ai";
import Gallery from "react-photo-gallery";

export default function About() {
  const [data, setData] = useState([]);
  const [images, setImages] = useState([]);

  const getData = async () => {
    // const res = await fetch("https://kind-jade-wombat-wear.cyclic.app/posts");
    const res = await fetch(
      "https://stable-diff-api-production.up.railway.app/posts"
    );
    // const res = await fetch("http://localhost:5000/posts");
    const temp = await res.json();
    const d = temp.data;
    const imgs = d.map((item) => {
      if (item.height === 768) {
        return {
          src: item.image,
          width: 3,
          height: 4,
        };
      } else {
        return {
          src: item.image,
          width: 4,
          height: 4,
        };
      }
    });
    setImages(imgs);
    setData(d);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <div className="h-20"></div>

      {/* <Gallery photos={images} /> */}
      <div className="h-10"></div>
      <div className="w-full ">
        <div className="grid grid-cols-fluid">
          {data.length > 0 &&
            data.map((item) => (
              <Photo
                key={item._id}
                prompt={item.prompt}
                steps={item.steps}
                sampler_index={item.sampler_index}
                cfg_scale={item.cfg_scale}
                image={item.image}
              />
              // {/* <div className="w-1/3 p-5">
              //   <p>{item.prompt}</p>
              //   <p> Steps: {item.steps}</p>
              //   <p> Sampler: {item.sampler_index}</p>
              //   <p> Cfg : {item.cfg_scale}</p>
              // </div> */},

              // {/* <Image
              //   className="rounded-xl"
              //   src={item.image}
              //   alt={item.prompt}
              //   height={512}
              //   width={512}
              // ></Image> */}
            ))}
        </div>
      </div>
      <div className="h-20"></div>
      <p className="w-full text-center text-3xl">Testing Grid</p>

      <Gallery photos={images} />

      <div className="w-full flex flex-col items-start justify-center  px-6">
        <div className="w-full flex flex-row items-center justify-center text-center text-1xl px-6 pt-24">
          <p>Made by Saransh Bibiyan</p>
          <div>
            <div className=" m-2 p-5 rounded-xl flex flex-row items-center justify-center space-x-2 mb-1">
              <a
                href="https://github.com/Saransh29"
                rel="noreferrer"
                target="_blank"
              >
                <AiOutlineGithub
                  className="hover:-translate-y-1 transition-transform cursor-pointer text-black "
                  size={30}
                />
              </a>

              <a
                href="https://www.linkedin.com/in/saransh-bibiyan/"
                rel="noreferrer"
                target="_blank"
              >
                <AiOutlineLinkedin
                  className="hover:-translate-y-1 transition-transform cursor-pointer text-black"
                  size={30}
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
