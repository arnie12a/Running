
import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Paper,
  Box,
} from "@mui/material";

const RunStats = () => {
  const [stats, setStats] = useState({
    totalMiles: 0,
    totalTime: "0:00",
    avgPace: "0:00",
    last6MonthsMiles: 0,
  });

  useEffect(() => {
    fetch(`${import.meta.env.BASE_URL}madisonRuns.json`)
      .then((res) => res.json())
      .then((runs) => {
        if (runs.length === 0) return;

        const totalMiles = runs.reduce((sum, r) => sum + parseFloat(r.Distance || 0), 0);

        const totalSeconds = runs.reduce((sum, r) => {
          const parts = r.Time.split(":").map(Number);
          const seconds =
            parts.length === 3
              ? parts[0] * 3600 + parts[1] * 60 + parts[2]
              : parts[0] * 60 + parts[1];
          return sum + seconds;
        }, 0);

        const avgPaceSeconds = totalMiles > 0 ? totalSeconds / totalMiles : 0;
        const avgMin = Math.floor(avgPaceSeconds / 60);
        const avgSec = Math.round(avgPaceSeconds % 60)
          .toString()
          .padStart(2, "0");

        const totalHours = Math.floor(totalSeconds / 3600);
        const totalMins = Math.floor((totalSeconds % 3600) / 60);
        const totalSecs = Math.round(totalSeconds % 60)
          .toString()
          .padStart(2, "0");

        const oneMonthAgo = new Date();
        oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
        const last6MonthsMiles = runs.reduce((sum, r) => {
          const date = new Date(r.Date);
          return date >= oneMonthAgo ? sum + parseFloat(r.Distance || 0) : sum;
        }, 0);

        setStats({
          totalMiles: totalMiles.toFixed(1),
          totalTime: `${totalHours}:${totalMins.toString().padStart(2, "0")}:${totalSecs}`,
          avgPace: `${avgMin}:${avgSec}`,
          last6MonthsMiles: last6MonthsMiles.toFixed(1),
        });
      });
  }, []);

  return (
    <Paper elevation={4} sx={{ maxWidth: 900, mx: "auto", p: 4 }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",   // centers horizontally
          justifyContent: "center", // centers vertically
          textAlign: "center",
        }}
      >
        <Typography variant="h5" gutterBottom>
          Overall Stats
        </Typography>

        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h6" align="center">Total Mileage</Typography>
                <Typography variant="body1" color="text.secondary" align="center">
                  {stats.totalMiles} miles
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h6" align="center">Last Month</Typography>
                <Typography variant="body1" color="text.secondary" align="center">
                  {stats.last6MonthsMiles} miles
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h6" align="center">Total Time</Typography>
                <Typography variant="body1" color="text.secondary" align="center">
                  {stats.totalTime}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h6" align="center">Average Pace</Typography>
                <Typography variant="body1" color="text.secondary" align="center">
                  {stats.avgPace} /mile
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
};

export default RunStats;
