import Database from 'better-sqlite3';
import { tipoMembresia } from '../entidades/TipoMembresia';

export class GestorTipoMembresia {
    private db: Database.Database;

    constructor(db: Database.Database) {
        this.db = db;
    }

    // Agregar un nuevo tipo de membresía
    public agregar(tipo: tipoMembresia): number {
        const stmt = this.db.prepare(`
      INSERT INTO Tipos_Membresia (Nombre, Duracion_Dias, Precio)
      VALUES (?, ?, ?)
    `);

        const result = stmt.run(
            tipo.getNombre(),
            tipo.getDuracionDias(),
            tipo.getPrecio()
        );

        return result.lastInsertRowid as number;
    }

    // Buscar tipo de membresía por ID
    public buscarPorId(id: number): tipoMembresia | null {
        const stmt = this.db.prepare(`
      SELECT * FROM Tipos_Membresia WHERE Tipo_Membresia_ID = ?
    `);

        const row = stmt.get(id) as any;

        if (!row) {
            return null;
        }

        return new tipoMembresia(
            row.Nombre,
            row.Duracion_Dias,
            row.Precio,
            row.Tipo_Membresia_ID
        );
    }

    // Obtener todos los tipos de membresía
    public obtenerTodos(): tipoMembresia[] {
        const stmt = this.db.prepare(`
      SELECT * FROM Tipos_Membresia ORDER BY Precio ASC
    `);

        const rows = stmt.all() as any[];

        return rows.map(row => new tipoMembresia(
            row.Nombre,
            row.Duracion_Dias,
            row.Precio,
            row.Tipo_Membresia_ID
        ));
    }

    // Actualizar tipo de membresía
    public actualizar(id: number, nombre: string, duracionDias: number, precio: number): boolean {
        const stmt = this.db.prepare(`
      UPDATE Tipos_Membresia 
      SET Nombre = ?, Duracion_Dias = ?, Precio = ?
      WHERE Tipo_Membresia_ID = ?
    `);

        const result = stmt.run(nombre, duracionDias, precio, id);

        return result.changes > 0;
    }

    // Eliminar tipo de membresía por ID
    public eliminar(id: number): boolean {
        const stmt = this.db.prepare(`
      DELETE FROM Tipos_Membresia WHERE Tipo_Membresia_ID = ?
    `);

        const result = stmt.run(id);

        return result.changes > 0;
    }

    // Verificar si existe un tipo de membresía
    public existe(id: number): boolean {
        const stmt = this.db.prepare(`
      SELECT COUNT(*) as count FROM Tipos_Membresia WHERE Tipo_Membresia_ID = ?
    `);

        const result = stmt.get(id) as any;

        return result.count > 0;
    }
}
