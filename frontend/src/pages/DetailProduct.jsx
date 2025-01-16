import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProductDetail } from "../redux/productSlice";
import Loader from "./../components/loading/index";
import PageContainer from "./../container/PageContainer";
import Slider from "react-slick";
import { SlLike } from "react-icons/sl";
import ReviewComp from "./../components/reviewComp/index";
import StarRatings from "react-star-ratings";

import Button from "../components/Buttons/Button";
import QuantityButton from "../components/Buttons/QuantityButton";
import { addToCart } from "../redux/cartSlice";
import { toast } from "react-toastify";

const DetailProduct = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { product, loading, error } = useSelector((store) => store.products);
  const [reviewOpen, setReviewOpen] = useState(false);
  const [quantity, setQuantityt] = useState(1);
  useEffect(() => {
    if (id) {
      dispatch(getProductDetail(id));
    }
  }, [dispatch, id]);
  const prodct = product.product;
  console.log(prodct);

  const settings = {
    infinite: true,
    speed: 500,
    autoplay: true,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  const decrement = () => {
    if (quantity > 1) {
      setQuantityt(quantity - 1);
    }
  };
  const increment = () => {
    if (quantity < prodct?.stock) {
      setQuantityt(quantity + 1);
    }
  };
  const addToBasket = () => {
    const data = {
      id: prodct._id,
      quantity: quantity,
      name: prodct.name,
      price: prodct.price,
      img: prodct.images[0].url,
    };
    dispatch(addToCart(data)).then(() => toast.success("Ürün sepete eklendi"));
  };

  return (
    <div>
      {loading ? (
        <Loader />
      ) : error ? (
        <h2>{error}</h2>
      ) : (
        <PageContainer>
          <div className="grid grid-cols-2 max-md:grid-cols-1 mt-5 ">
            <Slider
              {...settings}
              className="w-[420px] h-[420px] max-md:w-[200px] max-md:h-[200px] col-md-4 mx-auto "
            >
              {prodct?.images &&
                prodct?.images?.map((img, i) => (
                  <img
                    key={i}
                    src={img.url}
                    alt={img.public_id}
                    className="img-fluid object-cover rounded-lg"
                  />
                ))}
            </Slider>
            <div className="col-md-8 mt-10">
              <div className="flex items-center justify-between">
                <h2 className="text-lg md:text-4xl font-mono font-extrabold">
                  {prodct?.name}{" "}
                </h2>
                <p className="text-3xl max-md:text-lg  font-extrabold italic">
                  {prodct?.price}₺
                </p>
              </div>
              <span>{prodct?.category}</span>
              <div className="mt-6 px-4 py-6 border bg-gray-100 rounded-3xl shadow-sm flex flex-col gap-5">
                <span className="font-semibold text-xl  max-md:text-lg">
                  Ürün hakkında
                </span>
                <span>{prodct?.description}</span>
                <div
                  className={`flex ${
                    prodct?.stock ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {prodct?.stock
                    ? `Stokta ${prodct?.stock} adet mevcut`
                    : "Stok tükendi"}
                </div>
                <StarRatings
                  rating={prodct?.rating}
                  starRatedColor="gold"
                  numberOfStars={5}
                  starDimension="20px" // Yıldız boyutu
                  starSpacing="1px" // Yıldız arası boşluk
                  name="rating"
                />
              </div>

              <div className="flex mt-10">
                <Button
                  text={"Sepete Ekle"}
                  buttonFunc={addToBasket}
                  design={
                    "bg-black hover:bg-black/80 text-white text-lg font-bold w-8/12"
                  }
                />
                <QuantityButton
                  quantity={quantity}
                  increment={increment}
                  decrement={decrement}
                />
                <button className="py-2 px-4 w-2/12 border bg-white hover:bg-gray-50 hover:text-red-500 shadow-md  rounded-3xl text-lg flex justify-center items-center font-bold">
                  <SlLike />
                </button>
              </div>
              <div className=" px-4 py-2 border bg-gray-100 rounded-3xl my-5">
                {prodct?.reviews.length > 0 ? (
                  <div className="">
                    Ürün hakkında{" "}
                    <button
                      onClick={() => setReviewOpen(!reviewOpen)}
                      className="font-semibold"
                    >
                      {prodct?.reviews.length} yorum
                    </button>{" "}
                    bulundu
                  </div>
                ) : (
                  "Ürün için henüz bir yorum yapılmamış"
                )}

                {reviewOpen && (
                  <div>
                    {prodct?.reviews.map((item, i) => (
                      <ReviewComp item={item} />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </PageContainer>
      )}
    </div>
  );
};

export default DetailProduct;
