import axios from "axios";

// declarar a porta da api  
const portaApi = '4466'

//declarar o ip da Máquina 
const ip = "172.16.39.101"

// definir url padrão 

const apiUrlLocal = `http://${ip}:${portaApi}/api`

// trazer a configuração do axios 
const api = axios.create({
    baseURL: apiUrlLocal

})

export default api; 
