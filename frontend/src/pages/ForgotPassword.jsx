import React, { useState } from "react";
import Input from "./../components/Input/index";
import Button from "./../components/Buttons/Button";
import { Navigate, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getForgot } from "../redux/userSlice";
import { toast } from "react-toastify";

const ForgotPassword = () => {
  const [email, setEmail] = useState();
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(getForgot(email)).then(() => {
      toast.success("Şifre sıfırlama maili gönderilmiştir");
    });
  };
  if (token) return <Navigate to={"/"} />;
  return (
    <div className="flex h-[60vh] w-2/3 md:w-1/3 mx-auto justify-center items-center">
      <div className="flex flex-col gap-10 p-10  bg-gray-100 shadow hover:shadow-md rounded-lg">
        <h2 className="text-lg font-mono">
          Şifrenizi sıfırlamak için kayıt olurken kullandığınız email adresinizi
          giriniz
        </h2>
        <div>
          <Input
            design={"w-full"}
            placeholder={"email"}
            onChange={(e) => setEmail(e.target.value)}
            name={"email"}
            id={""}
            type={"email"}
            value={email}
          />
          <Button
            text={"Sıfırla"}
            design={"bg-black text-white hover:bg-gray-800 w-full mt-4"}
            buttonFunc={handleClick}
          />
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
