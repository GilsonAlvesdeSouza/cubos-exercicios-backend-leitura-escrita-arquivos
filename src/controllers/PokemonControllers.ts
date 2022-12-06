import { Request, Response } from "express";
const { listarPokemons, detalharPokemon } = require("utils-playground");
import { getErrorMessage } from "../utils";

class PokemonController {
  async index(req: Request, res: Response) {
    const pag = req.query.pag;

    try {
      const pokemons = await listarPokemons(Number(pag));
      res.json(pokemons);
    } catch (error) {
      res.status(500).json({ mensagem: getErrorMessage(error) });
    }
  }

  async show(req: Request, res: Response) {
    const name_id = req.params.name_id as string;

    let pokemon: any = {};

    try {
      if (Number(name_id)) {
        pokemon = await detalharPokemon(Number(name_id));
      } else {
        pokemon = await detalharPokemon(name_id);
      }

      const result = {
        id: pokemon.id,
        name: pokemon.name,
        height: pokemon.height,
        weight: pokemon.weight,
        base_experience: pokemon.base_experience,
        forms: pokemon.forms,
        abilities: pokemon.abilities,
        species: pokemon.species,
      };

      res.json(result);
    } catch (error) {
      res.status(500).json({ mensagem: getErrorMessage(error) });
    }
  }
}

export { PokemonController };
