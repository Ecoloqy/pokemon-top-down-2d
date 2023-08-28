export class EnemyRandomizer {
    constructor(possibilities) {
        this.randomEnemies = [];
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
    getRandomEnemy() {
        const randomNumber = Math.floor(Math.random() * 100);
        return this.randomEnemies[randomNumber];
    }
}
