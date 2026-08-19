import { Link } from "react-router-dom";

function Sidebar() {
    return (
        <div className="sidebar">
            <div className="p-3 border-bottom">
                <h4 className="text-white mb-0">
                    RestaurantRes
                </h4>
            </div>

            <div className="p-2">
                <Link to="/" className="d-block text-white p-2 text-decoration-none">
                    Dashboard
                </Link>

                <Link to="/clientes" className="d-block text-white p-2 text-decoration-none">
                    Clientes
                </Link>

                <Link to="/mesas" className="d-block text-white p-2 text-decoration-none">
                    Mesas
                </Link>

                <Link to="/turnos" className="d-block text-white p-2 text-decoration-none">
                    Turnos
                </Link>

                <Link to="/reservas" className="d-block text-white p-2 text-decoration-none">
                    Reservas
                </Link>
            </div>
        </div>
    );
}

export default Sidebar;