"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.equipamiento = void 0;
class equipamiento {
    constructor(nombre, tipo, imagenUrl, descripcion) {
        this.equipoId = 0;
        this.imagenUrl = imagenUrl;
        this.nombre = nombre;
        this.tipo = tipo;
        this.descripcion = descripcion;
    }
    getEquipoId() {
        return this.equipoId;
    }
    getImagenUrl() {
        return this.imagenUrl;
    }
    getNombre() {
        return this.nombre;
    }
    getTipo() {
        return this.tipo;
    }
    getDescripcion() {
        return this.descripcion;
    }
    setImagenUrl(imagenUrl) {
        this.imagenUrl = imagenUrl;
    }
    setDescripcion(descripcion) {
        this.descripcion = descripcion;
    }
}
exports.equipamiento = equipamiento;
