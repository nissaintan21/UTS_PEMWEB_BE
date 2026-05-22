import express from "express";
const router = express.Router();

import {
  getAllPembicara,
  createPembicara,
  getPembicaraById,
  updatePembicaraById,
  deletePembicaraById,
} from "../controllers/pembicaraController"; 

router.get("/", getAllPembicara);
router.post("/", createPembicara);
router.get("/:id", getPembicaraById);
router.put("/:id", updatePembicaraById);
router.delete("/:id", deletePembicaraById);

export default router;
