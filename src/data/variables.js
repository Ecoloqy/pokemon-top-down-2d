export const mapWidth = 98;
export const mapHeight = 82;
export const canvasWidth = 960;
export const canvasHeight = 540;
export const mapScale = 3;
export const singleTileSize = 16;
export const backgroundOffsetX = -1776;
export const backgroundOffsetY = -1552;
export const playerMoveSpeedDelay = 16;
export const playerRunSpeedDelay = 8;
export const playerCollisionPadding = { n: -8, s: -8, e: -8, w: -8 };
export const playerSpritePosition = { x: 4, y: 8 };
export const playerSpriteRenderPosition = { x: 0, y: 12 };
export const spriteAnimationPadding = 64;
export const spriteAnimationFrames = 4;
export const spriteAnimationDirections = { down: 1, left: 0, right: 2, top: 3 };
export const availableMoveKeys = ['w', 'a', 's', 'd'];
export const keydownTransition = {
    w: { x: 0, y: 3, abs: 3 },
    a: { x: 3, y: 0, abs: 3 },
    s: { x: 0, y: -3, abs: 3 },
    d: { x: -3, y: 0, abs: 3 }
};
