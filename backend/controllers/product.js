const Products = require("../models/product.js");
const ProductFilter = require("../utils/productFilter.js");
const cloudinary = require("cloudinary").v2;
const mongoose = require('mongoose')



const allProducts = async (req, res) => {
    console.log("Keyword from Frontend:", req.query.keyword);

    const productFilter = new ProductFilter(Products.find(), req.query)
        .search()
        .filter()
    const products = await productFilter.query;
    console.log("Filtered Products:", products);

    res.status(200).json({ products });
};

const adminProducts = async (req, res) => {
    const products = await Products.find();
    res.status(200).json({ products });
};

const detailProduct = async (req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).json({ error: "Geçersiz ürün ID'si" });
    }
    const product = await Products.findById(req.params.id);
    if (!product) {
        return res.status(404).json({ message: "Ürün bulunamadı" });
    }
    res.status(200).json({ product });
};

const createProduct = async (req, res) => {


    let images = [];
    if (typeof req.body.images === "string") {
        images.push(req.body.images);
    } else {
        images = req.body.images;
    }

    const allImage = [];
    for (let i = 0; i < images.length; i++) {
        const result = await cloudinary.uploader.upload(images[i], {
            folder: "products",
        });
        allImage.push({
            public_id: result.public_id,
            url: result.secure_url,
        });
    }
    req.body.images = allImage;
    req.body.user = req.user._id;

    const products = await Products.create(req.body);
    res.status(201).json({ products });
};

const deleteProduct = async (req, res) => {
    const product = await Products.findById(req.params.id);
    if (!product) {
        return res.status(404).json({ message: "Ürün bulunamadı" });
    }
    if (product.images && product.images.length > 0) {
        for (let i = 0; i < product.images.length; i++) {
            await cloudinary.uploader.destroy(product.images[i].public_id);
        }
    }

    await Products.deleteOne({ _id: req.params.id });
    res.status(200).json({ id: product._id, message: "Ürün silme işlemi başarılı" });
};

const updateProduct = async (req, res) => {


    let product = await Products.findById(req.params.id);
    if (!product) {
        return res.status(404).json({ message: "Ürün bulunamadı" });
    }

    let images = [];
    if (typeof req.body.images === "string") {
        images.push(req.body.images);
    } else {
        images = req.body.images;
    }

    if (images.length > 0) {
        for (let i = 0; i < product.images.length; i++) {
            await cloudinary.uploader.destroy(product.images[i].public_id);
        }

        const allImage = [];
        for (let i = 0; i < images.length; i++) {
            const result = await cloudinary.uploader.upload(images[i], {
                folder: "products",
            });
            allImage.push({
                public_id: result.public_id,
                url: result.secure_url,
            });
        }
        req.body.images = allImage;
    }

    product = await Products.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
    });

    res.status(200).json({ product });
};

const createReview = async (req, res) => {
    const { rating, comment, productId } = req.body;
    const product = await Products.findById(productId);

    if (!product) {
        return res.status(404).json({ message: "Ürün bulunamadı" });
    }

    const alreadyReviewed = product.reviews.find(
        (r) => r.user.toString() === req.user._id.toString()
    );

    if (alreadyReviewed) {
        return res.status(400).json({ message: "Ürün zaten yorumlandı" });
    }

    const review = {
        name: req.user.name,
        rating: Number(rating),
        comment,
        user: req.user._id,
    };

    product.reviews.push(review);
    product.numReviews = product.reviews.length;
    product.rating =
        product.reviews.reduce((acc, item) => item.rating + acc, 0) /
        product.reviews.length;

    await product.save({ validateBeforeSave: false });
    res.status(201).json({ message: "Yorum eklendi" });
};

module.exports = {
    allProducts,
    adminProducts,
    detailProduct,
    createProduct,
    deleteProduct,
    updateProduct,
    createReview,
};
