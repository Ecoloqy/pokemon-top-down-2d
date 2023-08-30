import { Sprite } from "../scripts/models/sprite.js";
import { backgroundOffsetX, backgroundOffsetY } from "./variables.js";
export const createBackground = (mapName) => {
    return new Sprite({
        src: `./assets/img/map/${mapName}.png`,
        position: { x: backgroundOffsetX, y: backgroundOffsetY }
    });
};
export const createForeground = (mapName) => {
    return new Sprite({
        src: `./assets/img/map/${mapName}_foreground.png`,
        position: { x: backgroundOffsetX, y: backgroundOffsetY }
    });
};
