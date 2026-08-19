import { NavLink } from "react-router-dom";

function Sidebar() {
    return (
        <div className="sidebar">
            <div className="p-3 border-bottom">
                <h4 className="mb-0">
                    Reserva
                    <span style={{ color: "#C79A3C" }}>
                        YA
                    </span>
                </h4>

                <small className="text-secondary">
                    Restaurant Reservation System
                </small>
            </div>

            <div className="p-2">
                <NavLink
                    to="/"
                    end
                    className={({ isActive }) =>
                        `sidebar-link ${isActive ? "active" : ""}`
                    }
                >
                    Dashboard
                </NavLink>

                <NavLink
                    to="/clientes"
                    className={({ isActive }) =>
                        `sidebar-link ${isActive ? "active" : ""}`
                    }
                >
                    Clientes
                </NavLink>

                <NavLink
                    to="/mesas"
                    className={({ isActive }) =>
                        `sidebar-link ${isActive ? "active" : ""}`
                    }
                >
                    Mesas
                </NavLink>

                <NavLink
                    to="/turnos"
                    className={({ isActive }) =>
                        `sidebar-link ${isActive ? "active" : ""}`
                    }
                >
                    Turnos
                </NavLink>

                <NavLink
                    to="/reservas"
                    className={({ isActive }) =>
                        `sidebar-link ${isActive ? "active" : ""}`
                    }
                >
                    Reservas
                </NavLink>
            </div>
        </div>
    );
}

export default Sidebar;
