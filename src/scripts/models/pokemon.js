import { Sprite } from "./sprite.js";
import { backPokemonPosition, frontPokemonPosition, pokemonHealthBarParts } from "../../data/variables.js";
export class Pokemon {
    constructor(symbol, name, hp, lvl, frontImageSrc, backImageSrc, attacks) {
        this.pokemonHpLastIndex = pokemonHealthBarParts - 1;
        this.isOnTop = false;
        this.symbol = symbol;
        this.name = name;
        this.hp = hp;
        this.maxHp = hp;
        this.lvl = lvl;
        this.attacks = attacks;
        this.frontSprite = new Sprite({ src: frontImageSrc, position: frontPokemonPosition });
        this.backSprite = new Sprite({ src: backImageSrc, position: backPokemonPosition });
        setInterval(() => {
            if (this.isOnTop) {
                this.frontSprite.transformPosition({ x: 0, y: -5 });
                setTimeout(() => {
                    this.backSprite.transformPosition({ x: 0, y: -5 });
                }, 200);
            }
            else {
                this.frontSprite.transformPosition({ x: 0, y: 5 });
                setTimeout(() => {
                    this.backSprite.transformPosition({ x: 0, y: 5 });
                }, 200);
            }
            this.isOnTop = !this.isOnTop;
        }, 800);
    }
    calculateLastIndexOfBarPointToDisplay() {
        this.pokemonHpLastIndex = Math.floor(this.hp / this.maxHp * 100) * pokemonHealthBarParts / 100 - 1;
    }
}
