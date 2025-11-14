
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
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Paper,
  Typography,
} from "@mui/material";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Title, Tooltip, Legend);

const monthNames = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const RunChart = () => {
  const [runs, setRuns] = useState([]);
  const [chartData, setChartData] = useState(null);
  const [granularity, setGranularity] = useState("Daily"); // Only input left

  useEffect(() => {
    fetch(`${import.meta.env.BASE_URL}runs.json`)
      .then((res) => res.json())
      .then((data) => {
        setRuns(data);
      });
  }, []);

  // Chart data builder
  useEffect(() => {
    if (runs.length > 0) {
      if (granularity === "Daily") {
        const labels = runs.map((r) => r.Date);
        const miles = runs.map((r) => parseFloat(r.Distance));

        setChartData({
          labels,
          datasets: [
            {
              label: "Miles Run (Daily)",
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
        // Monthly aggregation
        const monthlyTotals = {};
        runs.forEach((r) => {
          const d = new Date(r.Date);
          const key = `${monthNames[d.getMonth()]} ${d.getFullYear()}`;
          monthlyTotals[key] = (monthlyTotals[key] || 0) + parseFloat(r.Distance);
        });

        const labels = Object.keys(monthlyTotals);
        const miles = Object.values(monthlyTotals);

        setChartData({
          labels,
          datasets: [
            {
              label: "Miles Run (Monthly Total)",
              data: miles,
              borderColor: "#6366f1",
              backgroundColor: "rgba(99, 102, 241, 0.2)",
              fill: true,
              tension: 0.3,
              pointRadius: 4,
              pointHoverRadius: 6,
            },
          ],
        });
      }
    } else {
      setChartData(null);
    }
  }, [runs, granularity]);

  return (
    <Paper elevation={4} sx={{ maxWidth: 900, mx: "auto", p: 4 }}>
      <Typography variant="h5" align="center" gutterBottom>
        Run Distance Over Time
      </Typography>

      {/* Granularity Control (Material UI) */}
      <Box sx={{ display: "flex", justifyContent: "center", mb: 4 }}>
        <FormControl sx={{ minWidth: 200 }}>
          <Select
            labelId="granularity-label"
            value={granularity}
            onChange={(e) => setGranularity(e.target.value)}
          >
            <MenuItem value="Daily">Daily</MenuItem>
            <MenuItem value="Monthly">Monthly</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {/* Chart */}
      <Box sx={{ px: 4 }}>
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
          <Typography align="center" color="text.secondary">
            No data available.
          </Typography>
        )}
      </Box>
    </Paper>
  );
};

export default RunChart;
