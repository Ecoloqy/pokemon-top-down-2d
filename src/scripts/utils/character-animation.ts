import {
    playerMoveSpeedDelay,
    playerRunSpeedDelay,
    playerSpritePosition,
    spriteAnimationDirections,
    spriteAnimationFrames,
    spriteAnimationPadding
} from "../../data/variables.js";
import { CharacterFacing } from "./interfaces.js";

export interface CharacterAnimationState {
    frame: number;
    direction: number;
    elapsed: number;
}

export class CharacterAnimation {

    private imageState: CharacterAnimationState = {
        frame: 0,
        direction: 0,
        elapsed: 0,
    }

    constructor() {
        const animate = () => {
            window.requestAnimationFrame(animate);
        }

        animate();
    }

    getSpriteCoordinates(facingX: CharacterFacing, facingY: CharacterFacing, isMoving: boolean, isRunning: boolean): { spriteDrawX: number, spriteDrawY: number } {
        const moveDelay = isRunning ? playerRunSpeedDelay : playerMoveSpeedDelay;

        if (facingX === -1 && facingY === 0) {
            this.imageState.direction = spriteAnimationDirections.left;
        }
        if (facingX === 1 && facingY === 0) {
            this.imageState.direction = spriteAnimationDirections.right;
        }
        if (facingX === 0 && facingY === -1) {
            this.imageState.direction = spriteAnimationDirections.down;
        }
        if (facingX === 0 && facingY === 1) {
            this.imageState.direction = spriteAnimationDirections.top;
        }

        if (spriteAnimationFrames > 1) {
            this.imageState.elapsed++;
        }

        if (this.imageState.elapsed % moveDelay === 0) {
            if (this.imageState.frame < spriteAnimationFrames) {
                this.imageState.frame++;
                if (this.imageState.frame === spriteAnimationFrames) {
                    this.imageState.frame = 0;
                }
            }
        }

        if (!isMoving) {
            this.imageState.frame = 0;
            this.imageState.elapsed = 0;
            return { spriteDrawX: playerSpritePosition.x, spriteDrawY: this.imageState.direction * spriteAnimationPadding + playerSpritePosition.y };
        }

        return { spriteDrawX: this.imageState.frame * spriteAnimationPadding + playerSpritePosition.x, spriteDrawY: this.imageState.direction * spriteAnimationPadding + playerSpritePosition.y };
    }

}
