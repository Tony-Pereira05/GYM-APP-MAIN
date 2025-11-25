"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GestorCliente = void 0;
const Cliente_1 = require("../entidades/Cliente");
class GestorCliente {
    constructor(db) {
        this.db = db;
    }
    // Agregar un nuevo cliente a la base de datos
    agregar(cliente) {
        const stmt = this.db.prepare(`
      INSERT INTO Clientes (Nombre_Completo, Telefono, ID_Tipo_Membresia, Notas, Fecha_Registro)
      VALUES (?, ?, ?, ?, ?)
    `);
        const result = stmt.run(cliente.getNombreCompleto(), cliente.getTelefono(), cliente.getIdTipoMembresia(), cliente.getNotas(), cliente.getFechaRegistro().toISOString());
        return result.lastInsertRowid;
    }
    // Buscar cliente por ID
    buscarPorId(id) {
        const stmt = this.db.prepare(`
      SELECT * FROM Clientes WHERE ID = ?
    `);
        const row = stmt.get(id);
        if (!row) {
            return null;
        }
        return new Cliente_1.cliente(row.Nombre_Completo, row.Telefono, row.ID_Tipo_Membresia, row.Notas, row.ID);
    }
    // Buscar clientes por nombre (búsqueda parcial)
    buscarPorNombre(nombre) {
        const stmt = this.db.prepare(`
      SELECT * FROM Clientes 
      WHERE Nombre_Completo LIKE ?
      ORDER BY Nombre_Completo
    `);
        const rows = stmt.all(`%${nombre}%`);
        return rows.map(row => new Cliente_1.cliente(row.Nombre_Completo, row.Telefono, row.ID_Tipo_Membresia, row.Notas, row.ID));
    }
    // Buscar cliente por teléfono
    buscarPorTelefono(telefono) {
        const stmt = this.db.prepare(`
      SELECT * FROM Clientes WHERE Telefono = ?
    `);
        const row = stmt.get(telefono);
        if (!row) {
            return null;
        }
        return new Cliente_1.cliente(row.Nombre_Completo, row.Telefono, row.ID_Tipo_Membresia, row.Notas, row.ID);
    }
    // Obtener todos los clientes
    obtenerTodos() {
        const stmt = this.db.prepare(`
      SELECT * FROM Clientes ORDER BY Nombre_Completo
    `);
        const rows = stmt.all();
        return rows.map(row => new Cliente_1.cliente(row.Nombre_Completo, row.Telefono, row.ID_Tipo_Membresia, row.Notas, row.ID));
    }
    // Actualizar notas de un cliente
    actualizarNotas(id, notas) {
        const stmt = this.db.prepare(`
      UPDATE Clientes SET Notas = ? WHERE ID = ?
    `);
        const result = stmt.run(notas, id);
        return result.changes > 0;
    }
    actualizarTelefono(id, telefono) {
        const stmt = this.db.prepare(`
      UPDATE Clientes SET Telefono = ? WHERE ID = ?
    `);
        const result = stmt.run(telefono, id);
        return result.changes > 0;
    }
    // Eliminar cliente por ID
    eliminar(id) {
        const stmt = this.db.prepare(`
      DELETE FROM Clientes WHERE ID = ?
    `);
        const result = stmt.run(id);
        return result.changes > 0;
    }
    // Buscar clientes (por ID, nombre o teléfono)
    buscar(criterio) {
        // Si es número, buscar por ID o teléfono
        if (typeof criterio === 'number') {
            const porId = this.buscarPorId(criterio);
            if (porId) {
                return [porId];
            }
            const porTelefono = this.buscarPorTelefono(criterio);
            if (porTelefono) {
                return [porTelefono];
            }
            return [];
        }
        // Si es string, buscar por nombre
        return this.buscarPorNombre(criterio);
    }
    // Verificar si existe un cliente
    existe(id) {
        const stmt = this.db.prepare(`
      SELECT COUNT(*) as count FROM Clientes WHERE ID = ?
    `);
        const result = stmt.get(id);
        return result.count > 0;
    }
}
exports.GestorCliente = GestorCliente;
