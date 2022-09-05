import Link from "next/link";
import { useState } from "react";
import { useAuth } from "../../context/auth_context";
import { useRouter } from "next/router";
import { Input } from "../../components/Input";
import Nav from "../../components/Nav";
import { notification } from "../../components/Toast";

const login = () => {
  const [input, setinput] = useState({
    email: "",
    password: "",
  });
  const { login, currentUser } = useAuth();
  const router = useRouter();

  let value, name;
  const handleUserInput = (e) => {
    name = e.target.name;
    value = e.target.value;
    setinput({ ...input, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = input;
    if (!email || !password) {
      notification("warn", "Pleace Feel All The Filed");
    } else {
      try {
        await login(email, password);
        notification("suc", "Log In Successfully");
        router.push("/");
      } catch (error) {
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
      <Nav />
      <section></section>
      <div></div>
      <section>
        <h1 className=" text-center font-bold uppercase text-2xl md:text-3xl lg:text-4xl xl:text-5xl mt-16 md:mt-24 lg:mt-32 mb-8 md:mb-16 lg:mb-20">
          Log In
        </h1>
        <form
          onSubmit={handleSubmit}
          className=" w-[85%] sm:w-[80%] md:w-[400px] lg:w-[480px] mx-auto text-center"
        >
          <Input name="email" input={handleUserInput} value={input.email} />
          <Input
            name="password"
            input={handleUserInput}
            value={input.password}
          />

          <p className=" text-sm md:text-[16px] flex justify-between items-center mt-2">
            <Link href="/login">
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
