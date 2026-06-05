import ListaComprasRepository from "../repositories/lista-compras.repository.js";

const listaComprasRepository = new ListaComprasRepository();

class ListaComprasController {
  create = async (req, res) => {
    const body = req.body;

    try {
      const lista = await listaComprasRepository.create(body);

      return res.status(201).send(lista);
    } catch (err) {
      if (err.status && err.message) {
        return res.status(err.status).send({ message: err.message });
      } else {
        return res.status(500).send({ message: 'Erro interno do servidor.' });
      }
    }
  };

  findAll = async (req, res) => {
    try {
      const listas = await listaComprasRepository.getAll();
      const data = {data: listas};

      return res.status(200).send(data);
    } catch (err) {
      if (err.status && err.message) {
        return res.status(err.status).send({ message: err.message });
      } else {
        return res.status(500).send({ message: 'Erro interno do servidor.' });
      }
    }
  };

  findById = async (req, res) => {
    const { id: listaId } = req.params;
    
    try {
      const lista = await listaComprasRepository.findById(listaId);

      return res.status(200).send(lista);
    } catch (err) {
      res.status(500).send({ message: err.message });
    }
  };

  adicionaProduto = async (req, res) => {
    const produto = req.body;
    const { id: listaId } = req.params;

    try {
      const response = await listaComprasRepository.addProduto(listaId, produto);

      return res.send(response);
    } catch (err) {
      return res.status(500).send(err.message);
    }
  };

  atualizaProduto = async (req, res) => {
    const { nome, quantidade, preco, situacao, _id } = req.body;
    const { id: listaId } = req.params;
    
    try {
      const response = await listaComprasRepository.atualizaProduto(listaId, _id, { nome, preco, quantidade, situacao });

      return res.send(response);
    } catch (err) {
      return res.status(500).send(err.message);
    }
  };

  removeProduto = async (req, res) => {
    const { id: listaId } = req.params;
    const { _id } = req.body;
    
    try {
      const response = await listaComprasRepository.removeProduto(listaId, _id);

      return res.send(response);
    } catch (err) {
      return res.status(500).send(err.message);
    }
  };

  delete = async (req, res) => {
    const listaId = req.params.id;

    try {
      const lista = await listaComprasRepository.excludes(listaId);

      return res.send(lista);
    } catch (err) {
      return res.status(500).send({ message: err.message });
    }
  };
}

export default ListaComprasController;