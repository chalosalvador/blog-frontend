/**
 * Created by chalosalvador on 2/2/21
 */
import React, { useState, useEffect, useContext, createContext } from "react";
import api from "./api";
import cookie from "js-cookie";

const authContext = createContext(null);

export function AuthProvider({ children }) {
  const auth = useAuthProvider();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export const useAuth = () => {
  const context = useContext(authContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return useContext(authContext);
};

function useAuthProvider() {
  const [user, setUser] = useState(null);

  const handleUser = (rawUser) => {
    if (rawUser) {
      const user = rawUser.user;
      setUser(user);
      cookie.set("auth", true, {
        expires: 1, // dia
      });

      return user;
    } else {
      setUser(false);
      return false;
    }
  };

  async function register(data) {
    try {
      const response = await api.post("/register", data);

      handleUser(response.data);

      console.log("response", response);

      return response;
    } catch (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
        return error.response;
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log("Error", error.message);
      }
      console.log(error.config);
    }
  }

  async function login() {
    try {
      const response = await api.post("/login", {
        email: "chalosalvador@gmail.com",
        password: "123123",
      });

      console.log("response", response);
      handleUser(response.data);

      return response;
    } catch (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
        return error.response;
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log("Error", error.message);
      }
      console.log(error.config);
    }
  }

  const signOut = () => {
    return firebase
      .auth()
      .signOut()
      .then(() => handleUser(false));
  };

  // const sendPasswordResetEmail = (email) => {
  //   return firebase
  //     .auth()
  //     .sendPasswordResetEmail(email)
  //     .then(() => {
  //       return true;
  //     });
  // };
  //
  // const confirmPasswordReset = (password, code) => {
  //   const resetCode = code || getFromQueryString('oobCode');
  //
  //   return firebase
  //     .auth()
  //     .confirmPasswordReset(resetCode, password)
  //     .then(() => {
  //       return true;
  //     });
  // };

  useEffect(() => {
    // const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
    //   if (user) {
    //     handleUser(user);
    //   } else {
    //     handleUser(false);
    //   }
    // });
    //
    // return () => unsubscribe();
  }, []);

  return {
    user,
    register,
    login,
    signOut,
    // sendPasswordResetEmail,
    // confirmPasswordReset
  };
}

const formatUser = (user) => {
  return {
    uid: user.uid,
    email: user.email,
    name: user.displayName,
    provider: user.providerData[0].providerId,
    photoURL: user.photoURL,
  };
};
// const getFromQueryString = (key) => {
//   return queryString.parse(window.location.search)[key];
// };
