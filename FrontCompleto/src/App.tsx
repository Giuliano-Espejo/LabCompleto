import { DondeEstamos } from "./Components/DondeEstamos/DondeEstamos";
import Form from "./Components/Form/Form";
import Login from "./Components/Form/Login/Login";
import Register from "./Components/Form/Register/Register";
import Home from "./Components/Home/Home";
import Lista from "./Components/Lista/Lista";
import { NavBar } from "./Components/NavBar/NavBar"
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { RutaPrivada } from "./ControlAcceso/RutaPrivada";
import RolUsuario from "./ControlAcceso/RolUsuario";
import StatsExcel from "./Components/StatsExcel/StatsExcel";

function App() {
  return (
    <div className="app">
      <NavBar />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route element={<RolUsuario rol="ADMIN" />}>
            <Route path="/abm/:id" element={<Form />} />
          </Route>
          <Route path="/lista" element={
            <RutaPrivada>
              <Lista />
            </RutaPrivada>
          } />
          <Route element={<RolUsuario rol="ADMIN" />}>
            <Route path="/stats" element={<StatsExcel />} />
          </Route>
          <Route path="/DondeEstamos" element={<DondeEstamos />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
