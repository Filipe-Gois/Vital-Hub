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
  const token = await AsyncStorage.getItem("token");

  if (token === null) {
    return null;
  }

  //decodifica o token recebido

  //   console.log("token:", token);

  //   console.log("jwtdecode", jwtDecode(token));

  const decoded = jwtDecode(token);

  return {
    email: decoded.email,
    id: decoded.jti,
    name: decoded.name,
    role: decoded.role,
  };
};
