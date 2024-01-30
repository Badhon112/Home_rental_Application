import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./ListingDetails.scss";
import { facilities } from "../data";

import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { DateRange } from "react-date-range";
import Loader from "../components/Loader";
import { useSelector, useDispatch } from "react-redux";
import Navbar from "../components/Navbar";

export default function ListingDetails() {
  const [loading, setLoading] = useState(true);

  const { listingId } = useParams();
  const [listing, setListing] = useState(null);
  const user = useSelector((state) => state.user);
  const getListingDetails = async () => {
    try {
      const response = await fetch(
        `http://localhost:3001/properties/${listingId}`,
        {
          method: "GET",
        }
      );

      const data = await response.json();
      setListing(data);
      setLoading(false);
    } catch (err) {
      console.log("Fetch Listing Details Failed", err.message);
    }
  };

  useEffect(() => {
    getListingDetails();
  }, []);

  // booking calender
  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  const handleSelect = (ranges) => {
    setDateRange([ranges.selection]);
  };

  const start = new Date(dateRange[0].startDate);
  const end = new Date(dateRange[0].endDate);
  const dayCount = Math.round(end - start) / (1000 * 60 * 60 * 24); //calculate the different in day unit

  // console.log(listing);
  return loading ? (
    <Loader />
  ) : (
    <>
      <Navbar />
      <div className="listing-details">
        <div className="title text-3xl font-semibold">
          <h1>{listing.title}</h1>
          <div></div>
        </div>
        <div className="photos">
          {listing.listingPhotoPaths?.map((item, index) => (
            <img
              key={index}
              src={`http://localhost:3001/${item.replace("public", "")}`}
              alt="Listing Photos"
            />
          ))}
        </div>
        <h2 className="text-2xl font-semibold">
          {listing.type} in {listing.city}, {listing.province},{" "}
          {listing.country}
        </h2>
        <p>
          {listing.guestCount} guests - {listing.bedroomCount} beadroom -{" "}
          {listing.bedCount} bed - {listing.bethroomCount} bath
        </p>
        <hr className="h-[2px] bg-black" />
        <div className="profile">
          <img
            // src={`http://localhost:3001/${listing.creator.profileImagePath.replace(
            //   "public",
            //   ""
            // )}`}
            src={`http://localhost:3001/${user.profileImagePath.replace(
              "public",
              ""
            )}`}
            alt=""
          />
          <h3>
            Hosted by {listing.creator.firstName} {listing.creator.lastName}
          </h3>
        </div>
        <hr className="h-[2px] bg-black" />
        <h3 className="text-lg font-semibold">Description</h3>
        <p>{listing.description}</p>
        <hr />
        <p className="text-lg font-semibold ">Highlight</p>
        <p>{listing.highlight}</p>
        <hr />
        <div className="booking">
          <div>
            <h2>What this place offers?</h2>
            <div className="amenities">
              {listing.amenities[0].split(",").map((item, index) => (
                <div className="facility" key={index}>
                  <div className="facility_icon">
                    {
                      facilities.find((facility) => facility.name === item)
                        ?.icon
                    }
                  </div>
                  <p>{item}</p>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h2>How long do you want to stay?</h2>
            <div className="date-range-calendar">
              <DateRange ranges={dateRange} onChange={handleSelect} />
              {dayCount > 1 ? (
                <h2 className="text-lg font-semibold">
                  {listing.price} x {dayCount} nights
                </h2>
              ) : (
                <h2 className="text-lg font-semibold">
                  {listing.price} x {dayCount} night
                </h2>
              )}
              <h2 className="text-lg font-bold">Total prices : {listing.price * dayCount}</h2>
              <p className="text-xl">Start date : {dateRange[0].startDate.toDateString()}</p>
              <p className="text-xl">End date : {dateRange[0].endDate.toDateString()}</p>
              <button className="w-60 p-2 mt-2 text-white bg-blue-400 rounded-lg text-2xl font-bold">Booking</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
