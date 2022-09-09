import React from "react";
import Link from "next/link";
import { urlFor } from "../sanity";

const Box = ({ title, mainImage, slug, _id, _createdAt, categories }) => {
  console.log(categories);

  return (
    <Link href={`/post/${slug.current}`}>
      <div className=" w-[100%] md:w-[320px] lg:w-[400px] mx-3 lg:mx-4 lg:my-2 py-2 overflow-hidden cursor-pointer">
        <img
          src={urlFor(mainImage).url()}
          alt="image"
          className=" rounded w-[100%] md:w-[320px] lg:w-[400px] md:h-40 lg:h-52 object-cover duration-700 hover:scale-110"
        />
        <p className=" text-xs lg:text-sm flex justify-between mt-2">
          <span>{categories[0]?.title || "Web Development"}</span>{" "}
          <span>{_createdAt}</span>
        </p>
        <h1 className=" text-xl lg:text-2xl font-bold mt-2 lg:mt-3 mb-1">
          {title}
        </h1>
      </div>
    </Link>
  );
};

export default Box;
