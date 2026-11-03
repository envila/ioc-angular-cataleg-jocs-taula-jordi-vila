import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { JocTaula } from './models/joc-taula.model';
import { JOCS_TAULA } from './models/jocs-taula.mock';
import { LlistaJocs } from './components/llista-jocs/llista-jocs.component';
import { FormulariFiltres } from './components/formulari-filtres/formulari-filtres.component';

@Component({
  imports: [RouterOutlet, LlistaJocs, FormulariFiltres],
  selector: 'app-root',
  styleUrl: './app.component.scss',
  templateUrl: './app.component.html',
})
export class App {
  public appName = 'Catàleg de jocs de taula';
  public studentName = 'Jordi Vila';

  public jocs: JocTaula[] = JOCS_TAULA;
  public jocsFiltrats: JocTaula[] = [...JOCS_TAULA];

  public categories: string[] = [
    ...new Set(JOCS_TAULA.map((joc) => joc.categoria)),
  ];

  public jocSeleccionat: JocTaula | null = null;

  aplicarFiltres(filtres: { text: string; categoria: string }): void {
    this.jocsFiltrats = this.jocs.filter((joc) => {
      const coincideixText =
        joc.titol.toLowerCase().includes(filtres.text.toLowerCase()) ||
        joc.descripcio.toLowerCase().includes(filtres.text.toLowerCase());

      const coincideixCategoria =
        !filtres.categoria || joc.categoria === filtres.categoria;

      return coincideixText && coincideixCategoria;
    });

    this.jocSeleccionat = null;
  }

  seleccionarJoc(joc: JocTaula): void {
    this.jocSeleccionat = joc;
  }
}
