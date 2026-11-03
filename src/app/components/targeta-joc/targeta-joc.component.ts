import { Component, Input } from '@angular/core';
import { DatePipe, DecimalPipe } from '@angular/common';
import { JocTaula } from '../../models/joc-taula.model';
import { EtiquetaCategoria } from '../etiqueta-categoria/etiqueta-categoria.component';

@Component({
  selector: 'app-targeta-joc',
  imports: [DatePipe, DecimalPipe, EtiquetaCategoria],
  templateUrl: './targeta-joc.component.html',
  styleUrl: './targeta-joc.component.scss',
})
export class TargetaJoc {
  @Input({ required: true }) joc!: JocTaula;
}
