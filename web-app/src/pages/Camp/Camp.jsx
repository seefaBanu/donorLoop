import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardBody } from "@material-tailwind/react";
import PlaceOutlinedIcon from "@mui/icons-material/PlaceOutlined";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import SearchIcon from "@mui/icons-material/Search";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./Camp.css";
import { IoCalendar, IoLocation, IoRefresh, IoTime } from "react-icons/io5";
import Tooltip from "@mui/material/Tooltip";
import Spinner from "../../components/Items/Spinner";

export const Camp = ({ camps, group, fetchCamp, loading, userDetails }) => {
  const navigate = useNavigate();

  useEffect(() => {
    fetchCamp();
  }, []);

  const handleMoreDetailsClick = (campId) => {
    navigate(`/camp-more-details/${campId}`);
  };

  // Filter camps to include only future dates
  const today = new Date();
  const upcomingCamps = camps.filter((camp) => new Date(camp.date) > today);

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

      <div className="flex flex-row justify-between w-2/3 mx-auto mt-10">
        <div className="flex text-gray-500 font-light my-auto">
          <div>
            <h1 className="text-sm font-semibold text-gray-700 ">
              Upcoming Camps
            </h1>

            <h1 className="text-xs font-light text-gray-700 ">
              Upcoming blood donation camps organized by blood banks.
            </h1>
          </div>
        </div>

        <div className="flex text-gray-500 items-center gap-10 align-middle my-auto">
          <div>
            <Tooltip title="Refresh">
              <button>
                <IoRefresh onClick={() => fetchCamp(true)} />
              </button>
            </Tooltip>
          </div>
          <div className="flex flex-row bg-white p-2 rounded-3xl border border-gray-300">
            <input
              className="flex text-sm focus:outline-none"
              type="search"
              name="search"
              placeholder="Search Camps"
            />
            <SearchIcon className="flex text-sm text-gray-500" />
          </div>
          {group.includes("blood_bank") && (
            <div className="flex">
              <button
                className="flex border bg-black align-middle my-auto text-white text-sm p-2 rounded-3xl hover:bg-gray-600 hover:text-black hover:border transition duration-500"
                onClick={() => navigate("/add-camp")}
              >
                <p className="text-sm mr-2"> + Add Camps</p>
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="flex w-2/3 justify-end mx-auto mt-6">
        <button
          className="flex bg-none text-gray-500 rounded-3xl text-xs my-auto"
          onClick={() => navigate("/all-camps")}
        >
          See all
        </button>
        <ArrowRightIcon className="flex bg-none text-gray-500 rounded-3xl text-xs my-auto" />
      </div>

      {loading ? (
        <Spinner />
      ) : (
        <div className="w-2/3 mx-auto grid grid-cols-2 gap-2">
          {upcomingCamps && upcomingCamps.length > 0 ? (
            upcomingCamps.map((camp) => (
              <Card
                key={camp.campId}
                className="p-2 flex my-4 rounded-lg bg-white"
              >
                <div className="flex w-full">
                  <div className="w-1/4 align-middle items-center mx-auto my-auto">
                    <img
                      src={`${camp.imageUrl}`}
                      alt={camp.title}
                      className="rounded-lg h-40 w-full object-cover mx-2"
                    />
                  </div>
                  <div className="w-3/4 text-sm">
                    <CardBody>
                      <p color="gray">
                        <b>{camp.title}</b>
                      </p>
                      <br />
                      <div className="">
                        <div className="text-gray-500 flex gap-2 text-sm my-1">
                          <IoCalendar className="my-auto" />
                          <p>{camp.date}</p>
                        </div>
                        <div className="text-gray-500 flex gap-2 my-1">
                          <IoTime className="my-auto" />
                          <p>
                            {camp.stime} to {camp.etime}
                          </p>
                        </div>
                        <div className="text-gray-500 flex gap-2 my-1">
                          <IoLocation className="my-auto" />
                          <p>{camp.location}</p>
                        </div>
                      </div>
                    </CardBody>
                  </div>
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
            <p className="align-middle text-center mt-10 text-gray-400">
              No camps available at the moment.
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default Camp;
