import express from "express";
import multer from 'multer';
import { authenticateToken } from "../middleware/VerifyToken.js";

const router = express.Router();
const upload = multer();

import {
    getAllpinjam,
    tambahpinjamBaru,
    caripinjamByID,
    updatepinjam,
    deletepinjam,

} from "../controllers/pinjam.controllers.js";

router.get("/", authenticateToken, getAllpinjam);
router.post("/", authenticateToken, upload.none(), tambahpinjamBaru);
router.get("/:pinjam_id", authenticateToken, caripinjamByID);
router.patch("/:pinjam_id", authenticateToken, updatepinjam);
router.delete("/:pinjam_id", authenticateToken, deletepinjam);

export default router;
