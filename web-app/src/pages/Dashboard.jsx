import React from "react";
import BasicLineChart from "../components/Items/BasicLineChart";
import TopDasboardCards from "../components/Items/TopDashboardCards";
import BloodDemandPrediction from "../components/Items/BloodDemandPrediction";
import CarouselDashboard from "../components/Items/CarouselDashboard";

function Dashboard({ token }) {
  return (
    <div className="p-8 mt-20">
      <TopDasboardCards token={token} />
      <div className="flex ">
        <div className="w-1/2">
          <div className="px-6 pt-6 rounded-xl text-gray-500 ">
            <h2 className="font-semibold text-gray-800 mb-2">Blood Requests</h2>
            <BasicLineChart token={token} />
          </div>
          <div className="p-6 rounded-xl text-gray-500">
            <CarouselDashboard token={token} />
          </div>
        </div>
        <div className="flex w-1/2 p-6">
          <BloodDemandPrediction token={token} />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
