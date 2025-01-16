const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const db = require('./config/db.js');
const product = require('./routes/product.js');
const cloudinary = require('cloudinary').v2;
const user = require('./routes/user.js');



dotenv.config()

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
})


const app = express()
app.use(cors({
    origin: "http://localhost:5173", // Frontend'in adresi
    credentials: true
}))
app.use(express.json({ limit: "10mb" }))
app.use(express.urlencoded({ extended: true, limit: "10mb" }))
app.use(cookieParser())

app.use('/', product)
app.use('/', user)

db()

const PORT = process.env.PORT || 3094
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);

})