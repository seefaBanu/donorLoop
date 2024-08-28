import React, { useEffect, useState } from "react";
import { Card, CardBody } from "@material-tailwind/react";
import PlaceOutlinedIcon from "@mui/icons-material/PlaceOutlined";
import SearchIcon from "@mui/icons-material/Search";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./Camp.css";
import Spinner from "../../components/Items/Spinner";
import { IoCalendar, IoLocation, IoTime } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const AllCamps = ({ camps, group, fetchCamp, loading }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchCamp();
    
  }, []);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredCamps = camps.filter((camp) =>
    camp.title.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const handleMoreDetailsClick = (campId) => {
    navigate(`/camp-more-details/${campId}`);
  };

  return (
    <div className="px-4 py-8 mt-20">
      <div className="p-8">
        <div className="flex flex-row justify-between mx-auto items-center">
          <div>
            <h1 className="text-sm font-semibold text-gray-700 ">Camps</h1>

            <h1 className="text-xs font-light text-gray-700 ">
              All the camps are organized by the blood banks.
            </h1>
          </div>

          <div className="flex text-gray-500 items-center gap-10 align-middle my-auto">
            <div className="flex flex-row bg-white p-2 rounded-3xl border border-gray-300">
              <input
                className="flex text-sm focus:outline-none"
                type="search"
                name="search"
                value={searchQuery}
                onChange={handleSearchChange}
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

        {loading ? (
          <Spinner />
        ) : (
          <div className="gap-4 mx-auto mt-10 grid grid-cols-4 lg:grid-cols-3 md:grid-cols-1 sm:grid-cols-1">
            {filteredCamps && filteredCamps.length > 0 ? (
              filteredCamps.map((camp) => (
                <div
                  key={camp.campId}
                  className="p-4 flex-1 my-4 rounded-lg bg-white"
                >
                  <div className="flex flex-col ">
                    <div className="flex align-middle items-center mx-auto my-auto">
                      <img
                        src={`/${camp.imageUrl}`}
                        alt={camp.title}
                        className="rounded-lg h-40 w-full object-cover"
                      />
                    </div>
                    <div className="flex text-sm">
                      <div className="w-full my-3">
                        <p>
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
                      </div>
                    </div>
                    <div className="flex">
                      <button
                        onClick={() => handleMoreDetailsClick(camp.campId)}
                        className="bg-gray-200  text-black text-xs font-light rounded-lg p-2"
                      >
                        <p>More Details</p>
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="align-middle text-center mt-10 text-gray-400">
                No camps available at the moment.
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AllCamps;
