import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardBody,
  Typography,
  Button,
} from "@material-tailwind/react";
import PlaceOutlinedIcon from "@mui/icons-material/PlaceOutlined";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import SearchIcon from "@mui/icons-material/Search";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./Camp.css";
import "../App.css";

export const Camp = ({ camps }) => {
  const navigate = useNavigate();

  const handleMoreDetailsClick = (campId) => {
    navigate(`/camp-more-details/${campId}`);
  };

  return (
    <div>
      <Carousel
        showArrows={false}
        showStatus={false}
        showThumbs={false}
        className="flex text-white items-center h-auto"
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
            <Typography className="text-3xl">
              <b>Blood Donation Camp: Save Lives Together</b>
            </Typography>
            <Typography>Blood Donation Camp: Save Lives Together</Typography>
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
            <Typography className="text-3xl">
              <b>Blood Donation Camp: Save Lives Together</b>
            </Typography>
            <Typography>Blood Donation Camp: Save Lives Together</Typography>
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
            <Typography className="text-3xl">
              <b>Blood Donation Camp: Save Lives Together</b>
            </Typography>
            <Typography>Blood Donation Camp: Save Lives Together</Typography>
          </div>
        </div>

        {/* Add more carousel items as needed */}
      </Carousel>

      <div className="mt-6 mx-36 flex">
        <div className="flex-1 mt-5 text-gray-500 ">
          <b>Upcoming Camps</b>
        </div>

        <div className="flex-2 m-auto relative text-gray-500 items-center">
          <div className="relative pr-4">
            <input
              className="mt-2 mb-auto border-2 border-gray-300 bg-white h-10 pl-4 pr-6 rounded-3xl text-sm focus:outline-none"
              type="search"
              name="search"
              placeholder="Search Camps"
            />
            <SearchIcon className="absolute right-5 top-4 text-gray-500" />
          </div>
        </div>

        <div className="flex-2 mt-2 ">
          <Button
            className="bg-black px-2 text-white rounded-3xl h-10"
            ripple={true}
            onClick={() => navigate("/add-camp")}
          >
            <p className="text-sm mr-2">
              {" "}
              <AddOutlinedIcon /> Add Camps
            </p>
          </Button>
        </div>
      </div>

      <div className="relative mt-2 mb-2">
        <button className="bg-none px-2 py-1 text-gray-500 rounded-3xl absolute right-32">
          <small>
            See all <ArrowRightIcon />
          </small>
        </button>
      </div>

      <div className="mt-10 mx-32">
        {camps && camps.length > 0 ? (
          camps.map((camp) => (
            <Card
              key={camp.id}
              className="p-2 m-3 flex rounded-lg bg-white relative"
            >
              <div className="flex w-full">
                <div className="m-1 w-1/4">
                  <img
                    src={camp.image}
                    alt={camp.title}
                    className="h-max rounded-lg"
                  />
                </div>
                <div className="p-4 w-3/4">
                  <CardBody>
                    <Typography color="gray">
                      <b>{camp.title}</b>
                    </Typography>
                    <br />
                    <Typography color="gray">{camp.date}</Typography>
                    <Typography color="gray">
                      {camp.s_time} to {camp.e_time}{" "}
                    </Typography>
                    <Typography className="text-gray-500">
                      <small>
                        <PlaceOutlinedIcon /> {camp.location}
                      </small>
                    </Typography>
                  </CardBody>
                </div>{" "}
                <div className="absolute bottom-10 right-4">
                  <Button
                    onClick={() => handleMoreDetailsClick(camp.id)}
                    className="bg-gray-200 p-2 text-black"
                    ripple={true}
                  >
                    <p>More Details</p>
                  </Button>
                </div>
              </div>
            </Card>
          ))
        ) : (
          <p>No camps available at the moment.</p>
        )}
      </div>
    </div>
  );
};

export default Camp;