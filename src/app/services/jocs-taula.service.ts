
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

import { API_URL } from '../config/api.config';
import { JocTaula } from '../models/joc-taula.model';
import { JocTaulaApi } from '../models/joc-taula-api.model';
import { adaptarJocTaula } from '../adapters/joc-taula.adapter';

@Injectable({
  providedIn: 'root'
})
export class JocsTaulaService {
  private readonly http = inject(HttpClient);
  private readonly url = `${API_URL}/jocs`;

  // Obté els jocs de l'API i els adapta al model intern.
  obtenirJocs(): Observable<JocTaula[]> {
    return this.http.get<JocTaulaApi[]>(this.url).pipe(
      map((jocs) => jocs.map(adaptarJocTaula))
    );
  }

  // Cerca jocs segons el text i la categoria indicats.
  cercarJocs(text: string, categoria: string): Observable<JocTaula[]> {
    return this.obtenirJocs().pipe(
      map((jocs) =>
        jocs.filter((joc) => {
          const cerca = text.trim().toLowerCase();

          const coincideixText =
            joc.titol.toLowerCase().includes(cerca) ||
            joc.descripcio.toLowerCase().includes(cerca);

          const coincideixCategoria =
            !categoria || joc.categoria === categoria;

          return coincideixText && coincideixCategoria;
        })
      )
    );
  }

  // Envia un joc nou a l'API i adapta la resposta.
  afegirJoc(joc: Omit<JocTaulaApi, 'id'>): Observable<JocTaula> {
    return this.http.post<JocTaulaApi>(this.url, joc).pipe(
      map((jocCreat) => adaptarJocTaula(jocCreat))
    );
  }
}
