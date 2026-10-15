Práctica guiada: especificar y verificar una navegación
Inicio: miércoles 7/10/2026. Entrega única: en la clase del miércoles 14/10/2026.

Situación problemática y objetivo
El guardia puede encontrar una ruta, pero la más corta no siempre responde a la intención de diseño y una ruta puede dejar de ser válida. Vas a comparar algoritmos y conducir una sola mejora de navegación, con una spec breve y pruebas reproducibles.

La práctica está prearmada: copiás una spec común, elegís una de tres variantes y seguís los pasos. Elaborar la spec significa contrastarla con tu repositorio y completar datos concretos, no escribir un informe desde cero. Ningún prompt autoriza tareas fuera de la spec.

Entregás todo junto el 14/10. No hay entregas intermedias. La FSM, los árboles, la utilidad y GOAP que se presentan ese día no forman parte de esta entrega. Tampoco se vuelven a pedir los cinco upgrades de la actividad anterior.

Recursos disponibles
Tu repositorio individual basado en Guardia de Sigilo, conservando tus cambios anteriores.
El apunte teórico de las dos clases.
Las specs, mapas, prompts y plantillas completos de esta guía.
README, instrucciones, arquitectura, código y pruebas de tu copia.
En el laboratorio canónico, buscá primero src/domain/navigation/, src/application/simulation/navigationDemo.ts y tests/navigation/. Son puntos de entrada para explorar, no nombres garantizados en tu copia. La versión canónica actual ya cuenta con conducta autónoma; no reconstruyas la FSM ni supongas que falta.

Restricciones y recorrido
Dominio independiente del motor; sin dependencias nuevas, editor de mapas, despliegue, acceso a secretos ni cambios a percepción/FSM. Las specs también contienen estas restricciones. Los comandos se ejecutan sólo después de comprobarlos en el repositorio. Los commits y la publicación se realizan por decisión humana.

Paso	Qué hacés	Qué conservás	Tiempo orientativo
1	Exploración en lectura	Rutas y estado inicial en evidencia	15 min
2	Copiar spec común y elegir variante	spec.md en borrador	15 min
3	Adaptar y aprobar la spec	Spec revisada	20 min
4	Línea base, comparación y trazas	Resultados comunes	30 min
5	Revisar plan prearmado	plan.md aprobado	10 min
6	Implementar por incrementos	Una mejora acotada	45 min
7	Verificar y revisar	Matriz criterio-evidencia	30 min
8	Cerrar la entrega	Tres archivos, URL y commit	15 min
Si un fallo previo o una incompatibilidad impide avanzar, registrá la reproducción y consultá. No inventes resultados ni amplíes la práctica para resolver una refactorización grande.

La spec común: contrato de toda la práctica
Copiá este bloque al principio de docs/practica-navegacion/spec.md. Después pegá únicamente la variante que elegiste. Ese archivo es la spec completa: base común más un anexo. Los únicos campos iniciales a completar son repositorio, commit, variante, rutas y comandos confirmados.

# Spec: práctica de navegación — 7 al 14/10/2026

Estado: Borrador
Repositorio: [URL]
Commit inicial: [COMMIT]
Variante elegida: [A, B o C]
Rutas relevantes: [COMPLETAR DESPUÉS DE EXPLORAR]
Comandos confirmados: [VALIDACIÓN Y PRUEBA ENFOCADA]

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

Elegí una variante: tres specs listas
Elegí A si querés trabajar costos, B si te interesa la intención de sigilo o C si preferís reaccionar a cambios del mapa. A y B comparten una estructura de costos: no cuentan como dos mejoras obligatorias. Las opciones tienen resultados predefinidos; no hay que ajustar parámetros por ensayo y error.

Opción A — Terreno lento
Caso: una franja central es transitable, pero cuesta más recorrerla. El guardia debe preferir un rodeo de menor costo. El costo modela preferencia de navegación; no se exige cambiar velocidad física o animación.

Pegá este anexo después de la spec común:

## Anexo A: terreno lento
Intención: minimizar costo de desplazamiento, no sólo cantidad de pasos.
Escenario: fixture BASE, con costo de entrada 5 en (1,1), (2,1), (3,1).
El resto cuesta 1; el inicio no suma costo. No hay celdas bloqueadas.

Requisitos:
A-01: el cálculo ponderado suma costos de entrada positivos; BFS conserva
su semántica unitaria y no se presenta como oráculo del mínimo ponderado.
A-02: usar A* existente con costo ponderado y heurística Manhattan válida
(costo mínimo 1), o su capacidad equivalente ya existente; no implementar
Dijkstra adicional. Mantener compatible el caso unitario anterior.
A-03: conectar el modo ponderado con un consumidor de navegación/simulación
existente mediante configuración explícita, sin crear una interfaz nueva.
A-04: si la franja vuelve a costo 1, la búsqueda usa esos nuevos datos y
recupera el mínimo unitario; no reutiliza costos anteriores por accidente.

Criterios:
A-AC1: la ruta directa tiene 4 pasos y costo 16 (=5+5+5+1).
La búsqueda ponderada devuelve un rodeo válido de 6 pasos y costo total 6.
Puede pasar por arriba o abajo; no exigir una ruta única en un empate.
A-AC2: sin franja lenta, resultado de 4 pasos y costo 4.
A-AC3: prueba del consumidor confirma que usa el modo ponderado y obtiene
costo 6 con franja; el modo unitario existente conserva su funcionamiento.

Fuera de alcance: modificar velocidad, crear terrenos gráficos o editar niveles.
Evidencia: prueba de franja, prueba de restauración, comparación de costos y
prueba de consumidor; registrar en evidencia.md.
Prompt orientativo de inicio A — usalo en el paso 3:

Elegí el anexo A: terreno lento. Mi spec común y anexo están al final.
Primero explorá sólo en lectura si navegación acepta costos, cómo suma g,
qué heurística usa y quién consume el resultado. No implementes.
Contrastá la ruta directa de costo 16 y el rodeo de costo 6 con el fixture.
Proponé la adaptación mínima al contrato actual, preservando BFS unitario.
No cambies velocidades ni agregues algoritmos o dependencias.
Mostrá rutas/símbolos y diferencias entre evidencia y supuestos.
Devolvé la spec breve adaptada; consultame si existe una incompatibilidad.
[PEGAR SPEC COMÚN + ANEXO A]
Opción B — Evitar zonas expuestas
Caso: el recorrido directo cruza una franja expuesta. Una ruta más larga evita esa franja. Se trabaja con una máscara fija, no con visión dinámica ni con la posición secreta del jugador.

## Anexo B: zonas expuestas
Intención: preferir menos exposición cuando existe una alternativa razonable.
Escenario: fixture BASE, con máscara expuesta en (1,1), (2,1), (3,1).
Costo de entrar = 1 + penalización; penalización 4 si expuesta, 0 si no.
El inicio no suma costo. Exposición es preferencia, no obstáculo ni probabilidad.

Requisitos:
B-01: usar la máscara fija explícita para calcular costos positivos de entrada.
No leer jugador oculto ni cambiar sensores o memoria; todas las celdas son libres.
B-02: la búsqueda ponderada usa A* existente adaptado o capacidad equivalente,
con Manhattan y costo mínimo 1; mantiene el caso unitario y BFS existentes.
B-03: conectar perfil de penalización con el consumidor de navegación/simulación
existente mediante configuración, sin interfaz nueva ni adaptación de la FSM.
B-04: con penalización 0, dejar de evitar la máscara por costos anteriores.

Criterios:
B-AC1: directa de 4 pasos tiene costo 16; resultado preferido tiene 6 pasos,
costo 6 y no entra en las tres celdas expuestas. Aceptar rodeo superior o inferior.
B-AC2: con penalización 0, resultado de 4 pasos y costo 4; la máscara no bloquea.
B-AC3: prueba del consumidor obtiene el rodeo con el perfil expuesto y conserva
el resultado unitario al desactivarlo. Percepción y memoria no se modificaron.

Fuera de alcance: exposición dinámica, probabilidades, nuevas coberturas o sensores.
Evidencia: cálculo del costo, ruta sin franja, penalización 0, prueba de consumidor
y revisión de archivos; registrar en evidencia.md.
Prompt orientativo de inicio B:

Elegí el anexo B: zonas expuestas. Copio mi spec común y anexo al final.
Explorá sólo en lectura navegación, costos y consumidor. No implementes.
Necesito una máscara fija de tres celdas, no cambiar visión ni memoria.
Mostrá cómo expresar costo 1+4 y cómo preservar Manhattan y el modo unitario.
Verificá los costos esperados 16 y 6, y el caso de penalización 0.
Proponé una adaptación mínima de la spec con rutas reales. No agregues UI.
Si hay incompatibilidades, presentá opciones acotadas y esperá mi decisión.
[PEGAR SPEC COMÚN + ANEXO B]
Opción C — Reaccionar ante un bloqueo dinámico
Caso: la ruta inicial era válida, pero se bloquea una celda antes de que el guardia la atraviese. Debe abandonar la ruta vieja y buscar un rodeo. Si no existe salida, se detiene e informa el motivo.

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
Prompt orientativo de inicio C:

Elegí el anexo C: bloqueo dinámico. Copio mi spec común y anexo al final.
Explorá sólo en lectura búsqueda, seguimiento y coordinación de rutas.
No implementes ni cambies la FSM. Identificá dónde invalidar una ruta y comunicar
inaccesible, y cómo notificar un cambio de mapa sin editor o interfaz nueva.
Usá eventos explícitos; no pongas una búsqueda por cuadro.
Contrastá bloqueo simple, barrera completa, diez actualizaciones sin cambio
y recuperación. Proponé la spec adaptada con rutas reales y consultá conflictos
con el contrato existente antes de autorizar código.
[PEGAR SPEC COMÚN + ANEXO C]