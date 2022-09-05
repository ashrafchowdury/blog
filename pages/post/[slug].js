import React from "react";
import Nav from "../../components/Nav";
import Footer from "../../components/Footer";
import Tost from "../../components/Toast";

const slug = () => {
  return (
    <>
      <Nav />
      <img
        src="https://skilvul-prod-01.s3.ap-southeast-1.amazonaws.com/course/Skilvul%20asset%20volume%202-02.jpg"
        alt="image"
        className="banner"
      />
      <article className="blog">
        <div className="auth_publish">
          <span className="auth">
            <img src="../ashraf.png" alt="image" /> <p>Ashraf Chowdury</p>
          </span>
          <span>PublishedAt: 21/3/2021</span>
        </div>
        <h1>All About Firebasae</h1>

        <h3>10 Easy steps we go throw in</h3>
        <ul>
          <li>Create a Firebase account.</li>
          <li>Create a new project in Firebase.</li>
          <li>Add Firebase to your web application.</li>
          <li>Install the Firebase CLI tools.</li>
          <li>Login to your firebase account.</li>
          <li>Initialize the project.</li>
          <li>Select the firebase hosting you created.</li>
          <li>Select out as a build folder.</li>
          <li>Update your build script and run the build command.</li>
          <li>Finally, deploy the project on Firebase.</li>
        </ul>
        <h3>If you don't know what is Firebase?</h3>
        <p>
          Firebase is a Backend Service platform developed by Google. It offers
          developers a complete set of development tools and provides the
          backend for building highly-scalable web and mobile applications.
        </p>

        <h3>Step 1: Create a Firebase account.</h3>
        <p>
          {" "}
          Go to <a href="">firebase.com</a> and create an account.{" "}
        </p>
        <h3>Step 2: Create a new project in Firebase.</h3>
        <img
          src="https://cdn.hashnode.com/res/hashnode/image/upload/v1660567232413/mzNy_V9Y2.png?auto=compress,format&format=webp"
          alt="image"
        />

        <h3>Step 3: Add Firebase to your web app.</h3>
        <p>Click the button to add your Domain name.</p>
        <img
          src="https://cdn.hashnode.com/res/hashnode/image/upload/v1660568008489/T3o9HRknI.jpg?auto=compress,format&format=webp"
          alt="image"
        />

        <h3>Step 9: Update your build script and run the build command.</h3>
        <p>Go to the package.json folder 📂 and add this build command.</p>

        <code>“build”: “next build && next export”,</code>

        <img
          src="https://cdn.hashnode.com/res/hashnode/image/upload/v1660568269475/HnE7zpOMl.jpg?auto=compress,format&format=webp"
          alt="image"
        />
      </article>
      <Footer />
    </>
  );
};

export default slug;
