"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServicioMembresia = void 0;
const Membresia_1 = require("../entidades/Membresia");
class ServicioMembresia {
    constructor(gestorMembresia, gestorCliente) {
        this.gestorMembresia = gestorMembresia;
        this.gestorCliente = gestorCliente;
    }
    crear(tipoMembresiaId, clienteId) {
        // Validaciones
        if (!tipoMembresiaId || tipoMembresiaId <= 0) {
            throw new Error('El tipo de membresía es obligatorio.');
        }
        if (!clienteId || clienteId <= 0) {
            throw new Error('El cliente es obligatorio.');
        }
        // Verificar que el cliente existe
        const clienteExiste = this.gestorCliente.existe(clienteId);
        if (!clienteExiste) {
            throw new Error('El cliente no existe.');
        }
        const nuevaMembresia = new Membresia_1.membresia(tipoMembresiaId, clienteId);
        return this.gestorMembresia.agregar(nuevaMembresia);
    }
    buscar(id) {
        return this.gestorMembresia.buscarPorId(id);
    }
    obtenerTodas() {
        return this.gestorMembresia.obtenerTodas();
    }
    obtenerPorCliente(clienteId) {
        if (!clienteId || clienteId <= 0) {
            throw new Error('El ID del cliente es inválido.');
        }
        return this.gestorMembresia.buscarPorCliente(clienteId);
    }
    obtenerActivaPorCliente(clienteId) {
        if (!clienteId || clienteId <= 0) {
            throw new Error('El ID del cliente es inválido.');
        }
        return this.gestorMembresia.obtenerActivaPorCliente(clienteId);
    }
    renovar(clienteId, tipoMembresiaId) {
        // Validaciones
        if (!clienteId || clienteId <= 0) {
            throw new Error('El ID del cliente es inválido.');
        }
        if (!tipoMembresiaId || tipoMembresiaId <= 0) {
            throw new Error('El tipo de membresía es obligatorio.');
        }
        // Verificar que el cliente existe
        const clienteExiste = this.gestorCliente.existe(clienteId);
        if (!clienteExiste) {
            throw new Error('El cliente no existe.');
        }
        // Crear nueva membresía (renovación)
        return this.crear(tipoMembresiaId, clienteId);
    }
    eliminar(id) {
        const membresia = this.gestorMembresia.buscarPorId(id);
        if (!membresia) {
            throw new Error('Membresía no encontrada.');
        }
        const eliminado = this.gestorMembresia.eliminar(id);
        if (!eliminado) {
            throw new Error('Error al eliminar la membresía.');
        }
    }
}
exports.ServicioMembresia = ServicioMembresia;
