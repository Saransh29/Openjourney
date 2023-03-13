"use client";
import React, { useEffect, useState } from "react";
import { preview } from "../assets";
import { getRandomPrompt } from "../utils";
import { FormField, Loader } from ".";

import Image from "next/image";

const CreatePost = () => {
  const [form, setForm] = useState({
    name: "",
    prompt: "",
    photo: "",
  });
  const [prmpt, setPrmpt] = useState({
    prompt: "",
    selectedSteps: "",
    selectedSampler: "",
    selectedCfg: "",
  });
  const [previewImg, setPreviewImg] = useState("");
  const [selectedSteps, setSelectedSteps] = useState("40");
  const [selectedSampler, setSelectedSampler] = useState("Euler a");
  const [selectedCfg, setSelectedCfg] = useState("7");
  const [generatingImg, setGeneratingImg] = useState(false);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);


  useEffect(() => {
    if (loading) {
      const interval = setInterval(() => {
        fetch("https://kind-jade-wombat-wear.cyclic.app/progress")
          .then((res) => res.json())
          .then((data) => {
            setProgress(data.progress);
          });
      }, 1000);
      return () => {
        console.log("cleanup")
        setLoading(false);
        clearInterval(interval);
      };
    }
  }, [loading]);


  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSurpriseMe = () => {
    const randomPrompt = getRandomPrompt(form.prompt);
    setForm({ ...form, prompt: randomPrompt });
  };

  const generateImage = async () => {
    if (form.prompt) {
      try {
        setGeneratingImg(true);
        setLoading(true);

        const response = await fetch(
          "https://kind-jade-wombat-wear.cyclic.app/test-raw",
          // "http://localhost:5000/test-raw",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              prompt: `mdjrny-v4 style , ${form.prompt}`,
              steps: selectedSteps,
              cfg_scale: selectedCfg,
              sampler_index: selectedSampler,
              height: 512,
              width: 512,
            }),
          }
        );
        const data = await response.json();

        setPreviewImg(`data:image/png;base64,${data.images[0]}`);
        setForm({ ...form, photo: `data:image/png;base64,${data.images[0]}` });
        setPrmpt({
          prompt: form.prompt,
          selectedSteps: selectedSteps,
          selectedSampler: selectedSampler,
          selectedCfg: selectedCfg,
        });
        console.log(prmpt);
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    alert("Please generate an image first");
  };

  return (
    <section className="md:px-10 mx-auto">

      <form className="px-3 mt-8 " onSubmit={handleSubmit}>
        <div className="flex flex-col lg:flex-row gap-5 justify-between">
          <div className="flex flex-col  gap-5 justify-center">
            <div>
              <h1 className=" font-extrabold text-[#222328] text-[32px]">
                Create
              </h1>
              <p className=" mt-2 max-w-7xl text-[#666e75] text-[14px] pb-5">
                Generate an imaginative image through Stable Diffusion AI -
                midjourney v4 Model.
              </p>
            </div>
            <FormField
              labelName="Prompt"
              type="text"
              name="prompt"
              placeholder="An Impressionist oil painting of sunflowers in a purple vase…"
              value={form.prompt}
              handleChange={handleChange}
              isSurpriseMe
              handleSurpriseMe={handleSurpriseMe}
            />

            <div className="flex ">
              <div className="py-3 flex flex-col">
                <div className="flex flex-row">
                  <label
                    for="cfg"
                    class="block mb-2 text-sm font-medium text-gray-900 px-1"
                  >
                    CFG
                  </label>
                  <div class="relative flex flex-col items-center group">
                    <svg
                      class="w-5 h-5"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                        clip-rule="evenodd"
                      />
                    </svg>
                    <div class="absolute bottom-0 flex flex-col items-center hidden mb-6 group-hover:flex">
                      <span class="relative z-10 p-2 text-xs leading-none text-white whitespace-no-wrap bg-black shadow-lg">
                        CFG scale adjusts how much the image looks closer to the
                        prompt and/ or input image.
                      </span>
                      <div class="w-3 h-3 -mt-2 rotate-45 bg-black"></div>
                    </div>
                  </div>
                </div>

                <select
                  id="cfg"
                  value={selectedCfg}
                  onChange={(e) => setSelectedCfg(e.target.value)}
                  class="border bg-gray-50 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-42 px-2.5 py-2  "
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
                    for="cfg"
                    class="block mb-2 text-sm font-medium text-gray-900 px-1"
                  >
                    Steps
                  </label>
                  <div class="relative flex flex-col items-center group">
                    <svg
                      class="w-5 h-5"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                        clip-rule="evenodd"
                      />
                    </svg>
                    <div class="absolute bottom-0 flex flex-col items-center hidden mb-6 group-hover:flex">
                      <span class="relative z-10 p-2 text-xs leading-none text-white whitespace-no-wrap bg-black shadow-lg">
                        Number of sampling steps , generally 30 is good enough.
                      </span>
                      <div class="w-3 h-3 -mt-2 rotate-45 bg-black"></div>
                    </div>
                  </div>
                </div>

                <select
                  id="Steps"
                  value={selectedSteps}
                  onChange={(e) => setSelectedSteps(e.target.value)}
                  class="border bg-gray-50 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-42 px-2.5 py-2  "
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
                    for="Sampler"
                    class="block mb-2 text-sm font-medium text-gray-900 px-1"
                  >
                    Sampler
                  </label>
                  <div class="relative flex flex-col items-center group">
                    <svg
                      class="w-5 h-5"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                        clip-rule="evenodd"
                      />
                    </svg>
                    <div class="absolute bottom-0 flex flex-col items-center hidden mb-6 group-hover:flex">
                      <span class="relative z-10 p-2 text-xs leading-none text-white whitespace-no-wrap bg-black shadow-lg">
                        Sampling Methods- Euler a: quickest, but not as good as
                        DPM2 a
                      </span>

                      <div class="w-3 h-3 -mt-2 rotate-45 bg-black"></div>
                    </div>
                  </div>
                </div>

                <select
                  id="Sampler"
                  value={selectedSampler}
                  onChange={(e) => setSelectedSampler(e.target.value)}
                  class="border bg-gray-50 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-42 px-2.5 py-2  "
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
                  type="button"
                  onClick={generateImage}
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
              <div className="relative bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-xl focus:ring-blue-500 focus:border-blue-500 md:max-w-md flex justify-center items-center">
                {form.photo ? (
                  <Image
                    // src={form.photo}
                    src={previewImg}
                    alt={form.prompt}
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

              {generatingImg ? (
                <div>
                  <div class="flex justify-between m-1 pt-2">
                    <span class="text-base font-medium text-blue-700">
                      Progress
                    </span>
                    <span class="text-sm font-medium text-blue-700 ">
                      {Math.trunc(progress * 100)}%
                    </span>
                  </div>
                  <div class="w-full bg-gray-300 rounded-full h-2.5 ">
                    <div
                      class="bg-blue-600 h-2.5 rounded-full"
                      style={{ width: `${progress * 100}%` }}
                    ></div>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </div>

        <div className="mt-5 flex gap-5">
          <button
            type="button"
            onClick={generateImage}
            className=" text-white bg-green-700 font-medium rounded-md text-sm w-full md:w-auto px-5 py-2.5 text-center md:hidden"
          >
            {generatingImg ? "Generating..." : "Generate"}
          </button>
        </div>

        <div className="h-10"></div>
      </form>
    </section>
  );
};

export default CreatePost;
