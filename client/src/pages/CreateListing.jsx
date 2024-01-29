import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { categories, types, facilities } from "../data";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { IoMdPhotos } from "react-icons/io";
import { BiTrash } from "react-icons/bi";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
export default function CreateListing() {
  const [category, setCategory] = useState("");
  const [type, setType] = useState("");
  const Navigate = useNavigate();
  // location
  const [formLocation, setFormLocation] = useState({
    streetAddress: "",
    aptSuite: "",
    city: "",
    province: "",
    country: "",
  });
  const handleChangeLocation = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setFormLocation({
      ...formLocation,
      [name]: value,
    });
    console.log(formLocation, category, type);
  };

  //Basic Count
  const [guestCount, setGuestCount] = useState(1);
  const [bedroomCount, setBedroomsCount] = useState(1);
  const [bedCount, setBedCount] = useState(1);
  const [bethroomCount, setBathroomCount] = useState(1);

  //Amemities
  const [amenities, setAmenities] = useState([]);

  const handleSelectAmenities = (facility) => {
    if (amenities.includes(facility)) {
      setAmenities((prevAmenities) =>
        prevAmenities.filter((option) => option !== facility)
      );
    } else {
      setAmenities((prev) => [...prev, facility]);
    }
  };
  // Upload Drag & Drop , Remove Photos
  const [photos, setPhotos] = useState([]);
  const handleUploadPhotos = (e) => {
    const newPhotos = e.target.files;
    setPhotos((prevPhotos) => [...prevPhotos, ...newPhotos]);
  };
  const handleDragPhoto = (result) => {
    if (!result.destination) return;
    const items = Array.form(photos);
    const [recorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, recorderedItem);
    setPhotos(items);
  };
  const handleremovePhoto = (indexToRemove) => {
    setPhotos((prevPhotos) =>
      prevPhotos.filter((_, index) => index !== indexToRemove)
    );
  };

  //Dscription
  const [formDescription, setformDescription] = useState({
    title: "",
    description: "",
    highlight: "",
    highlightDesc: "",
    price: 0,
  });
  const handleChangeDescription = (e) => {
    const { name, value } = e.target;
    setformDescription({
      ...formDescription,
      [name]: value,
    });
  };

  const creatorId = useSelector((state) => state.user._id);
  const handlePost = async (e) => {
    e.preventDefault();
    try {
      //Create a new Formdata object to handle file uploads
      const listingForm = new FormData();
      listingForm.append("creator", creatorId);
      listingForm.append("category", category);
      listingForm.append("type", type);
      listingForm.append("streetAddress", formLocation.streetAddress);
      listingForm.append("aptSuite", formLocation.aptSuite);
      listingForm.append("city", formLocation.city);
      listingForm.append("province", formLocation.province);
      listingForm.append("country", formLocation.country);
      listingForm.append("guestCount", guestCount);
      listingForm.append("bedroomCount", bedroomCount);
      listingForm.append("bedCount", bedCount);
      listingForm.append("bethroomCount", bethroomCount);
      listingForm.append("amenities", amenities);
      listingForm.append("title", formDescription.title);
      listingForm.append("description", formDescription.description);
      listingForm.append("highlight", formDescription.highlight);
      listingForm.append("highlightDesc", formDescription.highlightDesc);
      listingForm.append("price", formDescription.price);

      //Append each selected photos to the FormData object
      photos.forEach((photo) => {
        listingForm.append("listingPhotos", photo);
      });
      //Send A POST request to server
      const response = await fetch("http://localhost:3001/properties/create", {
        method: "POST",
        body: listingForm,
      });
      if (response.ok) {
        Navigate("/");
      }
    } catch (error) {
      console.log("publish Listing failed", error.message);
    }
  };

  return (
    <>
      <Navbar />
      <div
        className="create_Listing mx-20 mt-8"
        style={{ padding: "40px 60px 120px" }}
      >
        <h1 className="text-3xl">Publish Your Place</h1>
        <form action="" className="pt-14 " onSubmit={handlePost}>
          <div className="bg-white shadow-xl shadow-gray-100 p-6">
            <h2 className=" text-xl font-semibold">
              Step 1:Tell us About your Place
            </h2>
            <hr className=" mt-3 p-[0.5px] bg-gray-300 border" />
            <h3 className="mt-5 text-lg font-semibold">
              Which of these categories best describes your place?
            </h3>
            <div className=" flex m-auto mt-10 flex-wrap w-[600px] gap-4">
              {categories.map((item, index) => (
                <div
                  className={`category h-20 hover:border-red-500 w-[120px] items-center m-auto flex flex-col rounded-lg border border-gray-300 py-3 gap ${
                    category === item.label ? "border-red-600" : ""
                  }`}
                  key={index}
                  onClick={() => setCategory(item.label)}
                >
                  <div
                    className="flex justify-center "
                    style={{ fontSize: "30px" }}
                  >
                    {item.icon}
                  </div>
                  <div className="justify-center flex ">{item.label}</div>
                </div>
              ))}
            </div>
            <h3 className="mt-6 text-xl  font-semibold">
              What type of place will guests have ?
            </h3>
            <div className="flex flex-col gap-2 py-4">
              {types?.map((item, index) => (
                <div
                  className={`flex justify-between hover:border-red-300 items-center px-4 py-5 border rounded-2xl cursor-pointer ${
                    type === item.name ? "border-red-500" : ""
                  }`}
                  key={index}
                  onClick={() => setType(item.name)}
                >
                  <div>
                    <p>{item.name}</p>
                    <p>{item.description}</p>
                  </div>
                  <div style={{ fontSize: 20 }}>{item.icon}</div>
                </div>
              ))}
            </div>
            <h3 className="mt-3 text-xl font-semibold">
              Where's your place located?{" "}
            </h3>
            <div className="max-w-[700px]">
              <div className="mt-3">
                <p className="font-semibold">Street Address</p>
                <input
                  type="text"
                  placeholder="Street Address"
                  name="streetAddress"
                  value={formLocation.streetAddress}
                  onChange={handleChangeLocation}
                  required
                  className="w-full mt-2 px-5 py-2 outline-none border rounded-lg border-gray-400"
                />
              </div>
              <div className="flex justify-between">
                <div className="mt-3">
                  <p className="font-semibold">
                    Apartment, Suite, etc. (if applicable)
                  </p>
                  <input
                    placeholder="Apt, Suite, etc. (if applicable)"
                    type="text"
                    className="w-72  mt-2 px-5 py-2 outline-none border rounded-lg border-gray-400 "
                    name="aptSuite"
                    value={formLocation.aptSuite}
                    onChange={handleChangeLocation}
                    required
                  />
                </div>
                <div className="mt-3">
                  <p className="font-semibold">City</p>
                  <input
                    placeholder="City"
                    type="text"
                    name="city"
                    value={formLocation.city}
                    onChange={handleChangeLocation}
                    required
                    className="w-72 mt-2 px-5 py-2 outline-none border rounded-lg border-gray-400"
                  />
                </div>
              </div>
              <div className="flex justify-between">
                <div className="mt-3">
                  <p className="font-semibold">Province</p>
                  <input
                    placeholder="Province"
                    type="text"
                    required
                    name="province"
                    value={formLocation.province}
                    onChange={handleChangeLocation}
                    className="w-72  mt-2 px-5 py-2 outline-none border rounded-lg border-gray-400 "
                  />
                </div>
                <div className="mt-3">
                  <p className="font-semibold">Country</p>
                  <input
                    placeholder="Country"
                    type="text"
                    name="country"
                    value={formLocation.country}
                    onChange={handleChangeLocation}
                    required
                    className="w-72 mt-2 px-5 py-2 outline-none border rounded-lg border-gray-400"
                  />
                </div>
              </div>
            </div>
            <h3 className="mt-4 text-xl font-semibold">
              Share some basics about your place
            </h3>
            <div className="basics flex flex-wrap gap-10 mt-3">
              <div className="basic flex items-center p-4 rounded-lg gap-8 border border-gray-300 hover:border-red-400">
                <p>Guests</p>
                <button onClick={() => setGuestCount(guestCount + 1)}>+</button>
                <p>{guestCount}</p>
                <button
                  onClick={() => {
                    guestCount > 1 && setGuestCount(guestCount - 1);
                  }}
                >
                  -
                </button>
              </div>
              <div className="basic flex items-center p-4 rounded-lg gap-8 border border-gray-300 hover:border-red-400">
                <p>Bedrooms</p>
                <button onClick={() => setBedroomsCount(bedroomCount + 1)}>
                  +
                </button>
                <p>{bedroomCount}</p>
                <button
                  onClick={() => {
                    bedroomCount > 1 && setBedroomsCount(bedroomCount - 1);
                  }}
                >
                  -
                </button>
              </div>
              <div className="basic flex items-center p-4 rounded-lg gap-8 border border-gray-300 hover:border-red-400">
                <p>Beds</p>
                <button onClick={() => setBedCount(bedCount + 1)}>+</button>
                <p>{bedCount}</p>{" "}
                <button
                  onClick={() => {
                    bedCount > 1 && setBedCount(bedCount - 1);
                  }}
                >
                  -
                </button>
              </div>
              <div className="basic flex items-center p-4 rounded-lg gap-8 border border-gray-300 hover:border-red-400">
                <p>Bathrooms</p>
                <button onClick={() => setBathroomCount(bethroomCount + 1)}>
                  +
                </button>
                <button>{bethroomCount}</button>
                <button
                  onClick={() => {
                    bethroomCount > 1 && setBathroomCount(bethroomCount - 1);
                  }}
                >
                  -
                </button>
              </div>
            </div>
          </div>
          <div>
            <h2 className=" text-xl font-semibold text-red-500 mt-8">
              Step 2: Make your place stand out
            </h2>
            <hr className=" mt-3 p-[0.5px] bg-gray-300 border" />

            <p className="text-lg py-5 font-semibold">
              Tell guests what place has to offer
            </p>
            <div className="flex flex-wrap gap-5">
              {facilities?.map((item, index) => (
                <div
                  className={`flex justify-center rounded-lg items-center flex-col gap-5 py-5 border w-40 ${
                    amenities.includes(item.name) ? "border-red-600" : ""
                  }`}
                  key={index}
                  onClick={() => handleSelectAmenities(item.name)}
                >
                  <div style={{ fontSize: "30px" }}>{item.icon}</div>
                  <p className="text-center">{item.name}</p>
                </div>
              ))}
            </div>
            <p className="text-lg font-semibold mt-4">
              Add some photos of your place
            </p>
            <DragDropContext onDragEnd={handleDragPhoto}>
              <Droppable droppableId="photos" direction="horizontal">
                {(provided) => (
                  <div
                    className="flex flex-wrap gap-4"
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                  >
                    {photos.length < 1 && (
                      <>
                        <input
                          type="file"
                          className="hidden"
                          accept="image/*"
                          onChange={handleUploadPhotos}
                          multiple
                          id="image"
                        />
                        <label
                          htmlFor="image"
                          className="px-10 py-20 rounded-2xl border flex flex-col items-center space-y-3"
                        >
                          <div className="" style={{ fontSize: "30px" }}>
                            <IoMdPhotos />
                          </div>
                          <p>Upload from your device</p>
                        </label>
                      </>
                    )}
                    {photos.length >= 1 && (
                      <>
                        {photos.map((photo, index) => {
                          return (
                            <Draggable
                              key={index}
                              draggableId={index.toString()}
                              index={index}
                            >
                              {(provided) => (
                                <div
                                  className="relative w-64 h-40 cursor-move"
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                >
                                  <img
                                    src={URL.createObjectURL(photo)}
                                    alt="Place"
                                  />
                                  <button
                                    type="button"
                                    onClick={() => handleremovePhoto(index)}
                                  >
                                    <BiTrash />
                                  </button>
                                </div>
                              )}
                            </Draggable>
                          );
                        })}
                        <input
                          type="file"
                          className="hidden"
                          accept="image/*"
                          onChange={handleUploadPhotos}
                          multiple
                          id="image"
                        />
                        <label htmlFor="image" className="w-64 h-36">
                          <div className="" style={{ fontSize: "30px" }}>
                            <IoMdPhotos />
                          </div>
                          <p>Upload from your device</p>
                        </label>
                      </>
                    )}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
            <h3 className="py-5 text-lg ">
              What make your place attractive and exciting
            </h3>
            <div className="mx-5 font-bold space-y-3">
              <p>Title</p>
              <input
                type="text"
                className="w-[600px] border outline-none px-4 font-thin py-3 rounded-lg"
                placeholder="title"
                name="title"
                value={formDescription.title}
                required
                onChange={handleChangeDescription}
              />
              <p>Description</p>
              <input
                textarea="text"
                className="w-[600px] border outline-none font-thin px-4 py-3 rounded-lg"
                placeholder="Description"
                name="description"
                value={formDescription.description}
                onChange={handleChangeDescription}
                required
              />
              <p>Highlight</p>
              <input
                type="text"
                className="w-[600px] border outline-none font-thin px-4 py-3 rounded-lg"
                placeholder="Highlight"
                name="highlight"
                value={formDescription.highlight}
                onChange={handleChangeDescription}
                required
              />
              <p>Highlight Details</p>
              <input
                textarea="text"
                className="w-[600px] border outline-none font-thin px-4 py-3 rounded-lg"
                placeholder="Highlight Details"
                value={formDescription.highlightDesc}
                onChange={handleChangeDescription}
                name="highlightDesc"
                required
              />
              <p>Now ,set Your PRICE</p>
              <span>
                {" "}
                $
                <input
                  type="number"
                  name="price"
                  id=""
                  placeholder="100"
                  value={formDescription.price}
                  onChange={handleChangeDescription}
                  className="p-5 outline-none font-thin border-2 ml-6 rounded-lg mt-5"
                />
              </span>
            </div>
          </div>
          <button
            className="px-5 py-2 border border-gray-400 mt-3 rounded-lg bg-green-950 text-white"
            type="submit"
          >
            CREATE YOUR LISTING
          </button>
        </form>
      </div>
    </>
  );
}
