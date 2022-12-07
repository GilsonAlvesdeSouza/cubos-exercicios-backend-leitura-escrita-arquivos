import { Router } from "express";

import {
  ProductController,
  PokemonController,
  EnderecoController,
} from "./controllers";

const productController = new ProductController();
const pokemonController = new PokemonController();
const endercoController = new EnderecoController();

const router = Router();

router.get("/produtos", productController.index);
router.get("/produtos/:id/frete/:cep", productController.show);

router.get("/pokemon", pokemonController.index);
router.get("/pokemon/:name_id/", pokemonController.show);

router.get("/enderecos/:cep", endercoController.save);

export { router };
