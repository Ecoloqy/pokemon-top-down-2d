import { tileScale } from "../utils/tile-scale.js";
export class Cell {
    constructor({ position = { x: 0, y: 0 }, frames = { x: 1, y: 1 }, collisionPadding = { n: 0, s: 0, e: 0, w: 0 } }) {
        this.width = tileScale().width;
        this.height = tileScale().height;
        this.position = position;
        this.frames = frames;
        this.collisionPadding = collisionPadding;
    }
    transformPosition(movement) {
        const newXPos = this.position.x + movement.x;
        const newYPos = this.position.y + movement.y;
        this.position = { x: newXPos, y: newYPos };
    }
    getPosition() {
        return this.position;
    }
    checkCollidingWith(cell) {
        return this.getPosition().x + this.width + this.collisionPadding.e >= cell.getPosition().x - cell.collisionPadding.w &&
            this.getPosition().x - this.collisionPadding.w <= cell.getPosition().x + cell.collisionPadding.e + cell.width &&
            this.getPosition().y + this.height + this.collisionPadding.s >= cell.getPosition().y - cell.collisionPadding.n &&
            this.getPosition().y - this.collisionPadding.n <= cell.getPosition().y + cell.collisionPadding.s + cell.height;
    }
}
