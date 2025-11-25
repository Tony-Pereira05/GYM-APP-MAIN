import { equipamiento } from '../entidades/Equipamiento';
import { GestorEquipamiento } from '../gestores/GestorEquipamiento';

export class ServicioEquipamiento {
    private readonly gestorEquipamiento: GestorEquipamiento;

    constructor(gestorEquipamiento: GestorEquipamiento) {
        this.gestorEquipamiento = gestorEquipamiento;
    }

    public crear(nombre: string, tipo: string, imagenUrl?: string, descripcion?: string): number {
        // Validaciones
        if (!nombre || nombre.trim() === '') {
            throw new Error('El nombre del equipo es obligatorio.');
        }

        if (nombre.trim().length < 3) {
            throw new Error('El nombre debe tener al menos 3 caracteres.');
        }

        if (!tipo || tipo.trim() === '') {
            throw new Error('El tipo de equipo es obligatorio.');
        }

        const nuevoEquipo = new equipamiento(
            nombre.trim(),
            tipo.trim(),
            imagenUrl?.trim(),
            descripcion?.trim()
        );

        return this.gestorEquipamiento.agregar(nuevoEquipo);
    }

    public buscar(id: number): equipamiento | null {
        return this.gestorEquipamiento.buscarPorId(id);
    }

    public obtenerTodos(): equipamiento[] {
        return this.gestorEquipamiento.obtenerTodos();
    }

    public buscarPorTipo(tipo: string): equipamiento[] {
        if (!tipo || tipo.trim() === '') {
            throw new Error('El tipo de equipo es obligatorio.');
        }

        return this.gestorEquipamiento.buscarPorTipo(tipo.trim());
    }

    public actualizar(id: number, imagenUrl?: string, descripcion?: string): void {
        const equipo = this.gestorEquipamiento.buscarPorId(id);

        if (!equipo) {
            throw new Error('Equipo no encontrado.');
        }

        const actualizado = this.gestorEquipamiento.actualizar(id, imagenUrl?.trim(), descripcion?.trim());

        if (!actualizado) {
            throw new Error('Error al actualizar el equipo.');
        }
    }

    public eliminar(id: number): void {
        const equipo = this.gestorEquipamiento.buscarPorId(id);

        if (!equipo) {
            throw new Error('Equipo no encontrado.');
        }

        const eliminado = this.gestorEquipamiento.eliminar(id);

        if (!eliminado) {
            throw new Error('Error al eliminar el equipo.');
        }
    }
}
