import { Pokemon } from "../scripts/models/pokemon.js";
import { PokemonName } from "../scripts/utils/types.js";

export const createPokemon = (name: PokemonName): Pokemon | null => {
    switch (name) {
        case 'bulbasaur': {
            return new Pokemon('Bulbasaur', 30, './assets/img/pokemons/bulbasaur-front.png', './assets/img/pokemons/bulbasaur-back.png');
        }
        case 'charmander': {
            return new Pokemon('Charmander', 25, './assets/img/pokemons/charmander-front.png', './assets/img/pokemons/charmander-back.png');
        }
        case 'squirtle': {
            return new Pokemon('Squirtle', 30, './assets/img/pokemons/squirtle-front.png', './assets/img/pokemons/squirtle-back.png');
        }
        case 'pidgey': {
            return new Pokemon('Pidgey', 20, './assets/img/pokemons/pidgey-front.png', './assets/img/pokemons/pidgey-back.png');
        }
    }
}
