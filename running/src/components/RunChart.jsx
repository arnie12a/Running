import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Title, Tooltip, Legend);

const monthNames = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const RunChart = () => {
  const [runs, setRuns] = useState([]);
  const [chartData, setChartData] = useState(null);
  const [year, setYear] = useState("All");
  const [startMonth, setStartMonth] = useState("All");
  const [endMonth, setEndMonth] = useState("All");
  const [runGoal, setRunGoal] = useState("All");

  useEffect(() => {
    fetch(`${import.meta.env.BASE_URL}runs.json`)
      .then((res) => res.json())
      .then((data) => {
        setRuns(data);
      });
  }, []);

  const years = ["All", ...new Set(runs.map((r) => new Date(r.Date).getFullYear()))];
  const runGoals = ["All", ...new Set(runs.map((r) => r.RunGoal))];

  // Filter runs by year, month range, and goal
  const filteredRuns = runs.filter((run) => {
    const date = new Date(run.Date);
    const runYear = date.getFullYear();
    const runMonth = date.getMonth(); // 0-indexed (0 = Jan)

    const startIdx = startMonth === "All" ? 0 : monthNames.indexOf(startMonth);
    const endIdx = endMonth === "All" ? 11 : monthNames.indexOf(endMonth);

    return (
      (year === "All" || runYear === parseInt(year)) &&
      runMonth >= startIdx &&
      runMonth <= endIdx &&
      (runGoal === "All" || run.RunGoal === runGoal)
    );
  });

  useEffect(() => {
    if (filteredRuns.length > 0) {
      const labels = filteredRuns.map((r) => r.Date);
      const miles = filteredRuns.map((r) => parseFloat(r.Distance));

      setChartData({
        labels,
        datasets: [
          {
            label: "Miles Run",
            data: miles,
            borderColor: "#14b8a6",
            backgroundColor: "rgba(20, 184, 166, 0.2)",
            fill: true,
            tension: 0.3,
            pointRadius: 4,
            pointHoverRadius: 6,
          },
        ],
      });
    } else {
      setChartData(null);
    }
  }, [filteredRuns]);

  return (
    <div className="max-w-4xl mx-auto px-8 py-6 bg-white dark:bg-gray-900 rounded-2xl shadow-lg">
      <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800 dark:text-gray-100">
        Run Distance Over Time
      </h2>

      {/* Filter Controls */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
        {/* Year Filter */}
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Year</label>
          <select
            value={year}
            onChange={(e) => setYear(e.target.value)}
            className="p-2 rounded-md border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-100"
          >
            {years.map((y) => (
              <option key={y}>{y}</option>
            ))}
          </select>
        </div>

        {/* Month Range */}
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Month Range
          </label>
          <div className="flex gap-2">
            <select
              value={startMonth}
              onChange={(e) => setStartMonth(e.target.value)}
              className="flex-1 p-2 rounded-md border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-100"
            >
              {["All", ...monthNames].map((m) => (
                <option key={m}>{m}</option>
              ))}
            </select>
            <span className="self-center text-gray-600 dark:text-gray-400">to</span>
            <select
              value={endMonth}
              onChange={(e) => setEndMonth(e.target.value)}
              className="flex-1 p-2 rounded-md border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-100"
            >
              {["All", ...monthNames].map((m) => (
                <option key={m}>{m}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Run Goal */}
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Run Goal</label>
          <select
            value={runGoal}
            onChange={(e) => setRunGoal(e.target.value)}
            className="p-2 rounded-md border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-100"
          >
            {runGoals.map((g) => (
              <option key={g}>{g}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Chart */}
      <div className="px-4 sm:px-10">
        {chartData ? (
          <Line
            data={chartData}
            options={{
              maintainAspectRatio: false,
              animation: false,
              plugins: { legend: { display: true } },
              layout: { padding: { left: 100, right: 100 } },
            }}
            height={400}
          />
        ) : (
          <p className="text-center text-gray-600 dark:text-gray-400">
            No data available for selected filters.
          </p>
        )}
      </div>
    </div>
  );
};

export default RunChart;
