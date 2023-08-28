import { Sprite } from "./sprite.js";
import { backPokemonPosition, frontPokemonPosition, pokemonHealthBarParts } from "../../data/variables.js";
import { PokemonAttack } from "./pokemon-attack.js";
import {PokemonName} from "../utils/types";

export class Pokemon {

    public symbol!: PokemonName;
    public name!: string;
    public hp!: number;
    public maxHp!: number;
    public lvl!: number;
    public attacks!: PokemonAttack[];

    public pokemonHpLastIndex: number = pokemonHealthBarParts - 1;

    public frontSprite!: Sprite;
    public backSprite!: Sprite;
    public isOnTop: boolean = false;

    constructor(symbol: PokemonName, name: string, hp: number, lvl: number, frontImageSrc: string, backImageSrc: string, attacks: PokemonAttack[]) {
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
            } else {
                this.frontSprite.transformPosition({ x: 0, y: 5 });
                setTimeout(() => {
                    this.backSprite.transformPosition({ x: 0, y: 5 });
                }, 200);
            }
            this.isOnTop = !this.isOnTop;
        }, 800);
    }

    public calculateLastIndexOfBarPointToDisplay(): void {
        this.pokemonHpLastIndex = Math.floor(this.hp / this.maxHp * 100) * pokemonHealthBarParts / 100 - 1;
    }

}
