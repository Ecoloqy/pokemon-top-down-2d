import { BattleInitiator } from "./battle-initiator.js";
import { Character } from "../models/character.js";
import { Pokemon } from "../models/pokemon.js";

export class WildBattleInitiator extends BattleInitiator {

    public wildPokemon: Pokemon;

    constructor(player: Character, wildPokemon: Pokemon) {
        super(player);
        this.wildPokemon = wildPokemon;
    }

}
