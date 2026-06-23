import { Sequelize } from "sequelize";
import mysql2 from "mysql2";

<<<<<<< HEAD
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
=======
const db = new Sequelize('matkul_web_lanjut', 'root', '',{
    host :"localhost",
    dialect : "mysql",
    "define": {
        "timestamps": false
    }
});
export default db;

(async()=>{
    await db.sync();
})();
>>>>>>> 5de5b1ef5b71941e13a15f1b57a26377eab18028
