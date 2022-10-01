import "../styles/globals.css";
import AuthContextProvider from "../context/auth_context";
import { ToastContainer } from "react-toastify";
import Layout from "../components/Layout";
function MyApp({ Component, pageProps }) {
  return (
    <>
      <AuthContextProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
        <ToastContainer />
      </AuthContextProvider>
    </>
  );
}

export default MyApp;
