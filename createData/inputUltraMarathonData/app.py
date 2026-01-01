from flask import Flask, render_template, request, redirect
import csv
import os

app = Flask(__name__)

CSV_FILE = "ultra50kmRuns.csv"

# Ensure CSV file exists with headers
if not os.path.exists(CSV_FILE):
    with open(CSV_FILE, mode="w", newline="") as file:
        writer = csv.writer(file)
        writer.writerow([
            "Date",
            "Distance",
            "TotalTime",
            "MovingTime",
            "AveragePace",
            "AverageMovingPace",
            "ElevationGain",
            "ElevationDescent",
            "TerrainType",
            "RunType",
            "AvgHeartRate",
            "MaxHeartRate",
            "CaloriesBurnt",
            "EstimatedSweatLoss",
            "Felt",
            "LegFatigue",
            "Notes"
        ])

@app.route("/", methods=["GET", "POST"])
def index():
    if request.method == "POST":
        form_data = [
            request.form.get("Date"),
            request.form.get("Distance"),
            request.form.get("TotalTime"),
            request.form.get("MovingTime"),
            request.form.get("AveragePace"),
            request.form.get("AverageMovingPace"),
            request.form.get("ElevationGain"),
            request.form.get("ElevationDescent"),
            request.form.get("TerrainType"),
            request.form.get("RunType"),
            request.form.get("AvgHeartRate"),
            request.form.get("MaxHeartRate"),
            request.form.get("CaloriesBurnt"),
            request.form.get("EstimatedSweatLoss"),
            request.form.get("Felt"),
            request.form.get("LegFatigue"),
            request.form.get("Notes"),
        ]

        with open(CSV_FILE, mode="a", newline="") as file:
            writer = csv.writer(file)
            writer.writerow(form_data)

        return redirect("/")  # reload form

    return render_template("form.html")

if __name__ == "__main__":
    app.run(debug=True)
