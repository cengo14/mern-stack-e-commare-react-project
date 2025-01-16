import React, { useState } from "react";
import Input from "../components/Input";
import Button from "../components/Buttons/Button";
import { useDispatch } from "react-redux";
import { getReset } from "../redux/userSlice";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const ResetPassword = () => {
  const [password, setPassword] = useState();
  const { token } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const passwordReset = () => {
    dispatch(getReset({ token, password })).then(() => {
      toast.success("Şifreniz güncellenmiştir");
      navigate("/auth");
    });
  };
  return (
    <div className="flex h-[60vh] w-2/3 md:w-1/3 mx-auto justify-center items-center">
      <div className="flex flex-col gap-10 p-10  bg-gray-100 shadow hover:shadow-md rounded-lg">
        <h2 className="text-lg font-mono">Lütfen yeni şifrenizi giriniz</h2>
        <div>
          <Input
            design={"w-full"}
            placeholder={"Şifre"}
            onChange={(e) => setPassword(e.target.value)}
            name={"password"}
            id={""}
            type={"password"}
            value={password}
          />
          <Button
            text={"Değiştir"}
            design={"bg-black text-white hover:bg-gray-800 w-full mt-4"}
            buttonFunc={passwordReset}
          />
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
