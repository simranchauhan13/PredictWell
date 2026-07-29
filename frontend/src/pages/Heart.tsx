import { useState } from "react";
import api from "../services/api";
import ResultCard from "../components/ResultCard";
import { generateReport } from "../utils/generateReport";
import { savePrediction } from "../utils/history";


export default function Heart() {


  const [formData, setFormData] = useState({
    age: "",
    sex: "",
    cp: "",
    trestbps: "",
    chol: "",
    fbs: "",
    restecg: "",
    thalach: "",
    exang: "",
    oldpeak: "",
    slope: "",
    ca: "",
    thal: "",
  });



  const [result,setResult] = useState<any>(null);
  const [loading,setLoading] = useState(false);
  const [error,setError] = useState("");




  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {


    setFormData({

      ...formData,
      [e.target.name]: e.target.value

    });


    setError("");

  };






  const predict = async()=>{


    const emptyField = Object.values(formData)
      .some(
        value => value.trim() === ""
      );



    if(emptyField){


      setError(
        "Please fill all health parameters before prediction"
      );


      return;

    }





    try{


      setLoading(true);

      setResult(null);

      setError("");




      const response = await api.post(

        "/predict/heart",

        {

          age:Number(formData.age),

          sex:Number(formData.sex),

          cp:Number(formData.cp),

          trestbps:Number(formData.trestbps),

          chol:Number(formData.chol),

          fbs:Number(formData.fbs),

          restecg:Number(formData.restecg),

          thalach:Number(formData.thalach),

          exang:Number(formData.exang),

          oldpeak:Number(formData.oldpeak),

          slope:Number(formData.slope),

          ca:Number(formData.ca),

          thal:Number(formData.thal)

        }

      );



      const prediction = response.data.result;



      setResult(prediction);



      // Save prediction history

      savePrediction({

        disease: prediction.disease,

        probability: prediction.probability,

        risk: prediction.risk,

        date: new Date().toLocaleString()

      });




    }


    catch(error){


      console.log(error);


      setError(

        "Prediction failed. Please check backend connection."

      );


    }


    finally{


      setLoading(false);


    }


  };






  const fields = [

    ["age","Age"],

    ["sex","Sex (0 = Female, 1 = Male)"],

    ["cp","Chest Pain Type"],

    ["trestbps","Resting Blood Pressure"],

    ["chol","Cholesterol"],

    ["fbs","Fasting Blood Sugar"],

    ["restecg","Rest ECG"],

    ["thalach","Maximum Heart Rate"],

    ["exang","Exercise Angina"],

    ["oldpeak","Old Peak"],

    ["slope","Slope"],

    ["ca","Major Vessels"],

    ["thal","Thal"]

  ];






return (


<div className="
min-h-screen
bg-gradient-to-br
from-red-50
to-orange-100
p-8
">



<div className="max-w-3xl mx-auto">



<h1 className="
text-4xl
font-bold
text-gray-900
">

Heart Disease Prediction ❤️

</h1>




<p className="text-gray-600 mt-2">

Analyze cardiac parameters using machine learning
to estimate heart disease risk.

</p>






<div className="
bg-white
rounded-2xl
shadow-lg
p-8
mt-8
">





{
error && (


<div className="
mb-6
bg-red-100
border
border-red-300
text-red-700
px-5
py-3
rounded-xl
">


⚠️ {error}


</div>


)

}







<div className="
grid
md:grid-cols-2
gap-5
">





{

fields.map(([name,label])=>(


<div key={name}>


<label className="
block
text-sm
font-medium
mb-2
">

{label}

</label>




<input


type="number"


name={name}


value={(formData as any)[name]}


onChange={handleChange}


placeholder={`Enter ${label}`}


className="
w-full
border
rounded-xl
px-4
py-3
outline-none
focus:ring-2
focus:ring-red-400
"


/>



</div>


))


}





</div>







<button


onClick={predict}


disabled={loading}


className="
mt-8
w-full
bg-red-600
hover:bg-red-700
disabled:bg-gray-400
text-white
py-3
rounded-xl
font-semibold
"


>



{

loading

?

"Analyzing..."

:

"Predict Heart Risk"

}



</button>





</div>









{

result && (

<>


<ResultCard result={result} />




<button

onClick={() => generateReport(
  "Heart Disease",
  result
)}

className="
mt-6
w-full
bg-green-600
hover:bg-green-700
text-white
py-3
rounded-xl
font-semibold
transition
"

>

📄 Download PDF Report


</button>



</>


)


}





</div>


</div>


);


}