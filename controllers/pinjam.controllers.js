import pinjam from "../models/pinjam.model.js";
import { Sequelize } from "sequelize";
import ref_mahasiswa from "../models/mahasiswa.model.js";
import buku from "../models/buku.model.js"; 
import detail_pinjam from "../models/detail_pinjam.model.js"; // jika butuh data jumlah


            

export const getAllpinjam = async (req, res) => {
    try {
        const datapinjam = await pinjam.findAll();
        res.json(datapinjam);
    }
    catch (error) {
        res.json({ message: error.message });
    }
};
export const tambahpinjamBaru = async (req, res) => {
    try {
        const datapinjam = await pinjam.create({
            tanggal_pinjam: req.body.tanggal_pinjam,
            tanggal_kembali: req.body.tanggal_kembali,
            nim: req.body.nim,
            pegawai_id: req.body.pegawai_id
        });
 for (const item of req.body.detail_buku) {

            // ======================
            // INSERT DETAIL PINJAM
            // ======================

            await detail_pinjam.create({

                pinjam_id: datapinjam.pinjam_id,
                buku_id: item.buku_id,
                jml_pinjam: item.jml_pinjam,
                status: 1

            });
              await buku.decrement('jumlah', {
                by: item.jml_pinjam,
                where: {
                    buku_id: item.buku_id
                }

            });

        }

        res.json({ message: "pinjam berhasil ditambahkan" });
    } catch (error) {
        res.json({ message: error.message });
    }
};
export const caripinjamByID = async (req, res) => {
    try {
            const datapinjam = await pinjam.findAll({
                where: {
                    id: req.params.pinjam_id,
                },
            });
            res.json(datapinjam[0]);
        }
        catch (error) {
            res.json({ message: error.message });
        }
    };
export const updatepinjam = async (req, res) => {
    try {
        const datapinjam = await pinjam.update(req.body, {
            where: {
                id: req.params.pinjam_id
            }
        });
        res.json({ message: "pinjam berhasil diupdate" });
    } catch (error) {
        res.json({ message: error.message });
    }       
};
export const deletepinjam = async (req, res) => {
    try {
        const datapinjam = await pinjam.destroy({
            where: {
                id: req.params.pinjam_id
            }
        });
        res.json({ message: "pinjam berhasil dihapus" });
    } catch (error) {
        res.json({ message: error.message });
    }
};