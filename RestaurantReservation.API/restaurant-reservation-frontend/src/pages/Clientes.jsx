import { useEffect, useState } from "react";

import PageHeader from "../components/ui/PageHeader";
import LoadingSpinner from "../components/ui/LoadingSpinner";
import EmptyState from "../components/ui/EmptyState";
import { toast } from "react-toastify";

import { clienteService } from "../services/API";

const initialForm = {
    nombre: "",
    telefono: "",
    email: ""
};

function Clientes() {
    const [clientes, setClientes] = useState([]);
    const [form, setForm] = useState(initialForm);
    const [editId, setEditId] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        cargarClientes();
    }, []);

    const cargarClientes = async () => {
        setLoading(true);

        try {
            const response = await clienteService.getAll();

            setClientes(response.data);
            setError(null);
        } catch (error) {
            console.error(error);
            setError("No se pudieron cargar los clientes.");
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
                await clienteService.update(editId, {
                    id: editId,
                    nombre: form.nombre,
                    telefono: form.telefono,
                    email: form.email
                });

                toast.success("Cliente actualizado correctamente");
            } else {
                await clienteService.create(form);

                toast.success("Cliente creado correctamente");
            }

            setForm(initialForm);
            setEditId(null);

            cargarClientes();
        } catch (error) {
            console.error(error);

            toast.error("Error al guardar el cliente");
        }
    };

    const handleEdit = (cliente) => {
        setForm({
            nombre: cliente.nombre,
            telefono: cliente.telefono,
            email: cliente.email
        });

        setEditId(cliente.id);
    };

    const handleDelete = async (id) => {
        if (!window.confirm("¿Eliminar este cliente?")) return;

        try {
            await clienteService.remove(id);

            toast.success("Cliente eliminado correctamente");

            cargarClientes();
        } catch (error) {
            console.error(error);

            toast.error("Error al eliminar el cliente");
        }
    };

    const cancelarEdicion = () => {
        setForm(initialForm);
        setEditId(null);
    };

    return (
        <>
            <PageHeader
                title="Clientes"
                subtitle="Gestión de clientes del restaurante"
            />

            <div className="card-app p-4 mb-4">
                <form
                    onSubmit={handleSubmit}
                    className="row g-3 align-items-end"
                >
                    <div className="col-md-3">
                        <label className="form-label">
                            Nombre
                        </label>

                        <input
                            type="text"
                            name="nombre"
                            className="form-control"
                            value={form.nombre}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="col-md-3">
                        <label className="form-label">
                            Teléfono
                        </label>

                        <input
                            type="text"
                            name="telefono"
                            className="form-control"
                            value={form.telefono}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="col-md-4">
                        <label className="form-label">
                            Email
                        </label>

                        <input
                            type="email"
                            name="email"
                            className="form-control"
                            value={form.email}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="col-md-2 d-flex gap-2">
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
                    <LoadingSpinner label="Cargando clientes..." />
                )}

                {error && (
                    <p className="text-danger">
                        {error}
                    </p>
                )}

                {!loading && !error && (
                    clientes.length === 0 ? (
                        <EmptyState message="No hay clientes registrados." />
                    ) : (
                        <div className="table-responsive">
                            <table className="table table-app">
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Nombre</th>
                                        <th>Teléfono</th>
                                        <th>Email</th>
                                        <th>Acciones</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {clientes.map((cliente) => (
                                        <tr key={cliente.id}>
                                            <td>{cliente.id}</td>
                                            <td>{cliente.nombre}</td>
                                            <td>{cliente.telefono}</td>
                                            <td>{cliente.email}</td>

                                            <td>
                                                <button
                                                    className="btn btn-sm btn-outline-warning me-2"
                                                    onClick={() => handleEdit(cliente)}
                                                >
                                                    Editar
                                                </button>

                                                <button
                                                    className="btn btn-sm btn-outline-danger"
                                                    onClick={() => handleDelete(cliente.id)}
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

export default Clientes;
