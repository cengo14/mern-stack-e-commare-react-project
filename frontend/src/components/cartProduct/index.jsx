import React from "react";
import Button from "../Buttons/Button";
import { useDispatch } from "react-redux";
import { removeFromCart } from "../../redux/cartSlice";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const CartProduct = ({ item }) => {
  const dispatch = useDispatch();
  const total = item.price * item.quantity;
  const handleDelete = () => {
    dispatch(removeFromCart(item.id))
      .then(() => toast.info("Ürün sepetten kaldırıldı"))
      .catch((err) => toast.error("Hata" + err));
  };
  return (
    <div className="w-full flex justify-between items-center border rounded-2xl px-5 bg-white shadow hover:shadow-md">
      <Link to={`/products/${item.id}`} className=" my-2">
        <img
          src={item?.img}
          alt={item?.name}
          className="size-36 object-fill rounded-2xl"
        />
      </Link>
      <div className="ms-2 text-xl font-semibold w-48">{item?.name}</div>
      <div className="flex flex-col justify-center items-startr">
        <p className="font-mono">
          <span>Fiyat: </span>
          <span>{item?.price}₺</span>
        </p>
        <p className="font-mono">
          <span>{item?.quantity}</span> Adet
        </p>
        <p className="font-mono text-lg font-bold">
          <span>Toplam </span>
          <span>{total}₺</span>
        </p>
      </div>
      <div>
        <Button
          design={"bg-red-500 text-white"}
          text={"Sil"}
          buttonFunc={handleDelete}
        />
      </div>
    </div>
  );
};

export default CartProduct;
