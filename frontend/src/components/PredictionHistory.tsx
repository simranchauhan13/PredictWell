import { useEffect, useState } from "react";
import { getPredictionHistory } from "../utils/history";


export default function PredictionHistory(){

const [history,setHistory]=useState<any[]>([]);



useEffect(()=>{

 setHistory(
   getPredictionHistory()
 );

},[]);



return(

<div className="
mt-10
bg-white
rounded-3xl
shadow-lg
p-8
">


<h2 className="
text-2xl
font-bold
mb-5
">

Recent Predictions

</h2>



{
history.length===0 ? (

<p className="text-gray-500">
No predictions yet
</p>

)

:

history.map((item,index)=>(


<div
key={index}
className="
border
rounded-xl
p-4
mb-4
flex
justify-between
items-center
"
>


<div>

<p className="font-bold">
{item.disease}
</p>


<p className="text-gray-500 text-sm">
{item.date}
</p>

</div>



<div className="text-right">


<p className="font-semibold">
{item.probability}%
</p>


<span className="
px-3
py-1
rounded-full
bg-gray-100
text-sm
">

{item.risk}

</span>


</div>


</div>


))

}


</div>

);

}