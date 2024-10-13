import express from "express";
import EntidadeController from "../controllers/entidadeController.js";
import checkToken from "../middlewares/authToken.js";
import UserController from "../controllers/userController.js";

const routes = express.Router();

//Rotas Publicas
//RotasOk
//Rota retorna todas entidades
routes.get("/entidades", EntidadeController.listarEntidades);
//Rota que lista id por params
routes.get("/entidades/:id", EntidadeController.listarEntidadePorId);
//Rota para Cadastrar Entidade
routes.post("/entidades", EntidadeController.cadastrarEntidade);

//Rotas Privadas
//Rota para cadastrar um usuario a mais na entidade
routes.post(
  "/entidades/cadastrar/usuario",
  checkToken,
  UserController.cadastrarUsuario
);
// Rota que retorna o perfil da entidade que o usuario que esta logado pertence
routes.get("/entidade", checkToken, EntidadeController.getPerfilEntidade);
// Rota que edita Imagem e Descricao da entidade que o usuario que esta logado pertence
routes.post(
  "/entidade",
  checkToken,
  EntidadeController.adicionarImagemEDescricao
);

//Rotas em teste pode ignorar
routes.put("/entidades/:id", EntidadeController.atualizarEntidadePorId);
routes.delete("/entidades/:id", EntidadeController.excluirEntidadePorId);

export default routes;
