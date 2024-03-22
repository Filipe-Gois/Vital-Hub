import axios from "axios";

//configurações da api de filipe góis no senai

const ipFilipeSenai = "172.16.39.113"; //IP do servidor que está rodando

const apiPortFilipeSenai = "4466";
const localApiUrlFilipeSenai = `http://${ipFilipeSenai}:${apiPortFilipeSenai}/api`;

//rotas da api

//Login - post
export const loginRoute = `/Login`;

export const consultasGet = `/Consultas`;

const api = axios.create({
  baseURL: localApiUrlFilipeSenai,
});

export default api;
