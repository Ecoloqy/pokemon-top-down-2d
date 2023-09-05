import { canvasHeight, canvasWidth, playerCollisionPadding, singleTileSize } from "./variables.js";
import { Character } from "../scripts/models/character.js";
import { Npc } from "../scripts/models/npc.js";
export const createPlayer = () => {
    return new Character({
        src: './assets/img/characters/player.png',
        position: { x: canvasWidth / 2 - singleTileSize / 4, y: canvasHeight / 2 - singleTileSize / 4 },
        frames: { x: 4, y: 4 },
        collisionPadding: playerCollisionPadding
    });
};
export const createBirdKeeperMale = (dialogueController, data) => {
    return new Npc({
        name: 'Bird Keeper Male',
        src: './assets/img/characters/bird_keeper_male.png',
        position: { x: data.position.x, y: data.position.y },
        frames: { x: 4, y: 4 },
        collisionPadding: playerCollisionPadding,
        interact: data.interact,
        facing: data.facing,
        dialogueController
    });
};
export const createBirdKeeperFemale = (dialogueController, data) => {
    return new Npc({
        name: 'Bird Keeper Female',
        src: './assets/img/characters/bird_keeper_female.png',
        position: { x: data.position.x, y: data.position.y },
        frames: { x: 4, y: 4 },
        collisionPadding: playerCollisionPadding,
        interact: data.interact,
        facing: data.facing,
        dialogueController
    });
};
