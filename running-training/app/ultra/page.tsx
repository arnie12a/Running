import runs from "@/data/ultra50km.json"

export default function UltraPage() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6">🏔️ 50K Ultra Training</h1>

      {/* <div className="space-y-4">
        {runs.map((run, idx) => (
          <RunCard
            key={idx}
            date={run.Date}
            distance={run.Distance}
            time={`${run.TotalTime} min`}
            pace={`${run.AveragePace} min/mi`}
            notes={run.Notes}
          />
        ))} 
      </div>*/}
    </main>
  )
}
