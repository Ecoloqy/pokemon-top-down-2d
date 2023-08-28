import { Cell } from "./cell.js";
export class Sprite extends Cell {
    constructor({ src, position, velocity = 1, frames, collisionPadding }) {
        super({ position, frames, collisionPadding });
        this.image = new Image();
        this.src = src;
        this.velocity = velocity;
        this.image.src = src;
    }
    drawImage(context, width, height) {
        if (!!width && !!height) {
            context.drawImage(this.image, this.position.x, this.position.y, width, height);
        }
        else {
            context.drawImage(this.image, this.position.x, this.position.y);
        }
    }
}
