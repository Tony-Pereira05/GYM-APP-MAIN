import { pago } from '../entidades/Pago';
import { GestorPago } from '../gestores/GestorPago';
import { GestorMembresia } from '../gestores/GestorMembresia';

export class ServicioPago {
    private readonly gestorPago: GestorPago;
    private readonly gestorMembresia: GestorMembresia;

    constructor(gestorPago: GestorPago, gestorMembresia: GestorMembresia) {
        this.gestorPago = gestorPago;
        this.gestorMembresia = gestorMembresia;
    }

    public registrar(membresiaId: number, monto: number): number {
        // Validaciones
        if (!membresiaId || membresiaId <= 0) {
            throw new Error('La membresía es obligatoria.');
        }

        if (!monto || monto <= 0) {
            throw new Error('El monto debe ser mayor a 0.');
        }

        // Verificar que la membresía existe
        const membresiaExiste = this.gestorMembresia.existe(membresiaId);
        if (!membresiaExiste) {
            throw new Error('La membresía no existe.');
        }

        const nuevoPago = new pago(membresiaId, monto);

        return this.gestorPago.agregar(nuevoPago);
    }

    public buscar(id: number): pago | null {
        return this.gestorPago.buscarPorId(id);
    }

    public obtenerTodos(): pago[] {
        return this.gestorPago.obtenerTodos();
    }

    public obtenerPorMembresia(membresiaId: number): pago[] {
        if (!membresiaId || membresiaId <= 0) {
            throw new Error('El ID de la membresía es inválido.');
        }

        return this.gestorPago.buscarPorMembresia(membresiaId);
    }

    public obtenerPorFecha(fechaInicio: string, fechaFin: string): pago[] {
        if (!fechaInicio || fechaInicio.trim() === '') {
            throw new Error('La fecha de inicio y la fecha de fin son obligatorias.');
        }

        return this.gestorPago.buscarPorFecha(fechaInicio, fechaFin);
    }

    public eliminar(id: number): void {
        const pago = this.gestorPago.buscarPorId(id);

        if (!pago) {
            throw new Error('Pago no encontrado.');
        }

        const eliminado = this.gestorPago.eliminar(id);

        if (!eliminado) {
            throw new Error('Error al eliminar el pago.');
        }
    }

    public calcularTotalPorMembresia(membresiaId: number): number {
        if (!membresiaId || membresiaId <= 0) {
            throw new Error('El ID de la membresía es inválido.');
        }

        return this.gestorPago.calcularTotalPorMembresia(membresiaId);
    }
}
