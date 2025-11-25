"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GestorMembresia = void 0;
const Membresia_1 = require("../entidades/Membresia");
class GestorMembresia {
    constructor(db) {
        this.db = db;
    }
    // Agregar una nueva membresía
    agregar(membresia) {
        const stmt = this.db.prepare(`
      INSERT INTO Membresias (Tipo_Membresia_ID, Cliente_ID, Fecha_Inicio)
      VALUES (?, ?, ?)
    `);
        const result = stmt.run(membresia.getTipoMembresiaId(), membresia.getClienteId(), membresia.getFechaInicio().toISOString());
        return result.lastInsertRowid;
    }
    // Buscar membresía por ID
    buscarPorId(id) {
        const stmt = this.db.prepare(`
      SELECT * FROM Membresias WHERE Membresia_ID = ?
    `);
        const row = stmt.get(id);
        if (!row) {
            return null;
        }
        return new Membresia_1.membresia(row.Tipo_Membresia_ID, row.Cliente_ID, row.Membresia_ID);
    }
    // Buscar membresías por cliente
    buscarPorCliente(clienteId) {
        const stmt = this.db.prepare(`
      SELECT * FROM Membresias 
      WHERE Cliente_ID = ?
      ORDER BY Fecha_Inicio DESC
    `);
        const rows = stmt.all(clienteId);
        return rows.map(row => new Membresia_1.membresia(row.Tipo_Membresia_ID, row.Cliente_ID, row.Membresia_ID));
    }
    // Obtener todas las membresías
    obtenerTodas() {
        const stmt = this.db.prepare(`
      SELECT * FROM Membresias ORDER BY Fecha_Inicio DESC
    `);
        const rows = stmt.all();
        return rows.map(row => new Membresia_1.membresia(row.Tipo_Membresia_ID, row.Cliente_ID, row.Membresia_ID));
    }
    // Eliminar membresía por ID
    eliminar(id) {
        const stmt = this.db.prepare(`
      DELETE FROM Membresias WHERE Membresia_ID = ?
    `);
        const result = stmt.run(id);
        return result.changes > 0;
    }
    // Verificar si existe una membresía
    existe(id) {
        const stmt = this.db.prepare(`
      SELECT COUNT(*) as count FROM Membresias WHERE Membresia_ID = ?
    `);
        const result = stmt.get(id);
        return result.count > 0;
    }
    // Obtener membresía activa de un cliente
    obtenerActivaPorCliente(clienteId) {
        const stmt = this.db.prepare(`
      SELECT m.* 
      FROM Membresias m
      INNER JOIN Tipos_Membresia tm ON m.Tipo_Membresia_ID = tm.Tipo_Membresia_ID
      WHERE m.Cliente_ID = ?
      AND date(m.Fecha_Inicio, '+' || tm.Duracion_Dias || ' days') >= date('now')
      ORDER BY m.Fecha_Inicio DESC
      LIMIT 1
    `);
        const row = stmt.get(clienteId);
        if (!row) {
            return null;
        }
        return new Membresia_1.membresia(row.Tipo_Membresia_ID, row.Cliente_ID, row.Membresia_ID);
    }
}
exports.GestorMembresia = GestorMembresia;
