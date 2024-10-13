import jwt from "jsonwebtoken";
import mongoose from "mongoose";

// Middleware para verificar token
export default function checkToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ msg: "Acesso negado" });
  }

  try {
    const secret = process.env.SECRET;
    const decoded = jwt.verify(token, secret); // Decodifica o token e valida

    req.userId = new mongoose.Types.ObjectId(decoded.id); // Armazena o ID do usuário na requisição para uso posterior

    next(); // Continua para o próximo middleware ou rota
  } catch (error) {
    return res.status(400).json({ msg: "Token inválido" });
  }
}
