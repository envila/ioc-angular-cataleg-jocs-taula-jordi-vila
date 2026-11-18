
# Models de dades i adaptació

## Models utilitzats

L'aplicació utilitza dos models per representar els jocs de taula:

- `JocTaulaApi`: defineix les dades que rebem de l'API local.
- `JocTaula`: defineix les dades que utilitzen els components d'Angular.

Aquesta separació permet adaptar les dades externes sense haver de modificar els components de l'aplicació.

## Correspondència de camps

| Camp de l'API | Camp de l'aplicació | Adaptació |
|---|---|---|
| id | id | Es conserva l'identificador de l'API com a text |
| nom | titol | Eliminació d'espais sobrants |
| descripcio | descripcio | Eliminació d'espais sobrants |
| tipus | categoria | Canvi de nom i eliminació d'espais |
| data_publicacio | dataPublicacio | Canvi de nom |
| durada_minuts | duradaMinuts | Conversió a número |
| es_destacat | destacat | Valor `false` si no està definit |

## Adaptador

La funció `adaptarJocTaula`, definida a
`src/app/adapters/joc-taula.adapter.ts`, transforma
un objecte `JocTaulaApi` en un objecte `JocTaula`.

D'aquesta manera, els components poden continuar
treballant amb el model intern, independentment
del format de les dades rebudes de l'API.
