import * as React from "react";
import { LineChart } from "@mui/x-charts/LineChart";
import { useEffect, useState } from "react";

const BloodDemandPrediction = () => {
  const [predictions, setPredictions] = useState([]);

  // Dummy data for multiple blood groups (dates and predicted demand)
  const dummyData = {
    "A+": [
      { ds: "2024-09-01", yhat: 10 },
      { ds: "2024-09-02", yhat: 15 },
      { ds: "2024-09-03", yhat: 12 },
      { ds: "2024-09-04", yhat: 20 },
      { ds: "2024-09-05", yhat: 18 },
    ],
    "B+": [
      { ds: "2024-09-01", yhat: 8 },
      { ds: "2024-09-02", yhat: 13 },
      { ds: "2024-09-03", yhat: 10 },
      { ds: "2024-09-04", yhat: 17 },
      { ds: "2024-09-05", yhat: 14 },
    ],
    "O+": [
      { ds: "2024-09-01", yhat: 25 },
      { ds: "2024-09-02", yhat: 30 },
      { ds: "2024-09-03", yhat: 28 },
      { ds: "2024-09-04", yhat: 32 },
      { ds: "2024-09-05", yhat: 35 },
    ],
    "AB+": [
      { ds: "2024-09-01", yhat: 5 },
      { ds: "2024-09-02", yhat: 9 },
      { ds: "2024-09-03", yhat: 8 },
      { ds: "2024-09-04", yhat: 11 },
      { ds: "2024-09-05", yhat: 10 },
    ],
    // Add more data for other blood groups as needed
  };

  useEffect(() => {
    // Set all predictions when component mounts
    setPredictions(dummyData);
  }, []);

  const formatSeriesData = (group) => {
    if (!predictions[group]) return []; // Check if data exists for the group
    return predictions[group].map((p) => p.yhat); // Extract yhat values for the group
  };

  const commonDates = dummyData["A+"].map((p) => p.ds); // Use dates from one group (assuming same dates across groups)

  return (
    <div>
      <h2>Blood Group Demand Prediction</h2>

      {commonDates.length > 0 ? (
        <LineChart
          xAxis={[
            {
              data: commonDates, // Use common dates for x-axis
              scaleType: "band",
            },
          ]}
          series={[
            {
              data: formatSeriesData("A+"),
              label: "A+",
              showMark: false,
              color: "#FF6347", // Red for A+
            },
            {
              data: formatSeriesData("B+"),
              label: "B+",
              showMark: false,
              color: "#4682B4", // Blue for B+
            },
            {
              data: formatSeriesData("O+"),
              label: "O+",
              showMark: false,
              color: "#32CD32", 
            },
            {
              data: formatSeriesData("AB+"),
              label: "AB+",
              showMark: false,
              color: "#FFD700", 
            },
          ].filter((series) => series.data.length > 0)} // Ensure each series has data
          width={600}
          height={400}
        />
      ) : (
        <p>No data available for prediction.</p>
      )}
    </div>
  );
};

export default BloodDemandPrediction;
