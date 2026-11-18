\# Formulari reactiu i historial de cerques



\## 1. Descripció general



L'aplicació disposa d'un formulari reactiu per filtrar el catàleg de jocs de taula segons el text introduït i la categoria seleccionada.



El component es troba a `src/app/components/formulari-filtres/` i utilitza `ReactiveFormsModule`, `FormGroup`, `FormControl` i els validadors d'Angular.



\## 2. Camps del formulari



El formulari conté dos camps:



\- \*\*text:\*\* permet cercar jocs pel títol o la descripció.

\- \*\*categoria:\*\* permet seleccionar una categoria del catàleg.



El camp `text` utilitza `Validators.required` i `Validators.minLength(3)`.



El camp `categoria` no és obligatori. Si no se selecciona cap categoria, la cerca no aplica aquest filtre.



\## 3. Validació asíncrona



El mètode `validarExistencia()` implementa un validador asíncron de tipus `AsyncValidatorFn`.



Quan el text introduït té tres caràcters o més, consulta el servei `JocsTaulaService` per comprovar si existeixen jocs coincidents.



El validador pot retornar:



\- `null`: existeixen resultats i el valor és vàlid.

\- `senseResultats`: no s'han trobat jocs coincidents.

\- `errorApi`: s'ha produït un error durant la consulta.



El procés utilitza `timer(300)` per esperar 300 ms abans de consultar el servei, `switchMap()` per gestionar la consulta i `catchError()` per tractar els errors.



\## 4. Aplicació dels filtres



El mètode `aplicarFiltres()` comprova que el formulari no sigui invàlid ni tingui una validació pendent.



Si el formulari no és vàlid, marca els camps com a tocats perquè es puguin mostrar els missatges de validació.



Quan la cerca és vàlida, elimina els espais inicials i finals del text, desa els criteris a l'historial i emet l'esdeveniment `filtresAplicats` perquè el component principal actualitzi el catàleg.



\## 5. Historial de cerques



L'historial es desa al navegador mitjançant `localStorage`, amb la clau:



`historial-cerques-jocs`



Cada entrada conté el text i la categoria de la cerca.



El mètode `desarCerca()` afegeix les cerques vàlides al principi de l'historial, evita duplicats consecutius i conserva un màxim de deu entrades.



El mètode `carregarHistorial()` recupera les dades desades quan es crea el component. També comprova que les entrades tinguin els camps `text` i `categoria` amb valors de tipus cadena.



Les operacions de lectura i escriptura utilitzen `try/catch` per evitar que els errors de `localStorage` interrompin el funcionament de l'aplicació.



\## 6. Recuperació de cerques anteriors



El mètode `recuperarCerca()` introdueix al formulari el text i la categoria d'una cerca anterior.



Després marca els camps com a tocats i permet que Angular torni a executar la validació corresponent.



La cerca recuperada no s'aplica automàticament des d'aquest mètode; cal aplicar els filtres quan el formulari sigui vàlid.



\## 7. Reinici del formulari



El mètode `reiniciarFiltres()` restableix els camps `text` i `categoria` als seus valors inicials.



A continuació, emet un esdeveniment amb els criteris buits perquè el component principal pugui tornar a mostrar el catàleg sense filtres.



\## 8. Proves realitzades



S'ha comprovat el funcionament del formulari amb cerques vàlides, textos de menys de tres caràcters i consultes sense resultats.



També s'ha verificat la visualització de l'historial, la recuperació de cerques anteriors i el reinici dels filtres.

