import { Jugador } from "./jugador"

export class Usuario{
    public nombre!: string
    // public saldo: number = 500000000
    public saldo: number = 1000
    public puja!: number
    public listaJugadores!: Jugador[]
}