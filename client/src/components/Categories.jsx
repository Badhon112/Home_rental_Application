import React from "react";
import { categories } from "../data";
import { Link } from "react-router-dom";
export default function Categories() {
  return (
    <div className="min-h-screen font-bold items-center mt-20 text-center flex flex-col space-y-5">
      <p className=" text-5xl text-sky-900">Explore Top Categories</p>
      <p className="w-9/12 text-2xl text-sky-950">
        Explore our wide range of vacation rentals that cater to all types of
        travelers.Immerse yourself in the local culture, enjoy the comforts of
        home, and create unforgettable memories in your dream destination
      </p>
      <div className="categories_list flex flex-wrap px-11 justify-center gap-5">
        {categories?.slice(1, 7).map((category, index) => (
          <Link to="" key={index}>
            <div className="flex flex-col justify-center items-center w-60 h-52 cursor-pointer">
              <img
                src={category.img}
                alt="This is category Image"
                className=" w-full h-full "
              />
              <div>{category.label}</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
