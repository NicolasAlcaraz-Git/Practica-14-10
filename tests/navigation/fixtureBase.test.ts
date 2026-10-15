import { describe, expect, it } from "vitest";
import { createGridMap, isWalkable, type GridPoint } from "../../src/domain/model/grid";
import { findPathAStar, findPathBfs } from "../../src/domain/navigation/search";

const FREE_MAP = createGridMap(5, 3, []);
const START: GridPoint = { x: 0, y: 1 };
const GOAL: GridPoint = { x: 4, y: 1 };
const BARRIER_MAP = createGridMap(5, 3, [
  { x: 2, y: 0 },
  { x: 2, y: 1 },
  { x: 2, y: 2 },
]);

describe.each([
  ["BFS", findPathBfs, { expandedNodes: 12, maximumFrontier: 4 }],
  ["A*", findPathAStar, { expandedNodes: 5, maximumFrontier: 9 }],
] as const)("fixture BASE 5x3 — %s", (_name, findPath, expectedMetrics) => {
  it("BASE-AC2: free map returns a cardinal route of 4 steps and cost 4", () => {
    const result = findPath(FREE_MAP, START, GOAL);

    expect(result.status).toBe("success");
    expect(result.path[0]).toEqual(START);
    expect(result.path.at(-1)).toEqual(GOAL);
    expect(result.path).toHaveLength(5);
    expect(result.path.every((point) => isWalkable(FREE_MAP, point))).toBe(true);

    for (let index = 1; index < result.path.length; index += 1) {
      const previous = result.path[index - 1];
      const current = result.path[index];
      if (!previous || !current) {
        throw new Error("Path invariant failed.");
      }
      const cardinalDistance = Math.abs(current.x - previous.x) + Math.abs(current.y - previous.y);
      expect(cardinalDistance).toBe(1);
    }

    expect(result.totalCost).toBe(4);
    expect(result.path.length - 1).toBe(4);
    expect(result.expandedNodes).toBe(expectedMetrics.expandedNodes);
    expect(result.maximumFrontier).toBe(expectedMetrics.maximumFrontier);
  });

  it("BASE-AC3: start equals goal is success with cost 0", () => {
    const result = findPath(FREE_MAP, START, START);

    expect(result.status).toBe("success");
    expect(result.path).toEqual([START]);
    expect(result.totalCost).toBe(0);
  });

  it("BASE-AC3: full barrier column is unreachable while the goal stays free", () => {
    expect(isWalkable(BARRIER_MAP, GOAL)).toBe(true);

    const result = findPath(BARRIER_MAP, START, GOAL);

    expect(result.status).toBe("unreachable");
    expect(result.path).toEqual([]);
    expect(result.totalCost).toBeNull();
  });

  it("BASE-AC3: invalid start reports invalid-start in its own case", () => {
    const result = findPath(FREE_MAP, { x: -1, y: 1 }, GOAL);

    expect(result.status).toBe("invalid-start");
    expect(result.path).toEqual([]);
    expect(result.totalCost).toBeNull();
  });

  it("BASE-AC3: invalid goal reports invalid-goal in its own case", () => {
    const result = findPath(FREE_MAP, START, { x: 5, y: 1 });

    expect(result.status).toBe("invalid-goal");
    expect(result.path).toEqual([]);
    expect(result.totalCost).toBeNull();
  });
});

describe("fixture BASE comparison", () => {
  it("A* keeps optimal cost while expanding no more nodes than BFS", () => {
    const bfs = findPathBfs(FREE_MAP, START, GOAL);
    const astar = findPathAStar(FREE_MAP, START, GOAL);

    expect(astar.totalCost).toBe(bfs.totalCost);
    expect(astar.expandedNodes).toBeLessThanOrEqual(bfs.expandedNodes);
  });
});
