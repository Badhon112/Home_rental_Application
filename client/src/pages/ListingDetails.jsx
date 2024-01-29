import React, { useState } from "react";
import { useParams } from "react-router-dom";
export default function ListingDetails() {
  const [loading, setLoading] = useState(true);
  const userId = useParams();
  const [listing, setListing] = useState(null);
  console.log(userId.listingId);
  const getListingDetails = async () => {
    let data;
    try {
      const response = await fetch(
        `http://localhost:3001/properties/${userId}`,
        {
          method: "GET",
        }
      );
      data = await response.json();
      setListing(data);
    } catch (error) {}
    console.log(data);
  };
  return <div>ListingDetails for git</div>;
}
