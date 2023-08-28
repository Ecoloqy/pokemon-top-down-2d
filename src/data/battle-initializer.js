import { Sprite } from "../scripts/models/sprite.js";
export const createBattleBackground = () => {
    return new Sprite({
        src: './assets/img/battle/background.png',
        position: { x: 0, y: 0 }
    });
};
