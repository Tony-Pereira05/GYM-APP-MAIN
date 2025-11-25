
export class pago {
    private readonly pagoId: number;
    private readonly membresiaId: number;
    private readonly monto: number;
    private readonly fechaPago: Date;

    constructor(membresiaId: number, monto: number, pagoId?: number) {
        this.pagoId = pagoId || 0;
        this.membresiaId = membresiaId;
        this.monto = monto;
        this.fechaPago = new Date();
    }

    public getPagoId(): number {
        return this.pagoId;
    }

    public getMembresiaId(): number {
        return this.membresiaId;
    }

    public getMonto(): number {
        return this.monto;
    }

    public getFechaPago(): Date {
        return this.fechaPago;
    }

}