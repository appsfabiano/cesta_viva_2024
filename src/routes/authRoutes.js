import express from "express";
import UserController from "../controllers/userController.js";
import checkToken from "../middlewares/authToken.js";

const routes = express.Router();

//Apenas rota de teste

//Login Usuario OK
routes.post("/auth/login", UserController.loginUsuario);

//Rota para solicitar a redefinição de senha por email
routes.post("/auth/solicitar-redefinicao-senha", UserController.solicitarRedefinicaoSenha)

//Rota para redefinir a senha, o controller utiliza o token que a rota de solicitar cria 
routes.post("/auth/redefinir-senha", UserController.redefinirSenha)

export default routes;
