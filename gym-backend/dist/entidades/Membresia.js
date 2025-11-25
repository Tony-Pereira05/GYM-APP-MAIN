"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.membresia = void 0;
class membresia {
    constructor(tipoMembresiaId, clienteId, membresiaId) {
        this.membresiaId = membresiaId || 0;
        this.tipoMembresiaId = tipoMembresiaId;
        this.clienteId = clienteId;
        this.fechaInicio = new Date();
    }
    getMembresiaId() {
        return this.membresiaId;
    }
    getTipoMembresiaId() {
        return this.tipoMembresiaId;
    }
    getClienteId() {
        return this.clienteId;
    }
    getFechaInicio() {
        return this.fechaInicio;
    }
}
exports.membresia = membresia;
