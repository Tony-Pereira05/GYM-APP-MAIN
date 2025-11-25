
export class membresia {
    private readonly membresiaId: number;
    private readonly tipoMembresiaId: number;
    private readonly clienteId: number;
    private readonly fechaInicio: Date;

    constructor(tipoMembresiaId: number, clienteId: number, membresiaId?: number) {
        this.membresiaId = membresiaId || 0;
        this.tipoMembresiaId = tipoMembresiaId;
        this.clienteId = clienteId;
        this.fechaInicio = new Date();
    }

    public getMembresiaId(): number {
        return this.membresiaId;
    }

    public getTipoMembresiaId(): number {
        return this.tipoMembresiaId;
    }

    public getClienteId(): number {
        return this.clienteId;
    }

    public getFechaInicio(): Date {
        return this.fechaInicio;
    }

}