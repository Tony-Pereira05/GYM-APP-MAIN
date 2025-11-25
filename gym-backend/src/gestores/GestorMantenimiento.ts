import Database from 'better-sqlite3';
import { mantenimiento } from '../entidades/Mantenimiento';

export class GestorMantenimiento {
    private db: Database.Database;

    constructor(db: Database.Database) {
        this.db = db;
    }

    // Agregar un nuevo mantenimiento
    public agregar(mantenimiento: mantenimiento): number {
        const stmt = this.db.prepare(`
      INSERT INTO Mantenimientos (Equipo_ID, Descripcion, Fecha_Inicio, Fecha_Fin, Costo)
      VALUES (?, ?, ?, ?, ?)
    `);

        const result = stmt.run(
            mantenimiento.getEquipoId(),
            mantenimiento.getDescripcion(),
            mantenimiento.getFechaInicio().toISOString(),
            mantenimiento.getFechaFin() ? mantenimiento.getFechaFin()!.toISOString() : null,
            mantenimiento.getCosto()
        );

        return result.lastInsertRowid as number;
    }

    // Buscar mantenimiento por ID
    public buscarPorId(id: number): mantenimiento | null {
        const stmt = this.db.prepare(`
      SELECT * FROM Mantenimientos WHERE Mantenimiento_ID = ?
    `);

        const row = stmt.get(id) as any;

        if (!row) {
            return null;
        }

        const fechaFin = row.Fecha_Fin ? new Date(row.Fecha_Fin) : undefined;

        return new mantenimiento(
            row.Equipo_ID,
            row.Descripcion,
            row.Costo,
            row.Mantenimiento_ID,
            fechaFin
        );
    }

    // Buscar mantenimientos por equipo
    public buscarPorEquipo(equipoId: number): mantenimiento[] {
        const stmt = this.db.prepare(`
      SELECT * FROM Mantenimientos 
      WHERE Equipo_ID = ?
      ORDER BY Fecha_Inicio DESC
    `);

        const rows = stmt.all(equipoId) as any[];

        return rows.map(row => {
            const fechaFin = row.Fecha_Fin ? new Date(row.Fecha_Fin) : undefined;
            return new mantenimiento(
                row.Equipo_ID,
                row.Descripcion,
                row.Costo,
                row.Mantenimiento_ID,
                fechaFin
            );
        });
    }

    // Obtener mantenimientos en curso (sin Fecha_Fin)
    public obtenerEnCurso(): mantenimiento[] {
        const stmt = this.db.prepare(`
      SELECT * FROM Mantenimientos 
      WHERE Fecha_Fin IS NULL
      ORDER BY Fecha_Inicio DESC
    `);

        const rows = stmt.all() as any[];

        return rows.map(row => new mantenimiento(
            row.Equipo_ID,
            row.Descripcion,
            row.Costo,
            row.Mantenimiento_ID
        ));
    }

    // Obtener todos los mantenimientos
    public obtenerTodos(): mantenimiento[] {
        const stmt = this.db.prepare(`
      SELECT * FROM Mantenimientos ORDER BY Fecha_Inicio DESC
    `);

        const rows = stmt.all() as any[];

        return rows.map(row => {
            const fechaFin = row.Fecha_Fin ? new Date(row.Fecha_Fin) : undefined;
            return new mantenimiento(
                row.Equipo_ID,
                row.Descripcion,
                row.Costo,
                row.Mantenimiento_ID,
                fechaFin
            );
        });
    }

    // Completar un mantenimiento (establecer Fecha_Fin)
    public completar(id: number, fechaFin: Date): boolean {
        const stmt = this.db.prepare(`
      UPDATE Mantenimientos 
      SET Fecha_Fin = ?
      WHERE Mantenimiento_ID = ?
    `);

        const result = stmt.run(fechaFin.toISOString(), id);

        return result.changes > 0;
    }

    // Eliminar mantenimiento por ID
    public eliminar(id: number): boolean {
        const stmt = this.db.prepare(`
      DELETE FROM Mantenimientos WHERE Mantenimiento_ID = ?
    `);

        const result = stmt.run(id);

        return result.changes > 0;
    }

    // Verificar si existe un mantenimiento
    public existe(id: number): boolean {
        const stmt = this.db.prepare(`
      SELECT COUNT(*) as count FROM Mantenimientos WHERE Mantenimiento_ID = ?
    `);

        const result = stmt.get(id) as any;

        return result.count > 0;
    }

    // Calcular costo total de mantenimientos de un equipo
    public calcularCostoTotalPorEquipo(equipoId: number): number {
        const stmt = this.db.prepare(`
      SELECT COALESCE(SUM(Costo), 0) as total FROM Mantenimientos WHERE Equipo_ID = ?
    `);

        const result = stmt.get(equipoId) as any;

        return result.total;
    }
}
