import axios from "axios";
import { getIPV4 } from "../Utils/ipFunctions";

//configurações da api de filipe góis no senai

const ipFilipePcDeCasa = "192.168.15.61";

const ipFilipePcDoSenai = "172.16.39.113";

const apiPortFilipePcDoSenai = "4466";

const localApiUrlFilipe = `http://${ipFilipePcDoSenai}:${apiPortFilipePcDoSenai}/api`;

//------------------------

////configurações da api de gabriel de luca no senai

//declarar o ip da Máquina
const ip = "172.16.39.101";

//rota da api externa para conferir o cep
const externalApiCep = `https://api.brasilaberto.com/v1/zipcode`;

//configurações da api de Gabriel de Luca no senai

const portaApiGabriel = "4466";

//declarar o ip da Máquina
const ipGabriel = "192.168.21.91";

// definir end point padrão

const apiUrlLocalGabriel = `http://${ipGabriel}:${portaApiGabriel}/api`;

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

//api de gabriel de lucca
export const apiGabriel = axios.create({
  baseURL: apiUrlLocalGabriel,
});

//api responsavel por retornar as informações de endereço ao informar um cep
export const apiCep = axios.create({
  baseURL: externalApiCep,
});
