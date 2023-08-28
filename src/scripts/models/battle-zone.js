import { Cell } from "./cell.js";
export class BattleZone extends Cell {
    constructor({ position, frames }) {
        super({ position, frames });
    }
    drawCell(context) {
        context.fillStyle = 'transparent';
        context.fillRect(this.position.x, this.position.y, this.width, this.height);
    }
}
