import mongoose from "mongoose";

const cestaModeloSchema = new mongoose.Schema(
  {
    entidade: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "entidades",
      required: true,
    },
    nomeCampanha: { type: String, required: true },
    comecaEm: { type: Date, required: true },
    terminaEm: { type: Date, required: true },
  },
  { versionKey: false }
);

const cesta = mongoose.model("cestas", cestaModeloSchema); //colecao referente ao banco e schema

export default cesta;
