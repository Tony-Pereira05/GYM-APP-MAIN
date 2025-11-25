"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mantenimiento = void 0;
class mantenimiento {
    constructor(equipoId, descripcion, costo, mantenimientoId, fechaFin) {
        this.mantenimientoId = mantenimientoId || 0;
        this.equipoId = equipoId;
        this.descripcion = descripcion;
        this.fechaInicio = new Date();
        this.fechaFin = fechaFin || null;
        this.costo = costo;
    }
    getMantenimientoId() {
        return this.mantenimientoId;
    }
    getEquipoId() {
        return this.equipoId;
    }
    getDescripcion() {
        return this.descripcion;
    }
    getFechaInicio() {
        return this.fechaInicio;
    }
    getFechaFin() {
        return this.fechaFin;
    }
    getCosto() {
        return this.costo;
    }
    setFechaFin(fechaFin) {
        this.fechaFin = fechaFin;
    }
}
exports.mantenimiento = mantenimiento;
