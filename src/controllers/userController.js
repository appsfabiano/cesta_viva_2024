import User from "../models/User.js";
import bcrypt from "bcrypt";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import entidade from "../models/entidade.js";
import send from "../services/nodemailer.js";
class UserController {
  static async cadastrarUsuario(req, res) {
    try {
      const idUsuarioLogado = req.userId;
      const acharEntidade = await entidade.findOne({
        usuarios: { $in: [idUsuarioLogado] },
      }); //verifica e acha a entidade que o usuario logado pertence

      const { nome, email, senha } = req.body;

      //Verifica se usuario existe
      const userExiste = await User.findOne({ email: email });

      if (userExiste) {
        return res
          .status(422)
          .json({ msg: "Email ja cadastrado, utilize outro " });
      }

      //criar senha

      const salt = await bcrypt.genSalt(12);
      const senhaHash = await bcrypt.hash(senha, salt);

      //criar usuario

      const user = new User({
        nome,
        email,
        senha: senhaHash,
      });

      await user.save();
      await entidade.findByIdAndUpdate(acharEntidade._id, {
        $push: { usuarios: user._id },
      });

      return res
        .status(201)
        .json({ msg: "Usuário criado com sucesso e adicionado à entidade!" });
    } catch (error) {
      res.status(500).json({ msg: `o seguinte erro ocorreu: ${error}` });
    }
  }

  static async loginUsuario(req, res) {
    const { email, senha } = req.body;

    //validações
    if (!email) {
      return res.status(422).json({ msg: "O email é obrigatorio" });
    }

    if (!senha) {
      return res.status(422).json({ msg: "A senha é obrigatoria" });
    }

    //Verifica se usuario existe
    const user = await User.findOne({ email: email });

    if (!user) {
      return res.status(404).json({ msg: "Usuario não encontrado!" });
    }

    //Verifica se a senha é compativel
    const checkSenha = await bcrypt.compare(senha, user.senha);

    if (!checkSenha) {
      return res.status(404).json({ msg: "Senha Invalida!" });
    }

    try {
      const secret = process.env.SECRET;
      const token = jwt.sign(
        {
          id: user._id,
        },
        secret
      );

      res
        .status(200)
        .json({ msg: "Autenticação realizada com sucesso", token });
    } catch (error) {
      res.status(500).json({
        msg: `Ocorreu um erro no servidor ${error}`,
      });
    }
  }

  static async solicitarRedefinicaoSenha(req, res) {
    const { email } = req.body;

    try {
      // Verifica se o email existe no banco de dados
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ msg: "Usuário não encontrado!" });
      }

      // Gera um token aleatório de 32 bytes para redefinição de senha
      const resetToken = crypto.randomBytes(32).toString("hex");

      // Define a expiração do token (por exemplo, 1 hora a partir do momento atual)
      const tokenExpiration = Date.now() + 3600000; // 1 hora em milissegundos

      // Armazena o token e a expiração no usuário
      user.resetToken = resetToken;
      user.resetTokenExpiration = tokenExpiration;
      await user.save(); // Salva essas informações no banco de dados

      // Cria um link de redefinição de senha que será enviado ao usuário
      const resetLink = `${process.env.FRONTEND_URL}/redefinir-senha/${resetToken}`;

      // Envia o email ao usuário com o link de redefinição de senha
      const subject = "Redefinição de senha";
      const body = `Você solicitou a redefinição de senha. Clique no link para redefinir sua senha: ${resetLink}`;
      await send(user.email, subject, body);

      //  Retorna uma mensagem informando que o email foi enviado
      res.status(200).json({
        msg: "Um link para redefinir a senha foi enviado para o seu email.",
      });
    } catch (error) {
      res.status(500).json({ msg: `Ocorreu um erro: ${error}` });
    }
  }

  static async redefinirSenha(req, res) {
    const { token, novaSenha } = req.body;

    try {
      // 1. Verifica se o token é válido e não expirou
      const user = await User.findOne({
        resetToken: token,
        resetTokenExpiration: { $gt: Date.now() }, // O token não deve ter expirado
      });

      if (!user) {
        return res.status(400).json({ msg: "Token inválido ou expirado!" });
      }

      // 2. Criptografa a nova senha usando bcrypt
      const salt = await bcrypt.genSalt(12);
      const senhaHash = await bcrypt.hash(novaSenha, salt);

      // 3. Atualiza a senha do usuário e remove o token de recuperação
      user.senha = senhaHash;
      user.resetToken = undefined; // Remove o token
      user.resetTokenExpiration = undefined; // Remove a expiração do token
      await user.save(); // Salva as mudanças no banco de dados

      // 4. Retorna uma mensagem de sucesso
      res.status(200).json({ msg: "Senha redefinida com sucesso!" });
    } catch (error) {
      res.status(500).json({ msg: `Ocorreu um erro: ${error}` });
    }
  }
}

export default UserController;
