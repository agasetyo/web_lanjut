import jwt from "jsonwebtoken";

export const authenticateToken = (req, res, next) => { 
    const token = req.headers["authorization"];
    if (!token) return res.status(401).send("Access denied");
    try {
        const verified = jwt.verify(token,"dmafkrr84h52v85793vn7tvb39ber345bv8346sajdd8a");
        req.user = verified;
        next();
    } catch (err) {
        res.status(400).send("Invalid Token");
    }
};