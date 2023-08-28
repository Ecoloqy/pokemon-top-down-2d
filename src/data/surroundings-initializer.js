import { Sprite } from "../scripts/models/sprite.js";
import { backgroundOffsetX, backgroundOffsetY } from "./variables.js";
export const createBackground = () => {
    return new Sprite({
        src: './assets/img/map/map.png',
        position: { x: backgroundOffsetX, y: backgroundOffsetY }
    });
};
export const createForeground = () => {
    return new Sprite({
        src: './assets/img/map/foreground.png',
        position: { x: backgroundOffsetX, y: backgroundOffsetY }
    });
};
