import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from "jwt-decode";
import { encode, decode } from "base-64";
import { createContext, useContext } from "react";

export const UserContext = createContext(null);

if (!global.atob) {
  global.atob = decode;
}

if (!global.btoa) {
  global.btoa = encode;
}

export const userDecodeToken = async () => {
  const token = JSON.parse(await AsyncStorage.getItem("token")).token

  if (token === null) {
    return null;
  }

  const decoded = jwtDecode(token);

  return {
    email: decoded.email,
    id: decoded.jti,
    name: decoded.name,
    role: decoded.role,
  };
};

export const userDecodeToken2 = (theToken) => {
  const decoded = jwtDecode(theToken); //objeto do payload
  return {
    role: decoded.role,
    userId: decoded.jti,
    nome: decoded.name,
    token: theToken,
  };
};
