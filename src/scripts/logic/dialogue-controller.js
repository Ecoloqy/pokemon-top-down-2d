var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { dialogueField } from "../utils/selectors.js";
import { canvasHeight, canvasWidth } from "../../data/variables.js";
import { delayTimeout } from "../utils/delay-timeout.js";
import { createDialogueCursor, createDialogueInterface } from "../../data/dialogue-initializer.js";
export class DialogueController {
    constructor(player, keys) {
        this.isDialogueDisplayed = false;
        this.interfaceBackground = createDialogueInterface();
        this.interfaceCursor = createDialogueCursor();
        this.dialogueText = '';
        this.dialogueCompleted = false;
        this.typeWriterSpeed = 50;
        this.player = player;
        this.keys = keys;
    }
    drawText(context) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.keys.delete.pressed) {
                this.typeWriterSpeed = 1;
            }
            if (this.isDialogueDisplayed) {
                this.interfaceBackground.drawImage(context, canvasWidth, canvasHeight - 400);
                if (this.dialogueCompleted && this.keys.delete.pressed) {
                    yield delayTimeout(500);
                    this.setDialogueText('');
                }
                if (this.dialogueCompleted) {
                    this.interfaceCursor.drawImage(context);
                }
            }
        });
    }
    setDialogueText(text) {
        return __awaiter(this, void 0, void 0, function* () {
            this.dialogueCompleted = false;
            this.dialogueText = text !== null && text !== void 0 ? text : '';
            this.player.inInteraction = !!text;
            this.isDialogueDisplayed = !!text;
            yield this.typewriterEffect(text);
        });
    }
    typewriterEffect(textToType) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!textToType) {
                dialogueField.textContent = '';
                this.dialogueCompleted = true;
                this.typeWriterSpeed = 50;
                return;
            }
            let t = 0;
            let charIndex = 0;
            while (charIndex < textToType.length) {
                t++;
                charIndex = Math.floor(t);
                yield delayTimeout(this.typeWriterSpeed);
                dialogueField.textContent = textToType.slice(0, charIndex);
                if (charIndex >= textToType.length) {
                    this.dialogueCompleted = true;
                    this.typeWriterSpeed = 50;
                }
            }
        });
    }
}
