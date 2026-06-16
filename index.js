import express from "express";
import db from "./config/db.config.js";
import cors from "cors";
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
app.get("/", (req, res) => {
    res.json({ message: "Hello Coba Backend untuk Vercel" });
});

app.listen(5000);
export default app;