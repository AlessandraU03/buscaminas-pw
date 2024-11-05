import { Component, Input } from '@angular/core';
import { Celda } from './models/celda';

@Component({
  selector: 'app-celda',
  templateUrl: './celda.component.html',
  styleUrls: ['./celda.component.css']
})
export class CeldaComponent {
  @Input() celda!: Celda;
}
