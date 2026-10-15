# Evidencia — práctica de navegación
Repositorio: https://github.com/NicolasAlcaraz-Git/Practica-14-10.git
Commit inicial: 5b46f16f32594db0a47bcca0aa2300025195154d
Commit de implementación: [PENDIENTE]
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
| BASE-AC4 | spec.md Estado: Aprobada; decisión humana y contraste arriba; único anexo C | Spec aprobada Paso 3 antes de código; sólo anexo C desarrollado | Cumple (plan pendiente Paso 5) |
| C-AC1 | [REFERENCIA] | [RESULTADO] | [ESTADO] |
| C-AC2 | [REFERENCIA] | [RESULTADO] | [ESTADO] |
| C-AC3 | [PRUEBA DEL CONSUMIDOR] | [RESULTADO] | [ESTADO] |
| BASE-AC5 | [VALIDACIÓN Y DIFF] | [RESULTADO] | [ESTADO] |
| BASE-AC6 | [URL, VERSIÓN Y TRES DOCUMENTOS] | [RESULTADO] | [ESTADO] |

## Registro mínimo de intervención
Prompts: guía PASOS.md, variante C. Pasos 1-5 ejecutados (exploración, spec+anexo C, aprobación del consumidor, línea base BASE-01..04 con fixtureBase.test.ts en abe0b4b, plan aprobado). Incremento 1 aceptado: routeInvalidation.ts (8 tests, validate 58 OK). Incremento 2 implementado: sesión de navegación en navigationDemo.ts (initialNavigationState/updateNavigationSession/advanceToCell/notifyMapChanged; búsqueda inyectable NavigationSearch, default calculateRoute) + tests/application/navigationSession.test.ts → foco 5/5 OK; `npm run validate` → typecheck + 63 tests + build OK (14/10). Conteo de búsquedas instrumentado sólo en la prueba (double countingSearch); sin telemetría en el juego; GameScene y FSM intactos; sin dependencias. Pendientes: aceptación humana del inc2, inc3 (cierre).
Decisión tras incremento 1: ACEPTAR — regla pura de invalidación + recálculo por calculateRoute verifican C-AC1 (6 pasos/costo 6, barrera unreachable, recuperación 4/4); foco 8/8 y validate 58 tests OK (14/10).
Decisión tras incremento 2: [ACEPTAR/CORREGIR Y MOTIVO].
Validación final: [COMANDO Y RESULTADO REAL].
Diff revisado: [ARCHIVOS Y ALCANCE].
Conclusión: [QUÉ NAVEGACIÓN CONVIENE EN ESTE CASO Y POR QUÉ, 3-5 FRASES].
Limitaciones: [CONCRETAS O NINGUNA CONOCIDA].
