import { Pokemon } from "../scripts/models/pokemon.js";
import { createAttack } from "./attacks-initializer.js";
export const createPokemon = (symbol) => {
    switch (symbol) {
        case 'bulbasaur': {
            return new Pokemon(symbol, 'Bulbasaur', 30, 6, './assets/img/pokemons/bulbasaur-front.png', './assets/img/pokemons/bulbasaur-back.png', [createAttack('ember'), createAttack('quick_attack')]);
        }
        case 'charmander': {
            return new Pokemon(symbol, 'Charmander', 25, 6, './assets/img/pokemons/charmander-front.png', './assets/img/pokemons/charmander-back.png', [createAttack('ember'), createAttack('quick_attack')]);
        }
        case 'squirtle': {
            return new Pokemon(symbol, 'Squirtle', 30, 6, './assets/img/pokemons/squirtle-front.png', './assets/img/pokemons/squirtle-back.png', [createAttack('ember'), createAttack('quick_attack')]);
        }
        case 'pidgey': {
            return new Pokemon(symbol, 'Pidgey', 20, 6, './assets/img/pokemons/pidgey-front.png', './assets/img/pokemons/pidgey-back.png', [createAttack('ember'), createAttack('quick_attack')]);
        }
    }
};
