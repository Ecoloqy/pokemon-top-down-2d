import { Sprite } from "../scripts/models/sprite.js";
import { backgroundOffsetX, backgroundOffsetY } from "./variables.js";

export const createBackground = (): Sprite => {
    return new Sprite({
        src: './assets/img/map/map.png',
        position: { x: backgroundOffsetX, y: backgroundOffsetY }
    });
}

export const createForeground = (): Sprite => {
    return new Sprite({
        src: './assets/img/map/foreground.png',
        position: { x: backgroundOffsetX, y: backgroundOffsetY }
    });
}
