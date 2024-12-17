import React, { createContext, useContext, useState } from "react";

const UserAuthContext = createContext();

// Custom hook to use the context
export const useUserAuthContext = () => {
  const context = useContext(UserAuthContext);
  if (!context) {
    throw new Error("useUserAuthContext must be used within a UserAuthContextProvider");
  }
  return context;
};

// Provider component
export const UserAuthContextProvider = ({ children }) => {
  const [userJwt, setUserJwt] = useState(null);  // Initial state for the JWT

  return (
    <UserAuthContext.Provider value={[userJwt, setUserJwt]}>
      {children}
    </UserAuthContext.Provider>
  );
};

