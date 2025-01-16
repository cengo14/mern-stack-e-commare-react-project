import React from "react";
import StarRatings from "react-star-ratings";

const ReviewComp = ({ item }) => {
  console.log(item);

  return (
    <div className="mt-4 px-2 py-2 flex items-center border rounded-3xl gap-4">
      <div className="rounded-full bg-white flex justify-center items-center w-12 h-10 font-bold">
        {item.name.split("")[0]}
      </div>
      <div className="w-full">
        <p className="font-semibold">{item?.comment}</p>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">{item?.name}</span>
          <StarRatings
            rating={item?.rating}
            starRatedColor="gold"
            numberOfStars={5}
            starDimension="16px" // Yıldız boyutu
            starSpacing="1px" // Yıldız arası boşluk
            name="rating"
          />
        </div>
      </div>
    </div>
  );
};

export default ReviewComp;
