import { matrix, multiply } from "mathjs";
import alea from 'alea';
import { createNoise2D, type NoiseFunction2D } from 'simplex-noise';


export const ISOMETRIC_WEIGHTS = matrix([
    [0.5, 0.25],
    [-0.5, 0.25]
]);

// Coordinate x times the size of the block 18 * 4 = 72
// as it's scaled 4x
export const getCoordinate = (x: number, y: number) => matrix([
  [x * 72, y * 72]
]);

export type Block = {
  x: number,
  y: number,
  type: string,
}

export function screenToIsometric (x: number, y: number): number[] {
  const coordinate = getCoordinate(x,y);
  const [isometricCoordinate] = multiply(coordinate, ISOMETRIC_WEIGHTS).toArray();
  return isometricCoordinate as number[];
};

export function generateGrid<T extends Block = Block>(rows: number, cols: number, blockProvider: (x: number, y: number, type: string) => T): T[] {
  const grid: T[] = [];
  const noiseFn = getGridNoise('seed');

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      const type = getBlockType(noiseFn(i /50, j/50));
      grid.push(blockProvider(i,j, type));
    }
  }

  return grid;
};

export function getGridNoise(seed: string): NoiseFunction2D {
  const prng = alea(seed);
  const noise2D = createNoise2D(prng);
  return noise2D;
}

export function getBlockType(noiseValue: number): string {
  if (noiseValue > 0.3) return 'grass';
  if (noiseValue > -0.2) return 'field';
  return 'water';
}
