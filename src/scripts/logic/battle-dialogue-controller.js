import { attack1Field, attack2Field, attack3Field, attack4Field, enemyPokeLvl, enemyPokeName, playerPokeLvl, playerPokeName } from "../utils/selectors.js";
export class BattleDialogueController {
    setBasePokemonDetails(playerPokemonName, enemyPokemonName, playerPokemonLvl, enemyPokemonLvl) {
        playerPokeName.textContent = playerPokemonName !== null && playerPokemonName !== void 0 ? playerPokemonName : '';
        enemyPokeName.textContent = enemyPokemonName !== null && enemyPokemonName !== void 0 ? enemyPokemonName : '';
        playerPokeLvl.textContent = playerPokemonLvl !== null && playerPokemonLvl !== void 0 ? playerPokemonLvl : '';
        enemyPokeLvl.textContent = enemyPokemonLvl !== null && enemyPokemonLvl !== void 0 ? enemyPokemonLvl : '';
    }
    displayPokemonAttacks(text1, text2, text3, text4) {
        attack1Field.textContent = text1 !== null && text1 !== void 0 ? text1 : '';
        attack2Field.textContent = text2 !== null && text2 !== void 0 ? text2 : '';
        attack3Field.textContent = text3 !== null && text3 !== void 0 ? text3 : '';
        attack4Field.textContent = text4 !== null && text4 !== void 0 ? text4 : '';
    }
}
