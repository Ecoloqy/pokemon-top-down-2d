import { tileScale } from "../utils/tile-scale.js";

export interface CellProps {
    position: { x: number, y: number };
    frames?: { x: number, y: number };
    collisionPadding?: { n: number, s: number, e: number, w: number };
}

export class Cell {

    protected width: number = tileScale().width;
    protected height: number = tileScale().height;
    protected position!: { x: number, y: number };
    protected frames!: { x: number, y: number };
    protected collisionPadding!: { n: number, s: number, e: number, w: number };

    constructor({ position = { x: 0, y: 0 }, frames = { x: 1, y: 1 }, collisionPadding = { n: 0, s: 0, e: 0, w: 0 } }: CellProps) {
        this.position = position;
        this.frames = frames;
        this.collisionPadding = collisionPadding;
    }

    public transformPosition(movement: { x: number, y: number }): void {
        const newXPos = this.position.x + movement.x;
        const newYPos = this.position.y + movement.y;
        this.position = { x: newXPos, y: newYPos };
    }

    public getPosition(): Cell['position'] {
        return this.position;
    }

    public checkCollidingWith(cell: Cell): boolean {
        return this.getPosition().x + this.width + this.collisionPadding.e >= cell.getPosition().x - cell.collisionPadding.w &&
            this.getPosition().x - this.collisionPadding.w <= cell.getPosition().x + cell.collisionPadding.e + cell.width &&
            this.getPosition().y + this.height + this.collisionPadding.s >= cell.getPosition().y - cell.collisionPadding.n &&
            this.getPosition().y - this.collisionPadding.n <= cell.getPosition().y + cell.collisionPadding.s + cell.height
    }

}
