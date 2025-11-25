"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cliente = void 0;
class cliente {
    constructor(nombreCompleto, telefono, idTipoMembresia, notas, Id) {
        this.Id = Id || -1;
        this.nombreCompleto = nombreCompleto;
        this.telefono = telefono;
        this.idTipoMembresia = idTipoMembresia;
        this.notas = notas || '';
        this.fechaRegistro = new Date();
    }
    getId() {
        return this.Id;
    }
    getNombreCompleto() {
        return this.nombreCompleto;
    }
    getTelefono() {
        return this.telefono;
    }
    getNotas() {
        return this.notas;
    }
    getFechaRegistro() {
        return this.fechaRegistro;
    }
    setNotas(notas) {
        this.notas = notas;
    }
    getIdTipoMembresia() {
        return this.idTipoMembresia;
    }
    setIdTipoMembresia(idTipoMembresia) {
        this.idTipoMembresia = idTipoMembresia;
    }
}
exports.cliente = cliente;
