import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import Header from "./layout/Header";
import Footer from "./layout/Footer";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import DetailProduct from "./pages/DetailProduct";
import Products from "./pages/Products";
import Auth from "./pages/Auth";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { getProfile } from "./redux/userSlice";
import Profile from "./pages/Profile";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Cart from "./pages/Cart";
import AdminPanel from "./pages/AdminPanel";

const App = () => {
  const dispatch = useDispatch();
  const { user, isAuth } = useSelector((store) => store.user);
  const token = localStorage.getItem("token");
  useEffect(() => {
    if (token && !isAuth) {
      dispatch(getProfile(token)); // Eğer token varsa profil verisini al
    }
  }, [dispatch, token, isAuth]);

  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col">
        <Header user={user.user} isAuth={isAuth} />
        <div className="flex-1 bg-gray-50 mt-[72px]">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/products" element={<Products />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/admin" element={<AdminPanel isAdmin={true} />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/forgot" element={<ForgotPassword />} />
            <Route path="//reset/:token" element={<ResetPassword />} />
            <Route path="/products/:id" element={<DetailProduct />} />
          </Routes>
        </div>
        <Footer />
        <ToastContainer position="bottom-right" />
      </div>
    </BrowserRouter>
  );
};

export default App;
