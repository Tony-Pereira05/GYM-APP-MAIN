import { mantenimiento } from '../entidades/Mantenimiento';
import { GestorMantenimiento } from '../gestores/GestorMantenimiento';
import { GestorEquipamiento } from '../gestores/GestorEquipamiento';

export class ServicioMantenimiento {
    private readonly gestorMantenimiento: GestorMantenimiento;
    private readonly gestorEquipamiento: GestorEquipamiento;

    constructor(gestorMantenimiento: GestorMantenimiento, gestorEquipamiento: GestorEquipamiento) {
        this.gestorMantenimiento = gestorMantenimiento;
        this.gestorEquipamiento = gestorEquipamiento;
    }

    public crear(equipoId: number, descripcion: string, costo: number): number {
        // Validaciones
        if (!equipoId || equipoId <= 0) {
            throw new Error('El equipo es obligatorio.');
        }

        if (!descripcion || descripcion.trim() === '') {
            throw new Error('La descripción es obligatoria.');
        }

        if (descripcion.trim().length < 5) {
            throw new Error('La descripción debe tener al menos 5 caracteres.');
        }

        if (!costo || costo < 0) {
            throw new Error('El costo no puede ser negativo.');
        }

        // Verificar que el equipo existe
        const equipoExiste = this.gestorEquipamiento.existe(equipoId);
        if (!equipoExiste) {
            throw new Error('El equipo no existe.');
        }

        const nuevoMantenimiento = new mantenimiento(
            equipoId,
            descripcion.trim(),
            costo
        );

        return this.gestorMantenimiento.agregar(nuevoMantenimiento);
    }

    public buscar(id: number): mantenimiento | null {
        return this.gestorMantenimiento.buscarPorId(id);
    }

    public obtenerTodos(): mantenimiento[] {
        return this.gestorMantenimiento.obtenerTodos();
    }

    public obtenerPorEquipo(equipoId: number): mantenimiento[] {
        if (!equipoId || equipoId <= 0) {
            throw new Error('El ID del equipo es inválido.');
        }

        return this.gestorMantenimiento.buscarPorEquipo(equipoId);
    }

    public obtenerEnCurso(): mantenimiento[] {
        return this.gestorMantenimiento.obtenerEnCurso();
    }

    public completar(id: number): void {
        const mantenimiento = this.gestorMantenimiento.buscarPorId(id);

        if (!mantenimiento) {
            throw new Error('Mantenimiento no encontrado.');
        }

        if (mantenimiento.getFechaFin() !== null) {
            throw new Error('El mantenimiento ya está completado.');
        }

        const completado = this.gestorMantenimiento.completar(id, new Date());

        if (!completado) {
            throw new Error('Error al completar el mantenimiento.');
        }
    }

    public eliminar(id: number): void {
        const mantenimiento = this.gestorMantenimiento.buscarPorId(id);

        if (!mantenimiento) {
            throw new Error('Mantenimiento no encontrado.');
        }

        const eliminado = this.gestorMantenimiento.eliminar(id);

        if (!eliminado) {
            throw new Error('Error al eliminar el mantenimiento.');
        }
    }

    public calcularCostoTotalPorEquipo(equipoId: number): number {
        if (!equipoId || equipoId <= 0) {
            throw new Error('El ID del equipo es inválido.');
        }

        return this.gestorMantenimiento.calcularCostoTotalPorEquipo(equipoId);
    }
}
