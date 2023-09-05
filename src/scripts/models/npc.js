import { Character } from "./character.js";
export class Npc extends Character {
    constructor({ name, src, position, velocity = 1, frames, collisionPadding, facing, dialogueController, interact }) {
        super({ src, position, velocity, frames, collisionPadding });
        this.name = name;
        this.dialogueController = dialogueController;
        this.interact = interact;
        if (facing) {
            this.setFacing({ facingX: facing.x, facingY: facing.y });
        }
    }
}
