import { useEffect, useState } from "react";

import PageHeader from "../components/ui/PageHeader";
import LoadingSpinner from "../components/ui/LoadingSpinner";
import EmptyState from "../components/ui/EmptyState";
import ConfirmDialog from "../components/ui/ConfirmDialog";
import { toast } from "react-toastify";

import { turnoService } from "../services/API";

const initialForm = {
    horario: ""
};

function Turnos() {
    const [turnos, setTurnos] = useState([]);
    const [form, setForm] = useState(initialForm);
    const [editId, setEditId] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedId, setSelectedId] = useState(null);

    useEffect(() => {
        cargarTurnos();
    }, []);

    const cargarTurnos = async () => {
        setLoading(true);

        try {
            const response = await turnoService.getAll();
            setTurnos(response.data);
            setError(null);
        } catch (error) {
            console.error(error);
            setError("No se pudieron cargar los turnos.");
        } finally {
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

        try {
            if (editId) {
                await turnoService.update(editId, {
                    id: editId,
                    horario: form.horario
                });

                toast.success("Turno actualizado correctamente");
            } else {
                await turnoService.create({
                    horario: form.horario
                });

                toast.success("Turno creado correctamente");
            }

            setForm(initialForm);
            setEditId(null);

            cargarTurnos();
        } catch (error) {
            console.error(error);

            toast.error("Error al guardar el turno");
        }
    };

    const handleEdit = (turno) => {
        setForm({
            horario: turno.horario
        });

        setEditId(turno.id);
    };

    const handleDelete = (id) => {
        setSelectedId(id);
        setShowDeleteModal(true);
    };

    const confirmarEliminacion = async () => {
        try {
            await turnoService.remove(selectedId);

            toast.success(
                "Turno eliminado correctamente"
            );

            cargarTurnos();
        } catch (error) {
            console.error(error);

            toast.error(
                "Error al eliminar el turno"
            );
        } finally {
            setShowDeleteModal(false);
            setSelectedId(null);
        }
    };

    return (
        <>
            <PageHeader
                title="Turnos"
                subtitle="Gestión de horarios disponibles"
            />

            <div className="card-app p-4 mb-4">
                <form
                    onSubmit={handleSubmit}
                    className="row g-3 align-items-end"
                >
                    <div className="col-md-8">
                        <label className="form-label">
                            Horario
                        </label>

                        <input
                            type="text"
                            name="horario"
                            className="form-control"
                            value={form.horario}
                            onChange={handleChange}
                            placeholder="Ej: 12:00 PM - 2:00 PM"
                            required
                        />
                    </div>

                    <div className="col-md-4">
                        <button
                            type="submit"
                            className="btn btn-accent w-100"
                        >
                            {editId ? "Actualizar" : "Crear"}
                        </button>
                    </div>
                </form>
            </div>

            <div className="card-app p-4">
                {loading && (
                    <LoadingSpinner label="Cargando turnos..." />
                )}

                {error && (
                    <p className="text-danger">{error}</p>
                )}

                {!loading && !error && (
                    turnos.length === 0 ? (
                        <EmptyState message="No hay turnos registrados." />
                    ) : (
                        <div className="table-responsive">
                            <table className="table table-app">
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Horario</th>
                                        <th>Acciones</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {turnos.map((turno) => (
                                        <tr key={turno.id}>
                                            <td>{turno.id}</td>
                                            <td>{turno.horario}</td>

                                            <td>
                                                <button
                                                    className="btn btn-sm btn-outline-warning me-2"
                                                    onClick={() => handleEdit(turno)}
                                                >
                                                    Editar
                                                </button>

                                                <button
                                                    className="btn btn-sm btn-outline-danger"
                                                    onClick={() => handleDelete(turno.id)}
                                                >
                                                    Eliminar
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )
                )}
            </div>
            <ConfirmDialog
                show={showDeleteModal}
                title="Confirmar eliminación"
                message="¿Seguro que deseas eliminar este turno?"
                onConfirm={confirmarEliminacion}
                onClose={() => {
                    setShowDeleteModal(false);
                    setSelectedId(null);
                }}
            />
        </>
    );
}

export default Turnos;