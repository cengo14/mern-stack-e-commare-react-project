import React, { useState } from "react";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../redux/cartSlice";
import Button from "../Buttons/Button";
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";

import { openModalFunc, setProductToUpdate } from "../../redux/generalSlice";

const ProductCard = ({ product, isAdmin, deleteProduct, edit }) => {
  const settings = {
    infinite: true,
    speed: 500,
    autoplay: true,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const dispatch = useDispatch();
  const addToBasket = () => {
    const data = {
      id: product._id,
      quantity: 1,
      name: product.name,
      price: product.price,
      img: product.images[0].url,
    };
    dispatch(addToCart(data)).then(() => toast.success("Ürün sepete eklendi"));
  };
  const handleUpdateClick = () => {
    dispatch(setProductToUpdate(product)); // Güncellemek istediğiniz ürünü store'a gönderiyorsunuz
    dispatch(openModalFunc(true));
    edit(true); // Modal'ı açıyorsunuz
  };

  return (
    <div className="w-[320px] max-sm:mx-auto h-92 sm:w-60 md:w-72 bg-gray-50 p-3 flex flex-col gap-1 rounded-2xl shadow hover:shadow-md">
      <Slider {...settings}>
        {product.images &&
          product.images.map((img, i) => (
            <img
              key={i}
              src={img.url}
              alt={img.public_id}
              className="size-24 md:size-48 object-cover rounded-md"
            />
          ))}
      </Slider>
      <div className="flex flex-col gap-4">
        <div className="flex flex-row justify-between">
          <div className="flex flex-col h-16">
            <span className="text-xl  font-bold">{product.name}</span>
            <p className="text-xs text-gray-700">{product.category}</p>
          </div>
          <span className="font-bold  text-red-600">{product.price}₺</span>
        </div>
        {isAdmin ? (
          <div className="flex items-center justify-around">
            <Button
              text={<FaRegEdit className="text-3xl text-white" />}
              buttonFunc={handleUpdateClick}
              design={
                "bg-blue-500 hover:bg-blue-600 text-white text-lg font-bold "
              }
            />
            <Button
              text={<MdDeleteForever className="text-3xl text-white" />}
              buttonFunc={() => deleteProduct(product._id)}
              design={
                "bg-red-500 hover:bg-red-600 text-white text-lg font-bold "
              }
            />
          </div>
        ) : (
          <div className="flex items-center justify-around">
            <Link
              to={`/products/${product._id}`}
              className="hover:bg-orange-700 text-white text-lg font-bold  bg-orange-800 p-2 text-center rounded-3xl"
            >
              Detayları gör
            </Link>
            <Button
              text={"Satın Al"}
              buttonFunc={addToBasket}
              design={
                "bg-black hover:bg-black/80 text-white text-lg font-bold "
              }
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
