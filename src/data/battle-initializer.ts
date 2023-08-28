import { Sprite } from "../scripts/models/sprite.js";

export const createBattleBackground = (): Sprite => {
    return new Sprite({
        src: './assets/img/battle/background.png',
        position: { x: 0, y: 0 }
    });
}

export const createBattleInterface = (): Sprite => {
    return new Sprite({
        src: './assets/img/battle/interface.png',
        position: { x: 0, y: 400 }
    });
}

export const createBattleAttackSelectIndicator = (index: 0 | 1 | 2 | 3): Sprite => {
    const position = { x: 0, y: 0 };
    if (index === 0) {
        position.x = 20;
        position.y = 0;
    } else if (index === 1) {
        position.x = 420;
        position.y = 0;
    } else if (index === 2) {
        position.x = 20;
        position.y = 50;
    } else {
        position.x = 420;
        position.y = 50;
    }

    return new Sprite({
        src: './assets/img/battle/cursor.png',
        position: { x: position.x, y: 420 + position.y }
    });
}

export const createPlayerBattleBlock = (): Sprite => {
    return new Sprite({
        src: './assets/img/battle/health-block.png',
        position: { x: 520, y: 272 }
    });
}

export const createEnemyBattleBlock = (): Sprite => {
    return new Sprite({
        src: './assets/img/battle/health-block.png',
        position: { x: 0, y: 0 }
    });
}

export const createPlayerBattleBar = (): Sprite => {
    return new Sprite({
        src: './assets/img/battle/health-bar.png',
        position: { x: 520, y: 332 }
    });
}

export const createEnemyBattleBar = (): Sprite => {
    return new Sprite({
        src: './assets/img/battle/health-bar.png',
        position: { x: 0, y: 60 }
    });
}

export const createPlayerBattleBarPoint = (i: number = 0): Sprite => {
    return new Sprite({
        src: './assets/img/battle/health-point.png',
        position: { x: 615 + i, y: 345 }
    });
}

export const createEnemyBattleBarPoint = (i: number = 0): Sprite => {
    return new Sprite({
        src: './assets/img/battle/health-point.png',
        position: { x: 95 + i, y: 75 }
    });
}
