import express from "express";
import checkToken from "../middlewares/authToken.js";
import produtoController from "../controllers/produtoController.js";

const routes = express.Router();

//Rotas privadas

//rotas ok
routes.post(
  "/produtos/cadastrarProduto",
  checkToken,
  produtoController.cadastrarProduto
);
routes.get(
  "/cestas/:idCesta/produtos",
  checkToken,
  produtoController.cadastrarProduto
);

export default routes;
