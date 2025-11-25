import Database from 'better-sqlite3';
import { pago } from '../entidades/Pago';

export class GestorPago {
    private db: Database.Database;

    constructor(db: Database.Database) {
        this.db = db;
    }

    // Agregar un nuevo pago
    public agregar(pago: pago): number {
        const stmt = this.db.prepare(`
      INSERT INTO Pagos (Membresia_ID, Monto, Fecha_Pago)
      VALUES (?, ?, ?)
    `);

        const result = stmt.run(
            pago.getMembresiaId(),
            pago.getMonto(),
            pago.getFechaPago().toISOString()
        );

        return result.lastInsertRowid as number;
    }

    // Buscar pago por ID
    public buscarPorId(id: number): pago | null {
        const stmt = this.db.prepare(`
      SELECT * FROM Pagos WHERE Pago_ID = ?
    `);

        const row = stmt.get(id) as any;

        if (!row) {
            return null;
        }

        return new pago(
            row.Membresia_ID,
            row.Monto,
            row.Pago_ID
        );
    }

    // Buscar pagos por membresía
    public buscarPorMembresia(membresiaId: number): pago[] {
        const stmt = this.db.prepare(`
      SELECT * FROM Pagos 
      WHERE Membresia_ID = ?
      ORDER BY Fecha_Pago DESC
    `);

        const rows = stmt.all(membresiaId) as any[];

        return rows.map(row => new pago(
            row.Membresia_ID,
            row.Monto,
            row.Pago_ID
        ));
    }

    // Buscar pagos por rango de fechas
    public buscarPorFecha(fechaInicio: string, fechaFin: string): pago[] {
        const stmt = this.db.prepare(`
      SELECT * FROM Pagos 
      WHERE date(Fecha_Pago) BETWEEN date(?) AND date(?)
      ORDER BY Fecha_Pago DESC
    `);

        const rows = stmt.all(fechaInicio, fechaFin) as any[];

        return rows.map(row => new pago(
            row.Membresia_ID,
            row.Monto,
            row.Pago_ID
        ));
    }

    // Obtener todos los pagos
    public obtenerTodos(): pago[] {
        const stmt = this.db.prepare(`
      SELECT * FROM Pagos ORDER BY Fecha_Pago DESC
    `);

        const rows = stmt.all() as any[];

        return rows.map(row => new pago(
            row.Membresia_ID,
            row.Monto,
            row.Pago_ID
        ));
    }

    // Eliminar pago por ID
    public eliminar(id: number): boolean {
        const stmt = this.db.prepare(`
      DELETE FROM Pagos WHERE Pago_ID = ?
    `);

        const result = stmt.run(id);

        return result.changes > 0;
    }

    // Verificar si existe un pago
    public existe(id: number): boolean {
        const stmt = this.db.prepare(`
      SELECT COUNT(*) as count FROM Pagos WHERE Pago_ID = ?
    `);

        const result = stmt.get(id) as any;

        return result.count > 0;
    }

    // Calcular total de pagos de una membresía
    public calcularTotalPorMembresia(membresiaId: number): number {
        const stmt = this.db.prepare(`
      SELECT COALESCE(SUM(Monto), 0) as total FROM Pagos WHERE Membresia_ID = ?
    `);

        const result = stmt.get(membresiaId) as any;

        return result.total;
    }
}
