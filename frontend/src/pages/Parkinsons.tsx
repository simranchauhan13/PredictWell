import { useState } from "react";
import api from "../services/api";
import ResultCard from "../components/ResultCard";
import { generateReport } from "../utils/generateReport";
import { savePrediction } from "../utils/history";


export default function Parkinsons() {


  const [formData, setFormData] = useState<any>({

    "MDVP:Fo(Hz)": "",
    "MDVP:Fhi(Hz)": "",
    "MDVP:Flo(Hz)": "",
    "MDVP:Jitter(%)": "",
    "MDVP:Jitter(Abs)": "",
    "MDVP:RAP": "",
    "MDVP:PPQ": "",
    "Jitter:DDP": "",
    "MDVP:Shimmer": "",
    "MDVP:Shimmer(dB)": "",
    "Shimmer:APQ3": "",
    "Shimmer:APQ5": "",
    "MDVP:APQ": "",
    "Shimmer:DDA": "",
    "NHR": "",
    "HNR": "",
    "RPDE": "",
    "DFA": "",
    "spread1": "",
    "spread2": "",
    "D2": "",
    "PPE": ""

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
        value => value.toString().trim() === ""
      );



    if(emptyField){


      setError(
        "Please fill all voice parameters before prediction"
      );


      return;

    }






    try{


      setLoading(true);

      setResult(null);

      setError("");





      const payload:any = {};



      Object.keys(formData).forEach(key=>{


        payload[key] = Number(formData[key]);


      });







      const response = await api.post(

        "/predict/parkinsons",

        payload

      );





      const prediction = response.data.result;




      setResult(prediction);





      // Save Prediction History

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






  const fields = Object.keys(formData);







  return (


    <div className="
    min-h-screen
    bg-gradient-to-br
    from-purple-50
    to-indigo-100
    p-8
    ">



      <div className="max-w-5xl mx-auto">






        <h1 className="
        text-4xl
        font-bold
        text-gray-900
        ">

          Parkinson's Disease Prediction 🧠

        </h1>





        <p className="
        mt-2
        text-gray-600
        ">

          Analyze voice biomarkers and neurological features
          using machine learning.

        </p>








        <div className="
        bg-white
        rounded-3xl
        shadow-xl
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
          fields.map((field)=>(



            <div key={field}>


              <label className="
              block
              text-sm
              font-medium
              mb-2
              ">

                {field}

              </label>






              <input


                type="number"


                name={field}


                value={formData[field]}


                onChange={handleChange}


                placeholder={`Enter ${field}`}


                className="
                w-full
                border
                rounded-xl
                px-4
                py-3
                outline-none
                focus:ring-2
                focus:ring-purple-400
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
          bg-purple-600
          hover:bg-purple-700
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

          "Predict Parkinson Risk"

        }





        </button>





        </div>













        {
          result && (


            <>


              <ResultCard result={result} />





              <button

                onClick={() =>
                  generateReport(
                    "Parkinson's Disease",
                    result
                  )
                }


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