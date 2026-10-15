import { describe, expect, it } from "vitest";
import { calculateRoute } from "../../src/application/simulation/navigationDemo";
import { createGridMap, type GridPoint } from "../../src/domain/model/grid";
import { remainingRouteAffected } from "../../src/domain/navigation/routeInvalidation";

const START: GridPoint = { x: 0, y: 1 };
const GOAL: GridPoint = { x: 4, y: 1 };
const DIRECT_PATH: readonly GridPoint[] = [
  { x: 0, y: 1 },
  { x: 1, y: 1 },
  { x: 2, y: 1 },
  { x: 3, y: 1 },
  { x: 4, y: 1 },
];
const FREE_MAP = createGridMap(5, 3, []);
const BLOCKED_CENTER = createGridMap(5, 3, [{ x: 2, y: 1 }]);
const BARRIER_MAP = createGridMap(5, 3, [
  { x: 2, y: 0 },
  { x: 2, y: 1 },
  { x: 2, y: 2 },
]);

describe("remainingRouteAffected", () => {
  it("keeps the route when no cell of the remainder changed", () => {
    expect(remainingRouteAffected(FREE_MAP, DIRECT_PATH, 1)).toBe(false);
  });

  it("detects a blocked cell inside the remainder of the route", () => {
    expect(remainingRouteAffected(BLOCKED_CENTER, DIRECT_PATH, 1)).toBe(true);
  });

  it("ignores cells already consumed before the current index", () => {
    expect(remainingRouteAffected(BLOCKED_CENTER, DIRECT_PATH, 3)).toBe(false);
  });

  it("treats an empty or completed route as unaffected", () => {
    expect(remainingRouteAffected(BLOCKED_CENTER, [], 0)).toBe(false);
    expect(remainingRouteAffected(BLOCKED_CENTER, DIRECT_PATH, DIRECT_PATH.length)).toBe(false);
  });

  it("rejects a negative or fractional index", () => {
    expect(() => remainingRouteAffected(FREE_MAP, DIRECT_PATH, -1)).toThrow(
      "Waypoint index is outside the path.",
    );
    expect(() => remainingRouteAffected(FREE_MAP, DIRECT_PATH, 0.5)).toThrow(
      "Waypoint index is outside the path.",
    );
  });
});

describe("recalculation over the BASE fixture (C-AC1)", () => {
  it("replaces an affected route with a 6-step detour that avoids the blocked cell", () => {
    const affected = remainingRouteAffected(BLOCKED_CENTER, DIRECT_PATH, 1);
    expect(affected).toBe(true);

    const route = calculateRoute(BLOCKED_CENTER, START, GOAL, "astar");

    expect(route.status).toBe("success");
    expect(route.path).toHaveLength(7);
    expect(route.totalCost).toBe(6);
    expect(route.path.some((point) => point.x === 2 && point.y === 1)).toBe(false);
  });

  it("reports unreachable when the whole column blocks the way", () => {
    const route = calculateRoute(BARRIER_MAP, START, GOAL, "astar");

    expect(route.status).toBe("unreachable");
    expect(route.path).toEqual([]);
    expect(route.totalCost).toBeNull();
  });

  it("recovers the unitary minimum after the barrier is freed", () => {
    const route = calculateRoute(FREE_MAP, START, GOAL, "astar");

    expect(route.status).toBe("success");
    expect(route.path).toHaveLength(5);
    expect(route.totalCost).toBe(4);
  });
});
