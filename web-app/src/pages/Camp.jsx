import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardBody, Button } from "@material-tailwind/react";
import PlaceOutlinedIcon from "@mui/icons-material/PlaceOutlined";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import SearchIcon from "@mui/icons-material/Search";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./Camp.css";

export const Camp = ({ camps }) => {
  const navigate = useNavigate();

  const handleMoreDetailsClick = (campId) => {
    navigate(`/camp-more-details/${campId}`);
  };

  return (
    <div className="mb-10">
      <Carousel
        showArrows={false}
        showStatus={false}
        showThumbs={false}
        className="flex text-white items-center h-auto mt-20"
      >
        <div
          className="relative h-60"
          style={{
            backgroundImage:
              "url('https://news.kiit.ac.in/wp-content/uploads/2022/06/KIMSBloodDonation2.jpg')",
          }}
        >
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <div className="relative pt-24">
            <p className="text-3xl font-semibold">
              <b>Blood Donation Camp: Save Lives Together</b>
            </p>
            <p>Blood Donation Camp: Save Lives Together</p>
          </div>
        </div>
        <div
          className="relative h-60"
          style={{
            backgroundImage:
              "url('https://news.kiit.ac.in/wp-content/uploads/2022/06/KIMSBloodDonation2.jpg')",
          }}
        >
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <div className="relative pt-24">
            <p className="text-3xl font-semibold">
              <b>Blood Donation Camp: Save Lives Together</b>
            </p>
            <p>Blood Donation Camp: Save Lives Together</p>
          </div>
        </div>
        <div
          className="relative h-60"
          style={{
            backgroundImage:
              "url('https://news.kiit.ac.in/wp-content/uploads/2022/06/KIMSBloodDonation2.jpg')",
          }}
        >
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <div className="relative pt-24">
            <p className="text-3xl font-semibold">
              <b>Blood Donation Camp: Save Lives Together</b>
            </p>
            <p>Blood Donation Camp: Save Lives Together</p>
          </div>
        </div>

        {/* Add more carousel items as needed */}
      </Carousel>

      <div className="flex flex-row justify-between  w-2/3 mx-auto mt-10">
        <div className="flex text-gray-500 font-light my-auto">
          <b>Upcoming Camps</b>
        </div>

        <div className="flex text-gray-500 items-center gap-10 align-middle my-auto">
          <div className="flex flex-row bg-white p-2 rounded-3xl  border border-gray-300  ">
            <input
              className="flex text-sm focus:outline-none"
              type="search"
              name="search"
              placeholder="Search Camps"
            />
            <SearchIcon className="flex text-sm text-gray-500" />
          </div>

          <div className="flex ">
            <button
              className="flex border bg-black align-middle my-auto text-white text-sm p-2 rounded-3xl hover:bg-gray-600 hover:text-black hover:border transition duration-500"
              onClick={() => navigate("/add-camp")}
            >
              <p className="text-sm mr-2"> + Add Camps</p>
            </button>
          </div>
        </div>
      </div>

      <div className="flex w-2/3 justify-end mx-auto mt-6">
        <button className="flex bg-none  text-gray-500 rounded-3xl text-xs my-auto">
          See all
        </button>
        <ArrowRightIcon className="flex bg-none  text-gray-500 rounded-3xl text-xs my-auto" />
      </div>

      <div className="w-2/3 mx-auto">
        {camps && camps.length > 0 ? (
          camps.map((camp) => (
            <Card key={camp.campId} className="p-2 flex my-4 rounded-lg bg-white ">
              <div className="flex w-full">
                <div className=" w-1/4 align-middle items-center mx-auto my-auto">
                  <img
                    src={`/${camp.imageUrl}`}
                    alt={camp.title}
                    className="rounded-lg h-40 w-full object-cover mx-2  "
                  />
                </div>
                <div className=" w-3/4 text-sm">
                  <CardBody>
                    <p color="gray">
                      <b>{camp.title}</b>
                    </p>
                    <br />
                    <p color="gray">{camp.date}</p>
                    <p color="gray">
                      {camp.s_time} to {camp.e_time}{" "}
                    </p>
                    <p className="text-gray-500">
                      <small>
                        <PlaceOutlinedIcon /> {camp.location}
                      </small>
                    </p>
                  </CardBody>
                </div>{" "}
                <div className="absolute bottom-10 right-4">
                  <button
                    onClick={() => handleMoreDetailsClick(camp.campId)}
                    className="bg-gray-200 p-2 text-black text-xs font-light rounded-lg"
                  >
                    <p>More Details</p>
                  </button>
                </div>
              </div>
            </Card>
          ))
        ) : (
          <p className="align-middle text-center mt-10 text-gray-400">No camps available at the moment.</p>
        )}
      </div>
    </div>
  );
};

export default Camp;
