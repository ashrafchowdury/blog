import React from "react";

//Social Media Icons
const Social = () => {
  return (
    <>
      <div className="social">
        <a href="https://twitter.com/Ashraf_365" target="_blank">
          <i className="fa-brands fa-twitter gradiant_text dark:text-white"></i>
        </a>
        <a
          href="https://www.linkedin.com/in/ashraf-chowdury-297301206/"
          target="_blank"
        >
          <i className="fa-brands fa-linkedin gradiant_text dark:text-white"></i>
        </a>
        <a href="https://www.instagram.com/_ashrafchowdury/" target="_blank">
          <i className="fa-brands fa-instagram gradiant_text dark:text-white"></i>
        </a>
        <a href="https://github.com/ashrafchowdury" target="_blank">
          <i className="fa-brands fa-github gradiant_text dark:text-white"></i>
        </a>
      </div>
    </>
  );
};

export default Social;
