import axios from "axios";

const ipFilipePcDeCasa = "192.168.15.61";

const apiPortFilipePcDoSenai = "4466";

const localApiUrlFilipe = `http://${ipFilipePcDeCasa}:${apiPortFilipePcDoSenai}/api`;

//rota da api externa para conferir o cep
const externalApiCep = `https://api.brasilaberto.com/v1/zipcode`;

//rotas da api

export const loginResource = `/Login`;

export const consultasResource = `/Consultas`;

export const examesResource = `/Exame`;

export const pacientesResource = `/Pacientes`;

export const medicosResource = `/Medicos`;

export const usuarioResource = `/Usuario`;

export const clinicaResource = `/Clinica`;

export const recuperarSenhaResource = `/RecuperarSenha`;

export const validarCodigoResource = `/ValidateCodeRecovery`;

//api de filipe góis
export const apiFilipe = axios.create({
  baseURL: localApiUrlFilipe,
});

//api responsavel por retornar as informações de endereço ao informar um cep
export const apiCep = axios.create({
  baseURL: externalApiCep,
});
