"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServicioCliente = void 0;
const Cliente_1 = require("../entidades/Cliente");
class ServicioCliente {
    constructor(gestorCliente) {
        this.gestorCliente = gestorCliente;
    }
    crear(nombreCompleto, telefono, idTipoMembresia, notas) {
        // Validaciones
        if (!nombreCompleto || nombreCompleto.trim() === '') {
            throw new Error('El nombre completo es obligatorio.');
        }
        if (nombreCompleto.trim().length < 3) {
            throw new Error('El nombre debe tener al menos 3 caracteres.');
        }
        if (telefono.length !== 10 && telefono.length !== 12) {
            throw new Error('Número de teléfono inválido. Debe tener 10 o 12 dígitos.');
        }
        if (!idTipoMembresia || idTipoMembresia <= 0) {
            throw new Error('Debe seleccionar un tipo de membresía válido.');
        }
        const telefonoNumero = this.stringToNumber(telefono);
        // Verificar duplicados
        const clienteExistente = this.gestorCliente.buscarPorTelefono(telefonoNumero);
        if (clienteExistente) {
            throw new Error('El número de teléfono ya está registrado.');
        }
        const nuevoCliente = new Cliente_1.cliente(nombreCompleto.trim(), telefonoNumero, idTipoMembresia, notas?.trim());
        return this.gestorCliente.agregar(nuevoCliente);
    }
    actualizarNotas(id, notas) {
        const cliente = this.gestorCliente.buscarPorId(id);
        if (!cliente) {
            throw new Error('Cliente no encontrado.');
        }
        const actualizado = this.gestorCliente.actualizarNotas(id, notas.trim());
        if (!actualizado) {
            throw new Error('Error al actualizar las notas.');
        }
    }
    actualizarTelefono(id, telefono) {
        if (telefono.length !== 10 && telefono.length !== 12) {
            throw new Error('Número de teléfono inválido.');
        }
        const cliente = this.gestorCliente.buscarPorId(id);
        if (!cliente) {
            throw new Error('Cliente no encontrado.');
        }
        const telefonoNumero = this.stringToNumber(telefono);
        // Verificar que no exista otro cliente con ese teléfono
        const clienteConTelefono = this.gestorCliente.buscarPorTelefono(telefonoNumero);
        if (clienteConTelefono && clienteConTelefono.getId() !== id) {
            throw new Error('El teléfono ya está en uso por otro cliente.');
        }
        const actualizado = this.gestorCliente.actualizarTelefono(id, telefonoNumero);
        if (!actualizado) {
            throw new Error('Error al actualizar el teléfono.');
        }
    }
    eliminar(id) {
        const cliente = this.gestorCliente.buscarPorId(id);
        if (!cliente) {
            throw new Error('Cliente no encontrado.');
        }
        // TODO: Agregar cuando tengas ServicioMembresia
        // const tieneMembresia = this.gestorMembresia.tieneActiva(id);
        // if (tieneMembresia) {
        //     throw new Error('No se puede eliminar: el cliente tiene una membresía activa.');
        // }
        const eliminado = this.gestorCliente.eliminar(id);
        if (!eliminado) {
            throw new Error('Error al eliminar el cliente.');
        }
    }
    buscar(criterio) {
        if (typeof criterio === 'number') {
            const porId = this.gestorCliente.buscarPorId(criterio);
            if (porId) {
                return [porId];
            }
            const porTelefono = this.gestorCliente.buscarPorTelefono(criterio);
            if (porTelefono) {
                return [porTelefono];
            }
            return [];
        }
        // Búsqueda por nombre
        return this.gestorCliente.buscarPorNombre(criterio.trim());
    }
    obtenerTodos() {
        return this.gestorCliente.obtenerTodos();
    }
    // Métodos auxiliares privados
    stringToNumber(telefono) {
        telefono = telefono.trim().replace(/-/g, '');
        if (!/^\d+$/.test(telefono)) {
            throw new Error('El teléfono solo debe contener números y guiones.');
        }
        const result = Number(telefono);
        if (isNaN(result)) {
            throw new Error('Formato de teléfono inválido.');
        }
        return result;
    }
}
exports.ServicioCliente = ServicioCliente;
