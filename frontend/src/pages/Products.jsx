import React, { useEffect, useState } from "react";
import Filter from "../layout/Filter";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "./../redux/productSlice";
import ProductCard from "../components/Home/ProductCard";
import Loader from "../components/loading";
import PageContainer from "./../container/PageContainer";
import ReactPaginate from "react-paginate";

const Products = () => {
  const dispatch = useDispatch();
  const { products, loading } = useSelector((store) => store.products);
  const { keyword } = useSelector((store) => store.general);
  const [price, setPrice] = useState({ min: 0, max: 30000 });
  const [rating, setRating] = useState(0);
  const [category, setCategory] = useState("");

  const [itemOffset, setItemOffset] = useState(0);
  const endOffset = itemOffset + 6;

  const currentItems = products?.products?.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(products?.products?.length / 6);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * 6) % products?.products?.length;

    setItemOffset(newOffset);
  };

  useEffect(() => {
    console.log("Dispatch çalışıyor, keyword:", keyword);
    dispatch(getProducts({ keyword, price, rating, category }))
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  }, [dispatch, keyword, price, rating, category]);
  return (
    <PageContainer>
      <div className="flex gap-3">
        <Filter
          setPrice={setPrice}
          setRating={setRating}
          setCategory={setCategory}
        />
        <div className="border w-full min-h-[75vh] rounded-md shadow hover:shadow-md bg-gray-100">
          {loading ? (
            <div className="mx-40">
              <Loader />
            </div>
          ) : (
            <div className="flex flex-col gap-10">
              {products?.products?.length > 0 ? (
                <div className="flex items-center justify-center gap-5 my-5 flex-wrap">
                  {currentItems.map((product) => (
                    <ProductCard key={product._id} product={product} />
                  ))}
                </div>
              ) : (
                <div className="flex justify-center items-center py-10">
                  <h1 className="text-xl max-md:text-lg font-mono font-semibold">
                    Aradığınız kelimeye uygun ürün bulunamadı
                  </h1>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      <div className="px-2 text-center mt-2 w-fit mx-auto">
        <ReactPaginate
          className="flex justify-center gap-4 px-2 border w-fit mx-auto"
          breakLabel="..."
          nextLabel=">"
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={pageCount}
          previousLabel="<"
          renderOnZeroPageCount={null}
        />{" "}
      </div>
    </PageContainer>
  );
};

export default Products;
