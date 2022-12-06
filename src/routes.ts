import { Router } from "express";

import { ProductController, PokemonController } from "./controllers";

const productController = new ProductController();
const pokemonController = new PokemonController();

const router = Router();

router.get("/produtos", productController.index);
router.get("/produtos/:id/frete/:cep", productController.show);

router.get("/pokemon", pokemonController.index);
router.get("/pokemon/:name_id/", pokemonController.show);

export { router };
