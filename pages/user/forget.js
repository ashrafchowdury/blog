import Link from "next/link";
import { useState } from "react";
import { useAuth } from "../../context/auth_context";
import { useRouter } from "next/router";
import { Input } from "../../components/Input";
import Nav from "../../components/Nav";
import { notification } from "../../components/Toast";

const forget = () => {
  const [input, setinput] = useState("");
  const { forget } = useAuth();
  const router = useRouter();

  const handleUserInput = (e) => {
    return setinput(e.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input) {
      notification("warn", "Pleace Write Your Email");
    } else {
      try {
        await forget(input);
        notification("suc", "Forget Successfully");
        notification("warn", "Pleace Check Your Email");
        router.push("/user/login");
      } catch (error) {
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
            <Link href="/login">
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
