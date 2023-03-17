import React, { createContext, useState } from "react";

export const TruthDareContext = createContext();

const Context = ({ children }) => {
  const baseUrl = `http://192.168.0.192:8080`;
  const [isLogin, setLogin] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [username,setUsername] = useState("");
  const [email,setEmail] = useState("");
  const [jwt,setJwt] = useState('');

  return (
    <TruthDareContext.Provider
      value={{
        isLogin,
        setLogin,
        username,
        setUsername,
        email,
        setEmail,
        jwt,
        setJwt,
        isVerified,
        setIsVerified,
        baseUrl
      }}
    >
      {children}
    </TruthDareContext.Provider>
  );
};

export default Context;