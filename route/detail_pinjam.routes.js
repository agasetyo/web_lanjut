import express from "express";
import multer from 'multer';
const router = express.Router();
const upload = multer();

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

router.get("/", getAlldetail);
router.get("/detail_id", cariDetailByID);
router.patch("/detail_id", updateDetail);
router.delete("/detail_id", deleteDetail);
router.post("/insertPinjam",  insertPinjam);
router.get("/mahasiswa/:nim", cariBukuDipinjamMahasiswa);
router.post("/pengembalian", upload.none(), prosesPengembalian);
router.get("/laporan/pengembalian", laporanPengembalian);

export default router;