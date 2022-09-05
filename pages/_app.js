import "../styles/globals.css";
import AuthContextProvider from "../context/auth_context";
import { ToastContainer } from "react-toastify";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <AuthContextProvider>
        <Component {...pageProps} />
        <ToastContainer />
      </AuthContextProvider>
    </>
  );
}

export default MyApp;
