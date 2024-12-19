import React, { createContext, useContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

export const UserAuthContext = createContext();

export const useUserAuthContext = () => {
  return useContext(UserAuthContext);
};

export const UserAuthContextProvider = ({ children }) => {
  const [userJwt, setUserJwt] = useState(() => {
    const storedJwt = localStorage.getItem("jwt");
    
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
        return null;
      }
    }
    return null;
  });

  useEffect(() => {
    if (userJwt) {
      localStorage.setItem("jwt", userJwt.token);
      localStorage.setItem("email", userJwt.email);
    } else {
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
