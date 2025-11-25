import Database from 'better-sqlite3';
import { usuario } from '../entidades/Usuario';

export class GestorUsuario {
    private db: Database.Database;

    constructor(db: Database.Database) {
        this.db = db;
    }

    // Agregar un nuevo usuario
    public agregar(usuario: usuario): number {
        const stmt = this.db.prepare(`
      INSERT INTO Usuarios (Nombre_Usuario, Contrasena_Hash, Email)
      VALUES (?, ?, ?)
    `);

        const result = stmt.run(
            usuario.getNombreUsuario(),
            usuario.getContrasenaHash(),
            usuario.getEmail()
        );

        return result.lastInsertRowid as number;
    }

    // Buscar usuario por ID
    public buscarPorId(id: number): usuario | null {
        const stmt = this.db.prepare(`
      SELECT * FROM Usuarios WHERE Usuario_ID = ?
    `);

        const row = stmt.get(id) as any;

        if (!row) {
            return null;
        }

        return new usuario(
            row.Nombre_Usuario,
            row.Contrasena_Hash,
            row.Email,
            row.Usuario_ID
        );
    }

    // Buscar usuario por nombre de usuario
    public buscarPorNombreUsuario(nombreUsuario: string): usuario | null {
        const stmt = this.db.prepare(`
      SELECT * FROM Usuarios WHERE Nombre_Usuario = ?
    `);

        const row = stmt.get(nombreUsuario) as any;

        if (!row) {
            return null;
        }

        return new usuario(
            row.Nombre_Usuario,
            row.Contrasena_Hash,
            row.Email,
            row.Usuario_ID
        );
    }

    // Obtener todos los usuarios
    public obtenerTodos(): usuario[] {
        const stmt = this.db.prepare(`
      SELECT * FROM Usuarios ORDER BY Nombre_Usuario
    `);

        const rows = stmt.all() as any[];

        return rows.map(row => new usuario(
            row.Nombre_Usuario,
            row.Contrasena_Hash,
            row.Email,
            row.Usuario_ID
        ));
    }

    // Actualizar usuario
    public actualizar(id: number, nombreUsuario: string, email: string): boolean {
        const stmt = this.db.prepare(`
      UPDATE Usuarios 
      SET Nombre_Usuario = ?, Email = ?
      WHERE Usuario_ID = ?
    `);

        const result = stmt.run(nombreUsuario, email, id);

        return result.changes > 0;
    }

    // Actualizar contraseña
    public actualizarContrasena(id: number, contrasenaHash: string): boolean {
        const stmt = this.db.prepare(`
      UPDATE Usuarios 
      SET Contrasena_Hash = ?
      WHERE Usuario_ID = ?
    `);

        const result = stmt.run(contrasenaHash, id);

        return result.changes > 0;
    }

    // Eliminar usuario por ID
    public eliminar(id: number): boolean {
        const stmt = this.db.prepare(`
      DELETE FROM Usuarios WHERE Usuario_ID = ?
    `);

        const result = stmt.run(id);

        return result.changes > 0;
    }

    // Verificar si existe un usuario
    public existe(id: number): boolean {
        const stmt = this.db.prepare(`
      SELECT COUNT(*) as count FROM Usuarios WHERE Usuario_ID = ?
    `);

        const result = stmt.get(id) as any;

        return result.count > 0;
    }

    // Verificar si existe un nombre de usuario
    public existeNombreUsuario(nombreUsuario: string): boolean {
        const stmt = this.db.prepare(`
      SELECT COUNT(*) as count FROM Usuarios WHERE Nombre_Usuario = ?
    `);

        const result = stmt.get(nombreUsuario) as any;

        return result.count > 0;
    }
}
