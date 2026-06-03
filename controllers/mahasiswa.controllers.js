import Mahasiswa from "../models/mahasiswa.model.js";
import { Sequelize } from "sequelize";
import ref_prodi from "../models/prodi.model.js";



export const getAllMahasiswa = async (req, res) => {
    try {
        const Mahasiswas= await Mahasiswa.findAll({
            include: {model: ref_prodi},
        });
        res.json(Mahasiswas);
    } catch (error) {
        res.json({ message: error.message });
    }
};
export const tambahMahasiswaBaru = async (req, res) => {
    try {
        const datamhs = await Mahasiswa.create(req.body);
        res.json({ message: "Mahasiswa berhasil ditambahkan" });
    } catch (error) {
        res.json({ message: error.message });
    }
};
export const cariMahasiswaByID = async (req, res) => {
    try {
        const datamhs = await Mahasiswa.findAll({
            where: {
                nim: req.params.mhs_id,
            },
        });
        res.json(datamhs[0]);
    } catch (error) {
        res.json({ message: error.message });
    }
};
export const updateMahasiswa = async (req, res) => {
    try {
       const datamhs = await Mahasiswa.update(req.body, {
            where: {
                nim: req.params.mhs_id
            }
        });
        res.json({ message: "Mahasiswa berhasil diupdate" });
    } catch (error) {
        res.json({ message: error.message });
    }
};
export const deleteMahasiswa = async (req, res) => {
    try {
        const datamhs = await Mahasiswa.destroy({
            where: {
                nim: req.params.mhs_id
            }
        });
        res.json({ message: "Mahasiswa berhasil dihapus", data: datamhs });
    } catch (error) {
        res.json({ message: error.message });
    }
};