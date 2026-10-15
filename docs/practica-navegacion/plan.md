# Plan — práctica de navegación
Estado: Aprobado
Variante: C
Spec: spec.md

| Incremento | Trabajo | Archivos reales | Criterios | Comprobación |
|---|---|---|---|---|
| 1 | Dominio puro: regla de invalidación de ruta restante y recálculo con el consumidor existente sobre el fixture BASE | src/domain/navigation/routeInvalidation.ts (nuevo), tests/navigation/routeInvalidation.test.ts (nuevo) | C-AC1 (invalidación + nueva ruta de 6 pasos/costo 6 que evita (2,1); caso barrera inaccesible) | npm run test:run -- tests/navigation/routeInvalidation.test.ts |
| 2 | Conexión con el consumidor existente: sesión de rutas con evento explícito de cambio de mapa, sin búsquedas sin evento, cancelación de avance e inaccesible expuesto | src/application/simulation/navigationDemo.ts (extender calculateRoute con la sesión), tests/application/navigationSession.test.ts (nuevo) | C-AC2 (barrera + 10 updates sin evento = 0 búsquedas, conteo sólo en la prueba), C-AC3 (liberar barrera → 4 pasos/costo 4; integración invoca calculateRoute), BASE-AC5 | npm run test:run -- tests/application/navigationSession.test.ts |
| 3 | Validación final, diff y cierre de evidencia | docs/practica-navegacion/evidencia.md (cierre) | BASE-AC1 a BASE-AC6 | npm run validate |

Referencia previa: comparación y casos comunes BASE-01 a BASE-04 completados en abe0b4b (fixtureBase.test.ts, 50 tests, validate OK).
Riesgos: (1) `SearchResult` no distingue recálculo de búsqueda nueva: el conteo de búsquedas del C-AC2 se instrumenta sólo en la prueba de la sesión, sin tocar search.ts ni agregar telemetría al juego. (2) La cancelación de avance debe expresarse con ruta vacía (advanceAlongPath con [] devuelve completed sin mover); un índice inválido lanzaría error — verificar en prueba.
Detenerse si: faltan permisos, hay cambios ajenos, conflicto de contrato,
regresión nueva o se requiere dependencia/UI/refactorización fuera del alcance.
No crear commits ni publicar automáticamente.
