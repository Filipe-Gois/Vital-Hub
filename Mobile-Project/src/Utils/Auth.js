import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from "jwt-decode";
import { encode, decode } from "base-64";
import { createContext, useContext } from "react";
import { apiFilipe, usuarioResource } from "../Services/Service";

export const UserContext = createContext(null);

if (!global.atob) {
  global.atob = decode;
}

if (!global.btoa) {
  global.btoa = encode;
}

export const userDecodeToken = async () => {
  const token = JSON.parse(await AsyncStorage.getItem("token")).token;

  if (token === null) {
    return null;
  }

  const decoded = jwtDecode(token);

  const getFotoUri = async (idUsuario) => {
    try {
      const response = await apiFilipe.get(
        `${usuarioResource}/BuscarPorId?id=${idUsuario}`
      );

      return response.data.foto;
    } catch (error) {
      console.log("Erro ao buscar foto:", error);
    }
  };

  return {
    email: decoded.email,
    id: decoded.jti,
    name: decoded.name,
    role: decoded.role,
    token: token,
    foto: await getFotoUri(decoded.jti),
  };
};

export const userDecodeToken2 = (theToken) => {
  const decoded = jwtDecode(theToken); //objeto do payload
  return {
    role: decoded.role,
    userId: decoded.jti,
    nome: decoded.name,
    token: theToken,
    // foto: fotoUsuario,
  };
};
