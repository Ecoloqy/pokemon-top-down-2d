export const mapWidth: number = 98;
export const mapHeight: number = 82;

export const canvasWidth: number = 960;
export const canvasHeight: number = 540;

export const mapScale: number = 3;
export const singleTileWidth: number = 16;
export const singleTileHeight: number = 16;

export const backgroundOffsetX: number = -1776;
export const backgroundOffsetY: number = -1552;

export const playerCollisionPadding: { n: number, s: number, e: number, w: number } = { n: -32, s: 24, e: 0, w: 0 };
export const spriteAnimationSpeed: number = 16;
export const spriteAnimationPadding: number = 64;
export const spriteAnimationFrames: number = 4;
export const spriteAnimationDirections: { left: number, right: number, top: number, down: number } = { down: 1, left: 0, right: 2, top: 3 };

export const availableKeys: string[] = ['w', 'a', 's', 'd'];
export const keydownTransition: { w: { x: number, y: number }, a: { x: number, y: number }, s: { x: number, y: number }, d: { x: number, y: number } } = { w: { x: 0, y: 3 }, a: { x: 3, y: 0 }, s: { x: 0, y: -3 }, d: { x: -3, y: 0 } };
