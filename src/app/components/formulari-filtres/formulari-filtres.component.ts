
import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import {
  AbstractControl,
  AsyncValidatorFn,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators
} from '@angular/forms';
import {
  Observable,
  catchError,
  map,
  of,
  timer,
  switchMap
} from 'rxjs';

import { JocsTaulaService } from '../../services/jocs-taula.service';

interface CriterisCerca {
  text: string;
  categoria: string;
}

@Component({
  selector: 'app-formulari-filtres',
  imports: [ReactiveFormsModule],
  templateUrl: './formulari-filtres.component.html',
  styleUrl: './formulari-filtres.component.scss',
})
export class FormulariFiltres {
  private readonly jocsService = inject(JocsTaulaService);
  private readonly clauHistorial = 'historial-cerques-jocs';

  @Input() categories: string[] = [];

  @Output() filtresAplicats = new EventEmitter<CriterisCerca>();

  public historialCerques: CriterisCerca[] = [];

  // Comprova a l'API si existeixen jocs que coincideixin amb la cerca.
  private validarExistencia(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      const text = String(control.value ?? '').trim();

      if (text.length < 3) {
        return of(null);
      }

      return timer(300).pipe(
        switchMap(() => this.jocsService.cercarJocs(text, '')),
        map((jocs) =>
          jocs.length > 0 ? null : { senseResultats: true }
        ),
        catchError(() => of({ errorApi: true }))
      );
    };
  }

  formulari = new FormGroup({
    text: new FormControl('', {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.minLength(3)
      ],
      asyncValidators: [this.validarExistencia()]
    }),
    categoria: new FormControl('', {
      nonNullable: true
    })
  });

  constructor() {
    this.carregarHistorial();
  }

  get campText(): FormControl<string> {
    return this.formulari.controls.text;
  }

  // Recupera les cerques desades al navegador.
  private carregarHistorial(): void {
    try {
      const dades = localStorage.getItem(this.clauHistorial);

      if (!dades) {
        return;
      }

      const historial: unknown = JSON.parse(dades);

      if (Array.isArray(historial)) {
        this.historialCerques = historial.filter(
          (element): element is CriterisCerca =>
            element !== null &&
            typeof element === 'object' &&
            typeof element.text === 'string' &&
            typeof element.categoria === 'string'
        );
      }
    } catch (error) {
      console.error('Error en recuperar l’historial de cerques:', error);
      this.historialCerques = [];
    }
  }

  // Desa una cerca vàlida i evita duplicats consecutius.
  private desarCerca(criteris: CriterisCerca): void {
    const ultima = this.historialCerques[0];

    if (
      ultima &&
      ultima.text === criteris.text &&
      ultima.categoria === criteris.categoria
    ) {
      return;
    }

    this.historialCerques = [
      { ...criteris },
      ...this.historialCerques
    ].slice(0, 10);

    try {
      localStorage.setItem(
        this.clauHistorial,
        JSON.stringify(this.historialCerques)
      );
    } catch (error) {
      console.error('Error en desar l’historial de cerques:', error);
    }
  }

  // Emet els criteris i desa la cerca al navegador.
  aplicarFiltres(): void {
    if (this.formulari.invalid || this.formulari.pending) {
      this.formulari.markAllAsTouched();
      return;
    }

    const criteris: CriterisCerca = {
      text: this.formulari.controls.text.value.trim(),
      categoria: this.formulari.controls.categoria.value
    };

    this.desarCerca(criteris);
    this.filtresAplicats.emit(criteris);
  }

  // Recupera una cerca anterior i torna a validar-la.
  recuperarCerca(criteris: CriterisCerca): void {
    this.formulari.setValue({
      text: criteris.text,
      categoria: criteris.categoria
    });

    this.formulari.markAllAsTouched();

    // La validació asíncrona es completa abans d'aplicar la cerca.
  }

  // Reinicia els camps i mostra novament tots els jocs.
  reiniciarFiltres(): void {
    this.formulari.reset({
      text: '',
      categoria: ''
    });

    this.filtresAplicats.emit({
      text: '',
      categoria: ''
    });
  }
}
