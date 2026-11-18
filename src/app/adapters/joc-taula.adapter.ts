
import { JocTaula } from '../models/joc-taula.model';
import { JocTaulaApi } from '../models/joc-taula-api.model';

export function adaptarJocTaula(joc: JocTaulaApi): JocTaula {
  return {
    id: joc.id,
    titol: joc.nom.trim(),
    descripcio: joc.descripcio.trim(),
    categoria: joc.tipus.trim(),
    dataPublicacio: joc.data_publicacio,
    duradaMinuts: Number(joc.durada_minuts),
    destacat: joc.es_destacat ?? false
  };
}
