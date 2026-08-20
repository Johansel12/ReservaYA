import { useEffect, useState } from "react";

import PageHeader from "../components/ui/PageHeader";
import LoadingSpinner from "../components/ui/LoadingSpinner";
import EmptyState from "../components/ui/EmptyState";
import { toast } from "react-toastify";

import {
    reservaService,
    clienteService,
    mesaService,
    turnoService
} from "../services/API";

const initialForm = {
    clienteId: "",
    mesaId: "",
    turnoId: "",
    fecha: ""
};

function Reservas() {
    const [reservas, setReservas] = useState([]);
    const [clientes, setClientes] = useState([]);
    const [mesas, setMesas] = useState([]);
    const [turnos, setTurnos] = useState([]);

    const [form, setForm] = useState(initialForm);

    const [editId, setEditId] = useState(null);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        cargarDatos();
    }, []);

    const cargarDatos = async () => {
        try {
            const [
                reservasRes,
                clientesRes,
                mesasRes,
                turnosRes
            ] = await Promise.all([
                reservaService.getAll(),
                clienteService.getAll(),
                mesaService.getAll(),
                turnoService.getAll()
            ]);

            setReservas(reservasRes.data);
            setClientes(clientesRes.data);
            setMesas(mesasRes.data);
            setTurnos(turnosRes.data);
        }
        catch (error) {
            console.error(error);
        }
        finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            clienteId: Number(form.clienteId),
            mesaId: Number(form.mesaId),
            turnoId: Number(form.turnoId),
            fecha: form.fecha
        };

        try {
            if (editId) {
                await reservaService.update(editId, {
                    id: editId,
                    ...payload
                });

                toast.success("Reserva actualizada correctamente");
            } else {
                await reservaService.create(payload);

                toast.success("Reserva creada correctamente");
            }

            setForm(initialForm);
            setEditId(null);

            cargarDatos();
        }
        catch (error) {
            console.error(error);

            toast.error("Error al guardar la reserva");
        }
    };

    const handleEdit = (reserva) => {
        setForm({
            clienteId: reserva.clienteId,
            mesaId: reserva.mesaId,
            turnoId: reserva.turnoId,
            fecha: reserva.fecha?.slice(0, 10)
        });

        setEditId(reserva.id);
    };

    const handleDelete = async (id) => {
        if (!window.confirm("¿Eliminar esta reserva?")) return;

        try {
            await reservaService.remove(id);

            toast.success("Reserva eliminada correctamente");

            cargarDatos();
        }
        catch (error) {
            console.error(error);

            toast.error("Error al eliminar la reserva");
        }
    };

    const obtenerCliente = (id) =>
        clientes.find(c => c.id === id)?.nombre ?? id;

    const obtenerMesa = (id) =>
        mesas.find(m => m.id === id)?.capacidad ?? id;

    const obtenerTurno = (id) =>
        turnos.find(t => t.id === id)?.horario ?? id;

    return (
        <>
            <PageHeader
                title="Reservas"
                subtitle="Gestión de reservas"
            />

            <div className="card-app p-4 mb-4">
                <form
                    onSubmit={handleSubmit}
                    className="row g-3"
                >
                    <div className="col-md-3">
                        <label className="form-label">
                            Cliente
                        </label>

                        <select
                            className="form-select"
                            name="clienteId"
                            value={form.clienteId}
                            onChange={handleChange}
                            required
                        >
                            <option value="">
                                Seleccionar...
                            </option>

                            {clientes.map(cliente => (
                                <option
                                    key={cliente.id}
                                    value={cliente.id}
                                >
                                    {cliente.nombre}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="col-md-3">
                        <label className="form-label">
                            Mesa
                        </label>

                        <select
                            className="form-select"
                            name="mesaId"
                            value={form.mesaId}
                            onChange={handleChange}
                            required
                        >
                            <option value="">
                                Seleccionar...
                            </option>

                            {mesas.map(mesa => (
                                <option
                                    key={mesa.id}
                                    value={mesa.id}
                                >
                                    Capacidad {mesa.capacidad}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="col-md-3">
                        <label className="form-label">
                            Turno
                        </label>

                        <select
                            className="form-select"
                            name="turnoId"
                            value={form.turnoId}
                            onChange={handleChange}
                            required
                        >
                            <option value="">
                                Seleccionar...
                            </option>

                            {turnos.map(turno => (
                                <option
                                    key={turno.id}
                                    value={turno.id}
                                >
                                    {turno.horario}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="col-md-3">
                        <label className="form-label">
                            Fecha
                        </label>

                        <input
                            type="date"
                            className="form-control"
                            name="fecha"
                            value={form.fecha}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="col-12">
                        <button
                            type="submit"
                            className="btn btn-accent"
                        >
                            {editId ? "Actualizar" : "Crear"}
                        </button>
                    </div>
                </form>
            </div>

            <div className="card-app p-4">
                {loading ? (
                    <LoadingSpinner />
                ) : reservas.length === 0 ? (
                    <EmptyState message="No hay reservas registradas." />
                ) : (
                    <div className="table-responsive">
                        <table className="table table-app">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Cliente</th>
                                    <th>Mesa</th>
                                    <th>Turno</th>
                                    <th>Fecha</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>

                            <tbody>
                                {reservas.map(reserva => (
                                    <tr key={reserva.id}>
                                        <td>{reserva.id}</td>
                                        <td>{obtenerCliente(reserva.clienteId)}</td>
                                        <td>{obtenerMesa(reserva.mesaId)}</td>
                                        <td>{obtenerTurno(reserva.turnoId)}</td>
                                        <td>{reserva.fecha?.slice(0, 10)}</td>

                                        <td>
                                            <button
                                                className="btn btn-sm btn-outline-warning me-2"
                                                onClick={() => handleEdit(reserva)}
                                            >
                                                Editar
                                            </button>

                                            <button
                                                className="btn btn-sm btn-outline-danger"
                                                onClick={() => handleDelete(reserva.id)}
                                            >
                                                Eliminar
                                            </button>
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

export default Reservas;