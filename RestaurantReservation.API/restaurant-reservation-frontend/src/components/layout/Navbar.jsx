function Navbar() {
    const fecha = new Date().toLocaleDateString("es-DO", {
        day: "numeric",
        month: "long",
        year: "numeric"
    });

    return (
        <nav className="topbar">
            <div className="d-flex justify-content-between align-items-center">

                <div>
                    <h5 className="mb-0 fw-bold">
                        ReservaYA
                    </h5>

                    <small className="text-muted">
                        Sistema de Gestión de Reservas
                    </small>
                </div>

                <div className="text-end">
                    <div className="fw-semibold">
                        Panel Administrativo
                    </div>

                    <small className="text-muted">
                        {fecha}
                    </small>
                </div>

            </div>
        </nav>
    );
}

export default Navbar;