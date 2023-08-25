import { Sprite } from "./sprite.js";
import { CharacterAnimation } from "../utils/character-animation.js";
export class Character extends Sprite {
    constructor({ src, position, velocity = 1, frames, collisionPadding }) {
        super({ src, position, velocity, frames, collisionPadding });
        this.characterAnimation = new CharacterAnimation();
        this.facingX = 0;
        this.facingY = 0;
        this.isMoving = false;
    }
    drawImage(context) {
        const { spriteDrawX, spriteDrawY } = this.characterAnimation.getSpriteCoordinates(this.facingX, this.facingY, this.isMoving);
        context.drawImage(this.image, spriteDrawX, spriteDrawY, this.image.width / this.frames.x, this.image.height / this.frames.y, this.position.x, this.position.y, this.image.width / this.frames.x, this.image.height / this.frames.y);
    }
    setFacing(facing) {
        this.facingX = facing.facingX;
        this.facingY = facing.facingY;
    }
    setIsMoving(isMoving) {
        this.isMoving = isMoving;
    }
}
