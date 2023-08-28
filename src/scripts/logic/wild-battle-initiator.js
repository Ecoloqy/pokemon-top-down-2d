import { BattleInitiator } from "./battle-initiator.js";
export class WildBattleInitiator extends BattleInitiator {
    constructor(player, wildPokemon) {
        super(player);
        this.wildPokemon = wildPokemon;
    }
}
