import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./components/layout/Layout";

import FloatingActionButton from "./components/ui/FloatingActionButton";
import Dashboard from "./pages/Dashboard";
import Clientes from "./pages/Clientes";
import Mesas from "./pages/Mesas";
import Turnos from "./pages/Turnos";
import Reservas from "./pages/Reservas";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<Layout />}>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/clientes" element={<Clientes />} />
                    <Route path="/mesas" element={<Mesas />} />
                    <Route path="/turnos" element={<Turnos />} />
                    <Route path="/reservas" element={<Reservas />} />
                   
                </Route>
            </Routes>

            <FloatingActionButton />

            <ToastContainer
                position="top-right"
                autoClose={3000}
                theme="light"
            />
        </BrowserRouter>
    );
}

export default App;