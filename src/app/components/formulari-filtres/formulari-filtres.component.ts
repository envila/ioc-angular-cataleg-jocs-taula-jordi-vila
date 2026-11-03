import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-formulari-filtres',
  imports: [FormsModule],
  templateUrl: './formulari-filtres.component.html',
  styleUrl: './formulari-filtres.component.scss',
})
export class FormulariFiltres {
  @Input() categories: string[] = [];

  @Output() filtresAplicats = new EventEmitter<{
    text: string;
    categoria: string;
  }>();

  text = '';
  categoria = '';

  aplicarFiltres(): void {
    this.filtresAplicats.emit({
      text: this.text.trim(),
      categoria: this.categoria,
    });
  }

  reiniciarFiltres(formulari: NgForm): void {
    this.text = '';
    this.categoria = '';

    formulari.resetForm({
      text: '',
      categoria: '',
    });

    this.aplicarFiltres();
  }
}
