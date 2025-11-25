import Database from 'better-sqlite3';
import { equipamiento } from '../entidades/Equipamiento';

export class GestorEquipamiento {
    private db: Database.Database;

    constructor(db: Database.Database) {
        this.db = db;
    }

    // Agregar un nuevo equipo
    public agregar(equipo: equipamiento): number {
        const stmt = this.db.prepare(`
      INSERT INTO Equipamiento (Nombre, Tipo, Imagen_URL, Descripcion)
      VALUES (?, ?, ?, ?)
    `);

        const result = stmt.run(
            equipo.getNombre(),
            equipo.getTipo(),
            equipo.getImagenUrl() || null,
            equipo.getDescripcion() || null
        );

        return result.lastInsertRowid as number;
    }

    // Buscar equipo por ID
    public buscarPorId(id: number): equipamiento | null {
        const stmt = this.db.prepare(`
      SELECT * FROM Equipamiento WHERE Equipo_ID = ?
    `);

        const row = stmt.get(id) as any;

        if (!row) {
            return null;
        }

        return new equipamiento(
            row.Nombre,
            row.Tipo,
            row.Imagen_URL,
            row.Descripcion
        );
    }

    // Buscar equipos por tipo
    public buscarPorTipo(tipo: string): equipamiento[] {
        const stmt = this.db.prepare(`
      SELECT * FROM Equipamiento 
      WHERE Tipo = ?
      ORDER BY Nombre
    `);

        const rows = stmt.all(tipo) as any[];

        return rows.map(row => new equipamiento(
            row.Nombre,
            row.Tipo,
            row.Imagen_URL,
            row.Descripcion
        ));
    }

    // Obtener todos los equipos
    public obtenerTodos(): equipamiento[] {
        const stmt = this.db.prepare(`
      SELECT * FROM Equipamiento ORDER BY Nombre
    `);

        const rows = stmt.all() as any[];

        return rows.map(row => new equipamiento(
            row.Nombre,
            row.Tipo,
            row.Imagen_URL,
            row.Descripcion
        ));
    }

    // Actualizar equipo
    public actualizar(id: number, imagenUrl?: string, descripcion?: string): boolean {
        const stmt = this.db.prepare(`
      UPDATE Equipamiento 
      SET Imagen_URL = ?, Descripcion = ?
      WHERE Equipo_ID = ?
    `);

        const result = stmt.run(imagenUrl || null, descripcion || null, id);

        return result.changes > 0;
    }

    // Eliminar equipo por ID
    public eliminar(id: number): boolean {
        const stmt = this.db.prepare(`
      DELETE FROM Equipamiento WHERE Equipo_ID = ?
    `);

        const result = stmt.run(id);

        return result.changes > 0;
    }

    // Verificar si existe un equipo
    public existe(id: number): boolean {
        const stmt = this.db.prepare(`
      SELECT COUNT(*) as count FROM Equipamiento WHERE Equipo_ID = ?
    `);

        const result = stmt.get(id) as any;

        return result.count > 0;
    }
}
