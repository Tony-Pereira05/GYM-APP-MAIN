import Database from 'better-sqlite3';
import { asistencia } from '../entidades/Asistencia';

export class GestorAsistencia {
    private db: Database.Database;

    constructor(db: Database.Database) {
        this.db = db;
    }

    // Agregar una nueva asistencia
    public agregar(asistencia: asistencia): number {
        const stmt = this.db.prepare(`
      INSERT INTO Asistencias (Membresia_ID, Fecha_Check_In)
      VALUES (?, ?)
    `);

        const result = stmt.run(
            asistencia.getMembresiaId(),
            asistencia.getFechaCheckIn().toISOString()
        );

        return result.lastInsertRowid as number;
    }

    // Buscar asistencia por ID
    public buscarPorId(id: number): asistencia | null {
        const stmt = this.db.prepare(`
      SELECT * FROM Asistencias WHERE Asistencia_ID = ?
    `);

        const row = stmt.get(id) as any;

        if (!row) {
            return null;
        }

        return new asistencia(
            row.Membresia_ID,
            row.Asistencia_ID
        );
    }

    // Buscar asistencias por membresía
    public buscarPorMembresia(membresiaId: number): asistencia[] {
        const stmt = this.db.prepare(`
      SELECT * FROM Asistencias 
      WHERE Membresia_ID = ?
      ORDER BY Fecha_Check_In DESC
    `);

        const rows = stmt.all(membresiaId) as any[];

        return rows.map(row => new asistencia(
            row.Membresia_ID,
            row.Asistencia_ID
        ));
    }

    // Buscar asistencias por fecha
    public buscarPorFecha(fecha: string): asistencia[] {
        const stmt = this.db.prepare(`
      SELECT * FROM Asistencias 
      WHERE date(Fecha_Check_In) = date(?)
      ORDER BY Fecha_Check_In DESC
    `);

        const rows = stmt.all(fecha) as any[];

        return rows.map(row => new asistencia(
            row.Membresia_ID,
            row.Asistencia_ID
        ));
    }

    // Obtener todas las asistencias
    public obtenerTodas(): asistencia[] {
        const stmt = this.db.prepare(`
      SELECT * FROM Asistencias ORDER BY Fecha_Check_In DESC
    `);

        const rows = stmt.all() as any[];

        return rows.map(row => new asistencia(
            row.Membresia_ID,
            row.Asistencia_ID
        ));
    }

    // Eliminar asistencia por ID
    public eliminar(id: number): boolean {
        const stmt = this.db.prepare(`
      DELETE FROM Asistencias WHERE Asistencia_ID = ?
    `);

        const result = stmt.run(id);

        return result.changes > 0;
    }

    // Verificar si existe una asistencia
    public existe(id: number): boolean {
        const stmt = this.db.prepare(`
      SELECT COUNT(*) as count FROM Asistencias WHERE Asistencia_ID = ?
    `);

        const result = stmt.get(id) as any;

        return result.count > 0;
    }

    // Contar asistencias de una membresía
    public contarPorMembresia(membresiaId: number): number {
        const stmt = this.db.prepare(`
      SELECT COUNT(*) as count FROM Asistencias WHERE Membresia_ID = ?
    `);

        const result = stmt.get(membresiaId) as any;

        return result.count;
    }
}
