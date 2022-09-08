import React from "react";
import Link from "next/link";
const Box = () => {
  return (
    <Link href="/post/slugh=All About Firebasae">
      <div className=" w-[100%] md:w-[320px] lg:w-[400px] mx-3 lg:mx-4 lg:my-2 py-2 overflow-hidden cursor-pointer">
        <img
          src="https://skilvul-prod-01.s3.ap-southeast-1.amazonaws.com/course/Skilvul%20asset%20volume%202-02.jpg"
          alt="image"
          className=" rounded w-[100%] md:w-[320px] lg:w-[400px] md:h-40 lg:h-52 object-cover duration-700 hover:scale-110"
        />
        <p className=" text-xs lg:text-sm flex justify-between mt-2">
          <span>Web Development</span> <span>PublishedAt: 21/3/2021</span>
        </p>
        <h1 className=" text-xl lg:text-2xl font-bold mt-2 lg:mt-3 mb-1">
          All About Firebasae
        </h1>
      </div>
    </Link>
  );
};

export default Box;
