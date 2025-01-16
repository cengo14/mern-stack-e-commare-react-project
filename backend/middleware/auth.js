const User = require('../models/user.js');
const jwt = require('jsonwebtoken');
const authenticationMid = async (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];  // Authorization: Bearer <token>

    if (!token) {
        return res.status(401).json({ message: "Erişim için giriş yapmalısınız" });
    }

    try {
        const decodedData = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decodedData.id);
        next();
    } catch (error) {
        return res.status(401).json({ message: "Geçersiz token" });
    }
};


const isAdmin = (req, res, next) => {
    console.log("Kullanıcı verisi:", req.user);

    if (req.user.role !== "admin") {
        return res.status(403).json({ message: "Bu işlemi yapmaya yetkiniz yok" });
    }
    next();
}


module.exports = { authenticationMid, isAdmin };