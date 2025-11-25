import Database from 'better-sqlite3';
import { membresia } from '../entidades/Membresia';

export class GestorMembresia {
    private db: Database.Database;

    constructor(db: Database.Database) {
        this.db = db;
    }

    // Agregar una nueva membresía
    public agregar(membresia: membresia): number {
        const stmt = this.db.prepare(`
      INSERT INTO Membresias (Tipo_Membresia_ID, Cliente_ID, Fecha_Inicio)
      VALUES (?, ?, ?)
    `);

        const result = stmt.run(
            membresia.getTipoMembresiaId(),
            membresia.getClienteId(),
            membresia.getFechaInicio().toISOString()
        );

        return result.lastInsertRowid as number;
    }

    // Buscar membresía por ID
    public buscarPorId(id: number): membresia | null {
        const stmt = this.db.prepare(`
      SELECT * FROM Membresias WHERE Membresia_ID = ?
    `);

        const row = stmt.get(id) as any;

        if (!row) {
            return null;
        }

        return new membresia(
            row.Tipo_Membresia_ID,
            row.Cliente_ID,
            row.Membresia_ID
        );
    }

    // Buscar membresías por cliente
    public buscarPorCliente(clienteId: number): membresia[] {
        const stmt = this.db.prepare(`
      SELECT * FROM Membresias 
      WHERE Cliente_ID = ?
      ORDER BY Fecha_Inicio DESC
    `);

        const rows = stmt.all(clienteId) as any[];

        return rows.map(row => new membresia(
            row.Tipo_Membresia_ID,
            row.Cliente_ID,
            row.Membresia_ID
        ));
    }

    // Obtener todas las membresías
    public obtenerTodas(): membresia[] {
        const stmt = this.db.prepare(`
      SELECT * FROM Membresias ORDER BY Fecha_Inicio DESC
    `);

        const rows = stmt.all() as any[];

        return rows.map(row => new membresia(
            row.Tipo_Membresia_ID,
            row.Cliente_ID,
            row.Membresia_ID
        ));
    }

    // Eliminar membresía por ID
    public eliminar(id: number): boolean {
        const stmt = this.db.prepare(`
      DELETE FROM Membresias WHERE Membresia_ID = ?
    `);

        const result = stmt.run(id);

        return result.changes > 0;
    }

    // Verificar si existe una membresía
    public existe(id: number): boolean {
        const stmt = this.db.prepare(`
      SELECT COUNT(*) as count FROM Membresias WHERE Membresia_ID = ?
    `);

        const result = stmt.get(id) as any;

        return result.count > 0;
    }

    // Obtener membresía activa de un cliente
    public obtenerActivaPorCliente(clienteId: number): membresia | null {
        const stmt = this.db.prepare(`
      SELECT m.* 
      FROM Membresias m
      INNER JOIN Tipos_Membresia tm ON m.Tipo_Membresia_ID = tm.Tipo_Membresia_ID
      WHERE m.Cliente_ID = ?
      AND date(m.Fecha_Inicio, '+' || tm.Duracion_Dias || ' days') >= date('now')
      ORDER BY m.Fecha_Inicio DESC
      LIMIT 1
    `);

        const row = stmt.get(clienteId) as any;

        if (!row) {
            return null;
        }

        return new membresia(
            row.Tipo_Membresia_ID,
            row.Cliente_ID,
            row.Membresia_ID
        );
    }
}
