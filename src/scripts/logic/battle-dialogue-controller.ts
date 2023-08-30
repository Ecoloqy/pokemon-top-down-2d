import {
    attack1Field,
    attack2Field,
    attack3Field,
    attack4Field,
    enemyPokeLvl,
    enemyPokeName,
    playerPokeLvl,
    playerPokeName
} from "../utils/selectors.js";

export class BattleDialogueController {

    public setBasePokemonDetails(playerPokemonName?: string, enemyPokemonName?: string, playerPokemonLvl?: string, enemyPokemonLvl?: string): void {
        playerPokeName.textContent = playerPokemonName ?? '';
        enemyPokeName.textContent = enemyPokemonName ?? '';
        playerPokeLvl.textContent = playerPokemonLvl ?? '';
        enemyPokeLvl.textContent = enemyPokemonLvl ?? '';
    }

    public displayPokemonAttacks(text1?: string, text2?: string, text3?: string, text4?: string): void {
        attack1Field.textContent = text1 ?? '';
        attack2Field.textContent = text2 ?? '';
        attack3Field.textContent = text3 ?? '';
        attack4Field.textContent = text4 ?? '';
    }

}
