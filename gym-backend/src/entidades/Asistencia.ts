
export class asistencia {
    private readonly asistenciaId: number;
    private readonly membresiaId: number;
    private readonly fechaCheckIn: Date;

    constructor(membresiaId: number, asistenciaId?: number) {
        this.asistenciaId = asistenciaId || 0;
        this.fechaCheckIn = new Date();
        this.membresiaId = membresiaId;
    }

    public getAsistenciaId(): number {
        return this.asistenciaId;
    }

    public getMembresiaId(): number {
        return this.membresiaId;
    }

    public getFechaCheckIn(): Date {
        return this.fechaCheckIn;
    }

}