import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Hero from "../components/Home/Hero";
import PageContainer from "../container/PageContainer";
import { getProducts } from "../redux/productSlice";
import Loader from "../components/loading";
import ProductCard from "../components/Home/ProductCard";

const Home = () => {
  const dispatch = useDispatch();
  const { products, loading } = useSelector((store) => store.products);
  const [randomProducts, setRandomProducts] = useState([]);
  console.log(products);

  // Diziyi karıştıran bir fonksiyon
  const shuffleArray = (array) => {
    const copiedArray = [...array]; // Diziyi kopyala
    return copiedArray.sort(() => Math.random() - 0.5); // Kopyayı karıştır
  };

  useEffect(() => {
    // Diziyi karıştır ve ilk 8 ürünü al
    const shuffledProducts = shuffleArray(products.products || []);
    setRandomProducts(shuffledProducts.slice(0, 8));
  }, [products]);

  useEffect(() => {
    dispatch(getProducts({}));
  }, [dispatch]);
  return (
    <PageContainer>
      {loading ? (
        <Loader />
      ) : (
        <div className="flex flex-col gap-10">
          <Hero />

          {products.products && (
            <div className="flex items-center justify-between gap-5 my-5 flex-wrap">
              {randomProducts.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          )}
        </div>
      )}
    </PageContainer>
  );
};

export default Home;
