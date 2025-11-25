"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServicioEquipoAccesorio = void 0;
const EquipoAccesorio_1 = require("../entidades/EquipoAccesorio");
class ServicioEquipoAccesorio {
    constructor(gestorEquipoAccesorio) {
        this.gestorEquipoAccesorio = gestorEquipoAccesorio;
    }
    crear(nombre, cantidad, notas) {
        // Validaciones
        if (!nombre || nombre.trim() === '') {
            throw new Error('El nombre del accesorio es obligatorio.');
        }
        if (nombre.trim().length < 3) {
            throw new Error('El nombre debe tener al menos 3 caracteres.');
        }
        if (!cantidad || cantidad.trim() === '') {
            throw new Error('La cantidad es obligatoria.');
        }
        const nuevoAccesorio = new EquipoAccesorio_1.equipoAccessorio(nombre.trim(), cantidad.trim(), notas?.trim());
        return this.gestorEquipoAccesorio.agregar(nuevoAccesorio);
    }
    buscar(id) {
        return this.gestorEquipoAccesorio.buscarPorId(id);
    }
    obtenerTodos() {
        return this.gestorEquipoAccesorio.obtenerTodos();
    }
    actualizar(id, cantidad, notas) {
        if (!cantidad || cantidad.trim() === '') {
            throw new Error('La cantidad es obligatoria.');
        }
        const accesorio = this.gestorEquipoAccesorio.buscarPorId(id);
        if (!accesorio) {
            throw new Error('Accesorio no encontrado.');
        }
        const actualizado = this.gestorEquipoAccesorio.actualizar(id, cantidad.trim(), notas.trim());
        if (!actualizado) {
            throw new Error('Error al actualizar el accesorio.');
        }
    }
    eliminar(id) {
        const accesorio = this.gestorEquipoAccesorio.buscarPorId(id);
        if (!accesorio) {
            throw new Error('Accesorio no encontrado.');
        }
        const eliminado = this.gestorEquipoAccesorio.eliminar(id);
        if (!eliminado) {
            throw new Error('Error al eliminar el accesorio.');
        }
    }
}
exports.ServicioEquipoAccesorio = ServicioEquipoAccesorio;
