import { Sequelize } from "sequelize";
import db from "../config/db.config.js";

const { DataTypes } = Sequelize;
const Prodi = db.define(
    "prodis",
    {
        prodi_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        nama_prodi: {
            type: DataTypes.STRING,
        },
        singkatan: {
            type: DataTypes.STRING,
        },
        created_at: {
            type: DataTypes.DATE,
    },
    update_at: {
        type: DataTypes.DATE,
    }
     },
    {
        freezeTableName: true,
    }
);
export default Prodi;