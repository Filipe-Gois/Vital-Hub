import React, { createContext, useState } from "react";

export const AuthContext = createContext({});

const AuthProvider = ({ children }) => {
  const [userGlobalData, setUserGlobalData] = useState({});

  return (
    <AuthContext.Provider value={{ userGlobalData, setUserGlobalData }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
