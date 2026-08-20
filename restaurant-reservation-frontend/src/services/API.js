import axios from "axios";

const api = axios.create({
    baseURL: "https://localhost:7260/api"
});

// Clientes
export const clienteService = {
    getAll: () => api.get("/Cliente"),
    getById: (id) => api.get(`/Cliente/${id}`),
    create: (data) => api.post("/Cliente", data),
    update: (id, data) => api.put(`/Cliente/${id}`, data),
    remove: (id) => api.delete(`/Cliente/${id}`)
};

// Mesas
export const mesaService = {
    getAll: () => api.get("/Mesa"),
    getById: (id) => api.get(`/Mesa/${id}`),
    create: (data) => api.post("/Mesa", data),
    update: (id, data) => api.put(`/Mesa/${id}`, data),
    remove: (id) => api.delete(`/Mesa/${id}`)
};

// Turnos
export const turnoService = {
    getAll: () => api.get("/Turno"),
    getById: (id) => api.get(`/Turno/${id}`),
    create: (data) => api.post("/Turno", data),
    update: (id, data) => api.put(`/Turno/${id}`, data),
    remove: (id) => api.delete(`/Turno/${id}`)
};

// Reservas
export const reservaService = {
    getAll: () => api.get("/Reserva"),
    getById: (id) => api.get(`/Reserva/${id}`),
    create: (data) => api.post("/Reserva", data),
    update: (id, data) => api.put(`/Reserva/${id}`, data),
    remove: (id) => api.delete(`/Reserva/${id}`)
};

export default api;