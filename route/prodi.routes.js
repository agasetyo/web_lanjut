import express from "express";
import multer from 'multer';
import { authenticateToken } from "../middleware/VerifyToken.js";
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
router.post("/", authenticateToken, upload.none(), tambahProdiBaru);
router.get("/:prodi_id", authenticateToken, cariProdiByID);
router.patch("/:prodi_id", authenticateToken, updateProdi);
router.delete("/:prodi_id", authenticateToken, deleteProdi);

export default router;