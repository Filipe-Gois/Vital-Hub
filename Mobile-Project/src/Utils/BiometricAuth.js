import React, { useState } from "react";
import * as LocalAuthentication from "expo-local-authentication";
import AsyncStorage from "@react-native-async-storage/async-storage";
import moment from "moment";

const [dateHistory, setDateHistory] = useState({}); //salvar objeto com historico
const [authenticated, setAuthenticated] = useState(false); //salvar o status de autenticado
const [isBiometricSupported, setIsBiometricSupported] = useState(false);

//função para verificar se o aparelho tem suoprte a biometria
export const checkExistAuthentications = async () => {
  const compatible = await LocalAuthentication.hasHardwareAsync(); //salvar a referencia de suporte a biometria

  setIsBiometricSupported(compatible);
};

//salva o historico da ultima autenticacao
export const setHistory = async () => {
  const objAuth = {
    dataAuthentication: moment().format("DD/MM/YYYY HH:mm:ss"),
  };

  await AsyncStorage.setItem("authenticate", JSON.stringify(objAuth));

  setDateHistory(objAuth);
};

//recebe o historico da ultima autenticacao
export const getHistory = async () => {
  const objAuth = await AsyncStorage.getItem("authenticate");

  if (objAuth) {
    setDateHistory(JSON.parse(objAuth));
  }
};

export const handleAuthentication = async ({ setDialog, setShowDialog }) => {
  //verificar se existe uma biometria cadastrada no dispositivo

  const biometricExist = await LocalAuthentication.isEnrolledAsync();

  //validar se existe ou nao uma biometria cadastrada
  if (!biometricExist) {
    setDialog({
      status: "erro",
      contentMessage: "Falha ao logar. Nenhuma biometria encontrada!",
    });
    setShowDialog(true);
    return;
  }

  //caso exista:

  const auth = await LocalAuthentication.authenticateAsync();

  setAuthenticated(auth.success);

  if (auth.success) {
    setHistory();
  }
};
