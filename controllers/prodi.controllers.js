import Prodi from "../models/prodi.model.js";
import { Sequelize } from "sequelize";

export const getAllProdi = async (req, res) => {
    try {
        const dataprod = await Prodi.findAll();
        res.json(dataprod);
    }
    catch (error) {
        res.json({ message: error.message });
    }
};
export const tambahProdiBaru = async (req, res) => {
    try {
        const dataprod = await Prodi.create(req.body);
        res.json({ message: "Prodi berhasil ditambahkan" });
    } catch (error) {
        res.json({ message: error.message });
    }
};
export const cariProdiByID = async (req, res) => {
    try {
            const dataprod = await Prodi.findAll({
                where: {
                    prodi_id: req.params.prodi_id,
                },
            });
            res.json(dataprod[0]);
        } catch (error) {
            res.json({ message: error.message });
        }
    };
export const updateProdi = async (req, res) => {
    try {
        const dataprod = await Prodi.update(req.body, {
            where: {
                prodi_id: req.params.prodi_id
            }
        });
        res.json({ message: "Prodi berhasil diupdate" });
    } catch (error) {
        res.json({ message: error.message });
    }
};
export const deleteProdi = async (req, res) => {
    try {
        const dataprod = await Prodi.destroy({
            where: {
                prodi_id: req.params.prodi_id
            }
        });
        res.json({ message: "Prodi berhasil dihapus", data: dataprod });
    }
    catch (error) {
        res.json({ message: error.message });
    }
};