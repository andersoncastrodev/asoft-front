import axios from "axios";
import api from "../../../lib/api";
import { State } from "../interface/state-interface";

// Pegar o URL da API geral
const URL_API = `${api.defaults.baseURL}`;

/**
 * Fetches the list of states from the backend API.
 * Utilizes the endpoint provided by the Spring Boot controller for states.
 * @returns {Promise<State[]>} Returns an array of State objects, each containing the state details.
 * In case of an error, logs the error and returns an empty array.
 */
export const loadState = async () : Promise< State[] > => {

    try {
        const response = await axios.get(`${URL_API}/states`, {
            withCredentials: true, // Importante para envio de cookies
        });

        return response.data;
    }catch(err) {
        console.error("Erro ao buscar enums de estado:", err);
        return [];
    }
}
