"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const better_sqlite3_1 = __importDefault(require("better-sqlite3"));
// Import gestores
const GestorCliente_1 = require("./gestores/GestorCliente");
const GestorMembresia_1 = require("./gestores/GestorMembresia");
const GestorAsistencia_1 = require("./gestores/GestorAsistencia");
const GestorTipoMembresia_1 = require("./gestores/GestorTipoMembresia");
const GestorPago_1 = require("./gestores/GestorPago");
const GestorEquipamiento_1 = require("./gestores/GestorEquipamiento");
const GestorEquipoAccesorio_1 = require("./gestores/GestorEquipoAccesorio");
const GestorMantenimiento_1 = require("./gestores/GestorMantenimiento");
// Import servicios
const ServicioCliente_1 = require("./servicios/ServicioCliente");
const ServicioMembresia_1 = require("./servicios/ServicioMembresia");
const ServicioAsistencia_1 = require("./servicios/ServicioAsistencia");
const ServicioTipoMembresia_1 = require("./servicios/ServicioTipoMembresia");
const ServicioPago_1 = require("./servicios/ServicioPago");
const ServicioEquipamiento_1 = require("./servicios/ServicioEquipamiento");
const ServicioEquipoAccesorio_1 = require("./servicios/ServicioEquipoAccesorio");
const ServicioMantenimiento_1 = require("./servicios/ServicioMantenimiento");
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Database connection
const db = new better_sqlite3_1.default('gym.db');
// Inicializar gestores
const gestorCliente = new GestorCliente_1.GestorCliente(db);
const gestorMembresia = new GestorMembresia_1.GestorMembresia(db);
const gestorAsistencia = new GestorAsistencia_1.GestorAsistencia(db);
const gestorTipoMembresia = new GestorTipoMembresia_1.GestorTipoMembresia(db);
const gestorPago = new GestorPago_1.GestorPago(db);
const gestorEquipamiento = new GestorEquipamiento_1.GestorEquipamiento(db);
const gestorEquipoAccesorio = new GestorEquipoAccesorio_1.GestorEquipoAccesorio(db);
const gestorMantenimiento = new GestorMantenimiento_1.GestorMantenimiento(db);
// Inicializar servicios
const servicioCliente = new ServicioCliente_1.ServicioCliente(gestorCliente);
const servicioMembresia = new ServicioMembresia_1.ServicioMembresia(gestorMembresia, gestorCliente);
const servicioAsistencia = new ServicioAsistencia_1.ServicioAsistencia(gestorAsistencia, gestorMembresia);
const servicioTipoMembresia = new ServicioTipoMembresia_1.ServicioTipoMembresia(gestorTipoMembresia);
const servicioPago = new ServicioPago_1.ServicioPago(gestorPago, gestorMembresia);
const servicioEquipamiento = new ServicioEquipamiento_1.ServicioEquipamiento(gestorEquipamiento);
const servicioEquipoAccesorio = new ServicioEquipoAccesorio_1.ServicioEquipoAccesorio(gestorEquipoAccesorio);
const servicioMantenimiento = new ServicioMantenimiento_1.ServicioMantenimiento(gestorMantenimiento, gestorEquipamiento);
// Helper function to serialize entities to plain objects
function serializeEntity(entity) {
    if (!entity)
        return null;
    const result = {};
    const proto = Object.getPrototypeOf(entity);
    // Get all getter methods
    Object.getOwnPropertyNames(proto).forEach(key => {
        const descriptor = Object.getOwnPropertyDescriptor(proto, key);
        if (descriptor && typeof descriptor.get === 'function') {
            const value = entity[key];
            result[key.replace(/^get/, '').replace(/^(.)/, (c) => c.toLowerCase())] = value;
        }
    });
    return result;
}
function serializeArray(entities) {
    return entities.map(serializeEntity);
}
// ==================== CLIENTES ENDPOINTS ====================
// Crear nuevo cliente
app.post('/api/clientes', (req, res) => {
    try {
        const id = servicioCliente.crear(req.body.nombreCompleto, req.body.telefono, req.body.idTipoMembresia, req.body.notas);
        res.json({ success: true, id });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            error: error instanceof Error ? error.message : 'Error desconocido'
        });
    }
});
// Obtener todos los clientes
app.get('/api/clientes', (req, res) => {
    try {
        const clientes = servicioCliente.obtenerTodos();
        res.json(serializeArray(clientes));
    }
    catch (error) {
        res.status(500).json({
            success: false,
            error: error instanceof Error ? error.message : 'Error desconocido'
        });
    }
});
// Buscar cliente por ID
app.get('/api/clientes/:id', (req, res) => {
    try {
        const id = Number(req.params.id);
        const resultados = servicioCliente.buscar(id);
        if (resultados.length === 0) {
            res.status(404).json({
                success: false,
                error: 'Cliente no encontrado'
            });
            return;
        }
        res.json(serializeEntity(resultados[0]));
    }
    catch (error) {
        res.status(500).json({
            success: false,
            error: error instanceof Error ? error.message : 'Error desconocido'
        });
    }
});
// Actualizar notas del cliente
app.patch('/api/clientes/:id/notas', (req, res) => {
    try {
        const id = Number(req.params.id);
        servicioCliente.actualizarNotas(id, req.body.notas);
        res.json({ success: true });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            error: error instanceof Error ? error.message : 'Error desconocido'
        });
    }
});
// Actualizar teléfono del cliente
app.patch('/api/clientes/:id/telefono', (req, res) => {
    try {
        const id = Number(req.params.id);
        servicioCliente.actualizarTelefono(id, req.body.telefono);
        res.json({ success: true });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            error: error instanceof Error ? error.message : 'Error desconocido'
        });
    }
});
// Eliminar cliente
app.delete('/api/clientes/:id', (req, res) => {
    try {
        const id = Number(req.params.id);
        servicioCliente.eliminar(id);
        res.json({ success: true });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            error: error instanceof Error ? error.message : 'Error desconocido'
        });
    }
});
// ==================== TIPOS DE MEMBRESÍA ENDPOINTS ====================
// Crear nuevo tipo de membresía
app.post('/api/tipos-membresia', (req, res) => {
    try {
        const id = servicioTipoMembresia.crear(req.body.nombre, req.body.duracionDias, req.body.precio);
        res.json({ success: true, id });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            error: error instanceof Error ? error.message : 'Error desconocido'
        });
    }
});
// Obtener todos los tipos de membresía
app.get('/api/tipos-membresia', (req, res) => {
    try {
        const tipos = servicioTipoMembresia.obtenerTodos();
        res.json(serializeArray(tipos));
    }
    catch (error) {
        res.status(500).json({
            success: false,
            error: error instanceof Error ? error.message : 'Error desconocido'
        });
    }
});
// Buscar tipo de membresía por ID
app.get('/api/tipos-membresia/:id', (req, res) => {
    try {
        const id = Number(req.params.id);
        const tipo = servicioTipoMembresia.buscar(id);
        if (!tipo) {
            res.status(404).json({
                success: false,
                error: 'Tipo de membresía no encontrado'
            });
            return;
        }
        res.json(serializeEntity(tipo));
    }
    catch (error) {
        res.status(500).json({
            success: false,
            error: error instanceof Error ? error.message : 'Error desconocido'
        });
    }
});
// Actualizar tipo de membresía
app.put('/api/tipos-membresia/:id', (req, res) => {
    try {
        const id = Number(req.params.id);
        servicioTipoMembresia.actualizar(id, req.body.nombre, req.body.duracionDias, req.body.precio);
        res.json({ success: true });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            error: error instanceof Error ? error.message : 'Error desconocido'
        });
    }
});
// Eliminar tipo de membresía
app.delete('/api/tipos-membresia/:id', (req, res) => {
    try {
        const id = Number(req.params.id);
        servicioTipoMembresia.eliminar(id);
        res.json({ success: true });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            error: error instanceof Error ? error.message : 'Error desconocido'
        });
    }
});
// ==================== MEMBRESÍAS ENDPOINTS ====================
// Crear nueva membresía
app.post('/api/membresias', (req, res) => {
    try {
        const id = servicioMembresia.crear(req.body.tipoMembresiaId, req.body.clienteId);
        res.json({ success: true, id });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            error: error instanceof Error ? error.message : 'Error desconocido'
        });
    }
});
// Obtener todas las membresías
app.get('/api/membresias', (req, res) => {
    try {
        const membresias = servicioMembresia.obtenerTodas();
        res.json(serializeArray(membresias));
    }
    catch (error) {
        res.status(500).json({
            success: false,
            error: error instanceof Error ? error.message : 'Error desconocido'
        });
    }
});
// Buscar membresía por ID
app.get('/api/membresias/:id', (req, res) => {
    try {
        const id = Number(req.params.id);
        const membresia = servicioMembresia.buscar(id);
        if (!membresia) {
            res.status(404).json({
                success: false,
                error: 'Membresía no encontrada'
            });
            return;
        }
        res.json(serializeEntity(membresia));
    }
    catch (error) {
        res.status(500).json({
            success: false,
            error: error instanceof Error ? error.message : 'Error desconocido'
        });
    }
});
// Obtener membresías por cliente
app.get('/api/membresias/cliente/:clienteId', (req, res) => {
    try {
        const clienteId = Number(req.params.clienteId);
        const membresias = servicioMembresia.obtenerPorCliente(clienteId);
        res.json(serializeArray(membresias));
    }
    catch (error) {
        res.status(500).json({
            success: false,
            error: error instanceof Error ? error.message : 'Error desconocido'
        });
    }
});
// Renovar membresía
app.post('/api/membresias/renovar', (req, res) => {
    try {
        const id = servicioMembresia.renovar(req.body.clienteId, req.body.tipoMembresiaId);
        res.json({ success: true, id });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            error: error instanceof Error ? error.message : 'Error desconocido'
        });
    }
});
// Eliminar membresía
app.delete('/api/membresias/:id', (req, res) => {
    try {
        const id = Number(req.params.id);
        servicioMembresia.eliminar(id);
        res.json({ success: true });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            error: error instanceof Error ? error.message : 'Error desconocido'
        });
    }
});
// ==================== ASISTENCIAS ENDPOINTS ====================
// Registrar nueva asistencia
app.post('/api/asistencias', (req, res) => {
    try {
        const id = servicioAsistencia.registrar(req.body.membresiaId);
        res.json({ success: true, id });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            error: error instanceof Error ? error.message : 'Error desconocido'
        });
    }
});
// Obtener todas las asistencias
app.get('/api/asistencias', (req, res) => {
    try {
        const asistencias = servicioAsistencia.obtenerTodas();
        res.json(serializeArray(asistencias));
    }
    catch (error) {
        res.status(500).json({
            success: false,
            error: error instanceof Error ? error.message : 'Error desconocido'
        });
    }
});
// Buscar asistencia por ID
app.get('/api/asistencias/:id', (req, res) => {
    try {
        const id = Number(req.params.id);
        const asistencia = servicioAsistencia.buscar(id);
        if (!asistencia) {
            res.status(404).json({
                success: false,
                error: 'Asistencia no encontrada'
            });
            return;
        }
        res.json(serializeEntity(asistencia));
    }
    catch (error) {
        res.status(500).json({
            success: false,
            error: error instanceof Error ? error.message : 'Error desconocido'
        });
    }
});
// Obtener asistencias por membresía
app.get('/api/asistencias/membresia/:membresiaId', (req, res) => {
    try {
        const membresiaId = Number(req.params.membresiaId);
        const asistencias = servicioAsistencia.obtenerPorMembresia(membresiaId);
        res.json(serializeArray(asistencias));
    }
    catch (error) {
        res.status(500).json({
            success: false,
            error: error instanceof Error ? error.message : 'Error desconocido'
        });
    }
});
// Obtener asistencias por fecha
app.get('/api/asistencias/fecha/:fecha', (req, res) => {
    try {
        const fecha = req.params.fecha;
        const asistencias = servicioAsistencia.obtenerPorFecha(fecha);
        res.json(serializeArray(asistencias));
    }
    catch (error) {
        res.status(500).json({
            success: false,
            error: error instanceof Error ? error.message : 'Error desconocido'
        });
    }
});
// Eliminar asistencia
app.delete('/api/asistencias/:id', (req, res) => {
    try {
        const id = Number(req.params.id);
        servicioAsistencia.eliminar(id);
        res.json({ success: true });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            error: error instanceof Error ? error.message : 'Error desconocido'
        });
    }
});
// ==================== PAGOS ENDPOINTS ====================
// Registrar nuevo pago
app.post('/api/pagos', (req, res) => {
    try {
        const id = servicioPago.registrar(req.body.membresiaId, req.body.monto);
        res.json({ success: true, id });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            error: error instanceof Error ? error.message : 'Error desconocido'
        });
    }
});
// Obtener todos los pagos
app.get('/api/pagos', (req, res) => {
    try {
        const pagos = servicioPago.obtenerTodos();
        res.json(serializeArray(pagos));
    }
    catch (error) {
        res.status(500).json({
            success: false,
            error: error instanceof Error ? error.message : 'Error desconocido'
        });
    }
});
// Buscar pago por ID
app.get('/api/pagos/:id', (req, res) => {
    try {
        const id = Number(req.params.id);
        const pago = servicioPago.buscar(id);
        if (!pago) {
            res.status(404).json({
                success: false,
                error: 'Pago no encontrado'
            });
            return;
        }
        res.json(serializeEntity(pago));
    }
    catch (error) {
        res.status(500).json({
            success: false,
            error: error instanceof Error ? error.message : 'Error desconocido'
        });
    }
});
// Obtener pagos por membresía
app.get('/api/pagos/membresia/:membresiaId', (req, res) => {
    try {
        const membresiaId = Number(req.params.membresiaId);
        const pagos = servicioPago.obtenerPorMembresia(membresiaId);
        res.json(serializeArray(pagos));
    }
    catch (error) {
        res.status(500).json({
            success: false,
            error: error instanceof Error ? error.message : 'Error desconocido'
        });
    }
});
// Eliminar pago
app.delete('/api/pagos/:id', (req, res) => {
    try {
        const id = Number(req.params.id);
        servicioPago.eliminar(id);
        res.json({ success: true });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            error: error instanceof Error ? error.message : 'Error desconocido'
        });
    }
});
// ==================== EQUIPAMIENTO ENDPOINTS ====================
// Crear nuevo equipamiento
app.post('/api/equipamiento', (req, res) => {
    try {
        const id = servicioEquipamiento.crear(req.body.nombre, req.body.tipo, req.body.imagenUrl, req.body.descripcion);
        res.json({ success: true, id });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            error: error instanceof Error ? error.message : 'Error desconocido'
        });
    }
});
// Obtener todo el equipamiento
app.get('/api/equipamiento', (req, res) => {
    try {
        const equipamiento = servicioEquipamiento.obtenerTodos();
        res.json(serializeArray(equipamiento));
    }
    catch (error) {
        res.status(500).json({
            success: false,
            error: error instanceof Error ? error.message : 'Error desconocido'
        });
    }
});
// Buscar equipamiento por ID
app.get('/api/equipamiento/:id', (req, res) => {
    try {
        const id = Number(req.params.id);
        const equipo = servicioEquipamiento.buscar(id);
        if (!equipo) {
            res.status(404).json({
                success: false,
                error: 'Equipo no encontrado'
            });
            return;
        }
        res.json(serializeEntity(equipo));
    }
    catch (error) {
        res.status(500).json({
            success: false,
            error: error instanceof Error ? error.message : 'Error desconocido'
        });
    }
});
// Actualizar equipamiento
app.put('/api/equipamiento/:id', (req, res) => {
    try {
        const id = Number(req.params.id);
        servicioEquipamiento.actualizar(id, req.body.imagenUrl, req.body.descripcion);
        res.json({ success: true });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            error: error instanceof Error ? error.message : 'Error desconocido'
        });
    }
});
// Eliminar equipamiento
app.delete('/api/equipamiento/:id', (req, res) => {
    try {
        const id = Number(req.params.id);
        servicioEquipamiento.eliminar(id);
        res.json({ success: true });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            error: error instanceof Error ? error.message : 'Error desconocido'
        });
    }
});
// ==================== ACCESORIOS ENDPOINTS ====================
// Crear nuevo accesorio
app.post('/api/accesorios', (req, res) => {
    try {
        const id = servicioEquipoAccesorio.crear(req.body.nombre, req.body.cantidad, req.body.notas);
        res.json({ success: true, id });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            error: error instanceof Error ? error.message : 'Error desconocido'
        });
    }
});
// Obtener todos los accesorios
app.get('/api/accesorios', (req, res) => {
    try {
        const accesorios = servicioEquipoAccesorio.obtenerTodos();
        res.json(serializeArray(accesorios));
    }
    catch (error) {
        res.status(500).json({
            success: false,
            error: error instanceof Error ? error.message : 'Error desconocido'
        });
    }
});
// Buscar accesorio por ID
app.get('/api/accesorios/:id', (req, res) => {
    try {
        const id = Number(req.params.id);
        const accesorio = servicioEquipoAccesorio.buscar(id);
        if (!accesorio) {
            res.status(404).json({
                success: false,
                error: 'Accesorio no encontrado'
            });
            return;
        }
        res.json(serializeEntity(accesorio));
    }
    catch (error) {
        res.status(500).json({
            success: false,
            error: error instanceof Error ? error.message : 'Error desconocido'
        });
    }
});
// Actualizar accesorio
app.put('/api/accesorios/:id', (req, res) => {
    try {
        const id = Number(req.params.id);
        servicioEquipoAccesorio.actualizar(id, req.body.cantidad, req.body.notas);
        res.json({ success: true });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            error: error instanceof Error ? error.message : 'Error desconocido'
        });
    }
});
// Eliminar accesorio
app.delete('/api/accesorios/:id', (req, res) => {
    try {
        const id = Number(req.params.id);
        servicioEquipoAccesorio.eliminar(id);
        res.json({ success: true });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            error: error instanceof Error ? error.message : 'Error desconocido'
        });
    }
});
// ==================== MANTENIMIENTOS ENDPOINTS ====================
// Crear nuevo mantenimiento
app.post('/api/mantenimientos', (req, res) => {
    try {
        const id = servicioMantenimiento.crear(req.body.equipoId, req.body.descripcion, req.body.costo);
        res.json({ success: true, id });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            error: error instanceof Error ? error.message : 'Error desconocido'
        });
    }
});
// Obtener todos los mantenimientos
app.get('/api/mantenimientos', (req, res) => {
    try {
        const mantenimientos = servicioMantenimiento.obtenerTodos();
        res.json(serializeArray(mantenimientos));
    }
    catch (error) {
        res.status(500).json({
            success: false,
            error: error instanceof Error ? error.message : 'Error desconocido'
        });
    }
});
// Buscar mantenimiento por ID
app.get('/api/mantenimientos/:id', (req, res) => {
    try {
        const id = Number(req.params.id);
        const mantenimiento = servicioMantenimiento.buscar(id);
        if (!mantenimiento) {
            res.status(404).json({
                success: false,
                error: 'Mantenimiento no encontrado'
            });
            return;
        }
        res.json(serializeEntity(mantenimiento));
    }
    catch (error) {
        res.status(500).json({
            success: false,
            error: error instanceof Error ? error.message : 'Error desconocido'
        });
    }
});
// Obtener mantenimientos por equipo
app.get('/api/mantenimientos/equipo/:equipoId', (req, res) => {
    try {
        const equipoId = Number(req.params.equipoId);
        const mantenimientos = servicioMantenimiento.obtenerPorEquipo(equipoId);
        res.json(serializeArray(mantenimientos));
    }
    catch (error) {
        res.status(500).json({
            success: false,
            error: error instanceof Error ? error.message : 'Error desconocido'
        });
    }
});
// Completar mantenimiento
app.put('/api/mantenimientos/:id/completar', (req, res) => {
    try {
        const id = Number(req.params.id);
        servicioMantenimiento.completar(id);
        res.json({ success: true });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            error: error instanceof Error ? error.message : 'Error desconocido'
        });
    }
});
// Eliminar mantenimiento
app.delete('/api/mantenimientos/:id', (req, res) => {
    try {
        const id = Number(req.params.id);
        servicioMantenimiento.eliminar(id);
        res.json({ success: true });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            error: error instanceof Error ? error.message : 'Error desconocido'
        });
    }
});
// ==================== TEST ENDPOINTS ====================
// Test route
app.get('/api/test', (req, res) => {
    const result = db.prepare('SELECT * FROM Clientes').get();
    res.json(result);
});
// Health check
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', message: 'Backend running successfully' });
});
app.listen(5000, () => {
    console.log('Server running on port 5000');
    console.log('Available endpoints:');
    console.log('  - Clientes: /api/clientes');
    console.log('  - Tipos Membresía: /api/tipos-membresia');
    console.log('  - Membresías: /api/membresias');
    console.log('  - Asistencias: /api/asistencias');
    console.log('  - Pagos: /api/pagos');
    console.log('  - Equipamiento: /api/equipamiento');
    console.log('  - Accesorios: /api/accesorios');
    console.log('  - Mantenimientos: /api/mantenimientos');
});
