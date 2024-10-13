import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    nome: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    senha: { type: String, required: true },
    resetToken: {type: String},
    resetTokenExpiration: {type: Date}
  },
  { versionKey: false }
);

const User = mongoose.model("users", userSchema); //colecao referente ao banco e schema

export default User;
