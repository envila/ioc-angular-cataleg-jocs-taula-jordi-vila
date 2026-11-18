
# Catàleg de jocs de taula

**Autor:** Jordi Vila Alonso

## Descripció del projecte

Aplicació web desenvolupada amb Angular per consultar i organitzar un catàleg de jocs de taula.

Permet visualitzar jocs, consultar-ne les característiques, seleccionar-ne un per veure'n el detall i cercar-los per nom, descripció i categoria.

El projecte utilitza components standalone, formularis reactius, serveis HTTP, RxJS i una API REST local amb JSON Server.

## Tecnologies i versions

- Node.js: 24.21.0
- npm: 11.19.0
- Angular: 22.2.3
- Angular CLI: 22.2.5
- TypeScript: 6.0.3
- Git: 2.56.0.windows.2
- JSON Server
- RxJS
- SCSS

## Instal·lació

Cal tenir instal·lats Node.js i npm.

Des de la carpeta del projecte:

```bash
npm install
```

## Execució de l'aplicació

L'aplicació necessita dos servidors en funcionament.

### 1. Iniciar l'API local

En un primer terminal:

```bash
npm run api
```

JSON Server utilitza el fitxer `db.json` i publica les dades a:

http://localhost:3000/jocs

### 2. Iniciar Angular

En un segon terminal:

```bash
npm start
```

L'aplicació estarà disponible a:

http://localhost:4200/

Cal mantenir els dos servidors actius per consultar les dades de l'API.

## Estructura del projecte

- `db.json`: base de dades local amb 12 jocs de taula.
- `src/app/config/api.config.ts`: URL centralitzada de l'API.
- `src/app/models/joc-taula-api.model.ts`: model de les dades externes.
- `src/app/models/joc-taula.model.ts`: model intern de l'aplicació.
- `src/app/adapters/joc-taula.adapter.ts`: adaptació de les dades de l'API.
- `src/app/services/jocs-taula.service.ts`: comunicació HTTP amb JSON Server.
- `src/app/components/llista-jocs/`: llista de jocs.
- `src/app/components/targeta-joc/`: targeta individual de cada joc.
- `src/app/components/etiqueta-categoria/`: etiqueta de categoria.
- `src/app/components/formulari-filtres/`: formulari reactiu de cerca.
- `docs/models.md`: correspondència entre els models i explicació de l'adaptador.
- `evidencies/`: captures de les comprovacions realitzades.

## Funcionalitats implementades

### Components i catàleg

- Catàleg inicial amb 12 jocs de taula.
- Components standalone i comunicació amb `@Input` i `@Output`.
- Selecció d'un joc i visualització del detall.
- Comptador dinàmic de resultats.
- Format de dates i números mitjançant pipes.
- Disseny adaptable i elements d'accessibilitat.

### API i serveis

- API REST local amb JSON Server.
- Configuració centralitzada de la URL de l'API.
- Servei Angular amb `HttpClient`.
- Consulta de jocs mitjançant GET.
- Creació de jocs mitjançant POST.
- Separació entre el model extern i el model intern.
- Adaptació de les dades rebudes de l'API.
- Gestió dels estats de càrrega i error.
- Botó per reintentar la darrera consulta.
- Gestió de cerques amb RxJS, `debounceTime` i `switchMap`.

### Formulari reactiu

- Cerca per nom i descripció.
- Filtratge per categoria.
- Validació síncrona de camp obligatori i longitud mínima.
- Validació asíncrona de l'existència de resultats a l'API.
- Missatges de validació visibles.
- Opció per reiniciar els filtres.
- Historial de fins a 10 cerques vàlides amb `localStorage`.
- Prevenció de duplicats consecutius.
- Recuperació de cerques anteriors.
- Gestió d'errors de lectura i escriptura de l'historial.

## Proves i compilació

Per executar les proves automatitzades:

```bash
npm test -- --watch=false
```

Per generar la compilació de producció:

```bash
npm run build
```

En la comprovació de la pràctica EAC3 s'han superat 6 proves automatitzades distribuïdes en 5 fitxers. La compilació de producció també s'ha completat correctament.

S'han realitzat comprovacions manuals de les consultes HTTP, la creació de jocs, les validacions, la gestió d'errors i el funcionament de l'historial.

## Branques de treball

- `ra1-setup`: configuració inicial del projecte (EAC1).
- `ra2-components`: components i funcionalitats de l'EAC2.
- `ra3-serveis`: serveis HTTP, API local i formularis reactius de l'EAC3.

## Repositori

https://github.com/envila/ioc-angular-cataleg-jocs-taula-jordi-vila
