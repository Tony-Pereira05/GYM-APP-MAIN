"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tipoMembresia = void 0;
class tipoMembresia {
    constructor(nombre, duracionDias, precio, tipoMembresiaId) {
        this.tipoMembresiaId = tipoMembresiaId || 0;
        this.nombre = nombre;
        this.duracionDias = duracionDias;
        this.precio = precio;
    }
    getTipoMembresiaId() {
        return this.tipoMembresiaId;
    }
    getNombre() {
        return this.nombre;
    }
    getDuracionDias() {
        return this.duracionDias;
    }
    getPrecio() {
        return this.precio;
    }
    setPrecio(precio) {
        this.precio = precio;
    }
    setNombre(nombre) {
        this.nombre = nombre;
    }
    setDuracionDias(duracionDias) {
        this.duracionDias = duracionDias;
    }
}
exports.tipoMembresia = tipoMembresia;
