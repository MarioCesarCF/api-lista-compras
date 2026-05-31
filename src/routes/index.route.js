import { Router } from "express";
const router = Router();

import listaComprasRoute from "./lista-compras.route.js";

router.use("/lista", listaComprasRoute);

export default router;