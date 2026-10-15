import { describe, expect, it } from "vitest";
import {
  advanceToCell,
  calculateRoute,
  initialNavigationState,
  notifyMapChanged,
  updateNavigationSession,
  type NavigationSearch,
} from "../../src/application/simulation/navigationDemo";
import { createGridMap, type GridPoint } from "../../src/domain/model/grid";
import { advanceAlongPath } from "../../src/domain/navigation/pathFollower";

const START: GridPoint = { x: 0, y: 1 };
const GOAL: GridPoint = { x: 4, y: 1 };
const FREE_MAP = createGridMap(5, 3, []);
const BLOCKED_CENTER = createGridMap(5, 3, [{ x: 2, y: 1 }]);
const BARRIER_MAP = createGridMap(5, 3, [
  { x: 2, y: 0 },
  { x: 2, y: 1 },
  { x: 2, y: 2 },
]);

function countingSearch(): { search: NavigationSearch; count: () => number } {
  let searches = 0;
  return {
    search: (map, start, goal, algorithm) => {
      searches += 1;
      return calculateRoute(map, start, goal, algorithm);
    },
    count: () => searches,
  };
}

describe("navigation session (C-AC1: invalidation and detour)", () => {
  it("replaces the affected route before the next advance and avoids the blocked cell", () => {
    const counter = countingSearch();
    let state = initialNavigationState(FREE_MAP, START, GOAL, "astar", counter.search);
    expect(state.route.totalCost).toBe(4);
    expect(counter.count()).toBe(1);

    state = notifyMapChanged(state, BLOCKED_CENTER, counter.search);
    expect(counter.count()).toBe(2);
    expect(state.route.status).toBe("success");
    expect(state.route.totalCost).toBe(6);
    expect(state.route.path).toHaveLength(7);
    expect(state.route.path.some((point) => point.x === 2 && point.y === 1)).toBe(false);
    expect(state.nextWaypoint).toBe(0);

    const movement = advanceAlongPath(START, state.route.path, state.nextWaypoint, 100);
    expect(movement.completed).toBe(true);
    expect(movement.position).toEqual(GOAL);
  });
});

describe("navigation session (C-AC2: barrier and silent updates)", () => {
  it("exposes unreachable, cancels the advance and ignores ten silent updates", () => {
    const counter = countingSearch();
    let state = initialNavigationState(FREE_MAP, START, GOAL, "astar", counter.search);

    state = notifyMapChanged(state, BARRIER_MAP, counter.search);
    expect(counter.count()).toBe(2);
    expect(state.route.status).toBe("unreachable");
    expect(state.route.path).toEqual([]);
    expect(state.route.totalCost).toBeNull();

    for (let frame = 0; frame < 10; frame += 1) {
      state = updateNavigationSession(state);
    }
    expect(counter.count()).toBe(2);

    const movement = advanceAlongPath(START, state.route.path, state.nextWaypoint, 100);
    expect(movement.completed).toBe(true);
    expect(movement.position).toEqual(START);
    expect(movement.direction).toBeNull();
  });

  it("does not repeat a search when the notified map keeps the route valid", () => {
    const counter = countingSearch();
    let state = initialNavigationState(FREE_MAP, START, GOAL, "astar", counter.search);

    state = notifyMapChanged(state, FREE_MAP, counter.search);
    expect(counter.count()).toBe(1);
    expect(state.route.status).toBe("success");
    expect(state.map).toBe(FREE_MAP);
  });
});

describe("navigation session (C-AC3: recovery through the consumer)", () => {
  it("recovers the unitary route when the barrier is freed and the change is notified", () => {
    const counter = countingSearch();
    let state = initialNavigationState(FREE_MAP, START, GOAL, "astar", counter.search);
    state = notifyMapChanged(state, BARRIER_MAP, counter.search);
    expect(state.route.status).toBe("unreachable");

    state = notifyMapChanged(state, FREE_MAP, counter.search);
    expect(counter.count()).toBe(3);
    expect(state.route.status).toBe("success");
    expect(state.route.totalCost).toBe(4);
    expect(state.route.path).toHaveLength(5);
  });

  it("recalculates from the current cell after the guard has advanced", () => {
    const counter = countingSearch();
    let state = initialNavigationState(FREE_MAP, START, GOAL, "astar", counter.search);
    state = advanceToCell(state, { x: 1, y: 1 }, 2);

    state = notifyMapChanged(state, BLOCKED_CENTER, counter.search);
    expect(state.route.status).toBe("success");
    expect(state.route.path[0]).toEqual({ x: 1, y: 1 });
    expect(state.route.path.some((point) => point.x === 2 && point.y === 1)).toBe(false);
  });
});
