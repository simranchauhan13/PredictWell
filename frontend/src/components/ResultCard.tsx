import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

type Result = {
  disease: string;
  probability: number;
  risk: string;
  recommendations?: string[];
};

export default function ResultCard({ result }: { result: Result }) {
  const color =
    result.risk === "High"
      ? "#dc2626"
      : result.risk === "Medium"
      ? "#ea580c"
      : "#16a34a";

  const bg =
    result.risk === "High"
      ? "bg-red-50"
      : result.risk === "Medium"
      ? "bg-orange-50"
      : "bg-green-50";

  return (
    <div className={`mt-8 rounded-3xl shadow-xl p-8 bg-white`}>
      <h2 className="text-3xl font-bold text-center mb-8">
        Prediction Result
      </h2>

      <div className="grid md:grid-cols-2 gap-10 items-center">

        <div className="w-56 h-56 mx-auto">
          <CircularProgressbar
            value={result.probability}
            text={`${result.probability}%`}
            styles={buildStyles({
              textColor: color,
              pathColor: color,
              trailColor: "#e5e7eb",
              textSize: "16px",
            })}
          />
        </div>

        <div>

          <div className={`${bg} rounded-2xl p-6`}>

            <h3 className="text-2xl font-bold">
              {result.disease}
            </h3>

            <p className="mt-3 text-gray-600">
              Risk Level
            </p>

            <span
              className="inline-block mt-2 px-5 py-2 rounded-full text-white font-semibold"
              style={{ background: color }}
            >
              {result.risk}
            </span>

          </div>

          {result.recommendations &&
            result.recommendations.length > 0 && (

            <div className="mt-8">

              <h3 className="text-xl font-bold mb-4">
                Health Recommendations
              </h3>

              <div className="space-y-3">

                {result.recommendations.map((item, index) => (

                  <div
                    key={index}
                    className="bg-blue-50 rounded-xl p-4"
                  >
                    ✅ {item}
                  </div>

                ))}

              </div>

            </div>

          )}

        </div>

      </div>
    </div>
  );
}