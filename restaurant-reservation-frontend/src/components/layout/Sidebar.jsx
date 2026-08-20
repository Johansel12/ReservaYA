import { NavLink } from "react-router-dom";

import {
    LayoutDashboard,
    Users,
    UtensilsCrossed,
    Clock3,
    CalendarDays
} from "lucide-react";

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
                    Sistema de Gestión de Reservas
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
                    <LayoutDashboard size={18} />
                    <span>Dashboard</span>
                </NavLink>

                <NavLink
                    to="/clientes"
                    className={({ isActive }) =>
                        `sidebar-link ${isActive ? "active" : ""}`
                    }
                >
                    <Users size={18} />
                    <span>Clientes</span>
                </NavLink>

                <NavLink
                    to="/mesas"
                    className={({ isActive }) =>
                        `sidebar-link ${isActive ? "active" : ""}`
                    }
                >
                    <UtensilsCrossed size={18} />
                    <span>Mesas</span>
                </NavLink>

                <NavLink
                    to="/turnos"
                    className={({ isActive }) =>
                        `sidebar-link ${isActive ? "active" : ""}`
                    }
                >
                    <Clock3 size={18} />
                    <span>Turnos</span>
                </NavLink>

                <NavLink
                    to="/reservas"
                    className={({ isActive }) =>
                        `sidebar-link ${isActive ? "active" : ""}`
                    }
                >
                    <CalendarDays size={18} />
                    <span>Reservas</span>
                </NavLink>

            </div>

            <div className="sidebar-info">
                <h6>✨ ReservaYA</h6>

                <p>
                    Administra clientes, mesas,
                    turnos y reservas desde un
                    solo lugar.
                </p>

                <small>
                    v1.0
                </small>
            </div>

        </div>
    );
}

export default Sidebar;