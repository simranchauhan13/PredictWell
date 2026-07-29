import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import Diabetes from "./pages/Diabetes";
import Heart from "./pages/Heart";
import Parkinsons from "./pages/Parkinsons";

function App() {
  return (
    <BrowserRouter>

      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/diabetes" element={<Diabetes />} />
        <Route path="/heart" element={<Heart />} />
        <Route path="/parkinsons" element={<Parkinsons />} />
        <Route path="/dashboard" element={<Dashboard/>} />

      </Routes>

    </BrowserRouter>
  );
}

export default App;