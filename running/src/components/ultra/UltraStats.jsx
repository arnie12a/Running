// src/components/ultra/UltraStats.jsx
import ultraRuns from "../../../dist/ultra50km.json";

export default function UltraStats() {
  const totalRuns = ultraRuns.length;

  const totalDistance = ultraRuns.reduce(
    (sum, run) => sum + Number(run.Distance || 0),
    0
  );

  const totalElevation = ultraRuns.reduce(
    (sum, run) => sum + Number(run.ElevationGain || 0),
    0
  );

  const avgHeartRate =
    ultraRuns.reduce((sum, run) => sum + Number(run.AvgHeartRate || 0), 0) /
    totalRuns;

  const avgFatigue =
    ultraRuns.reduce((sum, run) => sum + Number(run.LegFatigue || 0), 0) /
    totalRuns;

  return (
    <div>
      <h2>Marys Peak 50K Training</h2>
      <ul>
        <li>Total Runs: {totalRuns}</li>
        <li>Total Distance: {totalDistance.toFixed(1)} miles</li>
        <li>Total Elevation Gain: {totalElevation.toFixed(0)} ft</li>
        <li>Avg Heart Rate: {avgHeartRate.toFixed(0)} bpm</li>
        <li>Avg Leg Fatigue: {avgFatigue.toFixed(1)} / 5</li>
      </ul>
    </div>
  );
}
