import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoCartOutline } from "react-icons/io5";
import { CiSearch, CiUser } from "react-icons/ci";
import { menuItems } from "../utils/constant";
import { RxHamburgerMenu } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { getKeyword, setSignUp } from "../redux/generalSlice";
import LeftMenu from "./../components/offcanvas/index";

const Header = ({ user, isAuth }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const [keyword, setKeyword] = useState("");
  const { cart } = useSelector((store) => store.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleClick = () => {
    dispatch(getKeyword(keyword));
    setKeyword("");
    navigate("/products");
  };
  const logoutFunc = (name) => {
    if (name === "Çıkış") {
      localStorage.removeItem("token");
      localStorage.removeItem("cart");
      setIsOpen(false);
      windows.location = "/";
    }
    setIsOpen(false);
  };
  return (
    <div className={`bg-gray-100 shadow-md fixed top-0 w-full z-40`}>
      <div
        className={`min-h-screen fixed  top-[72px] ${
          openMenu &&
          "backdrop-blur-sm bg-black/25 overflow-y-hidden w-full md:hidden"
        }`}
      >
        <LeftMenu
          openMenu={openMenu}
          isAuth={isAuth}
          close={() => setOpenMenu(false)}
        />
      </div>
      <div className="w-10/12 py-2 flex items-center justify-between mx-auto ">
        <div className="flex gap-2 items-center">
          <button className="p-1 border border-gray-100 hover:border-gray-700 rounded-lg md:hidden">
            <RxHamburgerMenu
              onClick={() => setOpenMenu(!openMenu)}
              size={40}
              className=" hover:text-gray-700 cursor-pointer "
            />
          </button>

          <Link to={"/"}>
            <img src="/E-logo.png" alt="logo" className="size-14" />
          </Link>
        </div>

        <nav className={`flex gap-5 max-md:hidden`}>
          <Link
            to="/"
            className="p-2 rounded-md hover:scale-105 transition-transform hover:bg-orange-600 hover:text-white"
          >
            Anasayfa
          </Link>
          <Link
            to="/products"
            className="p-2 rounded-md hover:scale-105 transition-transform hover:bg-orange-600 hover:text-white"
          >
            Ürünler
          </Link>
          <Link
            to="/about"
            className="p-2 rounded-md hover:scale-105 transition-transform hover:bg-orange-600 hover:text-white"
          >
            Hakkımızda
          </Link>
          <Link
            to="/contact"
            className="p-2 rounded-md hover:scale-105 transition-transform hover:bg-orange-600 hover:text-white"
          >
            İletişim
          </Link>
        </nav>

        <div className="flex gap-5 items-center">
          <div className="group flex items-center gap-2 border-2 rounded-full py-2 px-4 hover:shadow-md hover:bg-orange-600 bg-white">
            <input
              onChange={(e) => setKeyword(e.target.value)}
              value={keyword}
              placeholder="Ara"
              className="bg-transparent  outline-none  w-20 sm:w-40 md:w-24 lg:w-32 placeholder:text-black group-hover:placeholder:text-white"
            />
            <button onClick={handleClick} className="group-hover:text-white">
              <CiSearch size={20} />
            </button>
          </div>

          {/* Giriş yap butonu kontrolü */}
          {!isAuth || !user ? (
            <div className="hidden md:flex">
              <Link
                onClick={() => dispatch(setSignUp(true))}
                className="p-2 rounded-md hover:scale-105 transition-transform hover:bg-orange-600 hover:text-white"
                to="/auth"
              >
                Kayıt Ol
              </Link>
              <Link
                onClick={() => dispatch(setSignUp(false))}
                className="p-2 rounded-md hover:scale-105 transition-transform hover:bg-orange-600 hover:text-white"
                to="/auth"
              >
                Giriş Yap
              </Link>
            </div>
          ) : (
            <div className="relative">
              <img
                onClick={() => setIsOpen(!isOpen)}
                src={user?.avatar?.url}
                alt="user-avatar"
                className="size-12 rounded-full cursor-pointer"
              />
              {isOpen && (
                <div className="absolute flex flex-col gap-2 w-40 bg-white p-4 rounded-md shadow-md top-12 -right-8 z-50">
                  <h1 className="text-xl font-semibold capitalize">
                    {user?.name}
                  </h1>
                  {menuItems
                    .filter((item) => !item.role || item.role === user.role) // Menü öğelerini filtrele
                    .map((item, i) => (
                      <Link
                        onClick={() => logoutFunc(item.name)}
                        to={item.url}
                        key={i}
                        className="flex items-center gap-2 p-2 rounded-md hover:scale-105 transition-transform hover:bg-orange-600 hover:text-white"
                      >
                        <span>{item.icon}</span>
                        <span>{item.name}</span>
                      </Link>
                    ))}
                </div>
              )}
            </div>
          )}

          <div className="relative">
            <Link to="/cart">
              <IoCartOutline size={30} className="text-amber-800" />
              <span className="absolute -top-3 -right-2 rounded-full bg-red-500 w-5 h-5 text-sm text-white flex items-center justify-center">
                {cart.length}
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
