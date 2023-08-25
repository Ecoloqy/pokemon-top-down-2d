import { spriteAnimationDirections, spriteAnimationFrames, spriteAnimationPadding, spriteAnimationSpeed } from "../../data/variables.js";
export class CharacterAnimation {
    constructor() {
        this.imageState = {
            frame: 0,
            direction: 0,
            elapsed: 0,
        };
        const animate = () => {
            window.requestAnimationFrame(animate);
        };
        animate();
    }
    getSpriteCoordinates(facingX, facingY, isMoving) {
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
        if (this.imageState.elapsed % spriteAnimationSpeed === 0) {
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
            return { spriteDrawX: 0, spriteDrawY: this.imageState.direction * spriteAnimationPadding };
        }
        return { spriteDrawX: this.imageState.frame * spriteAnimationPadding, spriteDrawY: this.imageState.direction * spriteAnimationPadding };
    }
}
