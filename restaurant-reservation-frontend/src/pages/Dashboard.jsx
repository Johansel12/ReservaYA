import { useEffect, useState } from "react";

import PageHeader from "../components/ui/PageHeader";
import StatCard from "../components/ui/StatCard";
import LoadingSpinner from "../components/ui/LoadingSpinner";
import EmptyState from "../components/ui/EmptyState";

import {
    clienteService,
    mesaService,
    turnoService,
    reservaService
} from "../services/API";

import {
    Users,
    UtensilsCrossed,
    Clock3,
    CalendarDays
} from "lucide-react";

function Dashboard() {
    const [clientes, setClientes] = useState(0);
    const [mesas, setMesas] = useState(0);
    const [turnos, setTurnos] = useState(0);
    const [reservas, setReservas] = useState(0);

    const [ultimasReservas, setUltimasReservas] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function cargarDatos() {
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

                setUltimasReservas(
                    reservasRes.data.slice(-5).reverse()
                );
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        }

        cargarDatos();
    }, []);

    return (
        <>
            <PageHeader
                title="Dashboard"
                subtitle="Resumen general del sistema"
            />

            <div className="row g-3 mb-4">

                <div className="col-md-3">
                    <StatCard
                        label="Clientes"
                        value={clientes}
                        icon={<Users size={22} />}
                    />
                </div>

                <div className="col-md-3">
                    <StatCard
                        label="Mesas"
                        value={mesas}
                        icon={<UtensilsCrossed size={22} />}
                    />
                </div>

                <div className="col-md-3">
                    <StatCard
                        label="Turnos"
                        value={turnos}
                        icon={<Clock3 size={22} />}
                    />
                </div>

                <div className="col-md-3">
                    <StatCard
                        label="Reservas"
                        value={reservas}
                        icon={<CalendarDays size={22} />}
                    />
                </div>

            </div>

            <div className="card-app p-4">
                <h4 className="mb-3">
                    Últimas Reservas
                </h4>

                {loading ? (
                    <LoadingSpinner />
                ) : ultimasReservas.length === 0 ? (
                    <EmptyState
                        message="No hay reservas registradas."
                    />
                ) : (
                    <div className="table-responsive">
                        <table className="table table-app">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Cliente ID</th>
                                    <th>Mesa ID</th>
                                    <th>Turno ID</th>
                                    <th>Fecha</th>
                                </tr>
                            </thead>

                            <tbody>
                                {ultimasReservas.map((reserva) => (
                                    <tr key={reserva.id}>
                                        <td>{reserva.id}</td>
                                        <td>{reserva.clienteId}</td>
                                        <td>{reserva.mesaId}</td>
                                        <td>{reserva.turnoId}</td>
                                        <td>
                                            {reserva.fecha?.slice(0, 10)}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </>
    );
}

export default Dashboard;