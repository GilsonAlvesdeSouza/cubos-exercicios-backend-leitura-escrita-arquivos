import { Request, Response } from "express";
const { buscarEndereco } = require("utils-playground");
import { getErrorMessage } from "../utils";
import { EnderecoService } from "../services";

const enderecoService = new EnderecoService();

class EnderecoController {
  async save(req: Request, res: Response) {
    const cep = req.params.cep as string;

    try {
      const end = await buscarEndereco(cep);
      if (end.erro) {
        return res.status(404).json({ mensagem: "Cep não encontrado." });
      }

      const result = await enderecoService.save(end);

      const resultCount = { count: result.length, result };

      res.json(resultCount);
    } catch (error) {
      res.status(500).json({ mensagem: getErrorMessage(error) });
    }
  }
}

export { EnderecoController };
