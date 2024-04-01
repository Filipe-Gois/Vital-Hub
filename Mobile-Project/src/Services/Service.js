import axios from "axios";
import { getIPV4 } from "../Utils/ipFunctions";


// declarar a porta da api  
const portaApi = '4466'

//declarar o ip da Máquina 
const ip = "172.16.39.101"

// definir url padrão 

const apiUrlLocal = `http://${ip}:${portaApi}/api`

//rotas da api

//Login - post
export const loginResource = `/Login`;

export const consultasResource = `/Consultas`;

export const pacientesResource = `/Pacientes`;

export const medicosResource = `/Medicos`;

export const usuarioResource = `/Usuario`;

const api = axios.create({
  baseURL: apiUrlLocal,
});


export default api;
