import { PokemonAttack } from "../scripts/models/pokemon-attack.js";
export const createAttack = (name) => {
    switch (name) {
        case 'ember': {
            return new PokemonAttack('Ember', 'Fire', 5, 100);
        }
        case "bubbles": {
            return new PokemonAttack('Bubbles', 'Water', 5, 100);
        }
        case "quick_attack": {
            return new PokemonAttack('Quick Attack', 'Normal', 3, 100);
        }
    }
};
