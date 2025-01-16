import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import {
  addAdminProduct,
  deleteAdminProduct,
  getAdminProduct,
  updateAdminProduct,
} from "../redux/productSlice";
import Loader from "../components/loading";
import PageContainer from "../container/PageContainer";
import ProductCard from "../components/Home/ProductCard";
import Button from "../components/Buttons/Button";
import Modal from "../components/modal";
import { openModalFunc } from "../redux/generalSlice";
import Input from "./../components/Input/index";
import { categoryList } from "../utils/constant";
import { GrDocumentUpload } from "react-icons/gr";
import { toast } from "react-toastify";

const AdminPanel = ({ isAdmin }) => {
  const [data, setData] = useState({
    name: "",
    description: "",
    price: null,
    rating: null,
    stock: null,
    category: "",
    images: [],
    reviews: [],
  });
  const [isEdit, setIsEdit] = useState(false);
  const [preview, setPreview] = useState([]);
  const dispatch = useDispatch();
  const { adminProducts, loading } = useSelector((store) => store.products);
  const { openModal, productToUpdate } = useSelector((store) => store.general);
  useEffect(() => {
    dispatch(getAdminProduct());
  }, [dispatch]);
  useEffect(() => {
    if (isEdit && productToUpdate) {
      setData({
        _id: productToUpdate._id,
        name: productToUpdate.name,
        description: productToUpdate.description,
        price: productToUpdate.price,
        rating: productToUpdate.rating,
        stock: productToUpdate.stock,
        category: productToUpdate.category,
        images: productToUpdate.images,
        reviews: [],
      });
    }
  }, [isEdit, productToUpdate]);
  const addProductModal = () => {
    dispatch(openModalFunc());
  };
  const close = () => {
    setIsEdit(false);
    dispatch(openModalFunc(false));
    setData({
      name: "",
      description: "",
      price: null,
      rating: null,
      stock: null,
      category: "",
      images: [],
      reviews: [],
    });
  };
  const handleProduct = async (e) => {
    if (e.target.name === "images") {
      const files = Array.from(e.target.files);
      const imagesArray = await Promise.all(
        files.map((file) => {
          return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result);

            reader.onerror = (error) => reject(error);
            reader.readAsDataURL(file); // Dosyayı base64 olarak oku
          });
        })
      );
      setPreview(imagesArray);
      setData((prev) => ({ ...prev, images: imagesArray }));
    } else {
      setData((prev) => ({
        ...prev,
        [e.target.name]: e.target.value,
      }));
    }
  };

  const token = localStorage.getItem("token");
  const { user } = useSelector((store) => store.user);
  if (user.role !== "admin" && !token && !isAdmin) return <Navigate to={"/"} />;
  if (loading) return <Loader />;

  const content = (
    <div className="my-2 flex flex-col gap-5">
      <div className="flex items-center  gap-10">
        <Input
          onChange={handleProduct}
          design={"w-1/2"}
          name={"name"}
          id={""}
          placeholder={"Ürün adı"}
          type={"text"}
          value={data.name}
        />
        <select
          name="category"
          onChange={handleProduct}
          className="p-2 outline-none rounded-md border w-1/2"
          value={data.category}
        >
          <option value="">Kategoriler</option>
          {categoryList.map((category, i) => (
            <option key={i} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>
      <Input
        onChange={handleProduct}
        name={"description"}
        design={"w-full"}
        id={""}
        placeholder={"Ürün açıklaması"}
        type={"text"}
        value={data.description}
      />
      <div className="flex items-center">
        <div className="w-1/2 space-y-5">
          <Input
            onChange={handleProduct}
            design={"w-full"}
            name={"price"}
            id={""}
            placeholder={"Ürün Fiyatı"}
            type={"number"}
            value={data.price}
          />
          <Input
            onChange={handleProduct}
            design={"w-full"}
            name={"stock"}
            id={""}
            placeholder={"Stok Bilgisi"}
            type={"number"}
            value={data.stock}
          />
          <Input
            onChange={handleProduct}
            design={"w-full"}
            name={"rating"}
            id={""}
            placeholder={"Ürün Puanı"}
            type={"number"}
            value={data.rating}
          />
        </div>
        <div className="w-1/2 ps-10 flex justify-center items-center">
          {isEdit && (
            <div className="w-1/2 flex flex-col gap-2">
              {preview.length > 0
                ? preview.map((image) => (
                    <img
                      className="size-12"
                      src={image}
                      alt={image.public_id}
                    />
                  ))
                : productToUpdate?.images?.map((image) => (
                    <img
                      className="size-12"
                      src={image.url}
                      alt={image.public_id}
                    />
                  ))}
            </div>
          )}
          <div className="w-1/2">
            <label className="cursor-pointer" htmlFor="images">
              <GrDocumentUpload size={40} />
            </label>
            <Input
              onChange={handleProduct}
              design={"hidden"}
              name={"images"}
              id={"images"}
              type={"file"}
              multiple
              accept={"image/*"}
            />
          </div>
        </div>
      </div>
    </div>
  );
  const handleProductAdd = () => {
    dispatch(addAdminProduct(data)).then(() => dispatch(getAdminProduct()));
    dispatch(openModalFunc(false));
  };
  const handleProductUpdate = () => {
    dispatch(updateAdminProduct(data))
      .then(() => {
        toast.success("Ürün güncellendi");
        dispatch(getAdminProduct());
      })
      .catch((err) => toast.error("Hata", err));
    dispatch(openModalFunc(false));
  };
  const handleProductDelete = (id) => {
    dispatch(deleteAdminProduct(id))
      .then((res) => {
        toast.success("Ürün silme işlemi başarılı");
        dispatch(getAdminProduct());
      })
      .catch((err) => toast.error("Bir hata oluştu", err.message));
  };

  return (
    <PageContainer>
      <Button
        buttonFunc={addProductModal}
        design={"bg-black hover:bg-black/80 text-white"}
        text={"Yeni Ürün Ekle"}
      />
      {openModal && (
        <Modal
          title={isEdit ? "Ürünü Güncelle" : "Ürün Ekle"}
          close={close}
          content={content}
          handleProductAdd={isEdit ? handleProductUpdate : handleProductAdd}
        />
      )}
      {adminProducts?.products && (
        <div className="flex items-center justify-start gap-5 my-5 flex-wrap">
          {adminProducts?.products?.map((product, i) => (
            <ProductCard
              deleteProduct={handleProductDelete}
              key={i}
              product={product}
              isAdmin={isAdmin}
              edit={setIsEdit}
            />
          ))}
        </div>
      )}
    </PageContainer>
  );
};

export default AdminPanel;
