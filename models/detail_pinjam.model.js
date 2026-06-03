import {Sequelize} from "sequelize";  
import db from "../config/db.config.js";
import ref_buku from "./buku.model.js";
import pinjam_buku from "./pinjam.model.js";

const { DataTypes } = Sequelize;
const detail_pinjam = db.define(
    "detail_pinjams",
    {
        id: {
            type: DataTypes.INTEGER,
            autoincrement: true,
            primaryKey: true,
        },
        pinjam_id: {
            type: DataTypes.INTEGER,
        },
        buku_id: {
            type: DataTypes.INTEGER,
        },
        jml_pinjam: {
            type: DataTypes.INTEGER,
        },
        status: {
            type: DataTypes.INTEGER,
        },
        created_at: {
            type: DataTypes.DATE,
        },
        update_at: {
            type: DataTypes.DATE
        },  
    }, 
    {
        freezeTableName: true,
    }
);

ref_buku.hasMany(detail_pinjam, { foreignKey: "buku_id" });
detail_pinjam.belongsTo(ref_buku, {foreignKey: "buku_id" });

pinjam_buku.hasMany(detail_pinjam, { foreignKey: "pinjam_id" });
detail_pinjam.belongsTo(pinjam_buku, { foreignKey: "pinjam_id" });

export default detail_pinjam;