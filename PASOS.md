Procedimiento paso a paso
Paso 1 — Reconocé tu punto de partida (BASE-01)
Abrí tu repositorio individual. Copiá el siguiente prompt en OpenCode o una herramienta equivalente:

Voy a realizar la práctica de navegación del 7 al 14/10.
Por ahora tenés permiso sólo de lectura y búsqueda de archivos.
Leé README, AGENTS si existe, arquitectura, package.json, navegación,
seguimiento, consumidor y pruebas. No ejecutes comandos ni edites archivos.
Devolvé una tabla: capa, ruta/símbolo, capacidad existente y evidencia.
Señalá los comandos documentados de prueba enfocada y validación completa.
Separá hechos, supuestos y preguntas. No supongas que falta una FSM.
No propongas refactorizaciones ni mejoras fuera de navegación.
Esperá: un mapa breve de rutas reales, no una descripción genérica de A*. Revisá: abrí dos rutas mencionadas y comprobá las afirmaciones. Guardá: la tabla y un contraste breve en evidencia.md, usando la plantilla del paso 8. Avanzá: cuando reconocés búsqueda, seguimiento, consumidor y pruebas. No hace falta una auditoría separada.

Paso 2 — Armá el contrato por copia y selección (BASE-05)
Creá docs/practica-navegacion/ en tu copia. Copiá la spec común a spec.md y pegá un único anexo. Completá la URL, el commit inicial y la letra seleccionada. Copiá también las plantillas de plan.md y evidencia.md del paso 8.

Podés hacerlo manualmente o autorizar al agente con este prompt:

Autorizo crear únicamente docs/practica-navegacion/spec.md, plan.md y evidencia.md.
Usá literalmente las plantillas que pego abajo; mi variante es [A/B/C].
Conservá IDs, datos de fixture y criterios. Marcá pendientes los campos locales.
Si alguno de esos archivos ya existe, mostrame su contenido y consultame antes
de sobreescribir. No modifiques código, pruebas, instrucciones ni otros documentos.
[PEGAR SPEC COMÚN, ANEXO ELEGIDO Y LAS DOS PLANTILLAS DEL PASO 8]
Elegís: una variante; no más. Esperá: tres documentos cortos con campos pendientes identificables. Revisá: que no haya dos anexos ni requisitos nuevos. Avanzá: con spec en borrador y tus cambios anteriores conservados.

Paso 3 — Elaborá la spec adaptándola (BASE-05)
Usá el prompt inicial A, B o C incluido junto a tu anexo. Pegá la spec completa o indicá que está en docs/practica-navegacion/spec.md y pedí que la lea. La respuesta debe identificar rutas, capacidades existentes e incompatibilidades, sin escribir código.

Elegí ahora el consumidor concreto: la entrada de navegación ya existente o la entrada de simulación ya existente, según lo que el agente haya demostrado. Se recomienda el consumidor que ya acepta configuración. No se exige una UI nueva. La prueba final debe invocar ese consumidor, no solamente el algoritmo.

Ejemplo de elaboración: el agente encuentra que A* usa costo fijo 1. Conservás el requisito de sumar costos de entrada, registrás esa diferencia y ubicás el cambio en navegación. No aceptás «usar BFS porque ya funciona»: BFS no prueba el mínimo ponderado.

Si el contrato permite representaciones diferentes de inicio=meta, documentá cuál existe; el criterio sigue siendo éxito inequívoco y costo 0. No impongas un nuevo formato de retorno sólo para copiar el ejemplo.

Para aprobar y guardar la adaptación:

Revisé la propuesta. Mi consumidor será [RUTA/SÍMBOLO CONFIRMADO].
Mi decisión humana es [DECISIÓN BREVE BASADA EN LA EXPLORACIÓN].
Autorizo actualizar únicamente la spec y los datos iniciales de evidencia.
Conservá requisitos y criterios. Completá rutas y comandos confirmados.
Si no hay conflictos pendientes de comportamiento, marcá la spec Aprobada.
Si quedan conflictos, listalos y detenete; no marques Aprobada ni implementes.
Guardá: un contraste, por ejemplo «se propuso crear costos nuevos, pero ya había una entrada configurable en X; elegí reutilizarla». Una confirmación fundada de capacidad existente también vale. Avanzá: sólo con spec aprobada y sin conflictos pendientes.

Paso 4 — Línea base, comparación y otras búsquedas (BASE-01/02/03/04)
Ejecutá vos los comandos documentados, o autorizá al agente a los que hayas confirmado. En el laboratorio canónico, npm run validate ejecuta tipos, pruebas y build. git status --short y git rev-parse HEAD permiten registrar cambios previos y commit; no modifican el código. No registres datos privados.

Usá el fixture común, no un mapa aleatorio. Si no existe una prueba que lo represente, podés agregar el fixture y pruebas de referencia sin modificar aún la implementación; ese permiso es sólo para pruebas de BASE-02/04.

La spec común está aprobada. Quiero completar sólo BASE-01 a BASE-04.
Autorizo [PEGAR COMANDOS CONFIRMADOS] y crear/adaptar pruebas de referencia
para el fixture común dentro de la carpeta de pruebas existente.
No cambies implementación ni empieces el anexo.
Ejecutá BFS y A* con igual mapa, S y G, y registrá resultados reales.
Verificá inicio=meta, barrera completa y extremos fuera del mapa.
Usá los campos de métricas existentes; si falta alguno, informalo sin inventarlo.
Si una prueba detecta un fallo previo, conservá reproducción y consultame.
Mostrá diff de pruebas y comandos/resultados para mi revisión.
Resultado esperado: en mapa libre, ambos dan cuatro pasos y costo 4. En barrera, no hay camino; no confundas ese resultado con extremos fuera del mapa. Guardá las salidas necesarias en evidencia.

Exploración guiada de DFS: leer la traza, no implementarla
Usá este grafo y orden de vecinos:

S:[A,B] A:[C] C:[X] X:[G] B:[D,E] D:[G] E:[] G:[]
Costos: todos 1. DFS usa pila e inserta vecinos en orden inverso.
La traza DFS es S,A,C,X,G: ruta de cuatro pasos. BFS encuentra S,B,D,G: tres pasos. Explicá en dos frases por qué encontrar primero una meta no demuestra que DFS encuentre la ruta más corta. No necesitás ejecutar código DFS.

Exploración guiada de Dijkstra: completar costos
S→A cuesta 1; A→G cuesta 9; S→B cuesta 3; B→G cuesta 3.
Extraer S=0: descubrir A=1, B=3.
Extraer A=1: descubrir G=[COMPLETAR].
Extraer B=3: mejorar G=[COMPLETAR].
Extraer entrada válida de G: ruta [COMPLETAR], costo [COMPLETAR].
Autocorrección: los valores son 10, 6, S-B-G, 6. Ambas rutas tienen dos acciones; BFS no distingue sus costos por contar acciones. Anotá por qué no hay que terminar al descubrir por primera vez G.

Prompt de apoyo opcional:

Explicame las trazas DFS y Dijkstra de la guía sin generar código ni archivos.
Mostrá frontera y costos observables, no razonamientos privados.
Luego haceme una pregunta sobre pasos frente a costo y esperá mi respuesta.
Avanzá: con comparación guardada, trazas comprendidas y línea base identificada. Si un resultado previo falla, no lo escondas dentro de la variante: consultá la corrección mínima.

Paso 5 — Ajustá el plan de tres incrementos (BASE-05/06)
La plantilla del paso 8 ya incluye tres incrementos. Sólo hay que completar rutas y comandos reales.

Leé mi spec aprobada, anexo elegido y plan prearmado.
Autorizo actualizar únicamente docs/practica-navegacion/plan.md.
Completá los tres incrementos con archivos reales, IDs de criterios y
comandos confirmados. Reutilizá lo existente; no agregues requisitos.
Separá dominio/pruebas de la conexión con el consumidor y del cierre.
Señalá riesgos y detenciones. No implementes todavía.
Revisá: cada incremento tiene prueba y criterio; no agrega una segunda variante, UI ni refactorización de FSM. Elegís: aceptar el plan o corregir un archivo/alcance justificado. Cambiá su estado a Aprobado cuando lo revises. Avanzá: con plan de tres incrementos aprobado.

Paso 6 — Implementá un incremento por vez (BASE-06)
Usá este prompt para el incremento 1; repetilo cambiando el número para los demás:

La spec y el plan de docs/practica-navegacion/ están aprobados.
Autorizo sólo el incremento [NÚMERO] y los archivos previstos en él.
No hagas el siguiente incremento. Preservá cambios anteriores.
Implementá la mínima modificación que satisface sus requisitos y agregá las
pruebas indicadas. Usá fixture fijo y resultados esperados de la spec.
Ejecutá la comprobación enfocada autorizada, mostrá resultado y diff.
Si necesitás más archivos, dependencias o cambiar el contrato, consultame.
No crees commits ni publiques. Terminá indicando criterio demostrado y límite.
Esperá: código y prueba pequeños, no una reescritura. Revisá: la suma de costos o la invalidación se aplica donde corresponde; el consumidor realmente utiliza la mejora. Ejecutá o inspeccioná personalmente al menos una comprobación. Guardá: comando, resultado y tu decisión en evidencia. Avanzá: sólo si el incremento cumple sus criterios y no deja fallos sin explicar.

En A/B, revisá también el costo informado en el resultado: no alcanza cambiar la prioridad de búsqueda si totalCost sigue contando pasos. Un rodeo de seis pasos y costo 6 parece correcto en ambas medidas; la ruta directa de cuatro pasos y costo 16 permite detectar esa confusión. No cambies el contrato unitario de BFS para esconderla.

Si ya existía la capacidad, no dupliques código: completá su configuración, integración o evidencia. El aprendizaje es verificar un contrato, no producir una cantidad mínima de líneas.

Paso 7 — Verificá contrato y regresiones (BASE-07)
Verificá mi spec común y único anexo, sin ampliar el alcance.
Autorizo las pruebas y validación ya confirmadas en el plan.
Devolvé una tabla criterio → prueba/comando → resultado observado → limitación.
Incluí caso normal, límite y prueba del consumidor real.
Revisá el diff contra mi estado inicial; diferenciá cambios previos y actuales.
Si falla algo, reproducilo y proponé una corrección mínima; no cambies criterios
ni corrijas fuera del alcance sin autorización.
No des por aprobado un criterio basándote en tu propia afirmación.
Esperá: resultados reales. A-AC1 y B-AC1 se comprueban sumando costos y validando ruta, no exigiendo rodeo superior exacto. En C, el conteo se realiza con un doble de prueba o contador local a la prueba, no agregando un panel de telemetría al juego.

Para la conexión con el consumidor alcanza una prueba de integración reproducible que invoque la entrada real de navegación/simulación. Una captura puede complementar, pero no reemplaza esa comprobación. No se exige video ni editor para representar el fixture.

Guardá: salida resumida, prueba identificada, matriz y limitaciones. Avanzá: con criterios satisfechos, validación final y diff revisado. Si hay una limitación pendiente, identificá el criterio que no se demostró; no marques la práctica completa.

Paso 8 — Cerrá la entrega única (BASE-08)
Usá estas plantillas. Mantenelas breves: spec común más anexo; plan de tres incrementos; evidencia con tablas y conclusiones cortas. No agregues auditoría, informe o transcripción aparte.

plan.md: copiar y completar
# Plan — práctica de navegación
Estado: Borrador / Aprobado
Variante: [A/B/C]
Spec: spec.md

| Incremento | Trabajo | Archivos reales | Criterios | Comprobación |
|---|---|---|---|---|
| 1 | Configurar/ajustar dominio y probar caso normal/límite de mi variante | [RUTAS] | [AC DEL ANEXO] | [COMANDO] |
| 2 | Conectar con consumidor existente y probar contrato anterior | [RUTAS] | [AC DE CONSUMIDOR], BASE-AC5 | [COMANDO] |
| 3 | Validación final, diff y cierre de evidencia | [RUTAS] | BASE-AC1 a BASE-AC6 | [COMANDO] |

Referencia previa: comparación y casos comunes BASE-01 a BASE-04 completados.
Riesgos: [UNO O DOS RIESGOS CONCRETOS DEL CAMBIO].
Detenerse si: faltan permisos, hay cambios ajenos, conflicto de contrato,
regresión nueva o se requiere dependencia/UI/refactorización fuera del alcance.
No crear commits ni publicar automáticamente.
evidencia.md: copiar y completar
# Evidencia — práctica de navegación
Repositorio: [URL]
Commit inicial: [HASH]
Commit de implementación: [HASH CONOCIDO O VER COMMIT INFORMADO EN LA ENTREGA]
Versión de entrega: commit final informado por el estudiante en la plataforma.
Variante: [A/B/C]
Herramienta/modelo o trabajo manual: [DATO DISPONIBLE]
Cambios previos: [RESUMEN O NINGUNO]
Línea base: [COMANDO, RESULTADO Y FALLOS PREVIOS SI EXISTEN]

## Exploración mínima
| Capa | Ruta/símbolo | Capacidad comprobada |
|---|---|---|
| Búsqueda | [RUTA] | [HECHO] |
| Seguimiento | [RUTA] | [HECHO] |
| Consumidor | [RUTA] | [HECHO] |
| Pruebas | [RUTA] | [HECHO] |

Contraste y decisión humana: [AFIRMACIÓN COMPROBADA Y QUÉ DECIDÍ].
Spec/plan aprobados: [MOMENTO O PASO; AJUSTE SI HUBO].

## Comparación común — fixture libre 5x3
Vecinos y desempate reales: [REGLAS].
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
| [A/B/C]-AC1 | [REFERENCIA] | [RESULTADO] | [ESTADO] |
| [A/B/C]-AC2 | [REFERENCIA] | [RESULTADO] | [ESTADO] |
| [A/B/C]-AC3 | [PRUEBA DEL CONSUMIDOR] | [RESULTADO] | [ESTADO] |
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
Prompt de cierre:

Autorizo completar sólo los tres documentos de docs/practica-navegacion/
con la evidencia real ya obtenida. No inventes métricas ni éxito de pruebas.
Conservá una sola variante y explicá limitaciones. Referenciá los prompts por
paso de la guía; copiá sólo modificaciones importantes, no todo el chat.
Revisá que cada criterio tenga evidencia y que no queden campos sin completar.
Informame qué falta para entregar. No crees commits ni publiques.