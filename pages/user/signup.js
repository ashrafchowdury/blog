import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Head from "next/head";
//firebase firestore
import { doc, collection, query, setDoc } from "firebase/firestore";
import { db } from "../../firebase/firebase";
//firebase auth
import { useAuth } from "../../context/auth_context";
//componentes
import { Input } from "../../components/Input";
import { notification } from "../../components/Toast";

const signup = () => {
  //get the input fiield value
  const [input, setinput] = useState({
    name: "",
    email: "",
    password: "",
  });
  //authentication functions
  const { signup, currentUser } = useAuth();
  //firestore query
  const q = query(collection(db, `userInfo`));
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
    const { name, email, password } = input;
    //if the filed are empty then show the popup msg, othervise pass the data
    if (!name || !email || !password) {
      notification("warn", "Pleace Feel All The Filed");
    } else {
      //catch the Errors
      try {
        //send data to firestore
        await setDoc(doc(db, "userInfo", email), {
          uid: Math.floor(Math.random() * 900000000000000),
          name: name,
        });
        //User Signup function
        await signup(email, password);
        //Success notification
        notification("suc", "Sign Up Successfully");
        router.push("/");
      } catch (error) {
        //show the Error message
        switch (error.code) {
          case "auth/weak-password":
            notification("error", "Week Paasword");
            break;
          case "auth/email-already-in-use":
            notification("error", "This Email Is Alredy Used");
            break;
        }
      }
    }
  };

  return (
    <>
      {/***************** Head section for SEO ****************************/}
      <Head>
        <title>Sign Up on Roadmap</title>
        <meta
          name="description"
          content="Sign Up Roadmap to learn something new every day"
        />
      </Head>

      <section>
        <h1 className=" text-center font-bold uppercase text-2xl md:text-3xl lg:text-4xl xl:text-5xl mt-16 md:mt-24 lg:mt-32 mb-8 md:mb-16 lg:mb-20">
          Sign up
        </h1>
        <form
          onSubmit={handleSubmit}
          className=" w-[85%] sm:w-[80%] md:w-[400px] lg:w-[480px] mx-auto text-center"
        >
          {/* This Custom Input field comes form the component folder  */}
          <Input name="name" input={handleUserInput} value={input.name} />
          <Input name="email" input={handleUserInput} value={input.email} />
          <Input
            name="password"
            input={handleUserInput}
            value={input.password}
          />

          <p className=" text-sm md:text-[16px] flex justify-between items-center mt-2">
            <Link href="/user/login">
              <span className=" cursor-pointer"> Have an Account: Log in</span>
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

export default signup;
