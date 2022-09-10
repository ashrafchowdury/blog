import React from "react";
import Nav from "../../components/Nav";
import Footer from "../../components/Footer";
import { PortableText } from "@portabletext/react";
import { sanityClient, urlFor } from "../../sanity";
import { useRouter } from "next/router";
import { notification } from "../../components/Toast";
import Box from "../../components/Box";

//this object help PortableText for showing the Blog images
const displayImage = {
  types: {
    image: ({ value }) => {
      if (!value?.asset?._ref) null;
      return (
        <img
          alt={value.alt || " "}
          loading="lazy"
          src={urlFor(value).fit("max").auto("format")}
          //you can also add .width(320).height(240) before .fit function
        />
      );
    },
    code: ({ value }) => {
      const handleCode = () => {
        //copy text
        navigator.clipboard.writeText(value.code);
        //popup notification call
        notification("suc", "Code copied");
      };
      return (
        <pre className="code" onClick={handleCode}>
          {value.code}
        </pre>
      );
    },
  },
};

const Post = ({
  mainImage,
  title,
  _createdAt,
  author,
  body,
  categories,
  suggested_post,
}) => {
  const router = useRouter();
  return (
    <>
      <Nav />
      <img src={urlFor(mainImage).url()} alt="image" className="banner" />
      <article className="blog">
        <div className="auth_publish">
          <span className="auth">
            <img src={urlFor(author.image).url()} alt="image" />{" "}
            <p>{author.name}</p>
          </span>
          <span className="time">
            {" "}
            Publish Data: {new Date(_createdAt).toLocaleString()}
          </span>
        </div>

        <h1>{title}</h1>

        <PortableText
          dataset="production"
          projectId="q1zq7tcr"
          value={body}
          components={displayImage}
        />
      </article>
      <h3 className="w-[90%] sm:w-[85%] md:w-[700px] lg:w-[1000px] xl:w-[1050px] mx-auto text-[22px] md:text-[25px] lg:text-4xl uppercase font-bold pl-3 mb-4 lg:mb-5">
        {" "}
        Suggested
      </h3>
      <section className="w-[90%] sm:w-[85%] md:w-[700px] lg:w-[1000px] xl:w-[1050px] mx-auto flex justify-start flex-wrap">
        {suggested_post
          ?.filter((value) => {
            return value.categories[0].title == categories[0].title;
          })
          .slice(0, 2)
          .map((value) => {
            return (
              <React.Fragment key={value._id}>
                <Box {...value} />
              </React.Fragment>
            );
          })}
      </section>

      <Footer />
    </>
  );
};

export default Post;

//genarating blog path
export async function getStaticPaths() {
  const query = `*[_type == "post"]{
      _id,
      slug {
        current
      }
    }`;
  //blog path request || sanityClient is come from the sanity.js page
  const posts = await sanityClient.fetch(query);
  //retrive the blog path
  const paths = posts.map((value) => ({
    params: {
      slug: value.slug.current,
    },
  }));
  return {
    paths,
    fallback: true,
  };
}

//get the blog

export async function getStaticProps({ params }) {
  //bolg query
  const query = `*[_type == "post" && slug.current == $slug][0]{
    _id,
    _createdAt,
    title,
    body, 
    mainImage, 
    description,
     body,
     slug,
     categories[] -> {
      title 
     },
     author-> {
      name,
      image
     },
  }`;
  //
  const suggested_query = `*[_type == "post"]{
    _id,
    _createdAt,
    title,
    mainImage,
    slug,
    categories[] -> {
      title 
     },
  }`;
  //blog request || sanityClient is come from the sanity.js page
  const post = await sanityClient.fetch(query, {
    slug: params?.slug,
  });
  //
  const suggested_post = await sanityClient.fetch(suggested_query);

  return {
    props: {
      ...post,
      suggested_post,
    },
    revalidate: 60, //after 60 send it will update the old cached version
  };
}

//