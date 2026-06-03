import express from "express";
import { 
tambahuser, 
loginuser
} from "../controllers/user_controllers.js";
import { authenticateToken } from "../middleware/VerifyToken.js";

const routerUser = express.Router();
routerUser.post("/", tambahuser);
routerUser.post("/login", loginuser);
routerUser.get("/dashboard", authenticateToken, (req, res) => {
    res.send("Selamat datang di Dashboard");
});

export default routerUser;