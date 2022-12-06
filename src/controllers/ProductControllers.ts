import { Request, Response } from "express";
const { getStateFromZipcode } = require("utils-playground");
import { ProductService } from "../services";
import { getErrorMessage } from "../utils";

const productService = new ProductService();

class ProductController {
  index(req: Request, res: Response) {
    const products = productService.getAll();
    res.json(products);
  }

  async show(req: Request, res: Response) {
    const { id, cep } = req.params;

    if (!Number(id)) {
      return res.status(400).send({ mensagem: " Informe um id valido." });
    }

    const product = productService.getById(Number(id));

    if (!product) {
      return res
        .status(404)
        .json({ mensagem: "Nenhum produto encontrado com o ID informado." });
    }

    if (cep.length < 8) {
      return res.status(400).json({ mensagem: "Informe um CEP válido." });
    }

    try {
      let state = await getStateFromZipcode(cep);

      let shippingPercent = 0;

      switch (state) {
        case "BA":
        case "SE":
        case "AL":
        case "PE":
        case "PB":
          shippingPercent = 10;
          break;
        case "SP":
        case "RJ":
          shippingPercent = 15;
          break;

        default:
          shippingPercent = 12;
          break;
      }

      const shipping = product.value * (shippingPercent / 100);
      const result = {
        product,
        estado: state,
        frete: shipping,
      };
      return res.json(result);
    } catch (error) {
      res.status(400).json({ mensagem: getErrorMessage(error) });
    }
  }
}

export { ProductController };
