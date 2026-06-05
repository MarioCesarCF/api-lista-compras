import { Decimal128 } from "mongodb";
import mongoose from "mongoose";

const ListaComprasSchema = new mongoose.Schema({
  criado_em: {
    type: Date,
    default: Date.now(),
  },
  nome: {
    type: String,
    required: true,
  },
  produtos: [
    {
      nome: String,
      quantidade: Number,
      preco: Decimal128,
      situacao: Boolean,
    },
  ],
});

const ListaCompras = mongoose.model("ListaCompras", ListaComprasSchema);

export default ListaCompras;