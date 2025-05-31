import axios from "axios";
import api from "../../../../lib/api";
import { StatusValues } from "../../interface/cliente-interface/client-inteface";


// Pegar o URL da API geral
const URL_API = `${api.defaults.baseURL}`;


/**
 * Busca os enums de Status na API.
 * É o endpoint da API que busca os enums de Status no controller "EnumValuesController" do Spring Boot.
 * @returns {Promise<StatusValues[]>} Retorna um array de StatusValues, que e um array de Map<String, String>
 * com o valor e o label dos enums.
 */
export const searchEnumStatus = async () : Promise< StatusValues[] > => {

    try {
      console.log(api+'/enum-values/status');  
      const response = await axios.get(`${URL_API}/enum-values/status`, {

      withCredentials: true, // Importante para envio de cookies
    });

    return response.data; // retorna o array de Map<String, String> recebido do backend

  } catch (err) {
     console.error("Erro ao buscar enums de status:", err);
     return [];
  }

}
