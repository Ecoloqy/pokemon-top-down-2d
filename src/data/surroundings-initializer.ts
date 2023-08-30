import { Sprite } from "../scripts/models/sprite.js";
import { backgroundOffsetX, backgroundOffsetY } from "./variables.js";
import { MapName } from "../scripts/utils/types.js";

export const createBackground = (mapName: MapName): Sprite => {
    return new Sprite({
        src: `./assets/img/map/${mapName}.png`,
        position: { x: backgroundOffsetX, y: backgroundOffsetY }
    });
}

export const createForeground = (mapName: MapName): Sprite => {
    return new Sprite({
        src: `./assets/img/map/${mapName}_foreground.png`,
        position: { x: backgroundOffsetX, y: backgroundOffsetY }
    });
}
