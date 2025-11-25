import { asistencia } from '../entidades/Asistencia';
import { GestorAsistencia } from '../gestores/GestorAsistencia';
import { GestorMembresia } from '../gestores/GestorMembresia';

export class ServicioAsistencia {
    private readonly gestorAsistencia: GestorAsistencia;
    private readonly gestorMembresia: GestorMembresia;

    constructor(gestorAsistencia: GestorAsistencia, gestorMembresia: GestorMembresia) {
        this.gestorAsistencia = gestorAsistencia;
        this.gestorMembresia = gestorMembresia;
    }

    public registrar(membresiaId: number): number {
        // Validaciones
        if (!membresiaId || membresiaId <= 0) {
            throw new Error('La membresía es obligatoria.');
        }

        // Verificar que la membresía existe
        const membresiaExiste = this.gestorMembresia.existe(membresiaId);
        if (!membresiaExiste) {
            throw new Error('La membresía no existe.');
        }

        // Verificar que la membresía está activa
        const membresia = this.gestorMembresia.buscarPorId(membresiaId);
        if (!membresia) {
            throw new Error('La membresía no encontrada.');
        }

        const nuevaAsistencia = new asistencia(membresiaId);

        return this.gestorAsistencia.agregar(nuevaAsistencia);
    }

    public buscar(id: number): asistencia | null {
        return this.gestorAsistencia.buscarPorId(id);
    }

    public obtenerTodas(): asistencia[] {
        return this.gestorAsistencia.obtenerTodas();
    }

    public obtenerPorMembresia(membresiaId: number): asistencia[] {
        if (!membresiaId || membresiaId <= 0) {
            throw new Error('El ID de la membresía es inválido.');
        }

        return this.gestorAsistencia.buscarPorMembresia(membresiaId);
    }

    public obtenerPorFecha(fecha: string): asistencia[] {
        if (!fecha || fecha.trim() === '') {
            throw new Error('La fecha es obligatoria.');
        }

        return this.gestorAsistencia.buscarPorFecha(fecha);
    }

    public eliminar(id: number): void {
        const asistencia = this.gestorAsistencia.buscarPorId(id);

        if (!asistencia) {
            throw new Error('Asistencia no encontrada.');
        }

        const eliminado = this.gestorAsistencia.eliminar(id);

        if (!eliminado) {
            throw new Error('Error al eliminar la asistencia.');
        }
    }

    public contarPorMembresia(membresiaId: number): number {
        if (!membresiaId || membresiaId <= 0) {
            throw new Error('El ID de la membresía es inválido.');
        }

        return this.gestorAsistencia.contarPorMembresia(membresiaId);
    }
}
