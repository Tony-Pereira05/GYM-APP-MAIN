import Database from 'better-sqlite3';
import { equipoAccessorio } from '../entidades/EquipoAccesorio';

export class GestorEquipoAccesorio {
    private db: Database.Database;

    constructor(db: Database.Database) {
        this.db = db;
    }

    // Agregar un nuevo accesorio
    public agregar(accesorio: equipoAccessorio): number {
        const stmt = this.db.prepare(`
      INSERT INTO Equipo_Accesorios (Nombre, Cantidad, Notas)
      VALUES (?, ?, ?)
    `);

        const result = stmt.run(
            accesorio.nombre,
            accesorio.cantidad,
            accesorio.notas
        );

        return result.lastInsertRowid as number;
    }

    // Buscar accesorio por ID
    public buscarPorId(id: number): equipoAccessorio | null {
        const stmt = this.db.prepare(`
      SELECT * FROM Equipo_Accesorios WHERE Accesorio_ID = ?
    `);

        const row = stmt.get(id) as any;

        if (!row) {
            return null;
        }

        return new equipoAccessorio(
            row.Nombre,
            row.Cantidad,
            row.Notas
        );
    }

    // Obtener todos los accesorios
    public obtenerTodos(): equipoAccessorio[] {
        const stmt = this.db.prepare(`
      SELECT * FROM Equipo_Accesorios ORDER BY Nombre
    `);

        const rows = stmt.all() as any[];

        return rows.map(row => new equipoAccessorio(
            row.Nombre,
            row.Cantidad,
            row.Notas
        ));
    }

    // Actualizar accesorio
    public actualizar(id: number, cantidad: string, notas: string): boolean {
        const stmt = this.db.prepare(`
      UPDATE Equipo_Accesorios 
      SET Cantidad = ?, Notas = ?
      WHERE Accesorio_ID = ?
    `);

        const result = stmt.run(cantidad, notas, id);

        return result.changes > 0;
    }

    // Eliminar accesorio por ID
    public eliminar(id: number): boolean {
        const stmt = this.db.prepare(`
      DELETE FROM Equipo_Accesorios WHERE Accesorio_ID = ?
    `);

        const result = stmt.run(id);

        return result.changes > 0;
    }

    // Verificar si existe un accesorio
    public existe(id: number): boolean {
        const stmt = this.db.prepare(`
      SELECT COUNT(*) as count FROM Equipo_Accesorios WHERE Accesorio_ID = ?
    `);

        const result = stmt.get(id) as any;

        return result.count > 0;
    }
}
