export type Grid = (X | _)[][];
export type Move = 'down' | 'right';
export type X = 'x';
export type _ = ' ';

const EMPTY_PATH: Move[] = [];

export function findPathRecursively(grid: Grid, r?: number, c?: number): Move[] | null {
  if (!grid.length) return null;

  r = r != null ? r : grid.length - 1;
  c = c != null ? c : grid[0].length - 1;

  const canGoUp = r > 0 && grid[r - 1][c] === ' ';
  const canGoLeft = c > 0 && grid[r][c - 1] === ' ';
  if (r === 0 && c === 0) {
    return grid[r][c] === 'x' ? null : EMPTY_PATH;
  }
  
  if (canGoUp) {
    const pathToUpper = findPathRecursively(grid, r - 1, c);
    if (pathToUpper) return [...pathToUpper, 'down'];
  }

  if (canGoLeft) {
    const pathToLeft = findPathRecursively(grid, r, c - 1);
    if (pathToLeft) return [...pathToLeft, 'right'];
  }

  return null;
}
