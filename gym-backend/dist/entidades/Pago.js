"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pago = void 0;
class pago {
    constructor(membresiaId, monto, pagoId) {
        this.pagoId = pagoId || 0;
        this.membresiaId = membresiaId;
        this.monto = monto;
        this.fechaPago = new Date();
    }
    getPagoId() {
        return this.pagoId;
    }
    getMembresiaId() {
        return this.membresiaId;
    }
    getMonto() {
        return this.monto;
    }
    getFechaPago() {
        return this.fechaPago;
    }
}
exports.pago = pago;
