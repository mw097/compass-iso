import { matrix, multiply } from "mathjs";

export const ISOMETRIC_WEIGHTS = matrix([
    [0.5, 0.25],
    [-0.5, 0.25]
]);

// Coordinate x times the size of the block 18 * 4 = 72
// as it's scaled 4x
export const getCoordinate = ({x, y}: Block) => matrix([
  [x * 72, y * 72]
]);

export type Block = {
  x: number,
  y: number
}

export function screenToIsometric (block: Block): number[] {
  const coordinate = getCoordinate(block);
  const [isometricCoordinate] = multiply(coordinate, ISOMETRIC_WEIGHTS).toArray();
  return isometricCoordinate as number[];
};

export function generateGrid<T extends Block = Block>(rows: number, cols: number, blockProvider: (x: number, y: number) => T): T[] {
  const grid: T[] = [];

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      grid.push(blockProvider(i,j));
    }
  }

  return grid;
};