import * as React from "react";
import { LineChart } from "@mui/x-charts/LineChart";
import Services from "../../services/Services";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import localeData from "dayjs/plugin/localeData"; // Import localeData plugin

// Extend dayjs with localeData to get month names
dayjs.extend(localeData);

const BasicLineChart = ({ token }) => {
  const [dates, setDates] = useState([]);
  const [counts, setCounts] = useState([]);
  const [error, setError] = useState(null);
  const [granularity, setGranularity] = useState("day"); // 'day' or 'month'
  const [selectedMonth, setSelectedMonth] = useState(dayjs().month()); // Default to current month
  const [selectedYear, setSelectedYear] = useState(dayjs().year()); // Default to current year

  useEffect(() => {
    getBloodRequests();
  }, [token, granularity, selectedMonth, selectedYear]);

  const getBloodRequests = () => {
    Services.getBloodRequests(token)
      .then((response) => {
        const formattedData = formatChartData(
          response.data,
          granularity,
          selectedMonth,
          selectedYear
        );
        setDates(formattedData.dates);
        setCounts(formattedData.counts);
      })
      .catch((error) => {
        console.error("Error fetching blood requests:", error);
        setError(error);
      });
  };

  const formatChartData = (data, granularity, selectedMonth, selectedYear) => {
    const requestCountByDate = {};

    data.forEach((request) => {
      const requestDate = dayjs(request.reqDate);
      const date =
        granularity === "month"
          ? requestDate.format("MMM") // Group by month (Jan, Feb, Mar)
          : requestDate.format("D"); // Group by day (1, 2, 3)

      // Filter by selected month/year for day granularity or by year for month granularity
      if (
        (granularity === "day" &&
          requestDate.month() === selectedMonth &&
          requestDate.year() === selectedYear) ||
        (granularity === "month" && requestDate.year() === selectedYear)
      ) {
        if (requestCountByDate[date]) {
          requestCountByDate[date]++;
        } else {
          requestCountByDate[date] = 1;
        }
      }
    });

    const completeDates =
      granularity === "month"
        ? dayjs.monthsShort() // Use dayjs to get month names
        : Array.from(
            { length: dayjs(`${selectedYear}-${selectedMonth + 1}`).daysInMonth() }, // Days in selected month
            (_, i) => (i + 1).toString()
          ); // All days (1-31) for selected month

    const completeCounts = completeDates.map(
      (date) => requestCountByDate[date] || 0
    );

    return {
      dates: completeDates,
      counts: completeCounts,
    };
  };

  // Generate arrays for years (for selection)
  const years = Array.from(
    { length: 5 }, // 5 years range (customize as needed)
    (_, i) => dayjs().year() - i
  );

  return (
    <div>
      <div className="selectors text-xs rounded-s flex gap-4">
        <div className="granularity-selector mb-2">
          <label>Show by: </label>
          <select
            value={granularity}
            onChange={(e) => setGranularity(e.target.value)}
            className="bg-white text-gray-500 border border-gray-300 rounded-3xl p-1 ml-2"
          >
            <option className="text-xs" value="day">
              Day
            </option>
            <option className="text-xs" value="month">
              Month
            </option>
          </select>
        </div>

        {granularity === "day" && (
          <div className="month-selector mb-2">
            <label> Month: </label>
            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
              className="bg-white text-gray-500 border border-gray-300 rounded-3xl p-1 ml-2"
            >
              {dayjs.months().map((month, index) => (
                <option key={index} value={index}>
                  {month}
                </option>
              ))}
            </select>
          </div>
        )}

        <div className="year-selector">
          <label>Year: </label>
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(parseInt(e.target.value))}
            className="bg-white text-gray-500 border border-gray-300 rounded-3xl p-1 ml-2"
          >
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
      </div>

      {dates.length > 0 && counts.length > 0 ? (
        <LineChart
          xAxis={[
            {
              data: dates, // Use complete dates (days or months) as x-axis data
              scaleType: "band", // Treat x-axis as categorical (discrete) data
            },
          ]}
          series={[
            {
              data: counts, // Use counts (including zeros for missing data) as y-axis data
              color: "#FF6347", // Set the line color
              showMark: false,
            },
          ]}
          width={500}
          height={200}
        />
      ) : (
        <p>No data available to display the chart.</p>
      )}
    </div>
  );
};

export default BasicLineChart;
