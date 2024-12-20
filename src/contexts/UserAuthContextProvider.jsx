import React, { createContext, useContext, useState, useEffect } from "react";

export const UserAuthContext = createContext();

export const useUserAuthContext = () => {
  return useContext(UserAuthContext);
};

export const UserAuthContextProvider = ({ children }) => {
  const [userJwt, setUserJwt] = useState(() => {
    const storedJwt = localStorage.getItem("jwt");
    console.log("Stored JWT from localStorage:", storedJwt);

    if (storedJwt) {
      return { token: storedJwt };
    }

    console.log("No JWT found in localStorage.");
    return null;
  });

  useEffect(() => {
    if (userJwt) {
      console.log("userJwt changed:", userJwt);
      localStorage.setItem("jwt", userJwt.token);
    } else {
      console.log("Clearing JWT from localStorage.");
      localStorage.removeItem("jwt");
    }
  }, [userJwt]);

  return (
    <UserAuthContext.Provider value={[userJwt, setUserJwt]}>
      {children}
    </UserAuthContext.Provider>
  );
};

export default UserAuthContextProvider;