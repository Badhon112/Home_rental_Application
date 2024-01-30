import React, { useEffect } from "react";
import { categories } from "../data";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { setListings } from "../redux/state";
import Loader from "./Loader";
import ListingCard from "./ListingCard";
export default function Listings() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const listings = useSelector((state) => state.listings);
  const getFeedListings = async () => {
    try {
      const response = await fetch(
        selectedCategory !== "All"
          ? `http://localhost:3001/properties?category=${selectedCategory}`
          : "http://localhost:3001/properties",
        {
          method: "GET",
        }
      );
      const data = await response.json();
      dispatch(setListings({ listings: data }));
      setLoading(false);
    } catch (error) {
      console.log("Fetch listing failed");
    }
  };
  useEffect(() => {
    getFeedListings();
  }, [selectedCategory]);
  // console.log(listings);
  return (
    <>
      <div className="flex flex-wrap justify-center gap-20 px-12 py-20">
        {categories?.map((category, index) => {
          return (
            <div
              key={index}
              className={`flex flex-col items-center text-gray-900 cursor-pointer ${
                category.label === selectedCategory ? 'text-red-500': ""
              }`}
              onClick={() => selectedCategory(category.label)}
            >
              <div style={{ fontSize: "30px" }}>{category.icon}</div>
              <div>{category.label}</div>
            </div>
          );
        })}
      </div>
      {loading ? (
        <Loader />
      ) : (
        <div className="flex flex-wrap justify-center p-5 gap-2">
          {loading ? (
            <Loader />
          ) : (
            <div className="flex flex-wrap justify-center gap-1 pl-32 py-5">
              {listings.map(
                ({
                  _id,
                  creator,
                  listingPhotoPaths,
                  city,
                  province,
                  country,
                  category,
                  type,
                  price,
                }) => (
                  <ListingCard
                    key={_id}
                    listingId={_id}
                    creator={creator}
                    listingPhotoPaths={listingPhotoPaths}
                    city={city}
                    province={province}
                    country={country}
                    categories={category}
                    type={type}
                    price={price}
                  />
                )
              )}
            </div>
          )}
        </div>
      )}
    </>
  );
}
