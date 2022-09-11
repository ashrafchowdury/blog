import { useState, useEffect, createContext, useContext } from "react";
import { auth } from "../firebase/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

//Defaile the create context
export const AuthContext = createContext();

////Defaile the useContext hook
export const useAuth = () => useContext(AuthContext);

//Custom authentication provider
const AuthContextProvider = ({ children }) => {
  //store user data
  const [currentUser, setcurrentUser] = useState("");

  //Subscribing the current user
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setcurrentUser(user);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  //Firebase Signup function
  const signup = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };
  //Firebase Login function
  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };
  //Firebase Forget password function
  const forget = (email) => {
    return sendPasswordResetEmail(auth, email, {
      url: "http://localhost:3000/login",
    });
  };
  //Firebase Logout function
  const logout = () => {
    return signOut(auth);
  };

  //store all the functions in a Object
  const value = {
    currentUser,
    logout,
    signup,
    login,
    forget,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;
