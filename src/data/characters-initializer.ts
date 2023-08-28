import {
    canvasHeight,
    canvasWidth,
    playerCollisionPadding,
    singleTileSize
} from "./variables.js";
import { Character } from "../scripts/models/character.js";

export const createPlayer = (): Character => {
    return new Character({
        src: './assets/img/characters/player.png',
        position: { x: canvasWidth / 2 - singleTileSize / 4, y: canvasHeight / 2 - singleTileSize / 4 },
        frames: { x: 4, y: 4 },
        collisionPadding: playerCollisionPadding
    });
}
