import {Sequelize} from "sequelize";  
import db from "../config/db.config.js";
import ref_mahasiswa from "./mahasiswa.model.js";

const { DataTypes } = Sequelize;
const tabel_pinjam = db.define(
    "tabel_pinjams",
    {
        pinjam_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        tanggal_pinjam: {
            type: DataTypes.DATE,
        },
        tanggal_kembali: {
            type: DataTypes.DATE,
        },
        nim: {
            type: DataTypes.INTEGER,
        },
       pegawai_id: { 
            type: DataTypes.INTEGER,
        },
        created_at: {
            type: DataTypes.DATE
        },
        update_at: {
            type: DataTypes.DATE
        }
        },
        {
                freezeTableName: true,
        }

);
ref_mahasiswa.hasMany(tabel_pinjam, { foreignKey: 'nim' });
tabel_pinjam.belongsTo(ref_mahasiswa, { foreignKey: 'nim' });


export default tabel_pinjam;