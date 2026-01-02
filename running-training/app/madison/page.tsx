import runs from "@/data/madisonRuns.json"

export default function MadisonPage() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6">
        🏃 Madison Marathon Training
      </h1>

      {/* <div className="space-y-4">
        {runs.map((run, idx) => (
          <RunCard
            key={idx}
            date={run.Date}
            distance={run.Distance}
            time={run.Time}
            pace={run.AveragePace}
            notes={run.Notes}
            goal={run.RunGoal}
          />
        ))}
      </div> */}
    </main>
  )
}
