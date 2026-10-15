# Evidencia — práctica de navegación
Repositorio: https://github.com/NicolasAlcaraz-Git/Practica-14-10.git
Commit inicial: 5b46f16f32594db0a47bcca0aa2300025195154d
Commit de implementación: [PENDIENTE]
Versión de entrega: commit final informado por el estudiante en la plataforma.
Variante: C
Herramienta/modelo o trabajo manual: OpenCode — opencode/mimo-v2.6-flash-free
Cambios previos: PASOS.md y PRACTICA.md sin versionar; ningún cambio de código.
Línea base: [PENDIENTE — Paso 4]

## Exploración mínima
| Capa | Ruta/símbolo | Capacidad comprobada |
|---|---|---|
| Búsqueda | src/domain/navigation/search.ts (findPathBfs, findPathAStar) | SearchResult con status/path/totalCost/expandedNodes/maximumFrontier/explored; fracasos distinguen unreachable, invalid-start, invalid-goal; costo unitario fijo y totalCost = path.length - 1 |
| Seguimiento | src/domain/navigation/pathFollower.ts (advanceAlongPath) | Consume varios waypoints por actualización; puro, sin tiempo de cuadro ni Phaser |
| Consumidor | src/application/simulation/navigationDemo.ts (calculateRoute) | Única entrada de navegación (map, start, goal, algorithm); la consume GameScene.renderNavigation() en src/game/scenes/GameScene.ts:214 y fija guardWaypoints en :221-224 |
| Pruebas | tests/navigation/search.test.ts, tests/navigation/pathFollower.test.ts | Cubren ruta óptima, inicio=meta costo 0, extremos inválidos, inaccesible y comparación de expandidos. No existe prueba de integración del consumidor de navegación |

Contraste de exploración (Paso 1): en esta copia no existe src/domain/behavior/ (FSM = H4 según README); no se reconstruyó ni se supone su ausencia relevante porque la FSM queda fuera de alcance. LAB_MAP es inmutable y no hay evento de cambio de mapa: el consumidor recalcula sólo ante clic o cambio de algoritmo (GameScene.ts:166). Comandos documentados en package.json:16 (validate) y scripts test/test:run; no se ejecutaron en el Paso 1 por ser sólo lectura.

Contraste y decisión humana: [PENDIENTE — Paso 3]
Spec/plan aprobados: [PENDIENTE — Pasos 3 y 5]

## Comparación común — fixture libre 5x3
Vecinos y desempate reales: [PENDIENTE — Paso 4]
| Algoritmo | Estado | Ruta | Pasos | Costo | Expandidos | Frontera máxima |
|---|---|---|---:|---:|---|---|
| BFS | [DATO] | [DATO] | [DATO] | [DATO] | [DATO O NO DISPONIBLE] | [DATO O NO DISPONIBLE] |
| A* | [DATO] | [DATO] | [DATO] | [DATO] | [DATO O NO DISPONIBLE] | [DATO O NO DISPONIBLE] |
DFS: [DOS FRASES SOBRE SU TRAZA Y LÍMITE].
Dijkstra: [COSTOS COMPLETADOS, RUTA Y CONCLUSIÓN].

## Criterio → evidencia
| Criterio | Prueba/archivo y comando o reproducción | Observado | Cumple/pendiente |
|---|---|---|---|
| BASE-AC1 | [REFERENCIA] | [RESULTADO] | [ESTADO] |
| BASE-AC2 | [REFERENCIA] | [RESULTADO] | [ESTADO] |
| BASE-AC3 | [INICIO=META, BARRERA Y EXTREMOS] | [RESULTADOS] | [ESTADO] |
| BASE-AC4 | [SPEC, PLAN Y DECISIÓN] | [RESULTADO] | [ESTADO] |
| C-AC1 | [REFERENCIA] | [RESULTADO] | [ESTADO] |
| C-AC2 | [REFERENCIA] | [RESULTADO] | [ESTADO] |
| C-AC3 | [PRUEBA DEL CONSUMIDOR] | [RESULTADO] | [ESTADO] |
| BASE-AC5 | [VALIDACIÓN Y DIFF] | [RESULTADO] | [ESTADO] |
| BASE-AC6 | [URL, VERSIÓN Y TRES DOCUMENTOS] | [RESULTADO] | [ESTADO] |

## Registro mínimo de intervención
Prompts: [PASOS/VARIANTE DE ESTA GUÍA USADOS Y CAMBIOS RELEVANTES].
Decisión tras incremento 1: [ACEPTAR/CORREGIR Y MOTIVO].
Decisión tras incremento 2: [ACEPTAR/CORREGIR Y MOTIVO].
Validación final: [COMANDO Y RESULTADO REAL].
Diff revisado: [ARCHIVOS Y ALCANCE].
Conclusión: [QUÉ NAVEGACIÓN CONVIENE EN ESTE CASO Y POR QUÉ, 3-5 FRASES].
Limitaciones: [CONCRETAS O NINGUNA CONOCIDA].
