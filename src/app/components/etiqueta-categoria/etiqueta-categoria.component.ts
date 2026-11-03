import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-etiqueta-categoria',
  imports: [],
  templateUrl: './etiqueta-categoria.component.html',
  styleUrl: './etiqueta-categoria.component.scss',
})
export class EtiquetaCategoria {
  @Input({ required: true }) categoria = '';
}
