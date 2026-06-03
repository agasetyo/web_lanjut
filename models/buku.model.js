import { Sequelize } from "sequelize";
import db from "../config/db.config.js";
import pinjam_buku from "./pinjam.model.js"

const { DataTypes } = Sequelize;
const Buku = db.define(
    "Bukus",
    {
        buku_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        judul: {
            type: DataTypes.STRING,
        },
        tahun_terbit: {
            type: DataTypes.INTEGER,
        },
        jumlah: {
            type: DataTypes.INTEGER,
        },
        pengarang_id: {
            type: DataTypes.INTEGER,
        },
        penerbit_id: {
            type: DataTypes.INTEGER,
        },
        rak_kode_rak: {
            type: DataTypes.INTEGER,
        },
        created_at: {
            type: DataTypes.DATE,
        },
        update_at: {
            type: DataTypes.DATE,
        },
     },
    {
        freezeTableName: true,
    }
);


export default Buku;