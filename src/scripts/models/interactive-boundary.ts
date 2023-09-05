import { CellProps } from "./cell.js";
import { InteractiveElement } from "../utils/interfaces.js";
import { DialogueController } from "../logic/dialogue-controller.js";
import { Boundary } from "./boundary.js";

export interface InteractiveBoundaryProps extends CellProps {
    dialogueController: DialogueController,
    interact: () => void;
}

export class InteractiveBoundary extends Boundary implements InteractiveElement {

    public readonly dialogueController!: DialogueController;
    public readonly interact: () => void;

    constructor({ position, frames, dialogueController, interact }: InteractiveBoundaryProps) {
        super({ position, frames });
        this.dialogueController = dialogueController;
        this.interact = interact;
    }

}
