import React, { createContext, useContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

export const UserAuthContext = createContext();

export const useUserAuthContext = () => {
  return useContext(UserAuthContext);
};

export const UserAuthContextProvider = ({ children }) => {
  const [userJwt, setUserJwt] = useState(() => {
    const storedJwt = localStorage.getItem("jwt");
    console.log("Stored JWT from localStorage:", storedJwt);
    
    if (storedJwt) {
      try {
        const decodedJwt = jwtDecode(storedJwt);
        console.log("Decoded JWT:", decodedJwt);

        return { 
          token: storedJwt, 
          email: localStorage.getItem("email"), 
          userId: decodedJwt.userId || decodedJwt.sub
        };
      } catch (error) {
        console.error("Error decoding JWT:", error);
        return null;
      }
    }
    console.log("No JWT found in localStorage.");
    return null;
  });

  useEffect(() => {
    if (userJwt) {
      console.log("userJwt changed:", userJwt);
      localStorage.setItem("jwt", userJwt.token);
      localStorage.setItem("email", userJwt.email);
    } else {
      console.log("Clearing JWT from localStorage.");
      localStorage.removeItem("jwt");
      localStorage.removeItem("email");
    }
  }, [userJwt]);

  return (
    <UserAuthContext.Provider value={[userJwt, setUserJwt]}>
      {children}
    </UserAuthContext.Provider>
  );
};
