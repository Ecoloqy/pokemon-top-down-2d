import { Pokemon } from "../models/pokemon.js";

export interface EnemyRandomizerProps {
    enemy: Pokemon;
    changeInPercent: number;
}

export class EnemyRandomizer {

    public randomEnemies: Pokemon[] = [];

    constructor(possibilities: EnemyRandomizerProps[]) {
        possibilities.forEach((possibility) => {
            const possibilitiesEnemies = new Array(possibility.changeInPercent).fill(possibility.enemy);
            this.randomEnemies = this.randomEnemies.concat(possibilitiesEnemies);
        });
        for (let i = 0; i < 100; i++) {
            if (this.randomEnemies.length === i && !this.randomEnemies[i]) {
                this.randomEnemies.push(null);
            }
        }
    }

    public getRandomEnemy(): Pokemon | null {
        const randomNumber = Math.floor(Math.random() * 100);
        return this.randomEnemies[randomNumber];
    }

}
