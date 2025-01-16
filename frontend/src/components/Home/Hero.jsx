import React from "react";
import Slider from "react-slick";
import { sliderHero } from "../../utils/sliderHero";

const Hero = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    autoplay: true,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <Slider {...settings}>
      {sliderHero.map((hero, i) => (
        <div
          key={i}
          className={`!flex items-center justify-between ${hero.color} px-6 py-2`}
        >
          <div className="flex flex-col justify-between">
            <h1 className="text-6xl max-md:text-4xl font-bold">{hero.title}</h1>
            <p className="text-lg max-md:text-base my-4">{hero.description}</p>
            <button className="border rounded-full cursor-pointer text-2xl max-md:text-base w-[160px] max-md:w-[80px] h-16 max-md:h-8 flex justify-center items-center bg-white hover:bg-gray-300 hover:scale-110 transition-all">
              İncele
            </button>
          </div>
          <img
            className="size-[320px] md:size-[400px]"
            src={hero.image}
            alt=""
          />
        </div>
      ))}
    </Slider>
  );
};

export default Hero;
