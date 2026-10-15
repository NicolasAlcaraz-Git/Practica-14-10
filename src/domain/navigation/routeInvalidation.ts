import { isWalkable, type GridMap, type GridPoint } from "../model/grid";

export function remainingRouteAffected(
  map: GridMap,
  path: readonly GridPoint[],
  fromIndex: number,
): boolean {
  if (!Number.isInteger(fromIndex) || fromIndex < 0 || fromIndex > path.length) {
    throw new Error("Waypoint index is outside the path.");
  }

  for (let index = fromIndex; index < path.length; index += 1) {
    const point = path[index];
    if (!point) {
      throw new Error("Route waypoint invariant failed.");
    }
    if (!isWalkable(map, point)) {
      return true;
    }
  }

  return false;
}
