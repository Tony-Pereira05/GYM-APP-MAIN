"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GestorAsistencia = void 0;
const Asistencia_1 = require("../entidades/Asistencia");
class GestorAsistencia {
    constructor(db) {
        this.db = db;
    }
    // Agregar una nueva asistencia
    agregar(asistencia) {
        const stmt = this.db.prepare(`
      INSERT INTO Asistencias (Membresia_ID, Fecha_Check_In)
      VALUES (?, ?)
    `);
        const result = stmt.run(asistencia.getMembresiaId(), asistencia.getFechaCheckIn().toISOString());
        return result.lastInsertRowid;
    }
    // Buscar asistencia por ID
    buscarPorId(id) {
        const stmt = this.db.prepare(`
      SELECT * FROM Asistencias WHERE Asistencia_ID = ?
    `);
        const row = stmt.get(id);
        if (!row) {
            return null;
        }
        return new Asistencia_1.asistencia(row.Membresia_ID, row.Asistencia_ID);
    }
    // Buscar asistencias por membresía
    buscarPorMembresia(membresiaId) {
        const stmt = this.db.prepare(`
      SELECT * FROM Asistencias 
      WHERE Membresia_ID = ?
      ORDER BY Fecha_Check_In DESC
    `);
        const rows = stmt.all(membresiaId);
        return rows.map(row => new Asistencia_1.asistencia(row.Membresia_ID, row.Asistencia_ID));
    }
    // Buscar asistencias por fecha
    buscarPorFecha(fecha) {
        const stmt = this.db.prepare(`
      SELECT * FROM Asistencias 
      WHERE date(Fecha_Check_In) = date(?)
      ORDER BY Fecha_Check_In DESC
    `);
        const rows = stmt.all(fecha);
        return rows.map(row => new Asistencia_1.asistencia(row.Membresia_ID, row.Asistencia_ID));
    }
    // Obtener todas las asistencias
    obtenerTodas() {
        const stmt = this.db.prepare(`
      SELECT * FROM Asistencias ORDER BY Fecha_Check_In DESC
    `);
        const rows = stmt.all();
        return rows.map(row => new Asistencia_1.asistencia(row.Membresia_ID, row.Asistencia_ID));
    }
    // Eliminar asistencia por ID
    eliminar(id) {
        const stmt = this.db.prepare(`
      DELETE FROM Asistencias WHERE Asistencia_ID = ?
    `);
        const result = stmt.run(id);
        return result.changes > 0;
    }
    // Verificar si existe una asistencia
    existe(id) {
        const stmt = this.db.prepare(`
      SELECT COUNT(*) as count FROM Asistencias WHERE Asistencia_ID = ?
    `);
        const result = stmt.get(id);
        return result.count > 0;
    }
    // Contar asistencias de una membresía
    contarPorMembresia(membresiaId) {
        const stmt = this.db.prepare(`
      SELECT COUNT(*) as count FROM Asistencias WHERE Membresia_ID = ?
    `);
        const result = stmt.get(membresiaId);
        return result.count;
    }
}
exports.GestorAsistencia = GestorAsistencia;
