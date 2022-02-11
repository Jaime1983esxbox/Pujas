"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.PujasComponent = void 0;
var core_1 = require("@angular/core");
var usuario_1 = require("src/app/models/usuario");
var PujasComponent = /** @class */ (function () {
    function PujasComponent() {
        this.jugadores = [];
        this.jugadoresUsuario1 = [];
        this.jugadoresUsuario2 = [];
        this.jugadoresUsuario3 = [];
        this.saldoFaltante = 0;
        this.pujaInicial = 0;
        this.pujaActual = 0;
        this.pujaSiguiente = 0;
        this.mostrarInputs = false;
        this.mostrarResultado = false;
        this.mostrarBotonPuja = false;
        this.mostrarBotonFinalizar = false;
    }
    PujasComponent.prototype.ngOnInit = function () {
        this.jugadores = [
            { nombre: 'Kylian Mbappé', precio: 160 },
            { nombre: 'Erling Haaland', precio: 150 },
            { nombre: 'Vinicius Jr', precio: 100 },
            { nombre: 'Mohamed Salah', precio: 100 },
            { nombre: 'Harry Kane', precio: 100 },
            { nombre: 'Romelu Lukaku', precio: 100 },
            { nombre: 'Bruno Fernandes', precio: 90 },
            { nombre: 'Kevin De Bruyne', precio: 90 },
            { nombre: 'Neymar', precio: 90 },
            { nombre: 'Phil Foden', precio: 85 }
        ];
        this.usuario1 = new usuario_1.Usuario();
        this.usuario1.nombre = 'Pepe';
        this.usuario2 = new usuario_1.Usuario();
        this.usuario2.nombre = 'Alex';
        this.usuario3 = new usuario_1.Usuario();
        this.usuario3.nombre = 'Jaime';
        this.usuarioGanadorPuja = new usuario_1.Usuario();
        this.mostrarResultado = false;
    };
    PujasComponent.prototype.seleccionarJugador = function () {
        var _a;
        if (((_a = document.getElementById('jugador')) === null || _a === void 0 ? void 0 : _a.nodeValue) != 'jugador') {
            this.mostrarBotonPuja = true;
        }
        else {
            this.mostrarBotonPuja = false;
        }
    };
    PujasComponent.prototype.iniciarPuja = function () {
        this.usuario1.puja = this.jugadorSeleccionado.precio + 10;
        this.usuario2.puja = this.jugadorSeleccionado.precio + 10;
        this.usuario3.puja = this.jugadorSeleccionado.precio + 10;
        this.pujaInicial = this.jugadorSeleccionado.precio + 10;
        this.pujaSiguiente = this.pujaInicial;
        if (this.jugadores.length == 10) {
            this.usuarioGanadorPuja.puja = this.pujaInicial;
            this.pujaActual = 0;
            this.pujaSiguiente = 0;
        }
        else {
            this.pujaSiguiente = 0;
            this.pujaActual = 0;
        }
        this.mostrarInputs = true;
        this.mostrarBotonFinalizar = false;
        this.mostrarBotonPuja = false;
    };
    PujasComponent.prototype.pujar = function (usuario) {
        // Creamos esta variable antes de que apunte a la memoria para que todos
        // los usuarios tengan el mismo valor de puja
        var pujaUsuario = usuario.puja;
        if (usuario.puja < this.pujaSiguiente) {
            alert('Tu precio debe ser superior al precio de la mínima puja ' + this.pujaSiguiente);
            console.log(usuario.puja);
            console.log(this.pujaSiguiente);
            pujaUsuario = this.pujaSiguiente - 10;
        }
        if (usuario.puja < this.pujaInicial) {
            alert('Tienes que pujar por el precio de puja mínimo ' + this.pujaInicial);
            usuario.puja = this.pujaInicial;
        }
        else {
            if (usuario.saldo >= usuario.puja) {
                this.mostrarBotonFinalizar = true;
                this.usuario1.puja = +pujaUsuario + 10;
                this.usuario2.puja = +pujaUsuario + 10;
                this.usuario3.puja = +pujaUsuario + 10;
                this.pujaSiguiente = +pujaUsuario + 10;
                this.usuarioGanadorPuja = usuario;
                this.pujaActual = this.pujaSiguiente - 10;
            }
            else {
                this.saldoFaltante = usuario.puja - usuario.saldo;
                alert('El usuario no tiene suficiente dinero para pujar, le faltan ' + this.saldoFaltante + '€');
            }
        }
    };
    PujasComponent.prototype.finalizarPuja = function () {
        this.mostrarResultado = true;
        this.mostrarBotonFinalizar = false;
        this.mostrarInputs = false;
        if (this.usuarioGanadorPuja == this.usuario1) {
            this.usuarioGanadorPuja.saldo = this.usuario1.saldo - this.pujaActual;
            this.jugadoresUsuario1.push(this.jugadorSeleccionado);
        }
        else if (this.usuarioGanadorPuja == this.usuario2) {
            this.usuarioGanadorPuja.saldo = this.usuario2.saldo - this.pujaActual;
            this.jugadoresUsuario2.push(this.jugadorSeleccionado);
        }
        else if (this.usuarioGanadorPuja == this.usuario3) {
            this.usuarioGanadorPuja.saldo = this.usuario3.saldo - this.pujaActual;
            this.jugadoresUsuario3.push(this.jugadorSeleccionado);
        }
        if (this.jugadores.length == 0) {
            alert('Las pujas se han terminado, no hay más jugadores disponibles');
        }
        this.borrarJugadorSeleccionado(this.jugadorSeleccionado);
    };
    PujasComponent.prototype.nuevaPuja = function () {
        this.mostrarInputs = false;
        this.mostrarResultado = false;
        this.mostrarBotonPuja = false;
        this.pujaInicial = this.jugadorSeleccionado.precio + 10;
        this.pujaSiguiente = this.pujaInicial + 10;
    };
    PujasComponent.prototype.borrarJugadorSeleccionado = function (jugadorSeleccionado) {
        var index = this.jugadores.indexOf(jugadorSeleccionado);
        if (index !== -1) {
            this.jugadores.splice(index, 1);
        }
    };
    PujasComponent = __decorate([
        core_1.Component({
            selector: 'app-pujas',
            templateUrl: './pujas.component.html',
            styleUrls: ['./pujas.component.css']
        })
    ], PujasComponent);
    return PujasComponent;
}());
exports.PujasComponent = PujasComponent;
