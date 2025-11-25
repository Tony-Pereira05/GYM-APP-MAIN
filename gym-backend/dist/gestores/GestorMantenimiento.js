"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GestorMantenimiento = void 0;
const Mantenimiento_1 = require("../entidades/Mantenimiento");
class GestorMantenimiento {
    constructor(db) {
        this.db = db;
    }
    // Agregar un nuevo mantenimiento
    agregar(mantenimiento) {
        const stmt = this.db.prepare(`
      INSERT INTO Mantenimientos (Equipo_ID, Descripcion, Fecha_Inicio, Fecha_Fin, Costo)
      VALUES (?, ?, ?, ?, ?)
    `);
        const result = stmt.run(mantenimiento.getEquipoId(), mantenimiento.getDescripcion(), mantenimiento.getFechaInicio().toISOString(), mantenimiento.getFechaFin() ? mantenimiento.getFechaFin().toISOString() : null, mantenimiento.getCosto());
        return result.lastInsertRowid;
    }
    // Buscar mantenimiento por ID
    buscarPorId(id) {
        const stmt = this.db.prepare(`
      SELECT * FROM Mantenimientos WHERE Mantenimiento_ID = ?
    `);
        const row = stmt.get(id);
        if (!row) {
            return null;
        }
        const fechaFin = row.Fecha_Fin ? new Date(row.Fecha_Fin) : undefined;
        return new Mantenimiento_1.mantenimiento(row.Equipo_ID, row.Descripcion, row.Costo, row.Mantenimiento_ID, fechaFin);
    }
    // Buscar mantenimientos por equipo
    buscarPorEquipo(equipoId) {
        const stmt = this.db.prepare(`
      SELECT * FROM Mantenimientos 
      WHERE Equipo_ID = ?
      ORDER BY Fecha_Inicio DESC
    `);
        const rows = stmt.all(equipoId);
        return rows.map(row => {
            const fechaFin = row.Fecha_Fin ? new Date(row.Fecha_Fin) : undefined;
            return new Mantenimiento_1.mantenimiento(row.Equipo_ID, row.Descripcion, row.Costo, row.Mantenimiento_ID, fechaFin);
        });
    }
    // Obtener mantenimientos en curso (sin Fecha_Fin)
    obtenerEnCurso() {
        const stmt = this.db.prepare(`
      SELECT * FROM Mantenimientos 
      WHERE Fecha_Fin IS NULL
      ORDER BY Fecha_Inicio DESC
    `);
        const rows = stmt.all();
        return rows.map(row => new Mantenimiento_1.mantenimiento(row.Equipo_ID, row.Descripcion, row.Costo, row.Mantenimiento_ID));
    }
    // Obtener todos los mantenimientos
    obtenerTodos() {
        const stmt = this.db.prepare(`
      SELECT * FROM Mantenimientos ORDER BY Fecha_Inicio DESC
    `);
        const rows = stmt.all();
        return rows.map(row => {
            const fechaFin = row.Fecha_Fin ? new Date(row.Fecha_Fin) : undefined;
            return new Mantenimiento_1.mantenimiento(row.Equipo_ID, row.Descripcion, row.Costo, row.Mantenimiento_ID, fechaFin);
        });
    }
    // Completar un mantenimiento (establecer Fecha_Fin)
    completar(id, fechaFin) {
        const stmt = this.db.prepare(`
      UPDATE Mantenimientos 
      SET Fecha_Fin = ?
      WHERE Mantenimiento_ID = ?
    `);
        const result = stmt.run(fechaFin.toISOString(), id);
        return result.changes > 0;
    }
    // Eliminar mantenimiento por ID
    eliminar(id) {
        const stmt = this.db.prepare(`
      DELETE FROM Mantenimientos WHERE Mantenimiento_ID = ?
    `);
        const result = stmt.run(id);
        return result.changes > 0;
    }
    // Verificar si existe un mantenimiento
    existe(id) {
        const stmt = this.db.prepare(`
      SELECT COUNT(*) as count FROM Mantenimientos WHERE Mantenimiento_ID = ?
    `);
        const result = stmt.get(id);
        return result.count > 0;
    }
    // Calcular costo total de mantenimientos de un equipo
    calcularCostoTotalPorEquipo(equipoId) {
        const stmt = this.db.prepare(`
      SELECT COALESCE(SUM(Costo), 0) as total FROM Mantenimientos WHERE Equipo_ID = ?
    `);
        const result = stmt.get(equipoId);
        return result.total;
    }
}
exports.GestorMantenimiento = GestorMantenimiento;
