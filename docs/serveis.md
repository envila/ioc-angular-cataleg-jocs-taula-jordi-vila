\# Serveis HTTP i integració amb l'API REST



\## 1. Descripció general



L'aplicació utilitza el servei `JocsTaulaService` per centralitzar les peticions HTTP a l'API REST local, implementada amb JSON Server.



El servei es troba a `src/app/services/jocs-taula.service.ts` i està disponible a tota l'aplicació mitjançant `providedIn: 'root'`.



\## 2. Configuració de l'API



La URL base es defineix a `src/app/config/api.config.ts` mitjançant la constant `API\_URL`.



L'endpoint utilitzat és `http://localhost:3000/jocs`.



La comunicació HTTP es realitza amb `HttpClient`, injectat al servei amb la funció `inject()` d'Angular.



\## 3. Mètodes del servei



\### obtenirJocs()



Realitza una petició GET a `/jocs` per recuperar tots els jocs de taula.



La resposta de l'API es rep com un array de `JocTaulaApi\[]`. Mitjançant l'operador `map()` de RxJS i la funció `adaptarJocTaula()`, cada registre es transforma al model intern `JocTaula`.



Retorna un `Observable<JocTaula\[]>`.



\### cercarJocs(text, categoria)



Permet cercar jocs segons el text introduït i la categoria seleccionada.



Primer recupera els registres mitjançant `obtenirJocs()` i després aplica els filtres sobre les dades ja adaptades.



La cerca de text elimina els espais inicials i finals, no diferencia entre majúscules i minúscules i comprova els camps `titol` i `descripcio`.



El filtre de categoria compara la categoria seleccionada amb la del joc. Si no se selecciona cap categoria, no s'aplica aquesta restricció.



Retorna un `Observable<JocTaula\[]>`.



\### afegirJoc(joc)



Realitza una petició POST a `/jocs` per crear un registre nou.



Rep les dades del joc en el format de l'API, sense el camp `id`, i transforma la resposta del servidor mitjançant `adaptarJocTaula()`.



Retorna un `Observable<JocTaula>`.



\## 4. Adaptació de dades



L'aplicació diferencia entre el model de dades de l'API (`JocTaulaApi`) i el model intern (`JocTaula`).



La funció `adaptarJocTaula()` permet normalitzar les dades abans que siguin utilitzades pels components.



El detall de les transformacions es documenta a `docs/models.md`.



\## 5. Gestió de les consultes



Els mètodes del servei retornen observables de RxJS, de manera que els components poden gestionar les respostes de manera asíncrona.



La gestió dels estats de càrrega, els errors de consulta i els reintents es realitza des del component principal de l'aplicació.



El flux de cerca utilitza operadors de RxJS per gestionar les peticions i evitar que les consultes anteriors interfereixin amb les més recents.



\## 6. Proves realitzades



S'ha comprovat el funcionament de les peticions GET i POST amb JSON Server.



També s'ha verificat que el catàleg mostra els registres obtinguts de l'API i que la cerca permet filtrar els resultats per text i categoria.



Les peticions POST s'han utilitzat per comprovar la creació de registres durant les proves de desenvolupament.

