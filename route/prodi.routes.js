import express from "express";
import multer from 'multer';
import { authenticateToken } from "../middleware/VerifyTokens.js";
const router = express.Router();
const upload = multer();

import {
    getAllProdi,
    tambahProdiBaru,
    cariProdiByID,
    updateProdi,
    deleteProdi
} from "../controllers/prodi.controllers.js";


router.get("/", authenticateToken, getAllProdi);
router.post("/", upload.none(), tambahProdiBaru);
router.get("/:prodi_id", cariProdiByID);
router.patch("/:prodi_id", updateProdi);
router.delete("/:prodi_id", deleteProdi);

export default router;