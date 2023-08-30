import { gameBattleFrame } from "../utils/selectors.js";
export class BattleTransitionController {
    constructor(playerPokemon, enemyPokemon, battleDialogueController) {
        this.isBattleInitialized = false;
        this.playerPokemon = playerPokemon;
        this.enemyPokemon = enemyPokemon;
        this.battleDialogueController = battleDialogueController;
        setTimeout(() => {
            this.renderEnterBattleAnimation();
        }, 1000);
        setTimeout(() => {
            this.renderExitBattleAnimation();
            this.isBattleInitialized = true;
        }, 3000);
    }
    renderEnterBattleAnimation() {
        const newEnterBattleAnimation = document.createElement('div');
        newEnterBattleAnimation.id = 'enter-battle-animation';
        const firstBattleFrameChild = gameBattleFrame.firstChild;
        if (firstBattleFrameChild) {
            gameBattleFrame.removeChild(firstBattleFrameChild);
        }
        gameBattleFrame.appendChild(newEnterBattleAnimation);
    }
    renderExitBattleAnimation() {
        var _a, _b, _c, _d;
        const newExitBattleAnimation = document.createElement('div');
        newExitBattleAnimation.id = 'exit-battle-animation';
        const firstBattleFrameChild = gameBattleFrame.firstChild;
        if (firstBattleFrameChild) {
            gameBattleFrame.removeChild(firstBattleFrameChild);
        }
        gameBattleFrame.appendChild(newExitBattleAnimation);
        this.battleDialogueController.setBasePokemonDetails(this.playerPokemon.name, this.enemyPokemon.name, this.playerPokemon.lvl + '', this.enemyPokemon.lvl + '');
        this.battleDialogueController.displayPokemonAttacks((_a = this.playerPokemon.attacks[0]) === null || _a === void 0 ? void 0 : _a.name, (_b = this.playerPokemon.attacks[1]) === null || _b === void 0 ? void 0 : _b.name, (_c = this.playerPokemon.attacks[2]) === null || _c === void 0 ? void 0 : _c.name, (_d = this.playerPokemon.attacks[3]) === null || _d === void 0 ? void 0 : _d.name);
        setTimeout(() => {
            gameBattleFrame.removeChild(newExitBattleAnimation);
        }, 2000);
    }
}
