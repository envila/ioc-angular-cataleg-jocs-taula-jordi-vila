
import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {
  Subject,
  Subscription,
  debounceTime,
  switchMap,
  tap,
  catchError,
  of
} from 'rxjs';

import { JocTaula } from './models/joc-taula.model';
import { JocsTaulaService } from './services/jocs-taula.service';
import { LlistaJocs } from './components/llista-jocs/llista-jocs.component';
import { FormulariFiltres } from './components/formulari-filtres/formulari-filtres.component';

interface CriterisCerca {
  text: string;
  categoria: string;
}

@Component({
  imports: [RouterOutlet, LlistaJocs, FormulariFiltres],
  selector: 'app-root',
  styleUrl: './app.component.scss',
  templateUrl: './app.component.html',
})
export class App implements OnInit, OnDestroy {
  private readonly jocsService = inject(JocsTaulaService);

  private readonly cerques$ = new Subject<CriterisCerca>();
  private subscripcioCerca?: Subscription;

  private ultimsCriteris: CriterisCerca | null = null;

  public appName = 'Catàleg de jocs de taula';
  public studentName = 'Jordi Vila';

  public jocs: JocTaula[] = [];
  public jocsFiltrats: JocTaula[] = [];
  public categories: string[] = [];
  public jocSeleccionat: JocTaula | null = null;

  public carregant = false;
  public errorCarrega = '';

  ngOnInit(): void {
    this.configurarCerca();
    this.carregarJocs();
  }

  // Configura la cerca reactiva i gestiona els errors HTTP.
  private configurarCerca(): void {
    this.subscripcioCerca = this.cerques$
      .pipe(
        debounceTime(300),
        tap(() => {
          this.carregant = true;
          this.errorCarrega = '';
        }),
        switchMap((criteris) =>
          this.jocsService.cercarJocs(
            criteris.text,
            criteris.categoria
          ).pipe(
            catchError(() => {
              this.errorCarrega =
                'No s’ha pogut completar la cerca. Torna-ho a intentar.';

              return of(null);
            })
          )
        )
      )
      .subscribe((jocs) => {
        if (jocs !== null) {
          this.jocsFiltrats = jocs;
          this.jocSeleccionat = null;
        }

        this.carregant = false;
      });
  }

  // Carrega el catàleg inicial des de l'API.
  carregarJocs(): void {
    this.carregant = true;
    this.errorCarrega = '';

    this.jocsService.obtenirJocs().subscribe({
      next: (jocs) => {
        this.jocs = jocs;
        this.jocsFiltrats = [...jocs];

        this.categories = [
          ...new Set(jocs.map((joc) => joc.categoria))
        ];

        this.jocSeleccionat = null;
        this.carregant = false;
      },
      error: () => {
        this.errorCarrega =
          'No s’han pogut carregar els jocs de taula.';

        this.carregant = false;
      }
    });
  }

  // Desa els criteris i inicia una cerca.
  aplicarFiltres(filtres: CriterisCerca): void {
    this.ultimsCriteris = { ...filtres };
    this.cerques$.next(filtres);
  }

  // Repeteix la darrera cerca o la càrrega inicial.
  reintentar(): void {
    if (this.ultimsCriteris !== null) {
      this.cerques$.next({ ...this.ultimsCriteris });
    } else {
      this.carregarJocs();
    }
  }

  // Selecciona un joc per mostrar-ne els detalls.
  seleccionarJoc(joc: JocTaula): void {
    this.jocSeleccionat = joc;
  }

  // Allibera els recursos del component.
  ngOnDestroy(): void {
    this.subscripcioCerca?.unsubscribe();
    this.cerques$.complete();
  }
}
