"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GestorUsuario = void 0;
const Usuario_1 = require("../entidades/Usuario");
class GestorUsuario {
    constructor(db) {
        this.db = db;
    }
    // Agregar un nuevo usuario
    agregar(usuario) {
        const stmt = this.db.prepare(`
      INSERT INTO Usuarios (Nombre_Usuario, Contrasena_Hash, Email)
      VALUES (?, ?, ?)
    `);
        const result = stmt.run(usuario.getNombreUsuario(), usuario.getContrasenaHash(), usuario.getEmail());
        return result.lastInsertRowid;
    }
    // Buscar usuario por ID
    buscarPorId(id) {
        const stmt = this.db.prepare(`
      SELECT * FROM Usuarios WHERE Usuario_ID = ?
    `);
        const row = stmt.get(id);
        if (!row) {
            return null;
        }
        return new Usuario_1.usuario(row.Nombre_Usuario, row.Contrasena_Hash, row.Email, row.Usuario_ID);
    }
    // Buscar usuario por nombre de usuario
    buscarPorNombreUsuario(nombreUsuario) {
        const stmt = this.db.prepare(`
      SELECT * FROM Usuarios WHERE Nombre_Usuario = ?
    `);
        const row = stmt.get(nombreUsuario);
        if (!row) {
            return null;
        }
        return new Usuario_1.usuario(row.Nombre_Usuario, row.Contrasena_Hash, row.Email, row.Usuario_ID);
    }
    // Obtener todos los usuarios
    obtenerTodos() {
        const stmt = this.db.prepare(`
      SELECT * FROM Usuarios ORDER BY Nombre_Usuario
    `);
        const rows = stmt.all();
        return rows.map(row => new Usuario_1.usuario(row.Nombre_Usuario, row.Contrasena_Hash, row.Email, row.Usuario_ID));
    }
    // Actualizar usuario
    actualizar(id, nombreUsuario, email) {
        const stmt = this.db.prepare(`
      UPDATE Usuarios 
      SET Nombre_Usuario = ?, Email = ?
      WHERE Usuario_ID = ?
    `);
        const result = stmt.run(nombreUsuario, email, id);
        return result.changes > 0;
    }
    // Actualizar contraseña
    actualizarContrasena(id, contrasenaHash) {
        const stmt = this.db.prepare(`
      UPDATE Usuarios 
      SET Contrasena_Hash = ?
      WHERE Usuario_ID = ?
    `);
        const result = stmt.run(contrasenaHash, id);
        return result.changes > 0;
    }
    // Eliminar usuario por ID
    eliminar(id) {
        const stmt = this.db.prepare(`
      DELETE FROM Usuarios WHERE Usuario_ID = ?
    `);
        const result = stmt.run(id);
        return result.changes > 0;
    }
    // Verificar si existe un usuario
    existe(id) {
        const stmt = this.db.prepare(`
      SELECT COUNT(*) as count FROM Usuarios WHERE Usuario_ID = ?
    `);
        const result = stmt.get(id);
        return result.count > 0;
    }
    // Verificar si existe un nombre de usuario
    existeNombreUsuario(nombreUsuario) {
        const stmt = this.db.prepare(`
      SELECT COUNT(*) as count FROM Usuarios WHERE Nombre_Usuario = ?
    `);
        const result = stmt.get(nombreUsuario);
        return result.count > 0;
    }
}
exports.GestorUsuario = GestorUsuario;
