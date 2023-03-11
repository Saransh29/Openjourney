import CreatePost from "@/main/components/CreatePost";
import Navbar from "@/main/navbar";
import React from "react";

const page = () => {
  return (
    <div>
      <div className="h-20"></div>
      <div className="w-full items-center justify-center px-6">
        <CreatePost />
      </div>
    </div>
  );
};

export default page;
