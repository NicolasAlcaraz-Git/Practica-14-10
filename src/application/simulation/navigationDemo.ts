import type { GridMap, GridPoint } from "../../domain/model/grid";
import {
  findPathAStar,
  findPathBfs,
  type SearchAlgorithm,
  type SearchResult,
} from "../../domain/navigation/search";
import { remainingRouteAffected } from "../../domain/navigation/routeInvalidation";

export function calculateRoute(
  map: GridMap,
  start: GridPoint,
  goal: GridPoint,
  algorithm: SearchAlgorithm,
): SearchResult {
  return algorithm === "astar"
    ? findPathAStar(map, start, goal)
    : findPathBfs(map, start, goal);
}

export type NavigationSearch = (
  map: GridMap,
  start: GridPoint,
  goal: GridPoint,
  algorithm: SearchAlgorithm,
) => SearchResult;

export interface NavigationSessionState {
  readonly map: GridMap;
  readonly algorithm: SearchAlgorithm;
  readonly goal: GridPoint;
  readonly currentCell: GridPoint;
  readonly nextWaypoint: number;
  readonly route: SearchResult;
}

export function initialNavigationState(
  map: GridMap,
  start: GridPoint,
  goal: GridPoint,
  algorithm: SearchAlgorithm,
  search: NavigationSearch = calculateRoute,
): NavigationSessionState {
  return {
    map,
    algorithm,
    goal,
    currentCell: start,
    nextWaypoint: 0,
    route: search(map, start, goal, algorithm),
  };
}

export function updateNavigationSession(
  state: NavigationSessionState,
): NavigationSessionState {
  return state;
}

export function advanceToCell(
  state: NavigationSessionState,
  cell: GridPoint,
  nextWaypoint: number,
): NavigationSessionState {
  return { ...state, currentCell: cell, nextWaypoint };
}

export function notifyMapChanged(
  state: NavigationSessionState,
  map: GridMap,
  search: NavigationSearch = calculateRoute,
): NavigationSessionState {
  const requiresRecalculation = state.route.status !== "success"
    || remainingRouteAffected(map, state.route.path, state.nextWaypoint);

  if (!requiresRecalculation) {
    return { ...state, map };
  }

  return {
    ...state,
    map,
    nextWaypoint: 0,
    route: search(map, state.currentCell, state.goal, state.algorithm),
  };
}
