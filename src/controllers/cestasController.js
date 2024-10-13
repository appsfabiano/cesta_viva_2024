import entidade from "../models/entidade.js";
import Cesta from "../models/modeloCesta.js";

class CestaController {
  static async cadastrarModeloCesta(req, res) {
    try {
      //Comportamento padrao de rota privada: Pegar o ID do usuario logado
      const idUsuarioLogado = req.userId;
      //e achar a entidade que esse usuario logado pertence
      const acharEntidade = await entidade.findOne({
        usuarios: { $in: [idUsuarioLogado] },
      });

      const { nomeCampanha, comecaEm, terminaEm } = req.body;

      const cesta = await Cesta.create({
        entidade: acharEntidade._id,
        nomeCampanha,
        comecaEm,
        terminaEm,
      });
      return res.status(201).json({ msg: "Cesta criada com sucesso" });
    } catch (error) {
      res.status(500).json({ msg: `o seguinte erro ocorreu: ${error}` });
    }
  }

  static async retornarCestas(req, res) {
    try {
      const idUsuarioLogado = req.userId;
      const acharEntidade = await entidade.findOne({
        usuarios: { $in: [idUsuarioLogado] },
      });

      if (!acharEntidade) {
        return res.status(404).json({ msg: "Entidade não encontrada" });
      }

      // Buscar todas as cestas associadas à entidade
      const cestas = await Cesta.find({ entidade: acharEntidade._id });

      // Retornar as cestas encontradas
      return res.status(200).json(cestas);
    } catch (error) {
      return res.status(500).json({ msg: `O seguinte erro ocorreu: ${error}` });
    }
  }

  static async editarCesta(req, res) {
    try {
      const idUsuarioLogado = req.userId;

      // Busca a entidade do usuário logado
      const acharEntidade = await entidade.findOne({
        usuarios: { $in: [idUsuarioLogado] },
      });

      // Verifica se a entidade foi encontrada
      if (!acharEntidade) {
        return res.status(404).json({ msg: "Entidade não encontrada" });
      }

      const { idCesta } = req.params; // Pega o ID da cesta da URL
      const { nomeCampanha, comecaEm, terminaEm } = req.body; // Pega os dados do corpo da requisição

      // Verifica se a cesta existe e pertence à entidade
      const cesta = await Cesta.findOne({
        _id: idCesta,
        entidade: acharEntidade._id,
      });

      if (!cesta) {
        return res.status(404).json({
          msg: "Cesta não encontrada ou você não tem permissão para editá-la",
        });
      }

      // Atualiza a cesta
      const cestaAtualizada = await Cesta.findByIdAndUpdate(
        idCesta,
        { nomeCampanha, comecaEm, terminaEm },
        { new: true } // Retorna o documento atualizado
      );

      return res.status(200).json({
        msg: "Cesta atualizada com sucesso",
        cesta: cestaAtualizada,
      });
    } catch (error) {
      res
        .status(500)
        .json({ msg: `Ocorreu um erro ao editar a cesta: ${error}` });
    }
  }
}

export default CestaController;
