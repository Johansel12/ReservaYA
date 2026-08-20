import { useState } from "react";
import { Link } from "react-router-dom";

import {
    Plus,
    Users,
    UtensilsCrossed,
    Clock3,
    CalendarDays
} from "lucide-react";

function FloatingActionButton() {
    const [open, setOpen] = useState(false);

    return (
        <div className="fab-container">

            {open && (
                <>
                    <Link
                        to="/clientes"
                        className="fab-option fab-top"
                    >
                        <Users size={16} />
                        <span className="fab-tooltip">
                            Clientes
                        </span>
                    </Link>

                    <Link
                        to="/mesas"
                        className="fab-option fab-right"
                    >
                        <span className="fab-tooltip">
                            Mesas
                        </span>
                        <UtensilsCrossed size={18} />
                    </Link>

                    <Link
                        to="/turnos"
                        className="fab-option fab-bottom"
                    >
                        <span className="fab-tooltip">
                            Turnos
                        </span>
                        <Clock3 size={18} />
                    </Link>

                    <Link
                        to="/reservas"
                        className="fab-option fab-left"
                    >
                        <span className="fab-tooltip">
                            Reservas
                        </span>
                        <CalendarDays size={18} />
                    </Link>
                </>
            )}

            <button
                className={`fab-main ${open ? "open" : ""}`}
                onClick={() => setOpen(!open)}
            >
                <Plus size={20} />
            </button>

        </div>
    );
}

export default FloatingActionButton;