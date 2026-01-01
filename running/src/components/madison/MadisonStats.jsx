// src/components/madison/MadisonStats.jsx
import madisonRuns from "../../../public/madisonRuns.json"

export default function MadisonStats() {
  const totalRuns = madisonRuns.length;

  const totalDistance = madisonRuns.reduce(
    (sum, run) => sum + Number(run.Distance || 0),
    0
  );

  const longestRun = Math.max(
    ...madisonRuns.map(run => Number(run.Distance || 0))
  );

  const avgPaceSeconds =
    madisonRuns.reduce((sum, run) => {
      if (!run.AveragePace) return sum;
      const [m, s] = run.AveragePace.split(":").map(Number);
      return sum + (m * 60 + s);
    }, 0) / madisonRuns.length;

  const avgPaceFormatted = `${Math.floor(avgPaceSeconds / 60)}:${String(
    Math.round(avgPaceSeconds % 60)
  ).padStart(2, "0")}`;

  return (
    <div>
      <h2>Madison Marathon Training</h2>
      <ul>
        <li>Total Runs: {totalRuns}</li>
        <li>Total Distance: {totalDistance.toFixed(1)} miles</li>
        <li>Longest Run: {longestRun} miles</li>
        <li>Avg Pace: {avgPaceFormatted} / mile</li>
      </ul>
    </div>
  );
}
