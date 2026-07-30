import {
  getPredictionHistory
} from "../utils/history";


import {
  Activity,
  ShieldCheck
} from "lucide-react";


import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend
} from "recharts";



export default function Dashboard(){


  const history = getPredictionHistory();



  const diabetes =
    history.filter(
      (item:any)=>item.disease==="Diabetes"
    ).length;


  const heart =
    history.filter(
      (item:any)=>item.disease==="Heart Disease"
    ).length;


  const parkinsons =
    history.filter(
      (item:any)=>item.disease.includes("Parkinson")
    ).length;



  const high =
    history.filter(
      (item:any)=>item.risk==="High"
    ).length;


  const medium =
    history.filter(
      (item:any)=>item.risk==="Medium"
    ).length;


  const low =
    history.filter(
      (item:any)=>item.risk==="Low"
    ).length;



  const diseaseData = [

    {
      name:"Diabetes",
      value:diabetes
    },

    {
      name:"Heart",
      value:heart
    },

    {
      name:"Parkinson",
      value:parkinsons
    }

  ];



  const riskData=[

    {
      name:"High",
      value:high
    },

    {
      name:"Medium",
      value:medium
    },

    {
      name:"Low",
      value:low
    }

  ];




return (

<div
className="
min-h-screen
bg-gradient-to-br
from-slate-950
to-blue-950
text-white
p-8
"
>


<div className="max-w-6xl mx-auto">


<h1 className="
text-5xl
font-bold
">

Health Analytics Overview

</h1>


<p className="
text-gray-400
mt-3
">

Track your disease predictions,
risk analysis and health insights.

</p>





{/* Stats */}


<div className="
grid
md:grid-cols-4
gap-6
mt-10
">


<StatCard
title="Total Predictions"
value={history.length}
icon={<Activity/>}
/>


<StatCard
title="High Risk"
value={high}
icon={<ShieldCheck/>}
/>


<StatCard
title="Medium Risk"
value={medium}
icon={<ShieldCheck/>}
/>


<StatCard
title="Low Risk"
value={low}
icon={<ShieldCheck/>}
/>


</div>







{/* Charts */}


<div className="
grid
md:grid-cols-2
gap-8
mt-12
">



<div className="
bg-white/10
rounded-3xl
p-6
">

<h2 className="
text-2xl
font-bold
mb-5
">

Disease Distribution

</h2>



<ResponsiveContainer
width="100%"
height={300}
>


<BarChart
data={diseaseData}
>


<XAxis
dataKey="name"
stroke="white"
/>


<YAxis
stroke="white"
/>


<Tooltip/>


<Bar
dataKey="value"
fill="#22d3ee"
/>


</BarChart>


</ResponsiveContainer>


</div>









<div className="
bg-white/10
rounded-3xl
p-6
">


<h2 className="
text-2xl
font-bold
mb-5
">

Risk Analysis

</h2>



<ResponsiveContainer
width="100%"
height={300}
>


<PieChart>


<Pie

data={riskData}

dataKey="value"

nameKey="name"

outerRadius={100}

>


{
riskData.map(
(_,index)=>(

<Cell
key={index}
fill={
index===0
?
"#ef4444"
:
index===1
?
"#f97316"
:
"#22c55e"
}
/>

)
)
}


</Pie>



<Legend/>

<Tooltip/>


</PieChart>


</ResponsiveContainer>



</div>


</div>







{/* History */}


<div className="
mt-12
bg-white/10
rounded-3xl
p-8
">


<h2 className="
text-3xl
font-bold
mb-6
">

Recent Predictions

</h2>



{
history.length===0

?

<p className="text-gray-400">
No predictions yet.
</p>


:

<div className="space-y-4">


{
history.map(
(item:any,index:number)=>(


<div
key={index}
className="
bg-white/10
rounded-xl
p-5
flex
justify-between
"
>


<div>

<h3 className="
text-xl
font-bold
">

{item.disease}

</h3>


<p className="text-gray-400">
{item.date}
</p>


</div>



<div className="text-right">


<p className="
text-2xl
font-bold
">

{item.probability}%

</p>


<p>
{item.risk}
</p>


</div>


</div>


)
)

}


</div>

}


</div>





</div>

</div>

)

}







function StatCard(
{
title,
value,
icon
}:any
){


return (

<div className="
bg-white/10
rounded-2xl
p-6
">


<div className="text-cyan-400">
{icon}
</div>


<h2 className="
text-4xl
font-bold
mt-4
">

{value}

</h2>


<p className="text-gray-400">
{title}
</p>


</div>

)

}