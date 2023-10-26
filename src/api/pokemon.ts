import { AxiosResponse } from "axios";
import { instance } from ".";
import { Pokemon } from "../types/Pokemon";

export const PokemonAPI = {
    getAll: (): Promise<Pokemon[]> => new Promise((resolve, reject) => {
        instance.get('/pokemon.json')
            .then(({ data }) => resolve(data))
            .catch((err) => reject(err))
    })
}