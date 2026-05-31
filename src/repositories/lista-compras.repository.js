import ListaCompras from "../models/ListaCompras.js";

class ListaComprasRepository {
  create = (lista) => ListaCompras.create(lista);

  getAll = () => ListaCompras.find();

  getById = (id) => ListaCompras.findById(id);

  atualizaProduto = (listaId, produtoId, dadosProduto) =>
    ListaCompras.findOneAndUpdate(
      { _id: listaId, "produtos._id": produtoId },
      {
        $set: {
          "produtos.$.nome": dadosProduto.nome,
          "produtos.$.preco": dadosProduto.preco,
          "produtos.$.quantidade": dadosProduto.quantidade,
          "produtos.$.situacao": dadosProduto.situacao,
        },
      },
      { returnDocument: "after" },
    );

  addProduto = (listaId, novoProduto) => {
    return ListaCompras.findOneAndUpdate(
      { _id: listaId },
      { $push: { produtos: novoProduto } },
      { returnDocument: "after" },
    );
  };

  removeProduto = (listaId, produtoId) => {
    return ListaCompras.findOneAndUpdate(
      { _id: listaId },
      {
        $pull: {
          produtos: { _id: produtoId },
        },
      },
      { returnDocument: "after" },
    );
  };

  delete = (id) => ListaCompras.findByIdAndDelete(id);
}

export default ListaComprasRepository;
