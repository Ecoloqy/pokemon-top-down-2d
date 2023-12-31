import { Sprite, SpriteProps } from "./sprite.js";
import { CharacterAnimation } from "../utils/character-animation.js";
import { CharacterFacing } from "../utils/types.js";
import { playerSpriteRenderPosition, playerStartingPokemon } from "../../data/variables.js";
import { Pokemon } from "./pokemon.js";
import { createPokemon } from "../../data/enemy-initializer.js";
import { InteractiveElement } from "../utils/interfaces.js";

export class Character extends Sprite {

    public readonly pokemons: Pokemon[] = [createPokemon(playerStartingPokemon)];

    public isMoving: boolean = false;
    public isRunning: boolean = false;
    public inInteraction: boolean = false;
    public isInteractionAvailable: boolean = false;
    public nextInteractiveElement: InteractiveElement | null = null;

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

    public getFacing(): { facingX: CharacterFacing, facingY: CharacterFacing } {
        return { facingX: this.facingX, facingY: this.facingY };
    }

    public setFacing(facing: { facingX: CharacterFacing, facingY: CharacterFacing }): void {
        this.facingX = facing.facingX;
        this.facingY = facing.facingY;
    }

    public getOppositeFacing(): { facingX: CharacterFacing, facingY: CharacterFacing } {
        const facingX = this.facingX === 0 ? 0 : this.facingX === -1 ? 1 : -1;
        const facingY = this.facingY === 0 ? 0 : this.facingY === -1 ? 1 : -1;
        return { facingX, facingY };
    }

}
