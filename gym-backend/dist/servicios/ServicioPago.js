"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServicioPago = void 0;
const Pago_1 = require("../entidades/Pago");
class ServicioPago {
    constructor(gestorPago, gestorMembresia) {
        this.gestorPago = gestorPago;
        this.gestorMembresia = gestorMembresia;
    }
    registrar(membresiaId, monto) {
        // Validaciones
        if (!membresiaId || membresiaId <= 0) {
            throw new Error('La membresía es obligatoria.');
        }
        if (!monto || monto <= 0) {
            throw new Error('El monto debe ser mayor a 0.');
        }
        // Verificar que la membresía existe
        const membresiaExiste = this.gestorMembresia.existe(membresiaId);
        if (!membresiaExiste) {
            throw new Error('La membresía no existe.');
        }
        const nuevoPago = new Pago_1.pago(membresiaId, monto);
        return this.gestorPago.agregar(nuevoPago);
    }
    buscar(id) {
        return this.gestorPago.buscarPorId(id);
    }
    obtenerTodos() {
        return this.gestorPago.obtenerTodos();
    }
    obtenerPorMembresia(membresiaId) {
        if (!membresiaId || membresiaId <= 0) {
            throw new Error('El ID de la membresía es inválido.');
        }
        return this.gestorPago.buscarPorMembresia(membresiaId);
    }
    obtenerPorFecha(fechaInicio, fechaFin) {
        if (!fechaInicio || fechaInicio.trim() === '') {
            throw new Error('La fecha de inicio y la fecha de fin son obligatorias.');
        }
        return this.gestorPago.buscarPorFecha(fechaInicio, fechaFin);
    }
    eliminar(id) {
        const pago = this.gestorPago.buscarPorId(id);
        if (!pago) {
            throw new Error('Pago no encontrado.');
        }
        const eliminado = this.gestorPago.eliminar(id);
        if (!eliminado) {
            throw new Error('Error al eliminar el pago.');
        }
    }
    calcularTotalPorMembresia(membresiaId) {
        if (!membresiaId || membresiaId <= 0) {
            throw new Error('El ID de la membresía es inválido.');
        }
        return this.gestorPago.calcularTotalPorMembresia(membresiaId);
    }
}
exports.ServicioPago = ServicioPago;
