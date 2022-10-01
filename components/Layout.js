import React, { useEffect, useState } from "react";
import Nav from "./Nav";
import Footer from "./Footer";
import AOS from "aos";
import "aos/dist/aos.css";
import { useRouter } from "next/router";
const Layout = ({ children }) => {
  const { pathname } = useRouter();
  useEffect(() => {
    AOS.init({ duration: 1500 });
  }, []);

  if (pathname == "/search") {
    return <>{children}</>;
  } else if (
    pathname == "/user/signup" ||
    pathname == "/user/login" ||
    pathname == "/user/forget"
  ) {
    return (
      <>
        <Nav />
        {children}
      </>
    );
  } else {
    return (
      <>
        <Nav />
        {children}
        <Footer />
      </>
    );
  }
};

export default Layout;
