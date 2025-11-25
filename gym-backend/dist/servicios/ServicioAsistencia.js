"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServicioAsistencia = void 0;
const Asistencia_1 = require("../entidades/Asistencia");
class ServicioAsistencia {
    constructor(gestorAsistencia, gestorMembresia) {
        this.gestorAsistencia = gestorAsistencia;
        this.gestorMembresia = gestorMembresia;
    }
    registrar(membresiaId) {
        // Validaciones
        if (!membresiaId || membresiaId <= 0) {
            throw new Error('La membresía es obligatoria.');
        }
        // Verificar que la membresía existe
        const membresiaExiste = this.gestorMembresia.existe(membresiaId);
        if (!membresiaExiste) {
            throw new Error('La membresía no existe.');
        }
        // Verificar que la membresía está activa
        const membresia = this.gestorMembresia.buscarPorId(membresiaId);
        if (!membresia) {
            throw new Error('La membresía no encontrada.');
        }
        const nuevaAsistencia = new Asistencia_1.asistencia(membresiaId);
        return this.gestorAsistencia.agregar(nuevaAsistencia);
    }
    buscar(id) {
        return this.gestorAsistencia.buscarPorId(id);
    }
    obtenerTodas() {
        return this.gestorAsistencia.obtenerTodas();
    }
    obtenerPorMembresia(membresiaId) {
        if (!membresiaId || membresiaId <= 0) {
            throw new Error('El ID de la membresía es inválido.');
        }
        return this.gestorAsistencia.buscarPorMembresia(membresiaId);
    }
    obtenerPorFecha(fecha) {
        if (!fecha || fecha.trim() === '') {
            throw new Error('La fecha es obligatoria.');
        }
        return this.gestorAsistencia.buscarPorFecha(fecha);
    }
    eliminar(id) {
        const asistencia = this.gestorAsistencia.buscarPorId(id);
        if (!asistencia) {
            throw new Error('Asistencia no encontrada.');
        }
        const eliminado = this.gestorAsistencia.eliminar(id);
        if (!eliminado) {
            throw new Error('Error al eliminar la asistencia.');
        }
    }
    contarPorMembresia(membresiaId) {
        if (!membresiaId || membresiaId <= 0) {
            throw new Error('El ID de la membresía es inválido.');
        }
        return this.gestorAsistencia.contarPorMembresia(membresiaId);
    }
}
exports.ServicioAsistencia = ServicioAsistencia;
