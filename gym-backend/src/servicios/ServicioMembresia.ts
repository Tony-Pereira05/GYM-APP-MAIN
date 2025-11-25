import { membresia } from '../entidades/Membresia';
import { GestorMembresia } from '../gestores/GestorMembresia';
import { GestorCliente } from '../gestores/GestorCliente';

export class ServicioMembresia {
    private readonly gestorMembresia: GestorMembresia;
    private readonly gestorCliente: GestorCliente;

    constructor(gestorMembresia: GestorMembresia, gestorCliente: GestorCliente) {
        this.gestorMembresia = gestorMembresia;
        this.gestorCliente = gestorCliente;
    }

    public crear(tipoMembresiaId: number, clienteId: number): number {
        // Validaciones
        if (!tipoMembresiaId || tipoMembresiaId <= 0) {
            throw new Error('El tipo de membresía es obligatorio.');
        }

        if (!clienteId || clienteId <= 0) {
            throw new Error('El cliente es obligatorio.');
        }

        // Verificar que el cliente existe
        const clienteExiste = this.gestorCliente.existe(clienteId);
        if (!clienteExiste) {
            throw new Error('El cliente no existe.');
        }

        const nuevaMembresia = new membresia(
            tipoMembresiaId,
            clienteId
        );

        return this.gestorMembresia.agregar(nuevaMembresia);
    }

    public buscar(id: number): membresia | null {
        return this.gestorMembresia.buscarPorId(id);
    }

    public obtenerTodas(): membresia[] {
        return this.gestorMembresia.obtenerTodas();
    }

    public obtenerPorCliente(clienteId: number): membresia[] {
        if (!clienteId || clienteId <= 0) {
            throw new Error('El ID del cliente es inválido.');
        }

        return this.gestorMembresia.buscarPorCliente(clienteId);
    }

    public obtenerActivaPorCliente(clienteId: number): membresia | null {
        if (!clienteId || clienteId <= 0) {
            throw new Error('El ID del cliente es inválido.');
        }

        return this.gestorMembresia.obtenerActivaPorCliente(clienteId);
    }

    public renovar(clienteId: number, tipoMembresiaId: number): number {
        // Validaciones
        if (!clienteId || clienteId <= 0) {
            throw new Error('El ID del cliente es inválido.');
        }

        if (!tipoMembresiaId || tipoMembresiaId <= 0) {
            throw new Error('El tipo de membresía es obligatorio.');
        }

        // Verificar que el cliente existe
        const clienteExiste = this.gestorCliente.existe(clienteId);
        if (!clienteExiste) {
            throw new Error('El cliente no existe.');
        }

        // Crear nueva membresía (renovación)
        return this.crear(tipoMembresiaId, clienteId);
    }

    public eliminar(id: number): void {
        const membresia = this.gestorMembresia.buscarPorId(id);

        if (!membresia) {
            throw new Error('Membresía no encontrada.');
        }

        const eliminado = this.gestorMembresia.eliminar(id);

        if (!eliminado) {
            throw new Error('Error al eliminar la membresía.');
        }
    }
}
