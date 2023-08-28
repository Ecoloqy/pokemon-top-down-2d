import { AttackType } from "../utils/types.js";

export class PokemonAttack {

    public name!: string;
    public type!: AttackType;
    public power!: number;
    public accuracy!: number;

    constructor(name: string, type: AttackType, power: number, accuracy: number) {
        this.name = name;
        this.type = type;
        this.power = power;
        this.accuracy = accuracy;
    }

}
