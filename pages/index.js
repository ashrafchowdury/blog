import React, { useState, useEffect } from "react";
import Head from "next/head";
//compoenents
import Social from "../components/Social";
import Box from "../components/Box";
import { notification } from "../components/Toast";
//sanity
import { sanityClient } from "../sanity";
//Firebase
import { db } from "../firebase/firebase";
import { setDoc, doc } from "firebase/firestore";


export default function Home({ posts }) {
  const [email, setemail] = useState("");
  const [data, setdata] = useState([]);

  //Email Submitting
  const handleEmailSubmit = (e) => {
    e.preventDefault();
    if (!email) {
      notification("warn", "Pleace Write Your Email");
    } else {
      //add user email on Firestore
      setDoc(doc(db, "subscribers", email), {
        email,
      })
        .then(() => {
          //Show Success Message
          notification("suc", "Subscribe Successfully");
          setemail("");
        })
        .catch((error) => {
          //if something was rong, then show the Error Message
          notification("wanr", error?.message);
        });
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
      {/***************** Head section for SEO ****************************/}
      <Head>
        <title>Learn The Fundametals of Web Developement on Roadmap</title>
        <meta
          name="description"
          content="Learn the fundamental of web development with us, we are here to teach you the best way to learn web development, we post blogs every week regarding web development"
        />
      </Head>

      {/********* Header Section ************/}
      <header className=" w-[95%] sm:w-[480px] md:w-[700px] lg:w-[1000px] xl:w-[1400px] mx-auto text-center my-14 mt-24 xl:mt-24">
        <p
          data-aos="zoom-in-down"
          className="gradiant_text text-6xl md:text-[75px] lg:text-[105px] xl:text-[122px] font-bold mb-6 lg:mb-9"
        >
          Welcome
        </p>
        <h1
          data-aos="zoom-in-down"
          className=" space capitalize my-4 text-[22px] sm:text-3xl md:text-[42px] lg:text-5xl xl:text-[55px] sm:leading-[45px] md:leading-[60px] lg:leading-[70px] xl:leading-[78px] font-normal"
        >
          Learn and Build New Technologies To <br /> Improve Your Portfolio
        </h1>
        <p
          data-aos="zoom-in-down"
          className=" text-xs md:text-[16px] xl:text-xl md:w-11/12 lg:w-5/6 xl:w-[1050px] md:mx-auto leading-6 md:leading-8 xl:leading-10 mb-8 md:mb-12 mt-4 md:mt-6"
        >
          Learn the fundamental of web development with us, we are here to teach
          you the best way to learn web development, we post blogs every week
          regarding web development, and you can subscribe to our weekly
          newsletter to learn new technologies.
        </p>
        <form
          onSubmit={handleEmailSubmit}
          className=" w-[100%] lg:w-[570px] xl:w-[750px] h-24 md:h-24 lg:h-28 xl:h-32 rounded-md bg-white dark:bg-[#253345] flex justify-center items-center mx-auto mt-6 lg:mt-9 mb-5 lg:mb-8 px-2 shadow-md"
          data-aos="fade-up"
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
            <button
              className="gradiant_btn absolute right-0 text-sm lg:text-[16px] font-bold text-white py-[13px] lg:py-[16.8px] px-3 md:px-4 lg:px-6 rounded-r"
              title="Subscribe"
            >
              Subscribe
            </button>
          </div>
        </form>
        <Social />
      </header>

      {/********* Cetagory Section ************/}
      <section
        className=" w-[90%] md:w-[700px] lg:w-[1000px] mx-auto mb-5 xl:mb-8 mt-20 lg:mt-32"
        id="blogs"
      >
        <h2
          data-aos="fade-down"
          className=" text-3xl md:text-4xl lg:text-[42px] xl:text-5xl font-bold text-center mb-6 lg:mb-12"
        >
          Latest Article
        </h2>
        <div
          data-aos="fade-down"
          className="cetagory flex items-center sm:justify-center overflow-auto h-16"
        >
          <button onClick={() => handleShort("all")}>All</button>
          <button onClick={() => handleShort("React.js")}>React.js</button>
          <button onClick={() => handleShort("javascript")}>Javascript</button>
          <button onClick={() => handleShort("next.js")}>Next.js</button>
          <button onClick={() => handleShort("style")}>Style</button>
          <button onClick={() => handleShort("backend")}>Back-End</button>
          <button onClick={() => handleShort("testing")}>Testing</button>
          <button onClick={() => handleShort("others")}>Others</button>
        </div>
      </section>

      {/********* Article Section ************/}
      <article className=" w-[90%] md:w-[700px] lg:w-[1000px] xl:w-[1400px] mx-auto flex justify-center flex-wrap">
        {/** Condition for blogs are empty then show the (not found) msg, othervise show the blog **/}
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
    </>
  );
}

//get the blog posts with server side rendering
export const getServerSideProps = async () => {
  //blog query
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
  //call api
  const posts = await sanityClient.fetch(query);

  //send the data to home page
  return {
    props: {
      posts,
    },
  };
};
