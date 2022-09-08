import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useAuth } from "../context/auth_context";
import { useRouter } from "next/router";
import { notification } from "../components/Toast";


const Nav = () => {
  const [mood, setmood] = useState("dark");
  const [menu, setmenu] = useState("hidden");
  const router = useRouter();
  const { logout, currentUser } = useAuth();

  useEffect(() => {
    window.innerWidth >= 1050 ? setmenu("") : setmenu("hidden");

    const handleDark = () => {
      //check in LS theme equal to dark or not
      // and also check default media preference
      if (
        localStorage.theme === "dark" ||
        (!("theme" in localStorage) &&
          window.matchMedia("(prefers-color-scheme: dark)").matches)
      ) {
        setmood("dark");
        //add class name on html tag
        document.querySelector("html").classList.add("dark");
      } else {
        setmood("light");
        //remove class name form html tag
        document.querySelector("html").classList.remove("dark");
      }
    };
    handleDark();
  }, [mood]);

  const handleLogout = () => {
    logout();
    notification("suc", "Log Out Successfully");
    router.push("/");
  };
  //handle Dark Mood
  const handleDarkTheme = () => {
    //add dark theme on localStorage
    localStorage.setItem("theme", "dark");
    setmood("dark");
  };
  //handle Light Mood
  const handleLightTheme = () => {
    //add light theme on localStorage
    localStorage.setItem("theme", "light");
    setmood("light");
  };

  return (
    <nav className=" w-[90%] sm:w-[480px] md:w-[700px] lg:w-[1000px] xl:w-[1250px] h-28 flex items-center justify-between mx-auto">
      {/*********************Logo*****************************/}
      <Link href="/">
        <div className=" flex items-center cursor-pointer">
          <img src="/logo.svg" alt="image" className=" w-6 xl:w-9" />
          <h1 className=" font-['Righteous'] text-2xl xl:text-4xl ml-2 font-bold">
            Roadmap
          </h1>
        </div>
      </Link>

      {/***********************Links***************************/}
      <section
        className={`${menu} duration-700 fixed lg:relative left-0 top-0 z-10 w-[90%] sm:w-[75%] md:w-[55%] lg:w-auto h-screen lg:h-auto bg-white dark:bg-[#253345] lg:bg-transparent dark:lg:bg-transparent flex flex-col`}
      >
        <div className=" w-[90%] mx-auto flex justify-between items-center mt-6">
          <div className=" flex items-center lg:hidden">
            <img src="/logo.svg" alt="image" className=" w-5" />
            <h1 className=" font-['Righteous'] text-xl ml-2 font-bold">
              Roadmap
            </h1>
          </div>

          <span className="icon_hover py-[2px] px-[9px] lg:hidden">
            <i
              className="fa-solid fa-xmark text-2xl dark:text-white"
              onClick={() => setmenu("hidden")}
            ></i>
          </span>
        </div>

        <div className=" w-[90%] relative mx-auto mt-4 mb-7 lg:hidden ">
          <i className="fa-solid fa-magnifying-glass text-lg absolute top-[5px] left-3 text-gray-400"></i>
          <input
            type="search"
            placeholder="Search Blogs"
            className=" w-full outline-none text-sm py-2 px-9 border rounded-md"
          />
        </div>

        <div className="links">
          <Link href="/">Home</Link>
          <Link href="/">Blogs</Link>
          <Link href="/">About Me</Link>
          <Link href="/">Donate</Link>
        </div>
        <button className="gradiant_btn lg:hidden absolute bottom-3 left-[50%] translate-x-[-50%] w-[90%] py-2 rounded font-bold text-sm text-white">
          Sign Up
        </button>
      </section>

      {/**********Button************/}
      <div className=" flex items-center">
        <Link href="/search">
          <span className="icon_hover hidden lg:block py-[6px] px-[10px]">
            <i className="fa-solid fa-magnifying-glass text-xl dark:text-white"></i>
          </span>
        </Link>

        {mood == "dark" ? (
          <span
            className="icon_hover py-[5px] px-[10px]"
            onClick={() => handleLightTheme()}
          >
            <i className="fa-regular fa-sun text-lg md:text-xl dark:text-white"></i>
          </span>
        ) : (
          <span
            className="icon_hover py-[3px] px-[8px] lg:py-[6px] lg:px-[10px]"
            onClick={() => handleDarkTheme()}
          >
            <i className="fa-regular fa-moon text-lg md:text-xl dark:text-white"></i>
          </span>
        )}

        {mood == "dark" ? (
          <span
            className="icon_hover py-[4px] px-[8px]"
            onClick={() => setmenu("block")}
          >
            <img
              src="/darkMenu.svg"
              className=" w-[22px] md:w-[24px] py-[5px] lg:hidden"
            />
          </span>
        ) : (
          <span
            className="icon_hover py-[4px] px-[8px]"
            onClick={() => setmenu("block")}
          >
            <img
              src="/menu.svg"
              className=" w-[22px] md:w-[24px] py-[5px] lg:hidden"
            />
          </span>
        )}

        {router.pathname == "/user/signup" ? (
          <Link href="/user/login">
            <button className="gradiant_btn hidden lg:block lg:py-2 lg:px-6 lg:rounded lg:uppercase lg:font-bold lg:text-white">
              Log in
            </button>
          </Link>
        ) : (
          <>
            {currentUser?.email ? (
              <button
                onClick={handleLogout}
                className="gradiant_btn hidden lg:block lg:py-2 lg:px-6 lg:rounded lg:uppercase lg:font-bold lg:text-white"
              >
                Log Out
              </button>
            ) : (
              <Link href="/user/signup">
                <button className="gradiant_btn hidden lg:block lg:py-2 lg:px-6 lg:rounded lg:uppercase lg:font-bold lg:text-white">
                  Sign Up
                </button>
              </Link>
            )}
          </>
        )}
      </div>
    </nav>
  );
};

export default Nav;
