

import React from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { Typography } from "@material-tailwind/react";
import RoomIcon from "@mui/icons-material/Room";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import CallIcon from "@mui/icons-material/Call";

const CampMoreDetails = ({ camps }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const camp = camps ? camps.find((c) => c.id === parseInt(id)) : null;
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
 
  if (!camp) {
    return <div>Camp not found</div>;
  }

  return (
    <div>
      <div
        className="relative h-60"
        style={{
          backgroundImage: `url('${camp.image}')`,
        }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="flex relative pt-24">
          <Typography className="items-center text-white ml-auto mr-auto text-3xl ">
            <b>{camp.title}</b>
          </Typography>
        </div>
      </div>

      <div className="mt-10 mb-10 mx-36">
        <div className="description">
          <Typography className="text-justify">{camp.description}</Typography>
        </div>
        <div className="flex justify-start">
          <div className="p-2 my-3 rounded-lg bg-white relative w-2/6 shadow">
            <p className="text-base pb-2">
              <strong>
                <small>Calendar</small>
              </strong>
            </p>
            <div className="flex">
              <div className="w-1/5 text-center pt-2 ">
                <CalendarMonthOutlinedIcon fontSize="large" />{" "}
              </div>
              <div className="w-2/5">
                {" "}
                <small className="text-xs">{camp.date}</small>
                <p>
                  {" "}
                  <small className="text-xs">
                    {camp.s_time} to {camp.e_time}
                  </small>
                </p>
                <p>
                  <small
                    style={{
                      fontSize: "10px",
                      color: "blue",
                      cursor: "pointer",
                    }}
                    onClick={addToGoogleCalendar}
                  >
                    Add to Calendar
                  </small>
                </p>
              </div>
            </div>
          </div>
          <div className="p-2 m-3 rounded-lg bg-white relative w-2/6 shadow">
            <p className="text-base pb-2">
              <strong>
                <small>Location</small>
              </strong>
            </p>
            <div className="flex">
              <div className="w-1/5 text-center pt-2">
                {" "}
                <RoomIcon fontSize="large" />
              </div>
              <div className="w-4/5">
                <small className="text-xs">{camp.location}</small>
              </div>
            </div>
          </div>
        </div>

        <p className="pt-3 pb-3">For more information</p>
        <p className="flex">
          <div>
            <CallIcon /> {camp.phone1}
          </div>
          <p className="pl-2 pr-2">,</p>
          <div>{camp.phone2}</div>
        </p>
        <br></br>
        <button
          type="submit"
          className="bg-black text-white px-6 py-2 rounded"
          onClick={() => handleUpdate(camp.id)}
        >
          Update
        </button>
      </div>
    </div>
  );
};

export default CampMoreDetails;
