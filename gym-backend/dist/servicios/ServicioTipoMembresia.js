"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServicioTipoMembresia = void 0;
const TipoMembresia_1 = require("../entidades/TipoMembresia");
class ServicioTipoMembresia {
    constructor(gestorTipoMembresia) {
        this.gestorTipoMembresia = gestorTipoMembresia;
    }
    crear(nombre, duracionDias, precio) {
        // Validaciones
        if (!nombre || nombre.trim() === '') {
            throw new Error('El nombre del tipo de membresía es obligatorio.');
        }
        if (nombre.trim().length < 3) {
            throw new Error('El nombre debe tener al menos 3 caracteres.');
        }
        if (!duracionDias || duracionDias <= 0) {
            throw new Error('La duración debe ser mayor a 0 días.');
        }
        if (!precio || precio < 0) {
            throw new Error('El precio no puede ser negativo.');
        }
        const nuevoTipo = new TipoMembresia_1.tipoMembresia(nombre.trim(), duracionDias, precio);
        return this.gestorTipoMembresia.agregar(nuevoTipo);
    }
    buscar(id) {
        return this.gestorTipoMembresia.buscarPorId(id);
    }
    obtenerTodos() {
        return this.gestorTipoMembresia.obtenerTodos();
    }
    actualizar(id, nombre, duracionDias, precio) {
        // Validaciones
        if (!nombre || nombre.trim() === '') {
            throw new Error('El nombre del tipo de membresía es obligatorio.');
        }
        if (nombre.trim().length < 3) {
            throw new Error('El nombre debe tener al menos 3 caracteres.');
        }
        if (!duracionDias || duracionDias <= 0) {
            throw new Error('La duración debe ser mayor a 0 días.');
        }
        if (!precio || precio < 0) {
            throw new Error('El precio no puede ser negativo.');
        }
        const tipo = this.gestorTipoMembresia.buscarPorId(id);
        if (!tipo) {
            throw new Error('Tipo de membresía no encontrado.');
        }
        const actualizado = this.gestorTipoMembresia.actualizar(id, nombre.trim(), duracionDias, precio);
        if (!actualizado) {
            throw new Error('Error al actualizar el tipo de membresía.');
        }
    }
    eliminar(id) {
        const tipo = this.gestorTipoMembresia.buscarPorId(id);
        if (!tipo) {
            throw new Error('Tipo de membresía no encontrado.');
        }
        // TODO: Verificar que no haya membresías activas con este tipo
        // const tieneMembresiasActivas = this.gestorMembresia.tieneActivas(id);
        // if (tieneMembresiasActivas) {
        //     throw new Error('No se puede eliminar: hay membresías activas con este tipo.');
        // }
        const eliminado = this.gestorTipoMembresia.eliminar(id);
        if (!eliminado) {
            throw new Error('Error al eliminar el tipo de membresía.');
        }
    }
}
exports.ServicioTipoMembresia = ServicioTipoMembresia;
