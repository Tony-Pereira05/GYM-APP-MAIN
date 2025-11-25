import { equipoAccessorio } from '../entidades/EquipoAccesorio';
import { GestorEquipoAccesorio } from '../gestores/GestorEquipoAccesorio';

export class ServicioEquipoAccesorio {
    private readonly gestorEquipoAccesorio: GestorEquipoAccesorio;

    constructor(gestorEquipoAccesorio: GestorEquipoAccesorio) {
        this.gestorEquipoAccesorio = gestorEquipoAccesorio;
    }

    public crear(nombre: string, cantidad: string, notas?: string): number {
        // Validaciones
        if (!nombre || nombre.trim() === '') {
            throw new Error('El nombre del accesorio es obligatorio.');
        }

        if (nombre.trim().length < 3) {
            throw new Error('El nombre debe tener al menos 3 caracteres.');
        }

        if (!cantidad || cantidad.trim() === '') {
            throw new Error('La cantidad es obligatoria.');
        }

        const nuevoAccesorio = new equipoAccessorio(
            nombre.trim(),
            cantidad.trim(),
            notas?.trim()
        );

        return this.gestorEquipoAccesorio.agregar(nuevoAccesorio);
    }

    public buscar(id: number): equipoAccessorio | null {
        return this.gestorEquipoAccesorio.buscarPorId(id);
    }

    public obtenerTodos(): equipoAccessorio[] {
        return this.gestorEquipoAccesorio.obtenerTodos();
    }

    public actualizar(id: number, cantidad: string, notas: string): void {
        if (!cantidad || cantidad.trim() === '') {
            throw new Error('La cantidad es obligatoria.');
        }

        const accesorio = this.gestorEquipoAccesorio.buscarPorId(id);

        if (!accesorio) {
            throw new Error('Accesorio no encontrado.');
        }

        const actualizado = this.gestorEquipoAccesorio.actualizar(id, cantidad.trim(), notas.trim());

        if (!actualizado) {
            throw new Error('Error al actualizar el accesorio.');
        }
    }

    public eliminar(id: number): void {
        const accesorio = this.gestorEquipoAccesorio.buscarPorId(id);

        if (!accesorio) {
            throw new Error('Accesorio no encontrado.');
        }

        const eliminado = this.gestorEquipoAccesorio.eliminar(id);

        if (!eliminado) {
            throw new Error('Error al eliminar el accesorio.');
        }
    }
}
