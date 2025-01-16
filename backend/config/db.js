const mongoose = require('mongoose');

const db = () => {
    mongoose.connect("mongodb+srv://cengoaydemir14:aydemir14@cluster1.iibrv.mongodb.net/", {

    }).then(() => {
        console.log("Database connected successfully")
    }).catch((err) => {
        console.log("Database connection failed", err)
    })
}

module.exports = db;