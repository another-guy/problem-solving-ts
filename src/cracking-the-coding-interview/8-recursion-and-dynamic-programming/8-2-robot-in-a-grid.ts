export type Grid = (X | _)[][];
export type Move = 'down' | 'right';
export type X = 'x';
export type _ = ' ';

export function findPathRecursively(grid: Grid, r?: number, c?: number): Move[] | null {
  if (!grid || !grid.length) return null;

  r = r != null ? r : grid.length - 1;
  c = c != null ? c : grid[0].length - 1;

  const canGoUp = r > 0 && grid[r - 1][c] === ' ';
  const canGoLeft = c > 0 && grid[r][c - 1] === ' ';
  if (r === 0 && c === 0) {
    return grid[r][c] === 'x' ? null : [];
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

function markNoPath(hintTable: string[][], rowIndex: number, columnIndex: number): void {
  if (!hintTable[rowIndex])
    hintTable[rowIndex] = [];
  hintTable[rowIndex][columnIndex] = '*';  
}

function lookUp(
  grid: Grid,
  hintTable: string[][],
  rowIndex: number,
  columnIndex: number,
): boolean {
  return rowIndex > 0 &&
    (hintTable[rowIndex - 1] || [])[columnIndex] !== '*' &&
    grid[rowIndex - 1][columnIndex] === ' ';
}

function lookLeft(
  grid: Grid,
  hintTable: string[][],
  rowIndex: number,
  columnIndex: number,
): boolean {
  return columnIndex > 0 &&
    (hintTable[rowIndex] || [])[columnIndex - 1] !== '*' &&
    grid[rowIndex][columnIndex - 1] === ' ';
}

export function findPath(grid: Grid): Move[] | null {
  if (!grid || !grid.length) return null;

  const hintTable: string[][] = [];
  const path: Move[] = [];
  const maxRowIndex = grid.length - 1;
  const maxColumnIndex = grid[0].length - 1;
  let rowIndex = maxRowIndex;
  let columnIndex = maxColumnIndex;
  while (true) {
    const canGoUp = lookUp(grid, hintTable, rowIndex, columnIndex);
    const canGoLeft = lookLeft(grid, hintTable, rowIndex, columnIndex);

    if (canGoLeft === false && canGoUp === false) {
      const upperLeftCorner = rowIndex === 0 && columnIndex === 0;
      const bottomRightCorner = rowIndex === maxRowIndex && columnIndex === maxColumnIndex;

      if (upperLeftCorner) {
        return grid[rowIndex][columnIndex] === 'x' ? null : path;
      } else if (bottomRightCorner) {
        return null;
      } else {
        markNoPath(hintTable, rowIndex, columnIndex);
        const lastMove = path.shift();
        if (lastMove === 'down') rowIndex++;
        else if (lastMove === 'right') columnIndex++;
        else throw new Error(`Unrecognized move ${lastMove}`);
        continue;
      }
    }

    if (canGoUp) {
      rowIndex--;
      path.unshift('down');
      continue;
    }

    if (canGoLeft) {
      columnIndex--;
      path.unshift('right');
      continue;
    }

    throw new Error(`This should never be reached canInspectLeft=${canGoLeft} canInspectUp=${canGoUp}`);
  }
}
