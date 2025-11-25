"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.asistencia = void 0;
class asistencia {
    constructor(membresiaId, asistenciaId) {
        this.asistenciaId = asistenciaId || 0;
        this.fechaCheckIn = new Date();
        this.membresiaId = membresiaId;
    }
    getAsistenciaId() {
        return this.asistenciaId;
    }
    getMembresiaId() {
        return this.membresiaId;
    }
    getFechaCheckIn() {
        return this.fechaCheckIn;
    }
}
exports.asistencia = asistencia;
