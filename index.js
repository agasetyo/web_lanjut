import express from "express";
import db from "./config/db.config.js";
import cors from "cors";
import BukuRoute from "./route/buku.routes.js";
import MahasiswaRoute from "./route/mahasiswa.routes.js";
import ProdiRoute from "./route/prodi.routes.js";
import PinjamRoute from "./route/pinjam.route.js";
import detailRoute from "./route/detail_pinjam.routes.js";
import multer from 'multer';
import routerUser from "./route/user_routes.js";

const app = express();
try {
    await db.authenticate();
    console.log("Database ok...");
} catch (error) {
    console.log("belum konek: ", error);
}
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/buku', BukuRoute);
app.use('/api/mahasiswa', MahasiswaRoute);
app.use('/api/prodi', ProdiRoute);      
app.use('/api/pinjam', PinjamRoute);   
app.use('/api/detail', detailRoute);
app.use('/api/user', routerUser);         

app.listen(5000);