"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServicioEquipamiento = void 0;
const Equipamiento_1 = require("../entidades/Equipamiento");
class ServicioEquipamiento {
    constructor(gestorEquipamiento) {
        this.gestorEquipamiento = gestorEquipamiento;
    }
    crear(nombre, tipo, imagenUrl, descripcion) {
        // Validaciones
        if (!nombre || nombre.trim() === '') {
            throw new Error('El nombre del equipo es obligatorio.');
        }
        if (nombre.trim().length < 3) {
            throw new Error('El nombre debe tener al menos 3 caracteres.');
        }
        if (!tipo || tipo.trim() === '') {
            throw new Error('El tipo de equipo es obligatorio.');
        }
        const nuevoEquipo = new Equipamiento_1.equipamiento(nombre.trim(), tipo.trim(), imagenUrl?.trim(), descripcion?.trim());
        return this.gestorEquipamiento.agregar(nuevoEquipo);
    }
    buscar(id) {
        return this.gestorEquipamiento.buscarPorId(id);
    }
    obtenerTodos() {
        return this.gestorEquipamiento.obtenerTodos();
    }
    buscarPorTipo(tipo) {
        if (!tipo || tipo.trim() === '') {
            throw new Error('El tipo de equipo es obligatorio.');
        }
        return this.gestorEquipamiento.buscarPorTipo(tipo.trim());
    }
    actualizar(id, imagenUrl, descripcion) {
        const equipo = this.gestorEquipamiento.buscarPorId(id);
        if (!equipo) {
            throw new Error('Equipo no encontrado.');
        }
        const actualizado = this.gestorEquipamiento.actualizar(id, imagenUrl?.trim(), descripcion?.trim());
        if (!actualizado) {
            throw new Error('Error al actualizar el equipo.');
        }
    }
    eliminar(id) {
        const equipo = this.gestorEquipamiento.buscarPorId(id);
        if (!equipo) {
            throw new Error('Equipo no encontrado.');
        }
        const eliminado = this.gestorEquipamiento.eliminar(id);
        if (!eliminado) {
            throw new Error('Error al eliminar el equipo.');
        }
    }
}
exports.ServicioEquipamiento = ServicioEquipamiento;
