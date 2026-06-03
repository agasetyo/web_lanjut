import express from "express";
import multer from 'multer';
import { authenticateToken } from "../middleware/VerifyTokens.js";

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
router.post("/", upload.none(), tambahpinjamBaru);
router.get("/:pinjam_id", caripinjamByID);
router.patch("/:pinjam_id", updatepinjam);
router.delete("/:pinjam_id", deletepinjam);

export default router;
