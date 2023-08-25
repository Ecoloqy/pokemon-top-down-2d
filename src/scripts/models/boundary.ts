import { Cell, CellProps } from "./cell.js";

export class Boundary extends Cell {

    constructor({ position, frames }: CellProps) {
        super({ position, frames });
    }

    drawBoundary(context: CanvasRenderingContext2D): void {
        context.fillStyle = 'transparent';
        context.fillRect(this.position.x, this.position.y, this.width, this.height);
    }
}
