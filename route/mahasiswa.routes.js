import express from "express";
import multer from 'multer';
const router = express.Router();
const upload = multer();

import {
    getAllMahasiswa,
    tambahMahasiswaBaru,
    cariMahasiswaByID,
    updateMahasiswa,
    deleteMahasiswa
} from "../controllers/mahasiswa.controllers.js";

router.get("/", authenticateToken, getAllMahasiswa);
router.post("/", upload.none(), tambahMahasiswaBaru);
router.get("/:mhs_id", cariMahasiswaByID);
router.patch("/:mhs_id", updateMahasiswa);
router.delete("/:mhs_id", deleteMahasiswa);

export default router;