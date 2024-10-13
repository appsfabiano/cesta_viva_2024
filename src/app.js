import express from "express";
import conectaNoBanco from "./config/dbConnect.js";
import routes from "./routes/index.js";
import cors from "cors"

const conexao = await conectaNoBanco();
conexao.on("error", (erro) => {
  console.error("erro de conexao", erro);
});

conexao.once("open", () => {
  console.log("Conexão com o banco feita com sucesso.");
});

const app = express();
app.use(cors())
routes(app);

export default app;
