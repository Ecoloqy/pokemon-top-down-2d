import { Character } from "./character.js";
import { CharacterFacing } from "../utils/types.js";
import { DialogueController } from "../logic/dialogue-controller.js";
import { SpriteProps } from "./sprite.js";
import { InteractiveElement } from "../utils/interfaces.js";

export interface NpcProps extends SpriteProps {
    name: string;
    dialogueController: DialogueController,
    interact: (same: Object) => void;
    facing?: { x: CharacterFacing, y: CharacterFacing };
}

export class Npc extends Character implements InteractiveElement {

    public readonly name!: string;
    public readonly dialogueController!: DialogueController;
    public readonly interact: (same: Object) => void;

    constructor({ name, src, position, velocity = 1, frames, collisionPadding, facing, dialogueController, interact }: NpcProps) {
        super({ src, position, velocity, frames, collisionPadding });
        this.name = name;
        this.dialogueController = dialogueController;
        this.interact = interact;
        if (facing) {
            this.setFacing({ facingX: facing.x, facingY: facing.y });
        }
    }

}
