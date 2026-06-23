import { Sequelize } from "sequelize";
import mysql2 from "mysql2";

const db = new Sequelize(process.env.database_url,{
    dialect : "mysql",
    dialectModule : mysql2,
    dialectOptions: {
        ssl: {
            rejectUnauthorized: false
        }
    },
    "define": {
        "timestamps": false
   }
});
export default db;

// (async()=>{
//      await db.sync();
// })();
