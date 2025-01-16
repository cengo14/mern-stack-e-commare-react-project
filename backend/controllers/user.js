const User = require("../models/user.js")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const cloudinary = require("cloudinary").v2
const crypto = require("crypto")
const nodemailer = require("nodemailer")


const register = async (req, res) => {
    try {
        const defaultAvatar = {
            public_id: "default_avatar",
            url: "https://res.cloudinary.com/dn1lzcvrr/image/upload/v1736109759/user-avatar_jvilcg.png"
        };

        let avatar;

        if (!req.body.avatar) {
            avatar = defaultAvatar; // Varsayılan avatar kullanılıyor
        } else {
            avatar = await cloudinary.uploader.upload(req.body.avatar, {
                folder: "avatars",
                width: 140,
                crop: "scale"
            });
        }

        const { name, email, password } = req.body;

        // Kullanıcı zaten varsa
        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: "Bu kullanıcı zaten var" });
        }

        // Email doğrulama
        const validateEmail = (email) => {
            const emailRegex = /^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}$/;
            return emailRegex.test(email);
        };

        if (!validateEmail(email)) {
            return res.status(400).json({ message: "Geçersiz email" });
        }

        // Şifre uzunluğu kontrolü
        if (password.length < 6) {
            return res.status(400).json({ message: "Şifre en az 6 karakter olmalıdır" });
        }

        // Şifreyi hashle
        const passwordHash = await bcrypt.hash(password, 10);

        // Yeni kullanıcı oluştur
        const newUser = new user({
            name,
            email,
            password: passwordHash,
            avatar: { public_id: avatar.public_id, url: avatar.url }  // avatar.url doğru şekilde kullanılıyor
        });

        // Veritabanına kaydet
        await newUser.save();

        // Token oluştur
        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: "30d" });

        // Yanıt döndür
        res.status(201).json({ user: newUser, token, message: "Kullanıcı başarıyla oluşturuldu" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Sunucu hatası", error: error.message });
    }
};



const login = async (req, res) => {
    const { email, password } = req.body;

    // Alan kontrolü
    if (!email || !password) {
        return res.status(400).json({ message: "Lütfen tüm alanları doldurun" });
    }

    // Kullanıcı kontrolü
    const user = await User.findOne({ email });
    if (!user) {
        return res.status(400).json({ message: "Kullanıcı bulunamadı" });
    }

    // Şifre doğrulama
    const passwordCorrect = await bcrypt.compare(password, user.password);
    if (!passwordCorrect) {
        return res.status(400).json({ message: "Hatalı şifre" });
    }

    // Token oluşturma
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "30d" });

    // Başarı yanıtı
    return res.status(200).json({ message: "Giriş başarılı", user: user, token });
};


const logout = async (req, res) => {
    // Logout işlemi frontend'de yapılacak, backend'de herhangi bir işlem yapılmasına gerek yok
    res.status(200).json({ message: "Çıkış başarılı" });
};

const forgotPassword = async (req, res) => {
    const { email } = req.body
    const user = await User.findOne({ email })
    if (!user) {
        res.status(404).json({ message: "Kullanıcı bulunamadı" })
    }
    const resetToken = crypto.randomBytes(20).toString("hex")
    user.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex")
    user.resetPasswordExpire = Date.now() + 30 * 60 * 1000

    await user.save({ validateBeforeSave: false })
    const passwordResetUrl = `${req.protocol}://localhost:5173/reset/${resetToken}`
    const message = "Şifrenizi sıfırlamak için aşağıdaki linke tıklayın\n\n" + passwordResetUrl
    try {
        const transporter = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: "5d7fd294491b05",
                pass: "a3e616cc091856"
            }
        })
        const mailData = {
            from: process.env.SMTP_EMAIL,
            to: email,
            subject: "Şifre Sıfırlama",
            text: message
        }
        await transporter.sendMail(mailData)
        res.status(200).json({ message: "Email gönderildi" })
    } catch (error) {
        user.resetPasswordToken = undefined
        user.resetPasswordExpire = undefined
        await user.save({ validateBeforeSave: false })
        res.status(500).json({ message: "Email gönderilemedi" })
    }


}
const resetPassword = async (req, res) => {
    const { token } = req.params
    const { password } = req.body
    const resetPasswordToken = crypto.createHash("sha256").update(token).digest("hex")
    const user = await User.findOne({ resetPasswordToken, resetPasswordExpire: { $gt: Date.now() } })

    user.password = await bcrypt.hash(password, 10)
    user.resetPasswordToken = undefined
    user.resetPasswordExpire = undefined
    await user.save()
    const newToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "30d" })
    const cookieOptions = {
        httpOnly: true,
        expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),

    }
    res.status(200).cookie("token", newToken, cookieOptions).json({ message: "Şifre sıfırlandı" })

}

const userDetail = async (req, res, next) => {
    const user = await User.findById(req.user._id)
    if (!user) {
        res.status(404).json({ message: "Kullanıcı bulunamadı" })
    }
    res.status(200).json({ user })
}

module.exports = { register, login, logout, forgotPassword, resetPassword, userDetail }