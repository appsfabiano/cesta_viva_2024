import express from "express";
import UserController from "../controllers/userController.js";
import checkToken from "../middlewares/authToken.js";
import MailController from "../controllers/mailController.js";

const routes = express.Router();

//Apenas rota de teste
routes.post("/send", MailController.sendMail);


export default routes;
