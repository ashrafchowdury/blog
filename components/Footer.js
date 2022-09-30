import React, { Component } from "react";
import Social from "./Social";


export class Footer extends Component {
  render() {
    return (
      <>
        {/********* Auther Section ************/}
        <section
          className=" py-6 lg:py-8 mt-9 xl:mt-20 mb-6 lg:mb-9 w-[90%] md:w-[700px] lg:w-[800px] xl:w-[1000px] mx-auto border-y-2  flex flex-col lg:flex-row lg:justify-center lg:items-center text-center lg:text-start"
          id="auther"
        >
          <img
            src="/ashraf.png"
            alt="Ashraf Chowdury"
            className=" w-[110px] h-[110px] lg:w-60 lg:h-[265px] object-cover rounded-full lg:rounded mx-auto lg:mx-0 lg:mr-9 mb-3"
          />
          <div className=" lg:w-[500px]">
            <h3 className="gradiant_text text-xl sm:text-2xl lg:text-3xl font-bold mt-1 mb-2 md:mb-4">
              Hi, I’m Ashraf Chowdury.
            </h3>
            <p className=" md:w-10/12 lg:w-[500px] xl:w-[550px] md:mx-auto lg:mx-0 text-sm md:text-[16px] leading-6 md:leading-7 break-all mb-3">
              Hi, I'm Ashraf. I'm a Front-end web developer and Technical
              writer. I'm a developer because building stuff fulfills my
              creative portfolio, and writing makes me more creative.
            </p>

            <p className=" md:w-10/12 lg:w-[500px] xl:w-[550px] md:mx-auto lg:mx-0 text-sm md:text-[16px] leading-6 md:leading-7 mb-5 md:mb-9 break-all">
              I post blogs weekly regarding web development; you can subscribe
              to my weekly newsletter to stay up to date.
            </p>

            <a
              href="http://ashrafchowdury.vercel.app/"
              target='_blank'
              title="View Ashraf's Portfolio"
              className=" block text-blue-500 font-bold"
            >
              View Portfolio{" "}
              <i className="fa-solid fa-arrow-right-long ml-2 text-blue-500"></i>
            </a>
          </div>
        </section>
        {/********* Footer Section ************/}
        <footer className=" w-[90%] md:w-[700px] lg:w-[1000px] xl:w-[1400px] mx-auto mb-4">
          <div className="text-center mb-12 md:flex md:items-center md:justify-center">
            <h3 className=" text-xl lg:text-2xl xl:text-3xl leading-8 font-bold md:mr-4">
              Want me building stuff for you? Hit me on Linkedin
            </h3>
            <button className="gradiant_btn py-2 lg:py-3 px-4 lg:px-5 xl:px-6 text-sm lg:text-[16px] font-bold text-white rounded mt-5 md:mt-0">
              My Linkedin
            </button>
          </div>
          {/********* Social Media Icons ************/}
          <Social />
        </footer>
      </>
    );
  }
}

export default Footer;
