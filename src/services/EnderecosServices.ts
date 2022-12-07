import fs from "fs/promises";
import path from "path";
import { getErrorMessage } from "../utils";

interface EnderecoInterface {
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
  ibge: string;
  gia: string;
  ddd: string;
  siafi: string;
}

let arrayEnderecos: Array<EnderecoInterface> = [];

class EnderecoService {
  async save(end: EnderecoInterface) {
    try {
      const enderecos = await fs.readFile(
        path.resolve(__dirname, "../enderecos.json")
      );
      const resultEnderecos = enderecos.toString();
      if (resultEnderecos === "") {
        arrayEnderecos.push(end);
        const file = JSON.stringify(arrayEnderecos);
        await fs.writeFile(path.resolve(__dirname, "../enderecos.json"), file);
        return;
      }
      arrayEnderecos = JSON.parse(resultEnderecos);
      const verificaEndereco = arrayEnderecos.find((el) => el.cep === end.cep);
      if (!verificaEndereco) {
        arrayEnderecos.push(end);
        const file = JSON.stringify(arrayEnderecos);
        await fs.writeFile(path.resolve(__dirname, "../enderecos.json"), file);
      }
    } catch (error) {
      getErrorMessage(error);
    }
  }
}

export { EnderecoService };
