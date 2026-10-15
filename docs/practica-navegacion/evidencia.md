# Evidencia — práctica de navegación
Repositorio: https://github.com/NicolasAlcaraz-Git/Practica-14-10.git
Commit inicial: 5b46f16f32594db0a47bcca0aa2300025195154d
Commit de implementación: baccb93617219ee2dd4688ab34aab0865313db68 — código y pruebas completos (inc1 d8ee92e, inc2 79d989a, inc3 baccb93); el commit final de cierre de esta evidencia es la versión de entrega informada en la plataforma.
Versión de entrega: commit final informado por el estudiante en la plataforma.
Variante: C
Herramienta/modelo o trabajo manual: OpenCode — opencode/mimo-v2.6-flash-free
Cambios previos: commits 271d00a (Paso 1), 1646ec8 (Paso 2), d6d6b90 (Paso 3 — spec/plan/evidencia); árbol limpio antes del Paso 4. Cambios del Paso 4: tests/navigation/fixtureBase.test.ts (nuevo) y esta evidencia; ningún cambio de implementación.
Línea base: `npm run validate` en d6d6b90 antes de agregar pruebas → typecheck OK, 39 tests OK, build OK (warning de chunk >500 kB de Phaser preexistente, no es regresión). Repetido tras agregar fixtureBase.test.ts → 50 tests OK. Foco: `npm run test:run -- tests/navigation/fixtureBase.test.ts` → 11/11 OK.

## Exploración mínima
| Capa | Ruta/símbolo | Capacidad comprobada |
|---|---|---|
| Búsqueda | src/domain/navigation/search.ts (findPathBfs, findPathAStar) | SearchResult con status/path/totalCost/expandedNodes/maximumFrontier/explored; fracasos distinguen unreachable, invalid-start, invalid-goal; costo unitario fijo y totalCost = path.length - 1 |
| Seguimiento | src/domain/navigation/pathFollower.ts (advanceAlongPath) | Consume varios waypoints por actualización; puro, sin tiempo de cuadro ni Phaser |
| Consumidor | src/application/simulation/navigationDemo.ts (calculateRoute) | Única entrada de navegación (map, start, goal, algorithm); la consume GameScene.renderNavigation() en src/game/scenes/GameScene.ts:214 y fija guardWaypoints en :221-224 |
| Pruebas | tests/navigation/search.test.ts, tests/navigation/pathFollower.test.ts | Cubren ruta óptima, inicio=meta costo 0, extremos inválidos, inaccesible y comparación de expandidos. No existe prueba de integración del consumidor de navegación |

Contraste de exploración (Paso 1): en esta copia no existe src/domain/behavior/ (FSM = H4 según README); no se reconstruyó ni se supone su ausencia relevante porque la FSM queda fuera de alcance. LAB_MAP es inmutable y no hay evento de cambio de mapa: el consumidor recalcula sólo ante clic o cambio de algoritmo (GameScene.ts:166). Comandos documentados en package.json:16 (validate) y scripts test/test:run; no se ejecutaron en el Paso 1 por ser sólo lectura.

Contraste y decisión humana: se propuso notificar cambios de mapa y exponer "inaccesible" como capacidades nuevas, pero `calculateRoute` ya acepta el mapa como configuración y el contrato ya distingue `unreachable`; decisión humana (14/10, Paso 3): consumidor = `src/application/simulation/navigationDemo.ts` → `calculateRoute`, reglas de invalidación en dominio puro, coordinación con evento explícito en aplicación, `GameScene` sin cambios, sin dependencias nuevas ni UI.
Spec/plan aprobados: spec Aprobada el Paso 3 (14/10); plan de 3 incrementos Aprobado el Paso 5 (14/10) — inc1 dominio routeInvalidation, inc2 sesión en navigationDemo + integración, inc3 validación/cierre.

## Comparación común — fixture libre 5x3
Vecinos y desempate reales: 4 vecinos en orden fijo N, E, S, O (`gridGraph.ts` CARDINAL_DIRECTIONS, sin diagonales). BFS: cola FIFO. A*: menor f=g+h; empate → menor h; segundo empate → orden de inserción (`search.ts:144-150`). Métricas disponibles en `SearchResult`: `expandedNodes` y `maximumFrontier` existen; ninguna falta.
Traducción del fixture: `createGridMap(5, 3, [])`, S=(0,1), G=(4,1), costo 1 por celda (`tests/navigation/fixtureBase.test.ts`).
| Algoritmo | Estado | Ruta | Pasos | Costo | Expandidos | Frontera máxima |
|---|---|---|---:|---:|---|---|
| BFS | success | (0,1)→(1,1)→(2,1)→(3,1)→(4,1) | 4 | 4 | 12 | 4 |
| A* | success | (0,1)→(1,1)→(2,1)→(3,1)→(4,1) | 4 | 4 | 5 | 9 |
DFS: con pila e insertando vecinos en orden inverso, DFS sigue S,A,C,X,G y encuentra la meta con cuatro pasos, mientras BFS encuentra S,B,D,G con tres. Encontrar primero la meta no demuestra optimalidad: DFS compromete una rama sin explorar alternativas de igual o menor profundidad; sólo garantiza alcanzabilidad en grafos finitos.
Dijkstra: Extraer S=0 descubre A=1, B=3. Extraer A=1 descubre G=1+9=**10**. Extraer B=3 mejora G=3+3=**6**. Extraer G (clave 6): ruta **S-B-G**, costo **6**. Conclusión: ambas rutas S-A-G y S-B-G tienen dos acciones, pero costos 10 y 6; BFS cuenta acciones y no distingue costos, Dijkstra sí. No hay que terminar al descubrir G por primera vez porque la clave insertada aún no es mínima; el costo se fija recién al extraer de la cola, y la mejora vía B llega después del descubrimiento inicial.

## Criterio → evidencia
| Criterio | Prueba/archivo y comando o reproducción | Observado | Cumple/pendiente |
|---|---|---|---|
| BASE-AC1 | Commits iniciales/cambios previos arriba; capas en Exploración mínima; `npm run validate` en d6d6b90 (39 tests) y tras fixtureBase (50 tests); supuestos separados en registro | Repositorio/commit/capas/comandos documentados arriba; sin fallos previos | Cumple (revisión humana pendiente) |
| BASE-AC2 | tests/navigation/fixtureBase.test.ts (ambos algoritmos) + `npm run test:run -- tests/navigation/fixtureBase.test.ts` | BFS y A*: success, ruta cardinal (0,1)→(4,1), 4 pasos, costo 4; expandidos 12/5, frontera 4/9 | Cumple |
| BASE-AC3 | fixtureBase.test.ts: inicio=meta, barrera (2,0..2), inicio (-1,1), meta (5,1) | success/costo 0; unreachable/costo null; invalid-start; invalid-goal (estados distinguibles) | Cumple |
| BASE-AC4 | spec.md Estado: Aprobada; plan.md Estado: Aprobado; decisión humana y contraste arriba; único anexo C | Spec aprobada Paso 3 y plan aprobado Paso 5, ambos antes de editar código; sólo se desarrolló el anexo C | Cumple |
| C-AC1 | routeInvalidation.test.ts (regla + recálculo) y navigationSession.test.ts (invalidación end-to-end antes del avance) | Rodeo de 6 pasos/costo 6 que evita (2,1); avance usa la ruta nueva; barrera → unreachable con ruta vacía | Cumple |
| C-AC2 | navigationSession.test.ts (barrera + 10 updateNavigationSession + contador countingSearch sólo en la prueba) | Inaccesible sin avance (posición intacta, direction null); 10 updates sin evento = 0 búsquedas (contador 2 = inicial + barrera) | Cumple |
| C-AC3 | navigationSession.test.ts (liberar barrera y notificar; recálculo desde celda actual) | Recuperación de 4 pasos/costo 4 vía calculateRoute; recálculo desde (1,1) evita (2,1) | Cumple |
| BASE-AC5 | `npm run test:run` completo (63/63) y `npm run validate` (typecheck + tests + build OK, sin regresiones: 39 previos se conservan); diff revisado contra abe0b4b y contra estado inicial 5b46f16; alcance acotado a los archivos del plan | Validación final OK; sin ampliaciones ocultas del alcance | Cumple |
| BASE-AC6 | URL arriba; tres documentos en docs/practica-navegacion/; código y pruebas en d8ee92e/79d989a/baccb93; cierre de esta evidencia en el commit final | Todo identificado por el mismo repositorio; sólo resta informar URL y hash del commit final en la plataforma (acto humano de entrega) | Cumple (tras el commit final de cierre) |

## Registro mínimo de intervención
Prompts: guía PASOS.md, variante C. Pasos 1-8 ejecutados: exploración (1), spec+anexo C (2), aprobación consumidor (3), línea base BASE-01..04 (4), plan (5), incrementos 1-3 (6), verificación criterio→evidencia (7) y cierre de este documento (8). Toda la implementación se realizó sólo con archivos autorizados por incremento.
Decisión tras incremento 1: ACEPTAR — regla pura de invalidación + recálculo por calculateRoute verifican C-AC1 (6 pasos/costo 6, barrera unreachable, recuperación 4/4); foco 8/8 y validate 58 tests OK (14/10).
Decisión tras incremento 2: ACEPTAR — sesión en navigationDemo verifica C-AC1 end-to-end, C-AC2 (10 updates = 0 búsquedas, inaccesible sin avance) y C-AC3 (recuperación 4/4 + recálculo desde celda actual) invocando calculateRoute; foco 5/5 y validate 63 tests OK (14/10).
Validación final: `npm run validate` → typecheck OK, 63/63 tests OK, build OK (14/10); warning de chunk Phaser preexistente, no regresión.
Diff revisado: contra abe0b4b — nuevos src/domain/navigation/routeInvalidation.ts, tests/navigation/routeInvalidation.test.ts, tests/application/navigationSession.test.ts, tests/navigation/fixtureBase.test.ts; modificado src/application/simulation/navigationDemo.ts (+68, sesión); docs/practica-navegacion/*; ninguna modificación de GameScene, FSM, percepción, motor, package.json ni dependencias.
Conclusión: para este laboratorio, A* unitario con Manhattan sigue siendo suficiente para rutas estáticas y expande menos nodos que BFS (5 vs 12). El bloqueo dinámico se resuelve con invalidación por evento explícito: sólo un cambio de mapa que afecta la ruta restante dispara una búsqueda, evitando recálculos por cuadro. La cancelación se expresa con ruta vacía y el estado `unreachable` ya existente, sin ampliar contratos. El caso cubierto por la sesión de navegación es reproducible por prueba de integración de `calculateRoute`; no se requirió DFS ni Dijkstra implementados (las trazas guiadas mostraron que BFS cuenta acciones, no costos).
Limitaciones: (1) el reintento por "destino solicitado" (C-04) no está implementado en la sesión — la escena ya recalcula por clic y ningún criterio lo exige; (2) GameScene no consume la sesión porque la escena no tiene cambios de mapa (LAB_MAP constante); la conexión se demuestra por la prueba que invoca la entrada real de navegación, según la guía; (3) el conteo de búsquedas existe sólo como doble de prueba; ninguna otra limitación conocida.
