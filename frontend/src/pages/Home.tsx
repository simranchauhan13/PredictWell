import { Link } from "react-router-dom";
import PredictionHistory from "../components/PredictionHistory";
import {
  HeartPulse,
  Activity,
  Brain,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  Database,
  Cpu
} from "lucide-react";


export default function Home() {

  return (

    <div className="min-h-screen bg-[#050816] text-white overflow-hidden">


      {/* Background Glow */}

      <div className="absolute top-20 left-20 w-72 h-72 bg-cyan-500/20 rounded-full blur-3xl"></div>

      <div className="absolute right-20 top-40 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl"></div>



      <div className="relative max-w-6xl mx-auto px-6 py-16">


        {/* Hero */}
        

        <div className="text-center">


          <div className="flex justify-center items-center gap-3">

            <Sparkles 
              className="text-cyan-400"
              size={38}
            />


            <h1 className="text-6xl font-bold tracking-tight">

              Predict<span className="text-cyan-400">
                Well
              </span>

            </h1>


          </div>



          <p className="mt-6 text-2xl text-gray-300">

            AI-powered Healthcare Intelligence Platform

          </p>



          <p className="mt-4 max-w-2xl mx-auto text-gray-400">

            Predict diabetes, heart disease and Parkinson's risk using
            advanced machine learning models with real-time health insights.

          </p>



          <div className="flex justify-center gap-4 mt-8">


            <Link
              to="/diabetes"
              className="
              px-6 py-3 rounded-xl
              bg-cyan-500 text-black font-semibold
              hover:bg-cyan-400 transition
              flex items-center gap-2
              "
            >

              Start Prediction

              <ArrowRight size={18}/>

            </Link>


          </div>


        </div>





        {/* Stats */}

        <div className="grid md:grid-cols-3 gap-6 mt-20">


          <div className="
          bg-white/10 backdrop-blur-lg
          border border-white/10
          rounded-2xl p-6 text-center
          ">

            <Activity 
              className="mx-auto text-cyan-400"
              size={35}
            />

            <h2 className="text-3xl font-bold mt-3">
              3+
            </h2>

            <p className="text-gray-400">
              Diseases Covered
            </p>

          </div>





          <div className="
          bg-white/10 backdrop-blur-lg
          border border-white/10
          rounded-2xl p-6 text-center
          ">


            <Cpu
              className="mx-auto text-purple-400"
              size={35}
            />


            <h2 className="text-3xl font-bold mt-3">
              ML
            </h2>


            <p className="text-gray-400">
              Random Forest Models
            </p>


          </div>





          <div className="
          bg-white/10 backdrop-blur-lg
          border border-white/10
          rounded-2xl p-6 text-center
          ">


            <ShieldCheck
              className="mx-auto text-green-400"
              size={35}
            />


            <h2 className="text-3xl font-bold mt-3">
              Real-Time
            </h2>


            <p className="text-gray-400">
              Risk Prediction
            </p>


          </div>


        </div>






        {/* Disease Cards */}


        <div className="grid md:grid-cols-3 gap-8 mt-16">



          {/* Diabetes */}

          <Link
            to="/diabetes"
            className="
            group
            bg-white/10 backdrop-blur-xl
            border border-white/10
            rounded-3xl p-8
            hover:bg-white/15
            transition
            "
          >


            <Activity
              className="text-cyan-400"
              size={45}
            />


            <h2 className="text-3xl font-bold mt-5">

              Diabetes Prediction

            </h2>


            <p className="text-gray-400 mt-3">

              Analyze glucose, BMI and health parameters
              using trained machine learning models.

            </p>


            <div className="mt-6 flex items-center text-cyan-400">

              Analyze Risk

              <ArrowRight 
                className="ml-2 group-hover:translate-x-2 transition"
              />

            </div>


          </Link>





          {/* Heart */}

          <Link
            to="/heart"
            className="
            group
            bg-white/10 backdrop-blur-xl
            border border-white/10
            rounded-3xl p-8
            hover:bg-white/15
            transition
            "
          >


            <HeartPulse
              className="text-red-400"
              size={45}
            />


            <h2 className="text-3xl font-bold mt-5">

              Heart Disease Prediction

            </h2>


            <p className="text-gray-400 mt-3">

              Estimate cardiac risk using Random Forest
              classification models.

            </p>


            <div className="mt-6 flex items-center text-red-400">

              Analyze Risk

              <ArrowRight 
                className="ml-2 group-hover:translate-x-2 transition"
              />

            </div>


          </Link>





          {/* Parkinson */}

          <Link
            to="/parkinsons"
            className="
            group
            bg-white/10 backdrop-blur-xl
            border border-white/10
            rounded-3xl p-8
            hover:bg-white/15
            transition
            "
          >


            <Brain
              className="text-purple-400"
              size={45}
            />


            <h2 className="text-3xl font-bold mt-5">

              Parkinson's Prediction

            </h2>


            <p className="text-gray-400 mt-3">

              Analyze voice biomarkers and neurological
              parameters using machine learning models.

            </p>


            <div className="mt-6 flex items-center text-purple-400">

              Analyze Risk

              <ArrowRight 
                className="ml-2 group-hover:translate-x-2 transition"
              />

            </div>


          </Link>


        </div>







        {/* ML Pipeline */}


        <div className="
        mt-16
        bg-white/5
        border border-white/10
        rounded-3xl
        p-8
        ">


          <h2 className="text-2xl font-bold text-center">
            How PredictWell Works
          </h2>



          <div className="grid md:grid-cols-5 gap-5 mt-8 text-center">


            {[
              "Patient Data",
              "Preprocessing",
              "Feature Engineering",
              "ML Model",
              "Risk Prediction"
            ].map((item,index)=>(


              <div
                key={index}
                className="
                bg-white/10
                rounded-xl
                p-4
                "
              >

                {index===0 && 
                <Database className="mx-auto text-cyan-400"/>}

                {index!==0 && 
                <Brain className="mx-auto text-purple-400"/>}


                <p className="mt-3 text-sm text-gray-300">
                  {item}
                </p>


              </div>


            ))}


          </div>


        </div>


      </div>
      <PredictionHistory />

    </div>

  );
}