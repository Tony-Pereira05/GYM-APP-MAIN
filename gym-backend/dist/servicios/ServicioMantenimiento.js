"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServicioMantenimiento = void 0;
const Mantenimiento_1 = require("../entidades/Mantenimiento");
class ServicioMantenimiento {
    constructor(gestorMantenimiento, gestorEquipamiento) {
        this.gestorMantenimiento = gestorMantenimiento;
        this.gestorEquipamiento = gestorEquipamiento;
    }
    crear(equipoId, descripcion, costo) {
        // Validaciones
        if (!equipoId || equipoId <= 0) {
            throw new Error('El equipo es obligatorio.');
        }
        if (!descripcion || descripcion.trim() === '') {
            throw new Error('La descripción es obligatoria.');
        }
        if (descripcion.trim().length < 5) {
            throw new Error('La descripción debe tener al menos 5 caracteres.');
        }
        if (!costo || costo < 0) {
            throw new Error('El costo no puede ser negativo.');
        }
        // Verificar que el equipo existe
        const equipoExiste = this.gestorEquipamiento.existe(equipoId);
        if (!equipoExiste) {
            throw new Error('El equipo no existe.');
        }
        const nuevoMantenimiento = new Mantenimiento_1.mantenimiento(equipoId, descripcion.trim(), costo);
        return this.gestorMantenimiento.agregar(nuevoMantenimiento);
    }
    buscar(id) {
        return this.gestorMantenimiento.buscarPorId(id);
    }
    obtenerTodos() {
        return this.gestorMantenimiento.obtenerTodos();
    }
    obtenerPorEquipo(equipoId) {
        if (!equipoId || equipoId <= 0) {
            throw new Error('El ID del equipo es inválido.');
        }
        return this.gestorMantenimiento.buscarPorEquipo(equipoId);
    }
    obtenerEnCurso() {
        return this.gestorMantenimiento.obtenerEnCurso();
    }
    completar(id) {
        const mantenimiento = this.gestorMantenimiento.buscarPorId(id);
        if (!mantenimiento) {
            throw new Error('Mantenimiento no encontrado.');
        }
        if (mantenimiento.getFechaFin() !== null) {
            throw new Error('El mantenimiento ya está completado.');
        }
        const completado = this.gestorMantenimiento.completar(id, new Date());
        if (!completado) {
            throw new Error('Error al completar el mantenimiento.');
        }
    }
    eliminar(id) {
        const mantenimiento = this.gestorMantenimiento.buscarPorId(id);
        if (!mantenimiento) {
            throw new Error('Mantenimiento no encontrado.');
        }
        const eliminado = this.gestorMantenimiento.eliminar(id);
        if (!eliminado) {
            throw new Error('Error al eliminar el mantenimiento.');
        }
    }
    calcularCostoTotalPorEquipo(equipoId) {
        if (!equipoId || equipoId <= 0) {
            throw new Error('El ID del equipo es inválido.');
        }
        return this.gestorMantenimiento.calcularCostoTotalPorEquipo(equipoId);
    }
}
exports.ServicioMantenimiento = ServicioMantenimiento;
