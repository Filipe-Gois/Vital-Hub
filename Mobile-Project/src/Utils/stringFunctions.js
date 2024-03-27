import { mask, unMask } from "remask";
import { apiCep } from "../Services/Service";

//máscara para input que receber cep
// export const cepMasked = data => mask(unMask(data), ["99.999.999/9999-99"])
export const cepMasked = (data) => mask(unMask(data), ["99999-999"]);

//tira a mascara do value que contém o cep
export const cepUnMasked = (data) => unMask(data);

//-----------------//

export const getLocation = async (cep, setData) => {
  try {
    const response = await apiCep.get("/" + cep);
    setData(response.data.result);
  } catch (error) {
    console.log("Erro ao buscar cep.", error);
  }
};

export const dateDbToView = (date) => {
  date = date.substr(0, 10);
  date = date.split("-");

  return `${data[2]}/${data[1]}/${data[0]}`;
};
