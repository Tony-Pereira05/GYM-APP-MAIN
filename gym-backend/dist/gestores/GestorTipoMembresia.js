"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GestorTipoMembresia = void 0;
const TipoMembresia_1 = require("../entidades/TipoMembresia");
class GestorTipoMembresia {
    constructor(db) {
        this.db = db;
    }
    // Agregar un nuevo tipo de membresía
    agregar(tipo) {
        const stmt = this.db.prepare(`
      INSERT INTO Tipos_Membresia (Nombre, Duracion_Dias, Precio)
      VALUES (?, ?, ?)
    `);
        const result = stmt.run(tipo.getNombre(), tipo.getDuracionDias(), tipo.getPrecio());
        return result.lastInsertRowid;
    }
    // Buscar tipo de membresía por ID
    buscarPorId(id) {
        const stmt = this.db.prepare(`
      SELECT * FROM Tipos_Membresia WHERE Tipo_Membresia_ID = ?
    `);
        const row = stmt.get(id);
        if (!row) {
            return null;
        }
        return new TipoMembresia_1.tipoMembresia(row.Nombre, row.Duracion_Dias, row.Precio, row.Tipo_Membresia_ID);
    }
    // Obtener todos los tipos de membresía
    obtenerTodos() {
        const stmt = this.db.prepare(`
      SELECT * FROM Tipos_Membresia ORDER BY Precio ASC
    `);
        const rows = stmt.all();
        return rows.map(row => new TipoMembresia_1.tipoMembresia(row.Nombre, row.Duracion_Dias, row.Precio, row.Tipo_Membresia_ID));
    }
    // Actualizar tipo de membresía
    actualizar(id, nombre, duracionDias, precio) {
        const stmt = this.db.prepare(`
      UPDATE Tipos_Membresia 
      SET Nombre = ?, Duracion_Dias = ?, Precio = ?
      WHERE Tipo_Membresia_ID = ?
    `);
        const result = stmt.run(nombre, duracionDias, precio, id);
        return result.changes > 0;
    }
    // Eliminar tipo de membresía por ID
    eliminar(id) {
        const stmt = this.db.prepare(`
      DELETE FROM Tipos_Membresia WHERE Tipo_Membresia_ID = ?
    `);
        const result = stmt.run(id);
        return result.changes > 0;
    }
    // Verificar si existe un tipo de membresía
    existe(id) {
        const stmt = this.db.prepare(`
      SELECT COUNT(*) as count FROM Tipos_Membresia WHERE Tipo_Membresia_ID = ?
    `);
        const result = stmt.get(id);
        return result.count > 0;
    }
}
exports.GestorTipoMembresia = GestorTipoMembresia;
