import React from "react";
import { FaStar } from "react-icons/fa6";
import { categoryList, ratingList } from "../utils/constant";
const Filter = ({ setPrice, setRating, setCategory }) => {
  return (
    <div className="w-1/3 md:w-1/5 h-fit p-1 pb-2 border shadow hover:shadow-md rounded-md bg-gray-100">
      <h3 className="font-semibold text-lg">Filtrele</h3>
      <div className="flex items-center gap-2 my-2">
        <input
          onChange={(e) =>
            setPrice((price) => ({ ...price, min: e.target.value }))
          }
          className="border w-16 md:w-20 outline-none p-1"
          type="number"
          placeholder="Min"
        />
        <input
          onChange={(e) =>
            setPrice((price) => ({ ...price, max: e.target.value }))
          }
          className="border w-16 md:w-20 outline-none p-1"
          type="number"
          placeholder="Max"
        />
      </div>

      <h3 className="font-semibold mt-3 mb-1 text-lg">Kategoriler</h3>
      {categoryList.map((category, i) => (
        <div
          key={i}
          onClick={() => setCategory(category)}
          className="mb-1 hover:bg-neutral-100 cursor-pointer"
        >
          {category}
        </div>
      ))}
      <h3 className="font-semibold mt-3 mb-1 text-lg">Puan</h3>
      {ratingList.map((rating, i) => (
        <button
          onClick={() => setRating(rating)}
          key={i}
          className="border hover:bg-neutral-50 py- px-2 text-sm"
        >
          {rating}
        </button>
      ))}
    </div>
  );
};

export default Filter;
