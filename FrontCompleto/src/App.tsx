import { DondeEstamos } from "./Components/DondeEstamos/DondeEstamos";
import Form from "./Components/Form/Form";
import Home from "./Components/Home/Home";
import Lista from "./Components/Lista/Lista";
import { NavBar } from "./Components/NavBar/NavBar"
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="app">
      <NavBar />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/abm/:id" element={<Form />} />
          <Route path="/lista" element={<Lista />} />
          <Route path="/DondeEstamos" element={<DondeEstamos />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
