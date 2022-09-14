import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import { sanityClient } from "../../sanity";
import Box from "../../components/Box";
import Footer from "../../components/Footer";
import Nav from "../../components/Nav";

const search = ({ posts }) => {
  const router = useRouter();
  const { search } = router.query;

  return (
    <>
      {/***************** Head section for SEO ****************************/}
      <Head>
        <title>{search}</title>
      </Head>
      <Nav />
      <h1 className="text-3xl md:text-4xl lg:text-[42px] xl:text-5xl font-bold text-center mb-8 lg:mb-16 mt-12 lg:mt-24 uppercase">
        Blogs
      </h1>
      <article className=" w-[90%] md:w-[700px] lg:w-[1000px] xl:w-[1400px] mx-auto flex justify-center flex-wrap mb-16 lg:mb-32">
        {posts?.map((value) => {
          return (
            <React.Fragment key={value._id}>
              <Box {...value} />
            </React.Fragment>
          );
        })}
      </article>
      <Footer />
    </>
  );
};

export default search;

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
  //send the data to search page
  return {
    props: {
      posts,
    },
  };
};
