import ListaCompras from "../models/ListaCompras.js";
import mongoose from "mongoose";

class ListaComprasRepository {
  create = (lista) => ListaCompras.create(lista);

  getAll = () => ListaCompras.find();

  getById = (id) => ListaCompras.findById(id);

  atualizaProduto = async (listaId, produtoId, dadosProduto) => {
    const dadosParaAtualizar = {
      "produtos.$.nome": dadosProduto.nome,
      "produtos.$.quantidade": Number(dadosProduto.quantidade),
      "produtos.$.situacao": dadosProduto.situacao,
    };

    if (dadosProduto.preco !== undefined && dadosProduto.preco !== null) {
      dadosParaAtualizar["produtos.$.preco"] =
        mongoose.Types.Decimal128.fromString(dadosProduto.preco.toString());
    }

    return await ListaCompras.findOneAndUpdate(
      { _id: listaId, "produtos._id": produtoId },
      {
        $set: dadosParaAtualizar,
      },
      { returnDocument: "after" },
    );
  };

  addProduto = (listaId, novoProduto) => {
    return ListaCompras.findOneAndUpdate(
      { _id: listaId },
      { $push: { produtos: novoProduto } },
      { returnDocument: "after" },
    );
  };

  removeProduto = async (listaId, produtoId) => {
    const lista = await ListaCompras.findById(listaId);
    if (!lista) return null;

    lista.produtos = lista.produtos.filter(
      (produto) => produto._id.toString() !== produtoId.toString(),
    );

    return await lista.save();
  };

  delete = (id) => ListaCompras.findByIdAndDelete(id);
}

export default ListaComprasRepository;
