import { Cell, CellProps } from "./cell.js";

export interface SpriteProps extends CellProps {
    src: string;
    velocity?: number;
}

 export class Sprite extends Cell {

     protected readonly image = new Image();
     protected src!: string;
     protected velocity!: number;

     constructor({ src, position, velocity = 1, frames, collisionPadding }: SpriteProps) {
         super({ position, frames, collisionPadding });
         this.src = src;
         this.velocity = velocity;
         this.image.src = src;
     }

     public drawImage(context: CanvasRenderingContext2D): void {
         context.drawImage(this.image, this.position.x, this.position.y);
     }

}
