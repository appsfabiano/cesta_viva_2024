import express from "express";
import checkToken from "../middlewares/authToken.js";
import CestaController from "../controllers/cestasController.js";

const routes = express.Router();

//Rotas privadas
//RotaOK
routes.post(
  "/cestas/cadastrarCesta",
  checkToken,
  CestaController.cadastrarModeloCesta
);
//Rota OK
routes.get("/cestas", checkToken, CestaController.retornarCestas);

routes.put("/cestas/:id", checkToken, CestaController.editarCesta);

export default routes;
