import { useState, useEffect } from "react";
import Link from "next/link";
import Head from "next/head";
import { useRouter } from "next/router";
//firebase auth
import { useAuth } from "../../context/auth_context";
//components
import { Input } from "../../components/Input";

import { notification } from "../../components/Toast";

const login = () => {
  //get the input fiield value
  const [input, setinput] = useState({
    email: "",
    password: "",
  });
  //authentication functions
  const { login, currentUser } = useAuth();
  const router = useRouter();

  //get the input value
  let value, name;
  const handleUserInput = (e) => {
    name = e.target.name;
    value = e.target.value;
    setinput({ ...input, [name]: value });
  };

  //Submit Form data
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = input;
    //if the filed are empty then show the popup msg, othervise pass the data
    if (!email || !password) {
      notification("warn", "Pleace Feel All The Filed");
    } else {
      //catch the Errors
      try {
        //User Login function
        await login(email, password);
        //Success notification
        notification("suc", "Log In Successfully");
        router.push("/");
      } catch (error) {
        //show the Error message
        switch (error.code) {
          case "auth/wrong-password":
            notification("error", "Password Not Match");
            break;
          case "auth/user-not-found":
            notification("error", "Incorrect Email");
            break;
        }
      }
    }
  };

  return (
    <>
      {/***************** Head section for SEO ****************************/}
      <Head>
        <title>Login on Roadmap</title>
      </Head>
      {/* If current use are login, then send theme back to thier previous page */}


      <section>
        <h1 className=" text-center font-bold uppercase text-2xl md:text-3xl lg:text-4xl xl:text-5xl mt-16 md:mt-24 lg:mt-32 mb-8 md:mb-16 lg:mb-20">
          Log In
        </h1>
        <form
          onSubmit={handleSubmit}
          className=" w-[85%] sm:w-[80%] md:w-[400px] lg:w-[480px] mx-auto text-center"
        >
          {/* This Custom Input field comes form the component folder  */}
          <Input name="email" input={handleUserInput} value={input.email} />
          <Input
            name="password"
            input={handleUserInput}
            value={input.password}
          />

          <p className=" text-sm md:text-[16px] flex justify-between items-center mt-2">
            <Link href="/user/signup">
              <span className=" cursor-pointer"> Create Account</span>
            </Link>
            <Link href="/user/forget">
              <span className=" cursor-pointer"> Forget!</span>
            </Link>
          </p>

          <button
            className="gradiant_btn py-2 lg:py-3 mt-8 md:mt-16 w-full rounded text-white font-bold text-sm md:text-[16px]"
            type="submit"
          >
            Log In
          </button>
        </form>
      </section>
    </>
  );
};

export default login;
