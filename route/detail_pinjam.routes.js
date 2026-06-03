import express from "express";
import multer from 'multer';
const router = express.Router();
const upload = multer();
import { authenticateToken } from "../middleware/VerifyToken.js";

import {
    getAlldetail,
    cariDetailByID,
    updateDetail,
    deleteDetail,
    insertPinjam,
    cariBukuDipinjamMahasiswa,
    prosesPengembalian,
    laporanPengembalian
} from "../controllers/detail_pinjam.controllers.js";



router.get("/", authenticateToken, getAlldetail);
router.get("/detail_id", authenticateToken, cariDetailByID);
router.patch("/detail_id", authenticateToken, updateDetail);
router.delete("/detail_id", authenticateToken, deleteDetail);
router.post("/insertPinjam",  authenticateToken, insertPinjam);
router.get("/mahasiswa/:nim", authenticateToken, cariBukuDipinjamMahasiswa);
router.post("/pengembalian", upload.none(), prosesPengembalian);
router.get("/laporan/pengembalian", authenticateToken, laporanPengembalian);

export default router;