import entidade from "../models/entidade.js";
import cesta from "../models/modeloCesta.js";
import produtoModelo from "../models/modeloProduto.js";

class ProdutoController {
  static async cadastrarProduto(req, res) {
    try {
      // Verifica o usuário logado
      const idUsuarioLogado = req.userId;

      // Acha a entidade a qual o usuário pertence
      const acharEntidade = await entidade.findOne({
        usuarios: { $in: [idUsuarioLogado] },
      });

      if (!acharEntidade) {
        return res.status(404).json({ msg: "Entidade não encontrada." });
      }

      // Extrai os dados do produto e o ID da cesta do corpo da requisição
      const {
        nomeProduto,
        metaProduto,
        quantidadeRecebida,
        unidadeMedida,
        cestaId,
      } = req.body;

      // Verifica se o ID da cesta foi passado
      if (!cestaId) {
        return res.status(400).json({ msg: "O ID da cesta é obrigatório." });
      }

      // Verifica se a cesta existe
      const cestaExistente = await cesta.findById(cestaId);
      if (!cestaExistente) {
        return res.status(404).json({ msg: "Cesta não encontrada." });
      }

      // Cria o produto
      const produto = await produtoModelo.create({
        cestaId,
        nomeProduto,
        metaProduto,
        quantidadeRecebida,
        unidadeMedida,
      });

      // Retorna sucesso com os dados do produto
      return res.status(201).json({
        msg: "Produto cadastrado com sucesso",
        produto: produto,
      });
    } catch (erro) {
      // Retorna o erro em caso de falha
      return res
        .status(500)
        .json({ msg: `Erro ao cadastrar produto: ${erro.message}` });
    }
  }
}

export default ProdutoController;
