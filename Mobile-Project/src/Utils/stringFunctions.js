import { mask, unMask } from "remask";
import { apiCep } from "../Services/Service";
import { Alert } from "react-native";

//máscara para input que receber cep
// export const cepMasked = data => mask(unMask(data), ["99.999.999/9999-99"])
export const cepMasked = (data) => mask(unMask(data), ["99999-999"]);

export const cpfMasked = (data) => mask(unMask(data), ["999.999.999-99"]);

export const dateMasked = (data) => mask(unMask(data), ["99/99/9999"]);
//formato DD/MM/AAAA

//tira a mascara do value que contém o cep
export const unMasked = (data) => unMask(data);

//-----------------//

export const getLocation = async (cep) => {
  try {
    const response = await apiCep.get("/" + cep);

    return response.data.result;
  } catch (error) {
    Alert.alert("Erro", "Cep não encontrado!");
  }
};

export const dateDbToView = (date) => {
  date = date.substr(0, 10);
  date = date.split("-").reverse().join("/");
  date = dateMasked(date);

  return date;
};

export const dateViewToDb = (date) => date.split("/").reverse().join("-");

export const calcularIdadeDoUsuario = (nascimento) => {};

export const hourDbToView = (hour) => {
  hour = hour.substr(11, 16);
  hour = hour.split(".")[0].substr(0, 5); //pega as horas

  return hour;
};

export const crmDbToView = (crm) => {};
