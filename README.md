# Catàleg de jocs de taula

**Autor:** Jordi Vila Alonso

## Descripció del projecte

Aplicació web desenvolupada amb Angular per consultar i organitzar un catàleg de jocs de taula.

L'aplicació permet visualitzar una col·lecció de jocs, consultar-ne les característiques, seleccionar-ne un per veure'n el detall i aplicar filtres per nom, descripció i categoria.

El projecte s'ha desenvolupat amb components independents i reutilitzables, comunicació entre components, formularis amb validació, renderitzat condicional i directives de control de flux d'Angular.

## Tecnologies i versions

- Node.js: 24.21.0
- npm: 11.19.0
- Angular: 22.2.3
- Angular CLI: 22.2.5
- TypeScript: 6.0.3
- Git: 2.56.0.windows.2
- Estils: SCSS

## Instal·lació i execució

Per instal·lar les dependències del projecte:

```bash
npm install
```

Per iniciar el servidor de desenvolupament:

```bash
npx ng serve
```

L'aplicació estarà disponible a:

http://localhost:4200/

Per executar les proves automatitzades:

```bash
npx ng test --watch=false
```

Per comprovar la compilació de producció:

```bash
npx ng build
```

## Estructura i components

- `src/app/models/joc-taula.model.ts`: defineix la interfície i les propietats dels jocs.
- `src/app/models/jocs-taula.mock.ts`: conté les dades simulades del catàleg.
- `LlistaJocs`: mostra la col·lecció de jocs i permet seleccionar-ne un.
- `TargetaJoc`: presenta la informació individual de cada joc.
- `EtiquetaCategoria`: mostra la categoria de cada joc.
- `FormulariFiltres`: permet cercar jocs i filtrar-los per categoria, amb validacions i opció per reiniciar els filtres.

## Funcionalitats implementades

- Catàleg inicial amb 12 jocs de taula.
- Components standalone i comunicació mitjançant `@Input` i `@Output`.
- Cerca per nom i descripció.
- Filtratge per categoria i combinació de criteris.
- Validació del formulari amb camps obligatoris i longitud mínima.
- Comptador dinàmic de resultats.
- Missatge informatiu quan no hi ha resultats.
- Selecció d'un joc i visualització del seu detall.
- Format de dates i valors numèrics mitjançant pipes d'Angular.
- Navegació amb teclat, focus visible i enllaç per saltar al contingut principal.
- Disseny adaptable a dispositius mòbils.

## Branques de treball

- `ra1-setup`: configuració inicial del projecte (EAC1).
- `ra2-components`: desenvolupament dels components i les funcionalitats de l'EAC2.

## Estat del projecte

EAC1 i EAC2: exercicis implementats i comprovats. Les proves automatitzades i la compilació s'han executat correctament.

## Repositori

https://github.com/envila/ioc-angular-cataleg-jocs-taula-jordi-vila
