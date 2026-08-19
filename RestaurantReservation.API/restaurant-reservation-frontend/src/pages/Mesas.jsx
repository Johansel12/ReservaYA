import { useEffect, useState } from "react";

import PageHeader from "../components/ui/PageHeader";
import LoadingSpinner from "../components/ui/LoadingSpinner";
import EmptyState from "../components/ui/EmptyState";

import { mesaService } from "../services/API";

const initialForm = {
    capacidad: ""
};

function Mesas() {
    const [mesas, setMesas] = useState([]);
    const [form, setForm] = useState(initialForm);
    const [editId, setEditId] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        cargarMesas();
    }, []);

    const cargarMesas = async () => {
        setLoading(true);

        try {
            const response = await mesaService.getAll();

            setMesas(response.data);
            setError(null);
        }
        catch (error) {
            console.error(error);
            setError("No se pudieron cargar las mesas.");
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

        try {
            const payload = {
                capacidad: Number(form.capacidad)
            };

            if (editId) {
                await mesaService.update(editId, {
                    id: editId,
                    ...payload
                });
            } else {
                await mesaService.create(payload);
            }

            setForm(initialForm);
            setEditId(null);

            cargarMesas();
        }
        catch (error) {
            console.error(error);
            alert("Error al guardar la mesa.");
        }
    };

    const handleEdit = (mesa) => {
        setForm({
            capacidad: mesa.capacidad
        });

        setEditId(mesa.id);
    };

    const handleDelete = async (id) => {
        if (!window.confirm("¿Eliminar esta mesa?")) {
            return;
        }

        try {
            await mesaService.remove(id);
            cargarMesas();
        }
        catch (error) {
            console.error(error);
            alert("Error al eliminar la mesa.");
        }
    };

    const cancelarEdicion = () => {
        setForm(initialForm);
        setEditId(null);
    };

    return (
        <>
            <PageHeader
                title="Mesas"
                subtitle="Gestión de mesas del restaurante"
            />

            <div className="card-app p-4 mb-4">
                <form
                    onSubmit={handleSubmit}
                    className="row g-3 align-items-end"
                >
                    <div className="col-md-8">
                        <label className="form-label">
                            Capacidad
                        </label>

                        <input
                            type="number"
                            name="capacidad"
                            className="form-control"
                            value={form.capacidad}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="col-md-4 d-flex gap-2">
                        <button
                            type="submit"
                            className="btn btn-accent flex-fill"
                        >
                            {editId ? "Actualizar" : "Crear"}
                        </button>

                        {editId && (
                            <button
                                type="button"
                                className="btn btn-outline-secondary"
                                onClick={cancelarEdicion}
                            >
                                Cancelar
                            </button>
                        )}
                    </div>
                </form>
            </div>

            <div className="card-app p-4">
                {loading && (
                    <LoadingSpinner label="Cargando mesas..." />
                )}

                {error && (
                    <p className="text-danger">
                        {error}
                    </p>
                )}

                {!loading && !error && (
                    mesas.length === 0 ? (
                        <EmptyState message="No hay mesas registradas." />
                    ) : (
                        <div className="table-responsive">
                            <table className="table table-app">
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Capacidad</th>
                                        <th>Acciones</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {mesas.map((mesa) => (
                                        <tr key={mesa.id}>
                                            <td>{mesa.id}</td>

                                            <td>
                                                {mesa.capacidad}
                                            </td>

                                            <td>
                                                <button
                                                    className="btn btn-sm btn-outline-warning me-2"
                                                    onClick={() => handleEdit(mesa)}
                                                >
                                                    Editar
                                                </button>

                                                <button
                                                    className="btn btn-sm btn-outline-danger"
                                                    onClick={() => handleDelete(mesa.id)}
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
        </>
    );
}

export default Mesas;