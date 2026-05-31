import { Router } from "express";
import ListaComprasController from "../controllers/lista-compras.controller.js";

const router = Router();
const listaComprasController = new ListaComprasController();

router.post("/", listaComprasController.create);
router.get("/", listaComprasController.findAll);
router.get("/:id", listaComprasController.findById);
router.patch("/add/:id", listaComprasController.adicionaProduto);
router.patch("/update/:id", listaComprasController.atualizaProduto);
router.patch("/remove/:id", listaComprasController.removeProduto);
router.delete("/:id", listaComprasController.delete);

export default router;