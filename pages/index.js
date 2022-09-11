import React, { useState, useEffect } from "react";
import Nav from "../components/Nav";
import Social from "../components/Social";
import Box from "../components/Box";
import Footer from "../components/Footer";
import { notification } from "../components/Toast";
import { sanityClient } from "../sanity";

export default function Home({ posts }) {
  const [email, setemail] = useState("");
  const [data, setdata] = useState([]);

  //Email Submitting
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) {
      notification("warn", "Pleace Write Your Email");
    } else {
      notification("suc", "Subscribe Successfully");
      setemail("");
    }
  };

  //when page load all the blogs are showen
  useEffect(() => {
    setdata(posts);
  }, []);

  //sort blogs
  const handleShort = (name) => {
    //sort statement are empty
    if (name !== "all") {
      //sort the blogs
      const short_data = posts.filter((value) => {
        return value.categories[0].title.toLowerCase() == name.toLowerCase();
      });
      //if blogs are not found or blogs equal to 0
      short_data?.length == 0 ? setdata("Not Found") : setdata(short_data);
    } else {
      setdata(posts);
    }
  };

  return (
    <>
      <Nav />

      {/********* Header Section ************/}
      <header className=" w-[90%] sm:w-[480px] md:w-[700px] lg:w-[1000px] xl:w-[1400px] mx-auto text-center my-14 xl:mt-24">
        <p className="gradiant_text text-5xl md:text-[75px] lg:text-[98px] xl:text-[110px] font-bold lg:mb-7">
          Welcome
        </p>
        <h1 className=" capitalize my-4 text-[22px] sm:text-3xl md:text-[42px] lg:text-5xl xl:text-[55px] sm:leading-[45px] md:leading-[60px] lg:leading-[70px] xl:leading-[78px] font-semibold">
          Learn The Fundametals of <br /> a Developement
        </h1>
        <p className=" text-sm md:text-[16px] xl:text-xl md:w-11/12 lg:w-5/6 xl:w-[950px] md:mx-auto leading-6 md:leading-8 xl:leading-10 break-all">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid vel,
          voluptatibus nostrum debitis culpa quis porro fugit ex delectus saepe,
          perferendis id minus sunt et.
        </p>
        <form
          onSubmit={handleSubmit}
          className=" w-[100%] lg:w-[570px] xl:w-[650px] h-24 md:h-24 lg:h-28 xl:h-32 rounded-md bg-white dark:bg-[#253345] flex justify-center items-center mx-auto mt-6 lg:mt-9 mb-5 lg:mb-8 px-2 shadow-md"
        >
          <div className=" w-[85%] relative">
            <i className="fa-regular fa-envelope absolute left-3 lg:left-4 top-[13px] lg:top-[17px] text-[22px] text-gray-400"></i>
            <input
              type="email"
              placeholder="Drop Your Email Here"
              className=" text-sm lg:text-[16px] w-full border rounded py-3 lg:py-4 px-10 lg:px-12"
              onChange={(e) => setemail(e.target.value)}
              value={email}
            />
            <button className="gradiant_btn absolute right-0 text-sm lg:text-[16px] font-bold text-white py-[12.8px] lg:py-[16.8px] px-3 md:px-4 lg:px-6 rounded-r">
              Subscribe
            </button>
          </div>
        </form>
        <Social />
      </header>

      {/********* Cetagory Section ************/}
      <section className=" w-[90%] md:w-[700px] lg:w-[1000px] mx-auto mb-5 xl:mb-8 lg:mt-24">
        <h2 className=" text-3xl md:text-4xl lg:text-[42px] xl:text-5xl font-bold text-center mb-2 xl:mb-4">
          Latest Article
        </h2>
        <div className="cetagory flex items-center sm:justify-center overflow-auto h-16">
          <button onClick={() => handleShort("all")}>All</button>
          <button onClick={() => handleShort("React.js")}>React.js</button>
          <button onClick={() => handleShort("javascript")}>Javascript</button>
          <button onClick={() => handleShort("next.js")}>Next.js</button>
          <button onClick={() => handleShort("style")}>Style</button>
          <button onClick={() => handleShort("firebase")}>Firebase</button>
          <button onClick={() => handleShort("others")}>Others</button>
        </div>
      </section>

      {/********* Article Section ************/}
      <article className=" w-[90%] md:w-[700px] lg:w-[1000px] xl:w-[1400px] mx-auto flex justify-center flex-wrap">
        {data == "Not Found" ? (
          <h1 className=" text-xl md:text-2xl lg:text-3xl mb-12 font-bold">
            {data}
          </h1>
        ) : (
          <>
            {data?.map((value) => {
              return (
                <React.Fragment key={value._id}>
                  <Box {...value} />
                </React.Fragment>
              );
            })}
          </>
        )}
      </article>
      <Footer />
    </>
  );
}

export const getServerSideProps = async () => {
  const query = `*[_type == "post"]{
    _id,
    _createdAt,
    title,
    mainImage,
    slug,
    categories[] -> {
      title 
     },
  }`;
  const posts = await sanityClient.fetch(query);

  return {
    props: {
      posts,
    },
  };
};
