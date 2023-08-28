import { Sprite } from "./sprite.js";
import { CharacterAnimation } from "../utils/character-animation.js";
import { playerSpriteRenderPosition, playerStartingPokemon } from "../../data/variables.js";
import { createPokemon } from "../../data/enemy-initializer.js";
export class Character extends Sprite {
    constructor({ src, position, velocity = 1, frames, collisionPadding }) {
        super({ src, position, velocity, frames, collisionPadding });
        this.pokemons = [createPokemon(playerStartingPokemon)];
        this.isMoving = false;
        this.isRunning = false;
        this.isInBattle = false;
        this.moveElapsed = 0;
        this.characterAnimation = new CharacterAnimation();
        this.facingX = 0;
        this.facingY = 0;
    }
    drawImage(context) {
        const { spriteDrawX, spriteDrawY } = this.characterAnimation.getSpriteCoordinates(this.facingX, this.facingY, this.isMoving, this.isRunning);
        context.drawImage(this.image, spriteDrawX, spriteDrawY, this.image.width / this.frames.x, this.image.height / this.frames.y, this.position.x - playerSpriteRenderPosition.x, this.position.y - playerSpriteRenderPosition.y, this.image.width / this.frames.x, this.image.height / this.frames.y);
    }
    setFacing(facing) {
        this.facingX = facing.facingX;
        this.facingY = facing.facingY;
    }
}
