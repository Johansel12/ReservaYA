import { useEffect, useState } from "react";
import api from "../services/API";

function Clientes() {
    const [clientes, setClientes] = useState([]);

    const [nuevoCliente, setNuevoCliente] = useState({
        nombre: "",
        telefono: "",
        email: ""
    });

    const [clienteEditando, setClienteEditando] = useState(null);

    useEffect(() => {
        obtenerClientes();
    }, []);

    const obtenerClientes = async () => {
        try {
            const response = await api.get("/Cliente");
            setClientes(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const crearCliente = async (e) => {
        e.preventDefault();

        try {
            await api.post("/Cliente", nuevoCliente);

            setNuevoCliente({
                nombre: "",
                telefono: "",
                email: ""
            });

            obtenerClientes();
        } catch (error) {
            console.error(error);
        }
    };

    const eliminarCliente = async (id) => {
        try {
            await api.delete(`/Cliente/${id}`);
            obtenerClientes();
        } catch (error) {
            console.error(error);
        }
    };

    const editarCliente = (cliente) => {
        setClienteEditando(cliente);

        setNuevoCliente({
            nombre: cliente.nombre,
            telefono: cliente.telefono,
            email: cliente.email
        });
    };

    const actualizarCliente = async (e) => {
        e.preventDefault();

        try {
            await api.put(`/Cliente/${clienteEditando.id}`, {
                id: clienteEditando.id,
                nombre: nuevoCliente.nombre,
                telefono: nuevoCliente.telefono,
                email: nuevoCliente.email
            });

            setClienteEditando(null);

            setNuevoCliente({
                nombre: "",
                telefono: "",
                email: ""
            });

            obtenerClientes();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="container mt-4">
            <h1 className="mb-4">Clientes</h1>

            <form
                onSubmit={
                    clienteEditando
                        ? actualizarCliente
                        : crearCliente
                }
                className="mb-4"
            >
                <div className="row">
                    <div className="col">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Nombre"
                            value={nuevoCliente.nombre}
                            onChange={(e) =>
                                setNuevoCliente({
                                    ...nuevoCliente,
                                    nombre: e.target.value
                                })
                            }
                        />
                    </div>

                    <div className="col">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Telefono"
                            value={nuevoCliente.telefono}
                            onChange={(e) =>
                                setNuevoCliente({
                                    ...nuevoCliente,
                                    telefono: e.target.value
                                })
                            }
                        />
                    </div>

                    <div className="col">
                        <input
                            type="email"
                            className="form-control"
                            placeholder="Email"
                            value={nuevoCliente.email}
                            onChange={(e) =>
                                setNuevoCliente({
                                    ...nuevoCliente,
                                    email: e.target.value
                                })
                            }
                        />
                    </div>

                    <div className="col-auto">
                        <button
                            type="submit"
                            className="btn btn-primary"
                        >
                            {
                                clienteEditando
                                    ? "Actualizar Cliente"
                                    : "Agregar Cliente"
                            }
                        </button>
                    </div>
                </div>
            </form>

            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Telefono</th>
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
                                    className="btn btn-warning btn-sm me-2"
                                    onClick={() => editarCliente(cliente)}
                                >
                                    Editar
                                </button>

                                <button
                                    className="btn btn-danger btn-sm"
                                    onClick={() => eliminarCliente(cliente.id)}
                                >
                                    Eliminar
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Clientes;
