import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import PageContainer from "../container/PageContainer";
import CartProduct from "../components/cartProduct";
import Loader from "../components/loading";
import Button from "../components/Buttons/Button";
import { clearCart } from "../redux/cartSlice";

const Cart = () => {
  const token = localStorage.getItem("token");
  const { cart, loading } = useSelector((store) => store.cart);
  const dispatch = useDispatch();

  const totalPrice = cart.reduce(
    (total, item) => total + item.quantity * item.price,
    0
  );
  const handleClearCart = () => {
    dispatch(clearCart());
  };

  if (!token) return <Navigate to={"/"} />;
  return (
    <PageContainer>
      {loading ? (
        <Loader />
      ) : cart.length > 0 ? (
        <div className="flex max-md:flex-col">
          <div className="space-y-2 md:w-3/4">
            {cart?.map((item, i) => (
              <CartProduct item={item} key={i} />
            ))}
          </div>
          <div className="mt-5 flex md:flex-col justify-start md:gap-10 max-md:justify-between items-center md:w-1/4">
            <div>
              <p className="md:text-xl">Toplam Ödenecek Tutar</p>
              <p className="text-2xl font-bold font-mono md:text-5xl">
                {totalPrice.toFixed(2)}₺
              </p>
              <p className="text-sm">Fiyatlara KDV dahildir</p>
            </div>
            <div></div>
            <div className="md:flex flex-col gap-2">
              <Button
                design={"bg-green-500 text-white"}
                text={"Sepeti Onayla"}
                buttonFunc={handleClearCart}
              />
              <Button
                design={"bg-red-500 text-white"}
                text={"Sepeti Temizle"}
                buttonFunc={handleClearCart}
              />
            </div>
          </div>
        </div>
      ) : (
        <h1 className="text-center mt-20 text-2xl font-semibold">
          Sepetiniz boş
        </h1>
      )}
    </PageContainer>
  );
};

export default Cart;
