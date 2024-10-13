import mongoose from "mongoose";

const produtoModeloSchema = new mongoose.Schema(
  {
    cestaId:   {
      type: mongoose.Schema.Types.ObjectId,
      ref: "cestas",
      required: true,
    },
    nomeProduto: { type: String, required: true },
    metaProduto: { type: String, required: true },
    quantidadeRecebida: { type: String, required: true },
    unidadeMedida: { type: String, required: true },

  },
  { versionKey: false }
);

const produtoModelo = mongoose.model("produtos", produtoModeloSchema);

export default produtoModelo;
