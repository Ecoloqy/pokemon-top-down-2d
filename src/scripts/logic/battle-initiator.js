import { createBattleBackground } from "../../data/battle-initializer.js";
export class BattleInitiator {
    constructor(player) {
        this.battleBackground = createBattleBackground();
        this.isBattleCompleted = false;
        this.isBattleInitialized = false;
        this.gameBattleFrame = document.getElementById('game-battle-frame');
        this.player = player;
        setTimeout(() => {
            this.renderEnterBattleAnimation();
        }, 1000);
        setTimeout(() => {
            this.isBattleInitialized = true;
            this.renderExitBattleAnimation();
        }, 3000);
    }
    renderEnterBattleAnimation() {
        const newEnterBattleAnimation = document.createElement('div');
        newEnterBattleAnimation.id = 'enter-battle-animation';
        const firstBattleFrameChild = this.gameBattleFrame.firstChild;
        if (firstBattleFrameChild) {
            this.gameBattleFrame.removeChild(firstBattleFrameChild);
        }
        this.gameBattleFrame.appendChild(newEnterBattleAnimation);
    }
    renderExitBattleAnimation() {
        const newExitBattleAnimation = document.createElement('div');
        newExitBattleAnimation.id = 'exit-battle-animation';
        const firstBattleFrameChild = this.gameBattleFrame.firstChild;
        if (firstBattleFrameChild) {
            this.gameBattleFrame.removeChild(firstBattleFrameChild);
        }
        this.gameBattleFrame.appendChild(newExitBattleAnimation);
        setTimeout(() => {
            this.gameBattleFrame.removeChild(newExitBattleAnimation);
        }, 2000);
    }
}
