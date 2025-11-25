"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GestorEquipamiento = void 0;
const Equipamiento_1 = require("../entidades/Equipamiento");
class GestorEquipamiento {
    constructor(db) {
        this.db = db;
    }
    // Agregar un nuevo equipo
    agregar(equipo) {
        const stmt = this.db.prepare(`
      INSERT INTO Equipamiento (Nombre, Tipo, Imagen_URL, Descripcion)
      VALUES (?, ?, ?, ?)
    `);
        const result = stmt.run(equipo.getNombre(), equipo.getTipo(), equipo.getImagenUrl() || null, equipo.getDescripcion() || null);
        return result.lastInsertRowid;
    }
    // Buscar equipo por ID
    buscarPorId(id) {
        const stmt = this.db.prepare(`
      SELECT * FROM Equipamiento WHERE Equipo_ID = ?
    `);
        const row = stmt.get(id);
        if (!row) {
            return null;
        }
        return new Equipamiento_1.equipamiento(row.Nombre, row.Tipo, row.Imagen_URL, row.Descripcion);
    }
    // Buscar equipos por tipo
    buscarPorTipo(tipo) {
        const stmt = this.db.prepare(`
      SELECT * FROM Equipamiento 
      WHERE Tipo = ?
      ORDER BY Nombre
    `);
        const rows = stmt.all(tipo);
        return rows.map(row => new Equipamiento_1.equipamiento(row.Nombre, row.Tipo, row.Imagen_URL, row.Descripcion));
    }
    // Obtener todos los equipos
    obtenerTodos() {
        const stmt = this.db.prepare(`
      SELECT * FROM Equipamiento ORDER BY Nombre
    `);
        const rows = stmt.all();
        return rows.map(row => new Equipamiento_1.equipamiento(row.Nombre, row.Tipo, row.Imagen_URL, row.Descripcion));
    }
    // Actualizar equipo
    actualizar(id, imagenUrl, descripcion) {
        const stmt = this.db.prepare(`
      UPDATE Equipamiento 
      SET Imagen_URL = ?, Descripcion = ?
      WHERE Equipo_ID = ?
    `);
        const result = stmt.run(imagenUrl || null, descripcion || null, id);
        return result.changes > 0;
    }
    // Eliminar equipo por ID
    eliminar(id) {
        const stmt = this.db.prepare(`
      DELETE FROM Equipamiento WHERE Equipo_ID = ?
    `);
        const result = stmt.run(id);
        return result.changes > 0;
    }
    // Verificar si existe un equipo
    existe(id) {
        const stmt = this.db.prepare(`
      SELECT COUNT(*) as count FROM Equipamiento WHERE Equipo_ID = ?
    `);
        const result = stmt.get(id);
        return result.count > 0;
    }
}
exports.GestorEquipamiento = GestorEquipamiento;
