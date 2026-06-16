import express from "express";
import multer from 'multer';
import { authenticateToken } from "../middleware/VerifyTokens.js";
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

router.get("/buku/", authenticateToken, getAllProducts);
router.post("/", authenticateToken, upload.none(), tambahbukubaru);
router.get("/:id", authenticateToken, caribukuByID);
router.patch("/:id", authenticateToken, updateBuku);
router.delete("/:id", authenticateToken, deleteBuku);

export default router;