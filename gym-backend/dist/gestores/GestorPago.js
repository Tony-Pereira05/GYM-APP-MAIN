"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GestorPago = void 0;
const Pago_1 = require("../entidades/Pago");
class GestorPago {
    constructor(db) {
        this.db = db;
    }
    // Agregar un nuevo pago
    agregar(pago) {
        const stmt = this.db.prepare(`
      INSERT INTO Pagos (Membresia_ID, Monto, Fecha_Pago)
      VALUES (?, ?, ?)
    `);
        const result = stmt.run(pago.getMembresiaId(), pago.getMonto(), pago.getFechaPago().toISOString());
        return result.lastInsertRowid;
    }
    // Buscar pago por ID
    buscarPorId(id) {
        const stmt = this.db.prepare(`
      SELECT * FROM Pagos WHERE Pago_ID = ?
    `);
        const row = stmt.get(id);
        if (!row) {
            return null;
        }
        return new Pago_1.pago(row.Membresia_ID, row.Monto, row.Pago_ID);
    }
    // Buscar pagos por membresía
    buscarPorMembresia(membresiaId) {
        const stmt = this.db.prepare(`
      SELECT * FROM Pagos 
      WHERE Membresia_ID = ?
      ORDER BY Fecha_Pago DESC
    `);
        const rows = stmt.all(membresiaId);
        return rows.map(row => new Pago_1.pago(row.Membresia_ID, row.Monto, row.Pago_ID));
    }
    // Buscar pagos por rango de fechas
    buscarPorFecha(fechaInicio, fechaFin) {
        const stmt = this.db.prepare(`
      SELECT * FROM Pagos 
      WHERE date(Fecha_Pago) BETWEEN date(?) AND date(?)
      ORDER BY Fecha_Pago DESC
    `);
        const rows = stmt.all(fechaInicio, fechaFin);
        return rows.map(row => new Pago_1.pago(row.Membresia_ID, row.Monto, row.Pago_ID));
    }
    // Obtener todos los pagos
    obtenerTodos() {
        const stmt = this.db.prepare(`
      SELECT * FROM Pagos ORDER BY Fecha_Pago DESC
    `);
        const rows = stmt.all();
        return rows.map(row => new Pago_1.pago(row.Membresia_ID, row.Monto, row.Pago_ID));
    }
    // Eliminar pago por ID
    eliminar(id) {
        const stmt = this.db.prepare(`
      DELETE FROM Pagos WHERE Pago_ID = ?
    `);
        const result = stmt.run(id);
        return result.changes > 0;
    }
    // Verificar si existe un pago
    existe(id) {
        const stmt = this.db.prepare(`
      SELECT COUNT(*) as count FROM Pagos WHERE Pago_ID = ?
    `);
        const result = stmt.get(id);
        return result.count > 0;
    }
    // Calcular total de pagos de una membresía
    calcularTotalPorMembresia(membresiaId) {
        const stmt = this.db.prepare(`
      SELECT COALESCE(SUM(Monto), 0) as total FROM Pagos WHERE Membresia_ID = ?
    `);
        const result = stmt.get(membresiaId);
        return result.total;
    }
}
exports.GestorPago = GestorPago;
