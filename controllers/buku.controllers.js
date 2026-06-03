import Buku from '../models/buku.model.js';
import { Sequelize } from "sequelize";
export const getAllProducts = async (req, res) => { 

    try {
        const products= await Buku.findAll();
        res.json(products);
    } catch (error) {
        res.json({ message: error.message });
    }
};
export const tambahbukubaru = async (req, res) => {
    try {
        const product = await Buku.create(req.body);
        res.json({ message: "Buku berhasil ditambahkan" });
    } catch (error) {
        res.json({ message: error.message });
    }
};
 export const caribukuByID = async (req, res) => {
    try {
        const product = await Buku.findAll({
            where: {
                kode_buku: req.params.id,
            },
        });
        res.json(product[0]);
    } catch (error) {
        res.json({ message: error.message });
    }
};
export const updateBuku = async (req, res) => {
    try {
        const product = await Buku.update(req.body, {
            where: {
                kode_buku: req.params.id
            }
        });
        res.json({ message: "Buku berhasil diupdate" });
    } catch (error) {
        res.json({ message: error.message });
    }
};
export const deleteBuku = async (req, res) => {
    try {
        const products = await Buku.destroy({
            where: {
                kode_buku: req.params.id
            }
        });
        res.json({ message: "Buku berhasil dihapus", data: products });
    } catch (error) {
        res.json({ message: error.message });
    }
};