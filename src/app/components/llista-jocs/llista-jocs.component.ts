import { Component, EventEmitter, Input, Output } from '@angular/core';
import { JocTaula } from '../../models/joc-taula.model';
import { TargetaJoc } from '../targeta-joc/targeta-joc.component';

@Component({
  selector: 'app-llista-jocs',
  imports: [TargetaJoc],
  templateUrl: './llista-jocs.component.html',
  styleUrl: './llista-jocs.component.scss',
})
export class LlistaJocs {
  @Input({ required: true }) jocs: JocTaula[] = [];

  @Output() jocSeleccionat = new EventEmitter<JocTaula>();

  seleccionarJoc(joc: JocTaula): void {
    this.jocSeleccionat.emit(joc);
  }
}
