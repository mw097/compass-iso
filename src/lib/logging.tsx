import { getPositionalIdKey } from "./isometric";

export const logElementPosition = (x: number, y: number, description: string) => console.log(`[${description} position]: ${getPositionalIdKey(x,y)}`);
