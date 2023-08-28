import { Character } from "../models/character.js";
import { createBattleBackground } from "../../data/battle-initializer.js";

export class BattleInitiator {

    public battleBackground = createBattleBackground();
    public player: Character;
    public isBattleCompleted = false;
    public isBattleInitialized = false;

    private readonly gameBattleFrame: HTMLElement = document.getElementById('game-battle-frame');

    constructor(player: Character) {
        this.player = player;

        setTimeout(() => {
            this.renderEnterBattleAnimation();
        }, 1000);

        setTimeout(() => {
            this.isBattleInitialized = true;
            this.renderExitBattleAnimation();
        }, 3000);
    }

    private renderEnterBattleAnimation(): void {
        const newEnterBattleAnimation = document.createElement('div');
        newEnterBattleAnimation.id = 'enter-battle-animation';

        const firstBattleFrameChild = this.gameBattleFrame.firstChild;
        if (firstBattleFrameChild) {
            this.gameBattleFrame.removeChild(firstBattleFrameChild);
        }

        this.gameBattleFrame.appendChild(newEnterBattleAnimation);
    }

    private renderExitBattleAnimation(): void {
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
