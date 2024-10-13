import mongoose from "mongoose";

const entidadeSchema = new mongoose.Schema(
  {
    cnpj: { type: Number, required: true, unique: true },
    razaoSocial: { type: String, required: true },
    nomeFantasia: { type: String, required: true },
    cidade: { type: String, required: true },
    estado: { type: String, required: true },
    endereco: { type: String, required: true },
    numero: { type: Number, required: true },
    bairro: { type: String, required: true },
    complemento: { type: String },
    cep: { type: Number, required: true },
    telefone: { type: Number, required: true },
    descricao: { type: String },
    imagem: { type: String },
    usuarios: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true,
      },
    ],
  },
  { versionKey: false }
);

const entidade = mongoose.model("entidades", entidadeSchema); //colecao referente ao banco e schema

export default entidade;
