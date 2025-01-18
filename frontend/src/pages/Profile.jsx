import React from "react";
import { useSelector } from "react-redux";
import PageContainer from "../container/PageContainer";
import Loader from "../components/loading";
import Button from "../components/Buttons/Button";
import { Navigate, useNavigate } from "react-router-dom";

const Profile = () => {
  const { user, isAuth, loading } = useSelector((store) => store.user);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  if (loading) return <Loader />;
  if (!isAuth) return <Navigate to="/" />;
  const buttonFunc = () => {};
  return (
    <PageContainer>
      <div className="border rounded-lg bg-gray-100 shadow hover:shadow-md min-h-[50vh] flex flex-col md:flex-row p-8">
        <div className="mx-auto flex flex-col md:flex-row items-center gap-5">
          <div>
            <img
              src={user.user.avatar.url}
              alt={user.user.avatar.public_id}
              className="size-40 md:size-72 rounded-full"
            />
          </div>
          <div>
            <p className="text-xl font-mono">
              <span className="">Hesap Adı:</span> <span>{user.user.name}</span>
            </p>
            <p className="text-xl font-mono">
              <span>Email: </span>
              <span>{user.user.email}</span>
            </p>
            <div className="mt-5 flex flex-col gap-2">
              <Button
                text={"Profili Güncelle"}
                design={"bg-black text-white hover:bg-gray-800"}
              />
              <Button
                text={"Şifre Güncelle"}
                design={"bg-black text-white hover:bg-gray-800"}
                buttonFunc={() => navigate(`/reset/${token}`)}
              />
              <Button
                text={"Adres Güncelle"}
                design={"bg-black text-white hover:bg-gray-800"}
              />
              <Button
                text={"Siparişleri Görüntüle"}
                design={"bg-black text-white hover:bg-gray-800"}
              />
            </div>
          </div>
        </div>
      </div>
    </PageContainer>
  );
};

export default Profile;
