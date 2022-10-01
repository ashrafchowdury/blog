import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Head from "next/head";
//firebase auth
import { useAuth } from "../../context/auth_context";
//components
import { Input } from "../../components/Input";
import Nav from "../../components/Nav";
import { notification } from "../../components/Toast";

const forget = () => {
  //get the input fiield value
  const [input, setinput] = useState("");
  //authentication functions
  const { forget } = useAuth();
  const router = useRouter();

  //get the input value
  const handleUserInput = (e) => {
    return setinput(e.target.value);
  };

  //Submit Form data
  const handleSubmit = async (e) => {
    e.preventDefault();
    //if the filed are empty then show the popup msg, othervise pass the data
    if (!input) {
      notification("warn", "Pleace Write Your Email");
    } else {
      //catch the Errors
      try {
        //Data Forget function
        await forget(input);
        //notification
        notification("warn", "Pleace Check Your Email");
        router.push("/user/login");
      } catch (error) {
        //show the Error message
        switch (error.code) {
          case "auth/user-not-found":
            notification("error", "Email Not Found");
            break;
        }
      }
    }
  };

  return (
    <>
      {/***************** Head section for SEO ****************************/}
      <Head>
        <title>Forget Password</title>
      </Head>

      {/* If current use are login, then send theme back to thier previous page */}

      <Nav />
      <section>
        <h1 className=" text-center font-bold uppercase text-2xl md:text-3xl lg:text-4xl xl:text-5xl mt-16 md:mt-24 lg:mt-32 mb-8 md:mb-16 lg:mb-20">
          Forget Password
        </h1>
        <form
          onSubmit={handleSubmit}
          className=" w-[85%] sm:w-[80%] md:w-[400px] lg:w-[480px] mx-auto text-center"
        >
          <Input name="email" input={handleUserInput} value={input} />

          <p className=" text-sm md:text-[16px] flex justify-between items-center mt-2">
            <Link href="/user/login">
              <span className=" cursor-pointer"> If You Want To: Log in</span>
            </Link>
          </p>

          <button
            className="gradiant_btn py-2 lg:py-3 mt-8 md:mt-16 w-full rounded text-white font-bold text-sm md:text-[16px]"
            type="submit"
          >
            Submit
          </button>
        </form>
      </section>
    </>
  );
};

export default forget;
