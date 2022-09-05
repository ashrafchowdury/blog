import Link from "next/link";
import { useState, useEffect } from "react";
import { doc, collection, query, setDoc } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import { useAuth } from "../../context/auth_context";
import { useRouter } from "next/router";
import { Input } from "../../components/Input";
import Nav from "../../components/Nav";
import { notification } from "../../components/Toast";

const signup = () => {
  const [input, setinput] = useState({
    name: "",
    email: "",
    password: "",
  });
  const { signup, currentUser } = useAuth();
  const router = useRouter();
  const q = query(collection(db, `userInfo`));

  let value, name;
  const handleUserInput = (e) => {
    name = e.target.name;
    value = e.target.value;
    setinput({ ...input, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password } = input;
    if (!name || !email || !password) {
      notification("warn", "Pleace Feel All The Filed");
    } else {
      try {
        await setDoc(doc(db, "userInfo", email), {
          uid: Math.floor(Math.random() * 900000000000000),
          name: name,
        });
        await signup(email, password);
        notification("suc", "Sign Up Successfully");
        router.push("/");
      } catch (error) {
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
      <Nav />
      <section></section>
      <div></div>
      <section>
        <h1 className=" text-center font-bold uppercase text-2xl md:text-3xl lg:text-4xl xl:text-5xl mt-16 md:mt-24 lg:mt-32 mb-8 md:mb-16 lg:mb-20">
          Sign up
        </h1>
        <form
          onSubmit={handleSubmit}
          className=" w-[85%] sm:w-[80%] md:w-[400px] lg:w-[480px] mx-auto text-center"
        >
          <Input name="name" input={handleUserInput} value={input.name} />
          <Input name="email" input={handleUserInput} value={input.email} />
          <Input
            name="password"
            input={handleUserInput}
            value={input.password}
          />

          <p className=" text-sm md:text-[16px] flex justify-between items-center mt-2">
            <Link href="/login">
              <span> Have an Account: Log in</span>
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
