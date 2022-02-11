import { Component, OnInit } from '@angular/core';
import { Jugador } from 'src/app/models/jugador';
import { Usuario } from 'src/app/models/usuario';

@Component({
  selector: 'app-pujas',
  templateUrl: './pujas.component.html',
  styleUrls: ['./pujas.component.css']
})
export class PujasComponent implements OnInit {
  
  usuarioGanadorPuja!: Usuario;
  jugadores: Jugador[] = [];
  jugadorSeleccionado!: Jugador;
  usuario1!: Usuario;
  jugadoresUsuario1: Jugador[] = [];
  usuario2!: Usuario;
  jugadoresUsuario2: Jugador[] = [];
  usuario3!: Usuario;
  jugadoresUsuario3: Jugador[] = [];
  saldoFaltante: number = 0;
  nombreJugador!: string;
  pujaInicial: number = 0;
  pujaActual: number = 0;
  pujaSiguiente: number = 0;
  mostrarInputs: boolean = false;
  mostrarResultado: boolean = false;
  mostrarBotonPuja: boolean = false;
  mostrarBotonFinalizar: boolean = false;

  constructor() { }

  ngOnInit(): void {

    this.jugadores = [
      { nombre: 'Kylian Mbappé', precio: 160},
      { nombre: 'Erling Haaland', precio: 150},
      { nombre: 'Vinicius Jr', precio: 100},
      { nombre: 'Mohamed Salah', precio: 100},
      { nombre: 'Harry Kane', precio: 100},
      { nombre: 'Romelu Lukaku', precio: 100},
      { nombre: 'Bruno Fernandes', precio: 90},
      { nombre: 'Kevin De Bruyne', precio: 90},
      { nombre: 'Neymar', precio: 90},
      { nombre: 'Phil Foden', precio: 85}
    ]  

    this.usuario1 = new Usuario();
    this.usuario1.nombre = 'Pepe';
    this.usuario2 = new Usuario();
    this.usuario2.nombre = 'Alex';
    this.usuario3 = new Usuario();
    this.usuario3.nombre = 'Jaime';

    this.usuarioGanadorPuja = new Usuario();
    this.mostrarResultado = false;
  }

  seleccionarJugador(){
    if(document.getElementById('jugador')?.nodeValue != 'jugador'){
      this.mostrarBotonPuja = true;
    }else{
      this.mostrarBotonPuja = false;
    }
  }

  iniciarPuja(){
    this.usuario1.puja = this.jugadorSeleccionado.precio + 10;
    this.usuario2.puja = this.jugadorSeleccionado.precio + 10;
    this.usuario3.puja = this.jugadorSeleccionado.precio + 10;
    this.pujaInicial = this.jugadorSeleccionado.precio + 10;
    this.pujaSiguiente = this.pujaInicial;
    if(this.jugadores.length == 10){
      this.usuarioGanadorPuja.puja = this.pujaInicial;  
      this.pujaActual = 0;
      this.pujaSiguiente = 0;
    }else{
      this.pujaSiguiente = 0;
      this.pujaActual = 0;
    }
    this.mostrarInputs = true;
    this.mostrarBotonFinalizar = false;
    this.mostrarBotonPuja = false;
  }

  pujar(usuario: Usuario){
    // Creamos esta variable antes de que apunte a la memoria para que todos
    // los usuarios tengan el mismo valor de puja
    let pujaUsuario: number = usuario.puja;
    if(usuario.puja < this.pujaSiguiente){
      alert('Tu precio debe ser superior al precio de la mínima puja ' + this.pujaSiguiente);
      console.log(usuario.puja);
      console.log(this.pujaSiguiente);
      pujaUsuario = this.pujaSiguiente - 10;
    }
    if(usuario.puja < this.pujaInicial){
      alert('Tienes que pujar por el precio de puja mínimo ' + this.pujaInicial);
      usuario.puja = this.pujaInicial;
    }else{
      if(usuario.saldo >= usuario.puja){
        this.mostrarBotonFinalizar = true;
        this.usuario1.puja = +pujaUsuario + 10;
        this.usuario2.puja = +pujaUsuario + 10;
        this.usuario3.puja = +pujaUsuario + 10;
        this.pujaSiguiente = +pujaUsuario + 10;
        this.usuarioGanadorPuja = usuario;
        this.pujaActual = this.pujaSiguiente - 10;
      }
      else{
        this.saldoFaltante = usuario.puja - usuario.saldo;
        alert('El usuario no tiene suficiente dinero para pujar, le faltan ' + this.saldoFaltante + '€');
      }
    }
    
    
  }

  finalizarPuja(){
    this.mostrarResultado = true;
    this.mostrarBotonFinalizar = false;
    this.mostrarInputs = false;
    if(this.usuarioGanadorPuja == this.usuario1){
      this.usuarioGanadorPuja.saldo = this.usuario1.saldo - this.pujaActual;
      this.jugadoresUsuario1.push(this.jugadorSeleccionado);
    }else if(this.usuarioGanadorPuja == this.usuario2){
      this.usuarioGanadorPuja.saldo = this.usuario2.saldo - this.pujaActual;
      this.jugadoresUsuario2.push(this.jugadorSeleccionado);
    }else if(this.usuarioGanadorPuja == this.usuario3){
      this.usuarioGanadorPuja.saldo = this.usuario3.saldo - this.pujaActual;
      this.jugadoresUsuario3.push(this.jugadorSeleccionado);
    }
    if(this.jugadores.length == 0){
      alert('Las pujas se han terminado, no hay más jugadores disponibles');
    }
    this.borrarJugadorSeleccionado(this.jugadorSeleccionado);
  }

  nuevaPuja(){
    this.mostrarInputs = false;
    this.mostrarResultado = false;
    this.mostrarBotonPuja = false;
    this.pujaInicial = this.jugadorSeleccionado.precio + 10;
    this.pujaSiguiente = this.pujaInicial + 10;
  }

  private borrarJugadorSeleccionado(jugadorSeleccionado: Jugador) {
    const index: number = this.jugadores.indexOf(jugadorSeleccionado);
    if (index !== -1) {
      this.jugadores.splice(index, 1);
    }
  }

}
