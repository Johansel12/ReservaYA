import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import Clientes from "./pages/Clientes";
import Mesas from "./pages/Mesas";
import Turnos from "./pages/Turnos";
import Reservas from "./pages/Reservas";

function App() {
    return (
        <BrowserRouter>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container">
                    <Link className="navbar-brand" to="/">
                        Restaurant Reservation
                    </Link>

                    <div className="navbar-nav">
                        <Link className="nav-link" to="/">
                            Clientes
                        </Link>

                        <Link className="nav-link" to="/mesas">
                            Mesas
                        </Link>

                        <Link className="nav-link" to="/turnos">
                            Turnos
                        </Link>

                        <Link className="nav-link" to="/reservas">
                            Reservas
                        </Link>
                    </div>
                </div>
            </nav>

            <Routes>
                <Route path="/" element={<Clientes />} />
                <Route path="/mesas" element={<Mesas />} />
                <Route path="/turnos" element={<Turnos />} />
                <Route path="/reservas" element={<Reservas />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;