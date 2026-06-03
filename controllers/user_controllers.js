import user from "../models/user_model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user_model.js";

export const tambahuser =  async (req, res) => {
    try {
        console.log(req.body);
        const { username, password } = req.body;
        // hash password
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ username: username, password: hashedPassword});
        res.json(user);
}   catch (error) {
    res.json({message: error.message});
}
};

export const loginuser = async (req, res) => {
    try {
        const { username, password } = req.body;
        const login = await User.findAll ({
            where: {
                username: username
            }
        });
        if (login.length === 0) return res.status(404).send("User");
        const user = login[0];
        //verifikasi password
        const match = await bcrypt.compare(password, user.password);
        if (!match) return res.status(401).send("Invalid Credentials");
        //generate token
        const token = jwt.sign({ id: user.id }, "dmafkrr84h52v85793vn7tvb39ber345bv8346sajdd8a", { expiresIn: "1h"});
        res.json({ token });
    } catch (error) {
        res.json({ message: error.message });
    }
};
