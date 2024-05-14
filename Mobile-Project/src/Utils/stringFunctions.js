import { mask, unMask } from "remask";
import { apiCep } from "../Services/Service";
import { Alert } from "react-native";
import moment from "moment";
import { Masks, useMaskedInputProps } from "react-native-mask-input";

//máscara para input que receber cep
// export const cepMasked = data => mask(unMask(data), ["99.999.999/9999-99"])
export const cepMasked = (data) => mask(unMask(data), ["99999-999"]);

export const cpfMasked = (data) => mask(unMask(data), ["999.999.999-99"]);

export const rgMasked = (rg) => mask(unMask(rg), ["99.999.999-9"]);

export const dateMasked = (data) => mask(unMask(data), ["99/99"]);
export const dateMaskedFull = (data) => mask(unMask(data), ["99/99/9999"]);
//formato DD/MM/AAAA

//tira a mascara do value que contém o cep
export const unMasked = (data) => unMask(data);

//-----------------//

export const getLocation = async (cep, { setDialog, setShowDialog }) => {
  try {
    const response = await apiCep.get("/" + cep);

    return response.data.result;
  } catch (error) {
    setDialog({
      status: "erro",
      contentMessage: "Cep não encontrado!",
    });
    setShowDialog(true);
  }
};

export const dateDbToView = (date) => {
  date = date.substr(0, 10);
  date = date.split("-").reverse().join("/");
  date = date.split("/");
  date = `${date[0]}${date[1]}`;
  date = dateMasked(date);

  return date;
};

export const dateDbToViewFull = (date) => {
  date = date.substr(0, 10);
  date = date.split("-").reverse().join("/");
  date = dateMaskedFull(date);

  return date;
};

export const dateViewToDb = (date) => date.split("/").reverse().join("-");

// melhorar essa lógica de data
export const calcularIdadeDoUsuario = (dataNascimento) => {
  // Cria uma nova instância de Date com a data de nascimento
  const dataNasc = new Date(dataNascimento);

  // Obtém a data atual e a diferença em milissegundos
  const agora = new Date();
  const diferencaEmMilissegundos = agora - dataNasc;

  // Calcula a idade em anos
  let idade = Math.floor(
    diferencaEmMilissegundos / (1000 * 60 * 60 * 24 * 365.25)
  );

  // Ajusta a idade se a data atual for anterior ao aniversário do usuário no ano atual
  if (
    agora.getMonth() < dataNasc.getMonth() ||
    (agora.getMonth() === dataNasc.getMonth() &&
      agora.getDate() < dataNasc.getDate())
  ) {
    idade--;
  }

  return idade;
};

export const hourDbToView = (hour) => {
  hour = hour.substr(11, 16);
  hour = hour.split(".")[0].substr(0, 5); //pega as horas

  return hour;
};

export const getDataAtual = () => moment(new Date()).format("YYYY-MM-DD");

/*
biblioteca para mascarar input (recomendação do Lucão)


 import { Masks, useMaskedInputProps } from 'react-native-mask-input';


const dataMasked = useMaskedInputProps({
        value: dtNasc,
        onChangeText: setDtNasc,
        mask: Masks.DATE_DDMMYYYY
    });

    const cpfMasked = useMaskedInputProps({
        value: cpf,
        onChangeText: setCpf,
        mask: Masks.BRL_CPF
    })


<Input {...cpfMasked} keyboardType="numeric" />
<Input {...dataMasked} />

*/
