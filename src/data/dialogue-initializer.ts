import { Sprite } from "../scripts/models/sprite.js";

export const createDialogueInterface = (): Sprite => {
    return new Sprite({
        src: './assets/img/dialogue/interface.png',
        position: { x: 0, y: 400 }
    });
}

export const createDialogueCursor = (): Sprite => {
    return new Sprite({
        src: './assets/img/dialogue/cursor.png',
        position: { x: 880, y: 450 }
    });
}
