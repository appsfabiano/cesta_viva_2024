import express from "express"; //gerencia as rotas
import entidades from "./entidadesRoutes.js"; //importando as rotas de entidades
import auth from "./authRoutes.js"; //importando as rotas de autenticação
import cesta from "./cestasRoutes.js";
import produtos from "./produtoRoutes.js";
import mail from "./mailRoutes.js"

//funcao para agrupar todas as rotas que vamos receber

const routes = (app) => {
  app
    .route("/")
    .get((req, res) => res.status(200).send("API Cesta Viva PI 2 Univesp"));

  //incluir as rotas
  //middleware das rotas que estao vindo de entidadesRoutes, passando tudo pra routes gerenciar
  app.use(express.json(), entidades, auth, cesta, produtos, mail);
};

export default routes;
