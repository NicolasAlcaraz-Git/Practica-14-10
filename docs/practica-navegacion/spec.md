# Spec: práctica de navegación — 7 al 14/10/2026

Estado: Aprobada
Repositorio: https://github.com/NicolasAlcaraz-Git/Practica-14-10.git
Commit inicial: 5b46f16f32594db0a47bcca0aa2300025195154d
Variante elegida: C
Rutas relevantes:
- Búsqueda: src/domain/navigation/search.ts (findPathBfs, findPathAStar, SearchResult)
- Vecinos/heurística: src/domain/navigation/gridGraph.ts (walkableNeighbors, manhattanDistance)
- Seguimiento: src/domain/navigation/pathFollower.ts (advanceAlongPath)
- Consumidor de navegación: src/application/simulation/navigationDemo.ts (calculateRoute)
- Uso en escena: src/game/scenes/GameScene.ts (renderNavigation:214, guardWaypoints:221-224)
- Mapa: src/application/simulation/labLevel.ts (LAB_MAP), src/domain/model/grid.ts (GridMap, createGridMap)
- Pruebas: tests/navigation/search.test.ts, tests/navigation/pathFollower.test.ts; consumidor de percepción en tests/application/perceptionSimulation.test.ts
Comandos confirmados:
- Validación completa: npm run validate (typecheck + test:run + build; package.json:16)
- Prueba enfocada: npm run test:run -- tests/navigation/search.test.ts (y tests/application/ tras incremento 2)
Consumidor confirmado (Paso 3): src/application/simulation/navigationDemo.ts → calculateRoute; GameScene fuera de la escritura; conexión demostrada por prueba de integración.
Inaccesible = SearchStatus "unreachable" (contrato existente). Inicio=meta = success con path [START] y totalCost 0 (contrato existente).

## Objetivo
Comparar navegación y verificar una única mejora con un caso normal y uno
límite, manteniendo separadas búsqueda, seguimiento y decisión.

## Alcance
Exploración, línea base, comparación BFS/A*, trazas guiadas DFS/Dijkstra,
adaptación de esta spec, un plan de tres incrementos, la variante seleccionada,
validación y entrega. La variante se conecta con una entrada de navegación o
simulación existente; no queda como un algoritmo aislado sin consumidor.

## Fuera de alcance
Implementar DFS o Dijkstra; cambiar FSM, percepción o controles; agregar
dependencias, editor de mapas, motor nuevo o despliegue; hacer varias variantes.

## Requisitos comunes
BASE-01: identificar búsqueda, seguimiento, consumidor y pruebas con rutas;
registrar commit inicial, cambios previos y validación de referencia.
BASE-02: usar el fixture de 5x3 definido debajo y registrar vecinos/desempate.
Comparar BFS y A* unitarios con igual mapa, inicio y meta: estado, ruta, pasos,
costo, nodos expandidos y frontera máxima. No inventar métricas ausentes.
Si una métrica no existe, registrar la limitación sin agregar instrumentación
obligatoria; conservar al menos estado, ruta, pasos y costo comprobable.
BASE-03: explicar la traza DFS y completar los costos de la traza Dijkstra
provistas en la guía. No implementar nuevos algoritmos para este requisito.
BASE-04: verificar éxito con ruta válida, inicio igual a meta con costo 0,
destino libre pero inaccesible y extremos inválidos, usando el contrato real
del proyecto. No representar éxito inmóvil y fracaso de forma indistinguible.
BASE-05: copiar un solo anexo, contrastar sus supuestos con el código, completar
rutas/comandos y señalar incompatibilidades. Aprobar spec y plan antes de editar
código. Registrar un contraste y una decisión humana, sin transcribir el chat.
BASE-06: implementar sólo la variante aprobada, reutilizar capacidades ya
existentes y revisar cada incremento. Conservar dominio puro y conducta previa.
BASE-07: producir evidencia del camino normal, el caso límite y una llamada
desde el consumidor real o su prueba de integración. Ejecutar prueba enfocada
y validación del repositorio; revisar diff y regresiones.
BASE-08: entregar el 14/10/2026, en un único paquete, spec.md, plan.md y
evidencia.md bajo docs/practica-navegacion/, más URL y commit final.

## Fixture común
Cuadrícula: x=0..4, y=0..2; origen arriba a la izquierda; cuatro vecinos,
sin diagonales; inicio S=(0,1), meta G=(4,1); todas las celdas libres y costo 1.
La ruta incluye inicio y meta. Pasos = cantidad de aristas, no de puntos.
Para el caso inaccesible, bloquear (2,0), (2,1) y (2,2); la meta sigue libre.
Para extremos inválidos: inicio (-1,1) o meta (5,1), en casos separados.
Traducir el fixture al formato actual sin cambiar su semántica.

## Restricciones
No sobreescribir cambios anteriores ni modificar pruebas para ocultar fallos.
No instalar dependencias, acceder a secretos o publicar. No cambiar el motor
ni la FSM. Escritura acotada a documentos, navegación, su consumidor mínimo y
pruebas previstas en el plan. No autorizar commits automáticos.
Todos los comandos deben existir o estar justificados y autorizados.

## Criterios comunes
BASE-AC1: evidencia identifica repositorio/commit, capas, cambios previos,
comando y resultado inicial; lo observado se distingue de lo supuesto.
BASE-AC2: en el fixture libre, BFS y A* devuelven ruta cardinal válida de
4 pasos y costo 4. Registrar resultados reales y explicar métricas disponibles.
Las trazas DFS/Dijkstra incluyen conclusión sobre pasos frente a costos.
BASE-AC3: inicio=meta es éxito de costo 0; barrera completa es inaccesible;
extremos fuera de mapa producen resultados inválidos según contrato documentado.
BASE-AC4: spec y plan aprobados antes de implementación; una decisión humana
y su contraste quedan registrados, y sólo se desarrolla el anexo elegido.
BASE-AC5: criterios del anexo tienen pruebas reproducibles; existe evidencia
de su conexión con el consumidor; validación final y diff revisados, sin
regresiones nuevas ni ampliaciones ocultas del alcance.
BASE-AC6: los tres documentos, la URL y el commit final identifican la misma
versión entregada el 14/10; los cambios de código y pruebas están en ese commit.

## Evidencia y decisiones
Usar la plantilla evidencia.md de esta guía. Si un supuesto no se cumple,
marcarlo como pendiente y consultar; no aprobar una spec con dudas que afecten
el comportamiento. La hora/canal de entrega será la indicada por la cátedra.
Ejemplo para entender la spec: no alcanza pedir «que el guardia navegue mejor». BASE-AC2 fija mapa, condiciones y resultado. Si una ruta incluye cinco puntos, tiene cuatro pasos. Si el agente devuelve un rodeo de seis pasos en el mapa libre unitario, no satisface ese criterio aunque llegue.

## Anexo C: bloqueo dinámico
Intención: no continuar por una ruta invalidada ni recalcular sin motivo.
Escenario: fixture BASE unitario. Calcular ruta inicial de 4 pasos.
Sin mover al guardia de S=(0,1), bloquear (2,1) y notificar cambio del mapa.
Luego, en un caso independiente desde S, bloquear toda la columna x=2.

Requisitos:
C-01: ante cambio notificado, comprobar si afecta la ruta restante; si la afecta,
invalidar antes del siguiente avance. No introducir física ni colisiones nuevas.
C-02: pedir una nueva ruta desde la celda actual hacia la misma meta; reemplazar
la anterior al obtener resultado. La decisión/FSM conserva su contrato.
C-03: un evento que invalida ruta produce una solicitud de recálculo; actualizaciones
posteriores sin otro cambio o destino nuevo no repiten solicitudes de búsqueda.
C-04: si no hay ruta, cancelar avance por la ruta vieja y exponer inaccesible
al consumidor. Queda detenido hasta un nuevo cambio de mapa o destino solicitado;
un cambio relevante permite reintentar. No reintentar en bucle cada cuadro.

Criterios:
C-AC1: bloqueo de (2,1) antes del avance cancela la ruta directa; la nueva ruta
tiene 6 pasos, costo 6 y no atraviesa la celda bloqueada (rodeo arriba o abajo).
C-AC2: barrera x=2 da inaccesible, sin avance hacia la barrera; diez actualizaciones
sin otro evento no agregan búsquedas. Instrumentar llamadas sólo en la prueba.
C-AC3: liberar la barrera y notificar permite recuperar ruta de 4 pasos/costo 4;
una prueba de integración del consumidor demuestra invalidación y recuperación.

Fuera de alcance: puertas animadas, editor, rediseño de FSM, bloqueo bajo el guardia
o modelado del radio físico. Usar eventos/datos de mapa y tiempo controlados.
Evidencia: bloqueo simple, barrera, conteo de solicitudes, recuperación y consumidor.
