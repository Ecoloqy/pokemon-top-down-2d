import { gameBattleFrame } from "../utils/selectors.js";
import { Pokemon } from "../models/pokemon.js";
import { BattleDialogueController } from "./battle-dialogue-controller.js";

export class BattleTransitionController {

    public isBattleInitialized = false;

    private readonly playerPokemon!: Pokemon;
    private readonly enemyPokemon!: Pokemon;
    private readonly battleDialogueController!: BattleDialogueController;

    constructor(playerPokemon: Pokemon, enemyPokemon: Pokemon, battleDialogueController: BattleDialogueController) {
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

    public renderEnterBattleAnimation(): void {
        const newEnterBattleAnimation = document.createElement('div');
        newEnterBattleAnimation.id = 'enter-battle-animation';

        const firstBattleFrameChild = gameBattleFrame.firstChild;
        if (firstBattleFrameChild) {
            gameBattleFrame.removeChild(firstBattleFrameChild);
        }

        gameBattleFrame.appendChild(newEnterBattleAnimation);
    }

    public renderExitBattleAnimation(): void {
        const newExitBattleAnimation = document.createElement('div');
        newExitBattleAnimation.id = 'exit-battle-animation';

        const firstBattleFrameChild = gameBattleFrame.firstChild;
        if (firstBattleFrameChild) {
            gameBattleFrame.removeChild(firstBattleFrameChild);
        }

        gameBattleFrame.appendChild(newExitBattleAnimation);
        this.battleDialogueController.setBasePokemonDetails(this.playerPokemon.name, this.enemyPokemon.name, this.playerPokemon.lvl + '', this.enemyPokemon.lvl + '');
        this.battleDialogueController.displayPokemonAttacks(this.playerPokemon.attacks[0]?.name, this.playerPokemon.attacks[1]?.name, this.playerPokemon.attacks[2]?.name, this.playerPokemon.attacks[3]?.name);

        setTimeout(() => {
            gameBattleFrame.removeChild(newExitBattleAnimation);
        }, 2000);
    }

}
