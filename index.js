import express from "express";
import db from "./config/db.config.js";
import cors from "cors";
import "./models/buku.model.js";
import "./models/detail_pinjam.model.js";
import "./models/mahasiswa.model.js";
import "./models/pinjam.model.js";
import "./models/prodi.model.js";
import "./models/user.model.js";
import BukuRoute from "./route/buku.routes.js";
import MahasiswaRoute from "./route/mahasiswa.routes.js";
import ProdiRoute from "./route/prodi.routes.js";
import PinjamRoute from "./route/pinjam.route.js";
import detailRoute from "./route/detail_pinjam.routes.js";
import userRoute from "./route/user.routes.js";
import multer from 'multer';

const app = express();
// try {
//     await db.authenticate();
//     console.log("Database ok...");
// } catch (error) {
//     console.log("belum konek: ", error);
// }

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/buku', BukuRoute);
app.use('/api/mahasiswa', MahasiswaRoute);
app.use('/api/prodi', ProdiRoute);      
app.use('/api/pinjam', PinjamRoute);   
app.use('/api/detail', detailRoute);
app.use('/api/user', userRoute);
app.get("/", async (req, res) => {
     try {
        await db.authenticate();
        console.log("database aiven terhubung");
        
        await db.sync({alter: true});
        console.log("semua table model berhasil dibuat");

        res.json({ message: "Hello Coba Backend untuk Vercel", database: "semua tabel model berhasil disinkronkan ke Aiven" });
     } catch (error) {
        console.log("belum konek: ", error);
        res.status(500).json({message: "gagal sinkronisasi ke database aiven", error: error.message});
     }
}); 
app.listen(5000);
export default app;
