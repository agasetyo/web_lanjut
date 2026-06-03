import express from "express";
import multer from 'multer';
const upload = multer();
const router = express.Router();

router.post("/", upload.none(), tambahbukubaru);

import {
    getAllProducts,
    tambahbukubaru,
    caribukuByID,
    updateBuku,
    deleteBuku
} from "../controllers/buku.controllers.js";

router.get("/buku/", getAllProducts);
router.post("/", tambahbukubaru);
router.get("/:id", caribukuByID);
router.patch("/:id", updateBuku);
router.delete("/:id", deleteBuku);

export default router;