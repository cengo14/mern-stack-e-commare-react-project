import React, { useState } from "react";
import Button from "../components/Buttons/Button";
import { useDispatch, useSelector } from "react-redux";
import { FaCloudUploadAlt } from "react-icons/fa";
import Input from "../components/Input";
import { getLogin, getRegister } from "./../redux/userSlice";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../components/loading";
import { Navigate } from "react-router-dom";
import { setSignUp } from "../redux/generalSlice";

const Auth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuth, loading } = useSelector((store) => store.user);
  const { signUp } = useSelector((store) => store.general);

  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    avatar: "",
  });
  const [preview, setPreview] = useState("/user-avatar.png");
  const handleChange = (e) => {
    if (e.target.name === "avatar") {
      const reader = new FileReader();

      // Dosya okuma tamamlandığında çalışır
      reader.onload = () => {
        if (reader.readyState === 2) {
          setData((prev) => ({ ...prev, avatar: reader.result }));
          setPreview(reader.result);
        }
      };

      // Dosyayı base64 formatında okumaya başlar
      reader.readAsDataURL(e.target.files[0]);
    } else {
      // Diğer input'lar için normal güncelleme
      setData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    }
  };

  const registerFunc = () => {
    dispatch(getRegister(data)).then(() => {
      setData({
        name: "",
        email: "",
        password: "",
        avatar: "",
      });
      setPreview("/user-avatar.png");
      dispatch(setSignUp(false));
    });
  };
  const loginFunc = () => {
    dispatch(getLogin(data));
  };

  if (isAuth) return <Navigate to="/" />;
  return loading ? (
    <Loader />
  ) : (
    <div className="mx-auto w-fit mt-20 flex gap-10 justify-center items-center p-5 bg-gray-100 shadow hover:shadow-md rounded-md">
      {signUp && (
        <img
          src={preview}
          alt="user-avatar"
          className="size-48 max-md:size-32 img-fluid rounded-full"
        />
      )}
      <div className="flex flex-col gap-5">
        <div className="text-2xl font-bold border-b-2 pb-2">
          {signUp ? "Üyelik Oluştur" : "Hesaba Gir"}
        </div>
        {signUp && (
          <Input
            onChange={handleChange}
            value={data.name}
            type="text"
            name="name"
            placeholder="İsim"
            id=""
          />
        )}
        <Input
          onChange={handleChange}
          value={data.email}
          type="email"
          name="email"
          placeholder="Email"
          id=""
        />
        <Input
          onChange={handleChange}
          value={data.password}
          type="password"
          name="password"
          placeholder="Şifre"
          id=""
        />
        {!signUp && (
          <Link to={"/forgot"} className="text-sm text-gray-500 text-end">
            Şifremi unuttum
          </Link>
        )}
        {signUp && (
          <div className="flex items-center justify-around gap-2">
            <input
              onChange={handleChange}
              type="file"
              name="avatar"
              id="avatar"
              className="hidden"
            />
            <label htmlFor="avatar" className="cursor-pointer">
              <FaCloudUploadAlt size={36} />
            </label>
          </div>
        )}
        <Button
          text={signUp ? "Kayıt Ol" : "Giriş Yap"}
          buttonFunc={signUp ? registerFunc : loginFunc}
          design={
            signUp
              ? "bg-red-500 hover:bg-red-600 text-white"
              : "bg-green-500 hover:bg-green-600 text-white"
          }
        />
        <p className="text-sm">
          {signUp ? "Zaten bir hesabınız varsa " : "Henüz üyeliğiniz yoksa "}{" "}
          <span
            onClick={() => dispatch(setSignUp(!signUp))}
            className="text-red-500 font-semibold cursor-pointer"
          >
            {signUp ? "giriş yapın " : "kayıt olun"}
          </span>
        </p>
      </div>
    </div>
  );
};

export default Auth;
