import { useState } from "react";
import api from "../services/Api";
import ResultCard from "../components/ResultCard";
import { generateReport } from "../utils/generateReport";
import { savePrediction } from "../utils/history";
export default function Diabetes() {
  const [formData, setFormData] = useState({
    pregnancies: "",
    glucose: "",
    blood_pressure: "",
    skin_thickness: "",
    insulin: "",
    bmi: "",
    diabetes_pedigree: "",
    age: "",
  });

  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    setError("");
  };

  const predict = async () => {
    const emptyFields = Object.values(formData).some(
      (value) => value.trim() === ""
    );

    if (emptyFields) {
      setError("Please fill all health parameters before prediction");
      return;
    }

    try {
      setLoading(true);
      setResult(null);
      setError("");

      const response = await api.post("/predict/diabetes", {
        pregnancies: Number(formData.pregnancies),
        glucose: Number(formData.glucose),
        blood_pressure: Number(formData.blood_pressure),
        skin_thickness: Number(formData.skin_thickness),
        insulin: Number(formData.insulin),
        bmi: Number(formData.bmi),
        diabetes_pedigree: Number(formData.diabetes_pedigree),
        age: Number(formData.age),
      });
const prediction = response.data.result;


setResult(prediction);


savePrediction({
  disease: prediction.disease,
  probability: prediction.probability,
  risk: prediction.risk,
  date: new Date().toLocaleString()
});
      
    } catch (error) {
      setError("Prediction failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const fields = [
    ["pregnancies", "Pregnancies"],
    ["glucose", "Glucose Level"],
    ["blood_pressure", "Blood Pressure"],
    ["skin_thickness", "Skin Thickness"],
    ["insulin", "Insulin"],
    ["bmi", "BMI"],
    ["diabetes_pedigree", "Diabetes Pedigree"],
    ["age", "Age"],
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-100 p-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900">
          Diabetes Prediction 🩺
        </h1>

        <p className="text-gray-600 mt-2">
          Enter health parameters to estimate diabetes risk using machine
          learning.
        </p>

        <div className="bg-white rounded-2xl shadow-lg p-8 mt-8">
          {error && (
            <div className="mb-6 bg-red-100 border border-red-300 text-red-700 px-5 py-3 rounded-xl font-medium">
              ⚠️ {error}
            </div>
          )}

          <div className="grid md:grid-cols-2 gap-5">
            {fields.map(([name, label]) => (
              <div key={name}>
                <label className="block text-sm font-medium mb-2">
                  {label}
                </label>

                <input
                  type="number"
                  name={name}
                  value={(formData as any)[name]}
                  onChange={handleChange}
                  placeholder={`Enter ${label}`}
                  className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
            ))}
          </div>

          <button
            onClick={predict}
            disabled={loading}
            className="mt-8 w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold"
          >
            {loading ? "Analyzing..." : "Predict Diabetes Risk"}
          </button>
        </div>

        {result && (
          <>
            <ResultCard result={result} />

            <button
              onClick={() => generateReport("Diabetes", result)}
              className="mt-6 w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-semibold"
            >
              📄 Download PDF Report
            </button>
          </>
        )}
      </div>
    </div>
  );
}