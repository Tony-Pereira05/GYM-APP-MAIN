"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usuario = void 0;
class usuario {
    constructor(nombreUsuario, contrasenaHash, email, usuarioId) {
        this.usuarioId = usuarioId || 0;
        this.nombreUsuario = nombreUsuario;
        this.contrasenaHash = contrasenaHash;
        this.email = email;
    }
    getUsuarioId() {
        return this.usuarioId;
    }
    getNombreUsuario() {
        return this.nombreUsuario;
    }
    getContrasenaHash() {
        return this.contrasenaHash;
    }
    setNombreUsuario(nombreUsuario) {
        this.nombreUsuario = nombreUsuario;
    }
    setContrasenaHash(contrasenaHash) {
        this.contrasenaHash = contrasenaHash;
    }
    getEmail() {
        return this.email;
    }
    setEmail(email) {
        this.email = email;
    }
}
exports.usuario = usuario;
