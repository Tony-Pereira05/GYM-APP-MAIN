import { tipoMembresia } from '../entidades/TipoMembresia';
import { GestorTipoMembresia } from '../gestores/GestorTipoMembresia';

export class ServicioTipoMembresia {
    private readonly gestorTipoMembresia: GestorTipoMembresia;

    constructor(gestorTipoMembresia: GestorTipoMembresia) {
        this.gestorTipoMembresia = gestorTipoMembresia;
    }

    public crear(nombre: string, duracionDias: number, precio: number): number {
        // Validaciones
        if (!nombre || nombre.trim() === '') {
            throw new Error('El nombre del tipo de membresía es obligatorio.');
        }

        if (nombre.trim().length < 3) {
            throw new Error('El nombre debe tener al menos 3 caracteres.');
        }

        if (!duracionDias || duracionDias <= 0) {
            throw new Error('La duración debe ser mayor a 0 días.');
        }

        if (!precio || precio < 0) {
            throw new Error('El precio no puede ser negativo.');
        }

        const nuevoTipo = new tipoMembresia(
            nombre.trim(),
            duracionDias,
            precio
        );

        return this.gestorTipoMembresia.agregar(nuevoTipo);
    }

    public buscar(id: number): tipoMembresia | null {
        return this.gestorTipoMembresia.buscarPorId(id);
    }

    public obtenerTodos(): tipoMembresia[] {
        return this.gestorTipoMembresia.obtenerTodos();
    }

    public actualizar(id: number, nombre: string, duracionDias: number, precio: number): void {
        // Validaciones
        if (!nombre || nombre.trim() === '') {
            throw new Error('El nombre del tipo de membresía es obligatorio.');
        }

        if (nombre.trim().length < 3) {
            throw new Error('El nombre debe tener al menos 3 caracteres.');
        }

        if (!duracionDias || duracionDias <= 0) {
            throw new Error('La duración debe ser mayor a 0 días.');
        }

        if (!precio || precio < 0) {
            throw new Error('El precio no puede ser negativo.');
        }

        const tipo = this.gestorTipoMembresia.buscarPorId(id);

        if (!tipo) {
            throw new Error('Tipo de membresía no encontrado.');
        }

        const actualizado = this.gestorTipoMembresia.actualizar(id, nombre.trim(), duracionDias, precio);

        if (!actualizado) {
            throw new Error('Error al actualizar el tipo de membresía.');
        }
    }

    public eliminar(id: number): void {
        const tipo = this.gestorTipoMembresia.buscarPorId(id);

        if (!tipo) {
            throw new Error('Tipo de membresía no encontrado.');
        }

        // TODO: Verificar que no haya membresías activas con este tipo
        // const tieneMembresiasActivas = this.gestorMembresia.tieneActivas(id);
        // if (tieneMembresiasActivas) {
        //     throw new Error('No se puede eliminar: hay membresías activas con este tipo.');
        // }

        const eliminado = this.gestorTipoMembresia.eliminar(id);

        if (!eliminado) {
            throw new Error('Error al eliminar el tipo de membresía.');
        }
    }
}
