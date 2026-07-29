import { Link } from "react-router-dom";
import {
  Activity,
  LayoutDashboard,
  Home,
  HeartPulse
} from "lucide-react";


export default function Navbar(){

return (

<nav className="
bg-[#050816]
text-white
px-8
py-5
flex
justify-between
items-center
shadow-lg
">


<Link
to="/"
className="
flex
items-center
gap-2
text-2xl
font-bold
"
>

<Activity
className="text-cyan-400"
/>

Predict
<span className="text-cyan-400">
Well
</span>

</Link>




<div className="
flex
gap-6
items-center
">


<Link
to="/"
className="
flex
gap-2
items-center
hover:text-cyan-400
"
>

<Home size={18}/>
Home

</Link>



<Link
to="/dashboard"
className="
flex
gap-2
items-center
hover:text-cyan-400
"
>

<LayoutDashboard size={18}/>
Dashboard

</Link>



<Link
to="/heart"
className="
flex
gap-2
items-center
hover:text-cyan-400
"
>

<HeartPulse size={18}/>
Predict

</Link>



</div>


</nav>

)

}