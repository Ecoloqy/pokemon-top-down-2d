import { Cell } from "./cell.js";
export class Boundary extends Cell {
    constructor({ position, frames }) {
        super({ position, frames });
    }
    drawBoundary(context) {
        context.fillStyle = 'transparent';
        context.fillRect(this.position.x, this.position.y, this.width, this.height);
    }
}
