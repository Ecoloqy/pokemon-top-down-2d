export const mapWidth: number = 98;
export const mapHeight: number = 82;

export const canvasWidth: number = 960;
export const canvasHeight: number = 540;

export const mapScale: number = 3;
export const singleTileSize: number = 16;

export const backgroundOffsetX: number = -1776;
export const backgroundOffsetY: number = -1552;

export const playerMoveSpeedDelay = 16;
export const playerRunSpeedDelay = 8;
export const playerCollisionPadding: { n: number, s: number, e: number, w: number } = { n: -8, s: -8, e: -8, w: -8 };
export const playerSpritePosition: { x: number, y: number } = { x: 4, y: 8 };
export const playerSpriteRenderPosition: { x: number, y: number } = { x: 0, y: 12 };
export const spriteAnimationPadding: number = 64;
export const spriteAnimationFrames: number = 4;
export const spriteAnimationDirections: { left: number, right: number, top: number, down: number } = { down: 1, left: 0, right: 2, top: 3 };

export const availableMoveKeys: string[] = ['w', 'a', 's', 'd'];
export const keydownTransition: {
    w: { x: number, y: number, abs: number },
    a: { x: number, y: number, abs: number },
    s: { x: number, y: number, abs: number },
    d: { x: number, y: number, abs: number }
} = {
    w: { x: 0, y: 3, abs: 3 },
    a: { x: 3, y: 0, abs: 3 },
    s: { x: 0, y: -3, abs: 3 },
    d: { x: -3, y: 0, abs: 3 }
};
