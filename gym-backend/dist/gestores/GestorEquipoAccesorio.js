"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GestorEquipoAccesorio = void 0;
const EquipoAccesorio_1 = require("../entidades/EquipoAccesorio");
class GestorEquipoAccesorio {
    constructor(db) {
        this.db = db;
    }
    // Agregar un nuevo accesorio
    agregar(accesorio) {
        const stmt = this.db.prepare(`
      INSERT INTO Equipo_Accesorios (Nombre, Cantidad, Notas)
      VALUES (?, ?, ?)
    `);
        const result = stmt.run(accesorio.nombre, accesorio.cantidad, accesorio.notas);
        return result.lastInsertRowid;
    }
    // Buscar accesorio por ID
    buscarPorId(id) {
        const stmt = this.db.prepare(`
      SELECT * FROM Equipo_Accesorios WHERE Accesorio_ID = ?
    `);
        const row = stmt.get(id);
        if (!row) {
            return null;
        }
        return new EquipoAccesorio_1.equipoAccessorio(row.Nombre, row.Cantidad, row.Notas);
    }
    // Obtener todos los accesorios
    obtenerTodos() {
        const stmt = this.db.prepare(`
      SELECT * FROM Equipo_Accesorios ORDER BY Nombre
    `);
        const rows = stmt.all();
        return rows.map(row => new EquipoAccesorio_1.equipoAccessorio(row.Nombre, row.Cantidad, row.Notas));
    }
    // Actualizar accesorio
    actualizar(id, cantidad, notas) {
        const stmt = this.db.prepare(`
      UPDATE Equipo_Accesorios 
      SET Cantidad = ?, Notas = ?
      WHERE Accesorio_ID = ?
    `);
        const result = stmt.run(cantidad, notas, id);
        return result.changes > 0;
    }
    // Eliminar accesorio por ID
    eliminar(id) {
        const stmt = this.db.prepare(`
      DELETE FROM Equipo_Accesorios WHERE Accesorio_ID = ?
    `);
        const result = stmt.run(id);
        return result.changes > 0;
    }
    // Verificar si existe un accesorio
    existe(id) {
        const stmt = this.db.prepare(`
      SELECT COUNT(*) as count FROM Equipo_Accesorios WHERE Accesorio_ID = ?
    `);
        const result = stmt.get(id);
        return result.count > 0;
    }
}
exports.GestorEquipoAccesorio = GestorEquipoAccesorio;
