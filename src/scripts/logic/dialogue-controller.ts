import { dialogueField } from "../utils/selectors.js";
import { canvasHeight, canvasWidth } from "../../data/variables.js";
import { Character } from "../models/character.js";
import { Keys } from "./keys.js";
import { delayTimeout } from "../utils/delay-timeout.js";
import { createDialogueCursor, createDialogueInterface } from "../../data/dialogue-initializer.js";

export class DialogueController {

    public isDialogueDisplayed = false;
    public interfaceBackground = createDialogueInterface();
    public interfaceCursor = createDialogueCursor();

    private readonly player!: Character;
    private readonly keys!: Keys;

    private dialogueText: string = '';
    private dialogueCompleted: boolean = false;
    private typeWriterSpeed: number = 50;

    constructor(player: Character, keys: Keys) {
        this.player = player;
        this.keys = keys;
    }

    public async drawText(context: CanvasRenderingContext2D): Promise<void> {
        if (this.keys.delete.pressed) {
            this.typeWriterSpeed = 1;
        }

        if (this.isDialogueDisplayed) {
            this.interfaceBackground.drawImage(context, canvasWidth, canvasHeight - 400);
            if (this.dialogueCompleted && this.keys.delete.pressed) {
                await delayTimeout(500);
                this.setDialogueText('');
            }

            if (this.dialogueCompleted) {
                this.interfaceCursor.drawImage(context);
            }
        }
    }

    public async setDialogueText(text?: string): Promise<void> {
        this.dialogueCompleted = false;
        this.dialogueText = text ?? '';
        this.player.inInteraction = !!text;
        this.isDialogueDisplayed = !!text;
        await this.typewriterEffect(text);
    }

    private async typewriterEffect(textToType?: string): Promise<void> {
        if (!textToType) {
            dialogueField.innerHTML = '';
            this.dialogueCompleted = true;
            this.typeWriterSpeed = 50;
            return;
        }

        let t: number = 0;
        let charIndex: number = 0;

        while (charIndex < textToType.length) {
            t++;
            charIndex = Math.floor(t);
            await delayTimeout(this.typeWriterSpeed);

            dialogueField.innerHTML = textToType.slice(0, charIndex);

            if (charIndex >= textToType.length) {
                this.dialogueCompleted = true;
                this.typeWriterSpeed = 50;
            }
        }
    }

}
