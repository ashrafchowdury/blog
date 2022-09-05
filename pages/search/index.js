import React, { useState } from "react";
import { useRouter } from "next/router";

const search = () => {
  const [search, setsearch] = useState("");
  const router = useRouter();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!search) {
      router.push("/");
    } else {
      router.push(`/search/${search}`);
    }
  };
  return (
    <section>
      <button
        className=" absolute top-16 right-24 xl:py-2 xl:px-4 bg-red-400  rounded"
        onClick={() => router.back()}
      >
        <i className="fa-solid fa-xmark xl:text-2xl text-white"></i>
      </button>
      <form
        onSubmit={handleSubmit}
        className=" w-[85%] md:w-[550px] lg:w-[750] xl:w-[850px] h-24 md:h-24 lg:h-28 xl:h-32 rounded-md bg-white flex justify-center items-center mx-auto mt-32 lg:mt-40 mb-5 lg:mb-8 px-2 shadow-md"
      >
        <div className=" w-[85%] relative">
          <i className="fa-solid fa-magnifying-glass absolute left-3 lg:left-4 top-[13px] lg:top-[17px] text-[22px] text-gray-400"></i>
          <input
            type="search"
            placeholder="Search Blogs"
            className=" text-sm lg:text-[16px] w-full border rounded py-3 lg:py-4 px-10 lg:px-12"
            onChange={(e) => setsearch(e.target.value)}
            value={search}
          />
          <button className="gradiant_btn absolute right-0 text-sm lg:text-[16px] font-bold text-white py-[12.6px] lg:py-[16.4px] px-3 md:px-4 lg:px-6 rounded-r">
            Search
          </button>
        </div>
      </form>
    </section>
  );
};

export default search;
