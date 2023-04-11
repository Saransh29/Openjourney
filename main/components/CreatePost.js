"use client";
import React, { useEffect, useState } from "react";
import { preview } from "../assets";
import { getRandomPrompt } from "../utils";
import Loader from "./Loader";

import Image from "next/image";

const CreatePost = () => {
  const [savelink, setSavelink] = useState("");
  const [Op, setOp] = useState({
    prompt: "",
    image: "",
  });
  const [prmpt, setPrmpt] = useState({
    prompt: "",
    selectedSteps: "",
    selectedSampler: "",
    selectedCfg: "",
    image: "",
  });

  const [prompt, setPrompt] = useState("");
  const [previewImg, setPreviewImg] = useState("");
  const [selectedSteps, setSelectedSteps] = useState("40");
  const [selectedSampler, setSelectedSampler] = useState("Euler a");
  const [selectedCfg, setSelectedCfg] = useState("7");
  const [generatingImg, setGeneratingImg] = useState(false);
  const [loading, setLoading] = useState(false);
  // const [progress, setProgress] = useState(0);

  // useEffect(() => {
  //   if (loading) {
  //     const interval = setInterval(() => {
  //       fetch("https://kind-jade-wombat-wear.cyclic.app/progress")
  //         // fetch("http://localhost:5000/progress")
  //         .then((res) => res.json())
  //         .then((data) => {
  //           setProgress(data.progress);
  //         });
  //     }, 1000);
  //     return () => {
  //       // console.log("cleanup");
  //       setLoading(false);
  //       clearInterval(interval);
  //     };
  //   }
  // }, [loading]);

  const handlePromptChange = (e) => setPrompt(e.target.value);

  const handleSurpriseMe = () => {
    const randomPrompt = getRandomPrompt(prompt);
    setPrompt(randomPrompt);
  };

  const MongoPost = async () => {
    try {
      const response = await fetch(
        "https://kind-jade-wombat-wear.cyclic.app/mongo",
        // "http://localhost:5000/mongo",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            prompt: Op.prompt,
            // selectedSteps: prmpt.selectedSteps,
            // selectedSampler: prmpt.selectedSampler,
            // selectedCfg: prmpt.selectedCfg,
            image: Op.image,
            model: "dalle",
          }),
        }
      );
      const temp = await response.json();
      const d = temp.data;
      // console.log(d._id);
      setSavelink(`https://openjourney-next.vercel.app/c/${d._id}`);
      // console.log(data);
    } catch (err) {
      alert(err);
    }
  };

  // when image is generated, save it to mongoDB
  // useEffect(() => {
  //   if (prmpt.image) {
  //     MongoPost();
  //   }
  // }, [prmpt]);

  useEffect(() => {
    if (Op.image) {
      MongoPost();
    }
  }, [Op.image]);

  const openAIImage = async () => {
    if (prompt) {
      try {
        setGeneratingImg(true);
        setLoading(true);
        const response = await fetch(
          "https://kind-jade-wombat-wear.cyclic.app/api/v1/dalle",
          // "https://stable-diff-api-production.up.railway.app/api/v1/dalle",
          // "http://localhost:5000/api/v1/dalle",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              prompt: `${prompt}`,
            }),
          }
        );
        const data = await response.json();
        setPreviewImg(`data:image/png;base64,${data.photo}`);
        setOp({
          prompt: prompt,
          image: `data:image/png;base64,${data.photo}`,
        });
        // console.log(prmpt);
      } catch (err) {
        alert(err);
      } finally {
        setLoading(false);
        setGeneratingImg(false);
      }
    } else {
      alert("Please provide proper prompt");
    }
  };

  // const generateImage = async () => {
  //   if (prompt) {
  //     try {
  //       setGeneratingImg(true);
  //       setLoading(true);

  //       const response = await fetch(
  //         "https://kind-jade-wombat-wear.cyclic.app/image-gen",
  //         // "http://localhost:5000/image-gen",
  //         {
  //           method: "POST",
  //           headers: {
  //             "Content-Type": "application/json",
  //           },
  //           body: JSON.stringify({
  //             prompt: `mdjrny-v4 style , ${prompt}`,
  //             steps: selectedSteps,
  //             cfg_scale: selectedCfg,
  //             sampler_index: selectedSampler,
  //             height: 512,
  //             width: 512,
  //           }),
  //         }
  //       );
  //       const data = await response.json();

  //       setPreviewImg(`data:image/png;base64,${data.images[0]}`);
  //       // await data before setting state

  //       setPrmpt({
  //         prompt: prompt,
  //         selectedSteps: selectedSteps,
  //         selectedSampler: selectedSampler,
  //         selectedCfg: selectedCfg,
  //         image: `data:image/png;base64,${data.images[0]}`,
  //       });

  //       // console.log(prmpt);
  //     } catch (err) {
  //       alert(err);
  //     } finally {
  //       setLoading(false);
  //       setGeneratingImg(false);
  //     }
  //   } else {
  //     alert("Please provide proper prompt");
  //   }
  // };

  return (
    <section className="2xl:pt-10 lg:pt-20 md:pt-32 pt-20 md:px-10 mx-auto ">
      <div className="flex flex-col lg:flex-row gap-5 justify-between">
        <div className="flex flex-col  gap-5 justify-center">
          <div>
            <h1 className=" font-extrabold text-[#222328] text-[32px]">
              Create
            </h1>
            <p className=" mt-2 max-w-7xl text-[#666e75] text-[14px] pb-5">
              Generate an imaginative image through OpenAI&apos;s DALL-E model.{" "}
              <br />
              <span className="">
                Previously used Stable Diffusion AI - midjourney v4 Model. view
                in{" "}
                <a className="text-purple-500 " href="/community">
                  {" "}
                  Community.
                </a>
              </span>
              <p>
                Over 500 Images generated by 216 unique visitors from 41
                Countries
              </p>
            </p>
          </div>
          <div>
            <div className="flex items-center gap-2 mb-2">
              <label
                htmlFor="prompt"
                className="block text-sm font-medium text-gray-900"
              >
                Prompt
              </label>
              <button
                type="button"
                onClick={handleSurpriseMe}
                className="font-semibold text-xs bg-[#EcECF1] py-1 px-2 rounded-[5px] text-black"
              >
                Surprise me
              </button>
            </div>
            <input
              type="text"
              name="prompt"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#6469ff] focus:border-[#6469ff] outline-none block w-full p-3"
              placeholder="An Impressionist oil painting of sunflowers in a purple vase…"
              value={prompt}
              onChange={handlePromptChange}
              required
            />
          </div>
          <div className="">
            <p className=" text-red-400">
              Ran out of GCP Credits. Stable Diffusion settings disabled.
            </p>
          </div>

          <div className="flex ">
            <div className="py-3 flex flex-col">
              <div className="flex flex-row">
                <label
                  htmlFor="cfg"
                  className="block mb-2 text-sm font-medium text-gray-900 px-1"
                >
                  CFG
                </label>
                <div className="relative flex flex-col items-center group">
                  <svg
                    className="w-5 h-5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <div className="absolute bottom-0 flex flex-col items-center hidden mb-6 group-hover:flex">
                    <span className="relative z-10 p-2 text-xs leading-none text-white whitespace-no-wrap bg-black shadow-lg">
                      CFG scale adjusts how much the image looks closer to the
                      prompt and/ or input image.
                    </span>
                    <div className="w-3 h-3 -mt-2 rotate-45 bg-black"></div>
                  </div>
                </div>
              </div>

              <select
                id="cfg"
                disabled
                value={selectedCfg}
                onChange={(e) => setSelectedCfg(e.target.value)}
                className="border bg-gray-400 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-42 px-2.5 py-2  "
              >
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
              </select>
            </div>
            <div className="py-3 flex flex-col px-5">
              <div className="flex flex-row">
                <label
                  htmlFor="cfg"
                  className="block mb-2 text-sm font-medium text-gray-900 px-1"
                >
                  Steps
                </label>
                <div className="relative flex flex-col items-center group">
                  <svg
                    className="w-5 h-5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <div className="absolute bottom-0 flex flex-col items-center hidden mb-6 group-hover:flex">
                    <span className="relative z-10 p-2 text-xs leading-none text-white whitespace-no-wrap bg-black shadow-lg">
                      Number of sampling steps , generally 30 is good enough.
                    </span>
                    <div className="w-3 h-3 -mt-2 rotate-45 bg-black"></div>
                  </div>
                </div>
              </div>

              <select
                id="Steps"
                disabled
                value={selectedSteps}
                onChange={(e) => setSelectedSteps(e.target.value)}
                className="border bg-gray-400 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-42 px-2.5 py-2  "
              >
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="30">30</option>
                <option value="40">40</option>
                <option value="50">50</option>
              </select>
            </div>
            <div className="py-3 flex flex-col">
              <div className="flex flex-row">
                <label
                  htmlFor="Sampler"
                  className="block mb-2 text-sm font-medium text-gray-900 px-1"
                >
                  Sampler
                </label>
                <div className="relative flex flex-col items-center group">
                  <svg
                    className="w-5 h-5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <div className="absolute bottom-0 flex flex-col items-center hidden mb-6 group-hover:flex">
                    <span className="relative z-10 p-2 text-xs leading-none text-white whitespace-no-wrap bg-black shadow-lg">
                      Sampling Methods- Euler a: quickest, but not as good as
                      DPM2 a
                    </span>

                    <div className="w-3 h-3 -mt-2 rotate-45 bg-black"></div>
                  </div>
                </div>
              </div>

              <select
                disabled
                id="Sampler"
                value={selectedSampler}
                onChange={(e) => setSelectedSampler(e.target.value)}
                className="border bg-gray-400 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-42 px-2.5 py-2  "
              >
                <option value="Euler a">Euler a</option>
                <option value="DPM2 a">DPM2 a</option>
                <option value="DPM++ 2M Karras">DPM++ 2M Karras</option>
                <option value="DPM fast">DPM fast</option>
                <option value="DPM adaptive">DPM adaptive</option>
                <option value="LMS">LMS</option>
                <option value="DPM++ 2S a Karras">DPM++ 2S a Karras</option>
              </select>
            </div>
            <div className="mt-8 px-8 hidden md:block">
              <button
                // disabled
                type="button"
                // onClick={generateImage}
                onClick={openAIImage}
                disabled
                className=" text-white bg-green-700 font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center"
              >
                {generatingImg ? "Generating..." : "Generate"}
              </button>
            </div>
            {/* <button >Test</button> */}
          </div>
          <div>
            <div>
              <p className=" mt-2 max-w-7xl text-[#666e75] text-[14px] px-2">
                Using &quot;DMP2&quot; a Sampler provides best results , but
                will take longer.
              </p>
              <p className=" mt-2 max-w-7xl text-[#666e75] text-[14px] px-2">
                Use &quot;LMS&quot; or &quot;Euler a&quot; & less steps for
                quick results.
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-end">
          <div>
            <div className="relative bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-xl focus:ring-blue-500 focus:border-blue-500 md:max-w-lg flex justify-center items-center">
              {previewImg ? (
                <Image
                  // src={form.photo}
                  src={previewImg}
                  alt={prompt}
                  className="w-full h-full object-contain rounded-xl"
                  width={512}
                  height={512}
                ></Image>
              ) : (
                <Image
                  src={preview}
                  alt="preview"
                  className="w-9/12 h-9/12 object-contain opacity-40"
                ></Image>
              )}

              {generatingImg && (
                <div className="absolute inset-0 z-0 flex justify-center items-center bg-[rgba(0,0,0,0.5)] rounded-lg">
                  <Loader />
                </div>
              )}
            </div>
            <div className="text-center w-full p-5">
              {savelink ? (
                <a
                  href={savelink}
                  className="text-1xl"
                  target="_blank"
                  rel="noreferrer"
                >
                  Share : {savelink}
                </a>
              ) : null}
            </div>

            {/* {generatingImg ? (
              <div>
                <div className="flex justify-between m-1 pt-2">
                  <span className="text-base font-medium text-blue-700">
                    Progress
                  </span>
                  <span className="text-sm font-medium text-blue-700 ">
                    {Math.trunc(progress * 100)}%
                  </span>
                </div>
                <div className="w-full bg-gray-300 rounded-full h-2.5 ">
                  <div
                    className="bg-blue-600 h-2.5 rounded-full"
                    style={{ width: `${progress * 100}%` }}
                  ></div>
                </div>
              </div>
            ) : null} */}
          </div>
        </div>
      </div>

      <div className="mt-5 flex gap-5">
        <button
          type="button"
          // onClick={generateImage}
          onClick={openAIImage}
          disabled
          className=" text-white bg-green-700 font-medium rounded-md text-sm w-full md:w-auto px-5 py-2.5 text-center md:hidden"
        >
          {generatingImg ? "Generating..." : "Generate"}
        </button>
      </div>

      <div className="h-10"></div>
    </section>
  );
};

export default CreatePost;
