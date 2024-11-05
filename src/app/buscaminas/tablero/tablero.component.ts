import { Component, OnInit } from '@angular/core';
import { Celda } from '../celda/models/celda';

@Component({
  selector: 'app-tablero',
  templateUrl: './tablero.component.html',
  styleUrls: ['./tablero.component.css']
})
export class TableroComponent implements OnInit {
  filas: number = 10; 
  columnas: number = 10;
  minas: number = 0; 
  tablero: Celda[][] = [];
  gameOver: boolean = false;

  ngOnInit() {
    this.calcularMinas();
    this.iniciarTablero();
  }

  iniciarTablero() {
    this.tablero = Array(this.filas).fill(null).map(() =>
      Array(this.columnas).fill(null).map(() => ({
        tieneMina: false,
        descubierta: false,
        minasAdyacentes: 0
      }))
    );

    this.colocarMinas();
    this.calcularMinasAdyacentes();
  }

  calcularMinas() {
    const totalCeldas = this.filas * this.columnas;
    this.minas = Math.floor(totalCeldas * 0.15); 
  }

  actualizarFilas(event: Event) {
    const input = event.target as HTMLInputElement;
    this.filas = parseInt(input.value, 10) || 10;
    this.calcularMinas(); 
  }

  actualizarColumnas(event: Event) {
    const input = event.target as HTMLInputElement;
    this.columnas = parseInt(input.value, 10) || 10; 
    this.calcularMinas(); 
  }

  colocarMinas() {
    let minasColocadas = 0;
    while (minasColocadas < this.minas) {
      const fila = Math.floor(Math.random() * this.filas);
      const columna = Math.floor(Math.random() * this.columnas);
      if (!this.tablero[fila][columna].tieneMina) {
        this.tablero[fila][columna].tieneMina = true;
        minasColocadas++;
      }
    }
  }

  calcularMinasAdyacentes() {
    for (let fila = 0; fila < this.filas; fila++) {
      for (let columna = 0; columna < this.columnas; columna++) {
        if (!this.tablero[fila][columna].tieneMina) {
          let minasCercanas = 0;
          for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
              const f = fila + i;
              const c = columna + j;
              if (f >= 0 && f < this.filas && c >= 0 && c < this.columnas && this.tablero[f][c].tieneMina) {
                minasCercanas++;
              }
            }
          }
          this.tablero[fila][columna].minasAdyacentes = minasCercanas;
        }
      }
    }
  }

  destaparCelda(fila: number, columna: number) {
    if (this.gameOver || this.tablero[fila][columna].descubierta) {
      return;
    }

    this.tablero[fila][columna].descubierta = true;

    if (this.tablero[fila][columna].tieneMina) {
      this.gameOver = true;
      alert('Game Over');
    } else if (this.tablero[fila][columna].minasAdyacentes === 0) {
      this.destaparAdyacentes(fila, columna);
    }
  }

  destaparAdyacentes(fila: number, columna: number) {
    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        const f = fila + i;
        const c = columna + j;
        if (f >= 0 && f < this.filas && c >= 0 && c < this.columnas && !this.tablero[f][c].descubierta) {
          this.destaparCelda(f, c);
        }
      }
    }
  }

  iniciarJuego() {
    this.iniciarTablero();
  }

  reiniciarJuego() {
    this.gameOver = false;
    this.iniciarTablero();
  }
}
