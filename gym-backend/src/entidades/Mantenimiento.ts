export class mantenimiento {
    private readonly mantenimientoId: number;
    private readonly equipoId: number;
    private readonly descripcion: string;
    private readonly fechaInicio: Date;
    private fechaFin: Date | null;
    private readonly costo: number;

    constructor(equipoId: number, descripcion: string, costo: number, mantenimientoId?: number, fechaFin?: Date) {
        this.mantenimientoId = mantenimientoId || 0;
        this.equipoId = equipoId;
        this.descripcion = descripcion;
        this.fechaInicio = new Date();
        this.fechaFin = fechaFin || null;
        this.costo = costo;
    }

    public getMantenimientoId(): number {
        return this.mantenimientoId;
    }

    public getEquipoId(): number {
        return this.equipoId;
    }

    public getDescripcion(): string {
        return this.descripcion;
    }

    public getFechaInicio(): Date {
        return this.fechaInicio;
    }

    public getFechaFin(): Date | null {
        return this.fechaFin;
    }

    public getCosto(): number {
        return this.costo;
    }

    public setFechaFin(fechaFin: Date): void {
        this.fechaFin = fechaFin;
    }
}