import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useAuth } from "../context/auth_context";
import { useRouter } from "next/router";
import { notification } from "../components/Toast";

const Nav = () => {
  //use for change the theme
  const [mood, setmood] = useState("dark");
  //use for show the mobile menu section and hide on desktop
  const [menu, setmenu] = useState("hidden");
  //use for search blogs on mobile
  const [search, setsearch] = useState("");
  const router = useRouter();
  //comes from the context file
  const { logout, currentUser } = useAuth();

  useEffect(() => {
    //condition for see the device are under 1050px or not
    window.innerWidth >= 1050 ? setmenu("") : setmenu("hidden");

    //Handle the Theme when the page load
    const handleDark = () => {
      //check in LS theme equal to dark or not
      // and also check default media preference
      if (
        localStorage.theme === "dark" ||
        (!("theme" in localStorage) &&
          window.matchMedia("(prefers-color-scheme: dark)").matches) // check the media is dark or not
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

  //Handle User Logout
  const handleLogout = () => {
    logout();
    notification("suc", "Log Out Successfully");
    router.push("/");
    setmenu("hidden");
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

  //Handle the blogs search For Mobiles
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (!search) {
      //when user click on the empty search bar they will send on Home page
      router.push("/");
    } else {
      router.push(`/search/${search}`);
    }
  };

  //when click menu links the menu hide automatically
  const handleMenuOf = () => {
    window.innerWidth >= 1050 ? setmenu("") : setmenu("hidden");
  };
  return (
    <nav className=" w-[90%] sm:w-[480px] md:w-[700px] lg:w-[1000px] xl:w-[1250px] h-20 md:h-24 lg:h-28 flex items-center justify-between mx-auto">
      {/********************* Logo *****************************/}
      <Link href="/">
        <div className=" flex items-center cursor-pointer">
          <img src="/logo.svg" alt="Roadmap" className=" w-6 xl:w-9" />
          <h1 className=" font-['Righteous'] text-2xl xl:text-4xl ml-2 font-bold">
            Roadmap
          </h1>
        </div>
      </Link>

      {/*********************** Links and Mobile Menu Section***************************/}
      <section
        className={`${menu} duration-700 fixed lg:relative left-0 top-0 z-10 w-[90%] sm:w-[75%] md:w-[55%] lg:w-auto h-screen lg:h-auto bg-white dark:bg-[#253345] lg:bg-transparent dark:lg:bg-transparent flex flex-col`}
      >
        {/************************ Mobile Menu Logo | hide on desktop ***************************/}
        <div className=" w-[90%] mx-auto flex justify-between items-center mt-6">
          <div className=" flex items-center lg:hidden">
            <img src="/logo.svg" alt="Roadmap" className=" w-5" />
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

        {/************************ Mobile Menu Search bar | hide on desktop ***************************/}
        <form
          onSubmit={handleSearchSubmit}
          className=" w-[90%] relative mx-auto mt-4 mb-7 lg:hidden"
        >
          <i className="fa-solid fa-magnifying-glass text-lg absolute top-[5px] left-3 text-gray-400"></i>
          <input
            type="search"
            placeholder="Search Blogs"
            className=" w-full outline-none text-sm py-2 px-9 border rounded-md"
            onChange={(e) => setsearch(e.target.value)}
            value={search}
          />
        </form>

        {/************************ Links ***************************/}
        <div className="links">
          <Links path="/" click={handleMenuOf} title="Home" />
          <Links path="/#blogs" click={handleMenuOf} title="Blogs" />
          <Links path="/#auther" click={handleMenuOf} title="About Me" />
          <a
            href="http://ashrafchowdury.vercel.app/"
            target="_blank"
            className=" mt-6 lg:mt-0"
          >
            <span onClick={handleMenuOf}> Portfolio</span>
          </a>
        </div>
        {/* absolute bottom-3 left-[50%] translate-x-[-50%]  */}
        {/************************ Mobile Menu Signup Button | hide on desktop ***************************/}
        <div className=" w-[90%] mx-auto h-full lg:hidden flex items-end">
          {currentUser?.email ? (
            <button
              onClick={handleLogout}
              className="gradiant_btn w-full mb-8 py-2 rounded font-bold text-sm text-white"
            >
              Log Out
            </button>
          ) : (
            <Link href="/user/signup">
              <button
                className="gradiant_btn w-full mb-8 py-2 rounded font-bold text-sm text-white"
                onClick={handleMenuOf}
              >
                Sign Up
              </button>
            </Link>
          )}
        </div>
      </section>

      {/**************************** Button & icons ********************************/}
      <div className=" flex items-center">
        <Link href="/search">
          <span className="icon_hover hidden lg:block py-[6px] px-[10px]">
            <i className="fa-solid fa-magnifying-glass text-xl dark:text-white"></i>
          </span>
        </Link>

        {/************************ Condition for show the theme icon ***************************/}
        {/** if theme equal to dark then show sun icon other vise show the moon icon **/}
        {mood == "dark" ? (
          <span
            title="Light Mood"
            id="themeSun"
            className="icon_hover py-[5px] px-[10px]"
            onClick={() => handleLightTheme()}
          >
            <i className="fa-regular fa-sun text-lg md:text-xl dark:text-white"></i>
          </span>
        ) : (
          <span
            title="Dark Mood"
            id="themeMoon"
            className="icon_hover py-[3px] px-[8px] lg:py-[6px] lg:px-[10px]"
            onClick={() => handleDarkTheme()}
          >
            <i className="fa-regular fa-moon text-lg md:text-xl dark:text-white"></i>
          </span>
        )}

        {/************************ Condition for show the light menu icon or dark menu icon ***************************/}
        {/** if theme equal to dark then show light menu icon other vise show the dark menu icon **/}
        {mood == "dark" ? (
          <span
            className="icon_hover py-[4px] px-[8px] lg:hidden"
            onClick={() => setmenu("block")}
          >
            <i className="fa-solid fa-bars text-white text-lg md:text-xl"></i>
          </span>
        ) : (
          <span
            className="icon_hover py-[4px] px-[8px] lg:hidden"
            onClick={() => setmenu("block")}
          >
            <i className="fa-solid fa-bars text-lg md:text-xl"></i>
          </span>
        )}

        {/********* Condition for show Login button on the signup page and show the signup Button on other page  ****/}
        {/******** These all Button are hide on the Mobile section ******/}
        {router.pathname == "/user/signup" ? (
          <Link href="/user/login">
            <button className="gradiant_btn hidden lg:block lg:py-2 lg:px-6 lg:ml-4 lg:rounded lg:uppercase lg:font-bold lg:text-white">
              Log in
            </button>
          </Link>
        ) : (
          <>
            {/************************ Condition for show the Logout Button and the Sign Up Button ***************************/}
            {currentUser?.email ? (
              <button
                onClick={handleLogout}
                className="gradiant_btn hidden lg:block lg:py-2 lg:px-6 lg:ml-4 lg:rounded lg:uppercase lg:font-bold lg:text-white"
              >
                Log Out
              </button>
            ) : (
              <Link href="/user/signup">
                <button className="gradiant_btn hidden lg:block lg:py-2 lg:px-6 lg:ml-4 lg:rounded lg:uppercase lg:font-bold lg:text-white">
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

export const Links = ({ path, click, title }) => {
  return (
    <>
      <Link href={path}>
        <span onClick={click}> {title} </span>
      </Link>
    </>
  );
};
