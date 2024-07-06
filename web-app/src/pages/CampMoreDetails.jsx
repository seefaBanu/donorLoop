import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import RoomIcon from "@mui/icons-material/Room";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import CallIcon from "@mui/icons-material/Call";
import axios from "axios"; // Import axios for API calls

const CampMoreDetails = ({ camps, token }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const camp = camps ? camps.find((c) => c.campId === parseInt(id)) : null;

  const handleUpdate = (campId) => {
    navigate(`/update-camp/${campId}`);
  };

  const addToGoogleCalendar = () => {
    if (camp) {
      const startDate = new Date(camp.date + " " + camp.s_time);
      const endDate = new Date(camp.date + " " + camp.e_time);

      const googleCalendarUrl = `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
        camp.title
      )}&dates=${startDate.toISOString().replace(/-|:|\.\d\d\d/g, "")}/${endDate
        .toISOString()
        .replace(/-|:|\.\d\d\d/g, "")}&details=${encodeURIComponent(
        camp.description
      )}&location=${encodeURIComponent(camp.location)}`;

      window.open(googleCalendarUrl, "_blank");
    }
  };

  const handleDelete = (campId) => {

    if (campId && token) {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      axios
        .delete(`http://localhost:8080/camps/${campId}`, config)
        .then((response) => {
          console.log("Camp deleted successfully:", response);
          // Optionally navigate to a different page or update state after deletion
          navigate("/camps");
        })
        .catch((error) => {
          console.error("Error deleting camp:", error);
        });
    }
  };

  if (!camp) {
    return <div>Camp not found</div>;
  }



  return (
    <div className="mt-20">
      <div
        className="relative h-60"
        style={{
            backgroundImage: `url(/${camp.imageUrl})`,
        }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="flex relative pt-24">
          <p className="items-center text-white ml-auto mr-auto text-3xl ">
            <b>{camp.title}</b>
          </p>
        </div>
      </div>

      <div className="mt-10 mb-10 mx-36">
        <div className="description">
          <p className="text-justify text-sm font-light text-gray-700">
            {camp.description}
          </p>
        </div>
        <div className="flex justify-start gap-6 mt-4">
          <div className="px-4 py-2 my-3 rounded-lg bg-white relative w-2/6 shadow">
            <p className="text-xs font-semibold pb-2">Calendar</p>
            <div className="flex flex-col">
              <div className="flex flex-row my-auto">
                <div className="mr-2 text-center my-auto text-xs">
                  <CalendarMonthOutlinedIcon />
                </div>
                <p className=" my-auto text-center text-xs">
                  {camp.date} {camp.s_time} to {camp.e_time}
                </p>
              </div>
              <div className="flex mt-4 text-xs text-blue-700">
                <p onClick={addToGoogleCalendar}>Add to Calendar</p>
              </div>
            </div>
          </div>
          <div className="p-4 my-3 rounded-lg bg-white relative w-2/6 shadow">
            <p className="text-xs font-semibold pb-2">Location</p>
            <div className="flex flex-col">
              <div className="flex flex-row my-auto">
                <div className="mr-2 text-center my-auto text-xs">
                  <RoomIcon />
                </div>
                <p className=" my-auto text-center text-xs">{camp.location}</p>
              </div>
            </div>
          </div>
        </div>

        <p className="pt-3 pb-3 text-sm">For more information</p>
        <div className="flex mb-8">
            <CallIcon className="text-gray-400" /> {camp.phone1}
          <p className="pl-2 pr-2 text-sm text-gray-400">{camp.phone2}</p>
        </div>
        <div className="flex">
          <button
            type="button"
            className="bg-black text-white px-6 py-2 rounded mr-4"
            onClick={() => handleUpdate(camp.campId)}
          >
            Update
          </button>
          <button
            type="button"
            className="bg-red-500 text-white px-6 py-2 rounded"
            onClick={() => handleDelete(camp.campId)}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default CampMoreDetails;
