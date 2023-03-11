"use client";
import React, { useState } from "react";
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
  const [previewImg, setPreviewImg] = useState("");
  const [generatingImg, setGeneratingImg] = useState(false);
  const [loading, setLoading] = useState(false);

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

        const response = await fetch(
          "https://kind-jade-wombat-wear.cyclic.app/test-raw",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              prompt: form.prompt,
              steps: 50,
              height: 512,
              width: 512,
            }),
          }
        );
        const data = await response.json();

        setPreviewImg(`data:image/png;base64,${data.images[0]}`);
        setForm({ ...form, photo: `data:image/png;base64,${data.images[0]}` });
      } catch (err) {
        alert(err);
      } finally {
        setGeneratingImg(false);
      }
    } else {
      alert("Please provide proper prompt");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.prompt && form.photo) {
      setLoading(true);
      try {
        const response = await fetch("http://localhost:5000/test-server", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
          },
          body: JSON.stringify({ ...form }),
        });

        await response.json();
        alert("Success");
      } catch (err) {
        alert(err);
      } finally {
        setLoading(false);
      }
    } else {
      alert("Please generate an image with proper details");
    }
  };

  return (
    <section className="max-w-7xl md:px-10 mx-auto">
      <div>
        <h1 className="px-3 font-extrabold text-[#222328] text-[32px]">
          Create
        </h1>
        <p className="px-3 mt-2 text-[#666e75] text-[14px] ">
          Generate an imaginative image through Stable Diffusion AI - midjourney
          v4 Model.
        </p>
      </div>

      <form className="px-3 mt-8 max-w-3xl" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-5">
          <FormField
            labelName="Your Name"
            type="text"
            name="name"
            placeholder="Ex., john doe"
            value={form.name}
            handleChange={handleChange}
          />

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
          <div className="relative bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-xl focus:ring-blue-500 focus:border-blue-500 w-64  h-64 flex justify-center items-center">
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
        </div>

        <div className="mt-5 flex gap-5">
          <button
            type="button"
            onClick={generateImage}
            className=" text-white bg-green-700 font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center"
          >
            {generatingImg ? "Generating..." : "Generate"}
          </button>
        </div>

        {/* <div className="mt-10">
          <p className="mt-2 text-[#666e75] text-[14px]">
            ** Once you have created the image you want, you can share it with
            others in the community **
          </p>
          <button
            type="submit"
            className="mt-3 text-white bg-[#6469ff] font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center"
          >
            {loading ? "Sharing..." : "Share with the Community"}
          </button>
        </div> */}
        <div className="h-10"></div>
      </form>
    </section>
  );
};

export default CreatePost;
