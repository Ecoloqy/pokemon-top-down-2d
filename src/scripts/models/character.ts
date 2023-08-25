import { Sprite, SpriteProps } from "./sprite.js";
import { CharacterAnimation } from "../utils/character-animation.js";
import { CharacterFacing } from "../utils/interfaces.js";
import { playerSpriteRenderPosition } from "../../data/variables.js";

export class Character extends Sprite {

    public isMoving: boolean = false;
    public isRunning: boolean = false;
    public moveElapsed: number = 0;

    private characterAnimation = new CharacterAnimation();
    private facingX: CharacterFacing = 0;
    private facingY: CharacterFacing = 0;

    constructor({ src, position, velocity = 1, frames, collisionPadding }: SpriteProps) {
        super({ src, position, velocity, frames, collisionPadding });
    }

    public drawImage(context: CanvasRenderingContext2D): void {
        const { spriteDrawX, spriteDrawY } = this.characterAnimation.getSpriteCoordinates(this.facingX, this.facingY, this.isMoving, this.isRunning);
        context.drawImage(
            this.image,
            spriteDrawX,
            spriteDrawY,
            this.image.width / this.frames.x,
            this.image.height / this.frames.y,
            this.position.x - playerSpriteRenderPosition.x,
            this.position.y - playerSpriteRenderPosition.y,
            this.image.width / this.frames.x,
            this.image.height / this.frames.y,
        );
    }

    setFacing(facing: { facingX: CharacterFacing, facingY: CharacterFacing }): void {
        this.facingX = facing.facingX;
        this.facingY = facing.facingY;
    }

}