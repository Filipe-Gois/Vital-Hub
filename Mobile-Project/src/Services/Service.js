import axios from "axios";
import { getIPV4 } from "../Utils/ipFunctions";

//configurações da api de filipe góis no senai

const ipFilipePcDeCasa = "192.168.15.61";

const ipFilipePcDoSenai = "172.16.39.113";

const ipFilipeCellPcDoSenai = "192.168.231.133";

const apiPortFilipePcDoSenai = "4466";

const localApiUrlFilipePcDoSenai = `http://${ipFilipePcDeCasa}:${apiPortFilipePcDoSenai}/api`;

const externalApiCep = `https://api.brasilaberto.com/v1/zipcode`;


//rotas da api

//Login - post
export const loginResource = `/Login`;

export const consultasResource = `/Consultas`;

export const pacientesResource = `/Pacientes`;

export const medicosResource = `/Medicos`;

export const usuarioResource = `/Usuario`;

const api = axios.create({
  baseURL: localApiUrlFilipePcDoSenai,
});

export const apiCep = axios.create({
  baseURL: externalApiCep,
});

export default api;
