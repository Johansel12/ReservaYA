import { useEffect, useState } from "react";

import PageHeader from "../components/ui/PageHeader";
import StatCard from "../components/ui/StatCard";

import {
    clienteService,
    mesaService,
    turnoService,
    reservaService
} from "../services/API";

function Dashboard() {
    const [clientes, setClientes] = useState(0);
    const [mesas, setMesas] = useState(0);
    const [turnos, setTurnos] = useState(0);
    const [reservas, setReservas] = useState(0);

    useEffect(() => {
        cargarDatos();
    }, []);

    const cargarDatos = async () => {
        try {
            const [
                clientesRes,
                mesasRes,
                turnosRes,
                reservasRes
            ] = await Promise.all([
                clienteService.getAll(),
                mesaService.getAll(),
                turnoService.getAll(),
                reservaService.getAll()
            ]);

            setClientes(clientesRes.data.length);
            setMesas(mesasRes.data.length);
            setTurnos(turnosRes.data.length);
            setReservas(reservasRes.data.length);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            <PageHeader
                title="Dashboard"
                subtitle="Resumen general del sistema"
            />

            <div className="row g-3">
                <div className="col-md-3">
                    <StatCard
                        label="Clientes"
                        value={clientes}
                    />
                </div>

                <div className="col-md-3">
                    <StatCard
                        label="Mesas"
                        value={mesas}
                    />
                </div>

                <div className="col-md-3">
                    <StatCard
                        label="Turnos"
                        value={turnos}
                    />
                </div>

                <div className="col-md-3">
                    <StatCard
                        label="Reservas"
                        value={reservas}
                    />
                </div>
            </div>
        </>
    );
}

export default Dashboard;