"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.equipoAccessorio = void 0;
class equipoAccessorio {
    constructor(nombre, cantidad, notas) {
        this.accesorioId = 0;
        this.nombre = nombre;
        this.cantidad = cantidad;
        this.notas = notas || '';
    }
}
exports.equipoAccessorio = equipoAccessorio;
