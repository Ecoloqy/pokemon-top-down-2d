import { Boundary } from "./boundary.js";
export class InteractiveBoundary extends Boundary {
    constructor({ position, frames, dialogueController, interact }) {
        super({ position, frames });
        this.dialogueController = dialogueController;
        this.interact = interact;
    }
}
