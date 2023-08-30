import { Character } from "../models/character.js";
import {
    createBattleAttackSelectIndicator,
    createBattleBackground,
    createBattleInterface,
    createEnemyBattleBar,
    createEnemyBattleBarPoint,
    createEnemyBattleBlock,
    createPlayerBattleBar,
    createPlayerBattleBarPoint,
    createPlayerBattleBlock
} from "../../data/battle-initializer.js";
import { Pokemon } from "../models/pokemon.js";
import { pokemonHealthBarParts, pokemonSpriteSize } from "../../data/variables.js";
import { Sprite } from "../models/sprite.js";
import { Keys } from "./keys.js";
import { delayTimeout } from "../utils/delay-timeout.js";
import { PokemonAttack } from "../models/pokemon-attack.js";
import { BattleDialogueController } from "./battle-dialogue-controller.js";
import { BattleTransitionController } from "./battle-transition-controller.js";

export class BattleController {

    public readonly battleDialogueController!: BattleDialogueController;
    public readonly battleTransitionController!: BattleTransitionController;

    public battleBackground = createBattleBackground();
    public interfaceBackground = createBattleInterface();
    public interfaceCursor!: { 0: { indicator: Sprite, available: boolean }, 1: { indicator: Sprite, available: boolean }, 2: { indicator: Sprite, available: boolean }, 3: { indicator: Sprite, available: boolean } } ;

    public playerHealthBlock = createPlayerBattleBlock();
    public enemyHealthBlock = createEnemyBattleBlock();
    public playerHealthBar = createPlayerBattleBar();
    public enemyHealthBar = createEnemyBattleBar();

    public keys: Keys;
    public player: Character;
    public playerPokemon: Pokemon | null;
    public enemyPokemon: Pokemon | null;

    public playerHealthBarPoints: Sprite[] = new Array(200);
    public enemyHealthBarPoints: Sprite[] = new Array(200);
    public attackNumberSelected: 0 | 1 | 2 | 3 = 0;

    public isBattleCompleted = false;
    public isPlayerTurn = true;
    public runEnemyTurn = true;
    public playerDown = false;
    public enemyDown = false;

    constructor(keys: Keys, player: Character, wildPokemon: Pokemon) {
        this.keys = keys;
        this.player = player;
        this.playerPokemon = player.pokemons[0];
        this.enemyPokemon = wildPokemon;
        this.playerHealthBarPoints = (new Array(pokemonHealthBarParts)).fill(true).map((item, i) => createPlayerBattleBarPoint(i));
        this.enemyHealthBarPoints = (new Array(pokemonHealthBarParts)).fill(true).map((item, i) => createEnemyBattleBarPoint(i));

        this.interfaceCursor = {
            0: {
                indicator: createBattleAttackSelectIndicator(0),
                available: !!this.playerPokemon.attacks[0],
            },
            1: {
                indicator: createBattleAttackSelectIndicator(1),
                available: !!this.playerPokemon.attacks[1],
            },
            2: {
                indicator: createBattleAttackSelectIndicator(2),
                available: !!this.playerPokemon.attacks[2],
            },
            3: {
                indicator: createBattleAttackSelectIndicator(3),
                available: !!this.playerPokemon.attacks[3],
            },
        };

        this.battleDialogueController = new BattleDialogueController();
        this.battleTransitionController = new BattleTransitionController(this.playerPokemon, this.enemyPokemon, this.battleDialogueController);
    }

    public async drawBattlefield(context: CanvasRenderingContext2D, canvasWidth: number, canvasHeight: number): Promise<void> {
        this.battleBackground.drawImage(context, canvasWidth, canvasHeight - 140);
        if (!this.playerDown) {
            this.playerPokemon.backSprite.drawImage(context, pokemonSpriteSize.width, pokemonSpriteSize.height);
        }
        if (!this.enemyDown) {
            this.enemyPokemon.frontSprite.drawImage(context, pokemonSpriteSize.width, pokemonSpriteSize.height);
        }
        this.interfaceBackground.drawImage(context, canvasWidth, canvasHeight - 400);
        this.playerHealthBlock.drawImage(context);
        this.enemyHealthBlock.drawImage(context);
        this.playerHealthBar.drawImage(context);
        this.enemyHealthBar.drawImage(context);

        this.playerHealthBarPoints.forEach((point, index) => {
            if (index <= this.playerPokemon.pokemonHpLastIndex) {
                point.drawImage(context);
            }
        });

        this.enemyHealthBarPoints.forEach((point, index) => {
            if (index <= this.enemyPokemon.pokemonHpLastIndex) {
                point.drawImage(context);
            }
        });

        if (this.isPlayerTurn) {
            this.interfaceCursor[this.attackNumberSelected].indicator.drawImage(context);
            this.navigateCursor();
        }

        if (this.isPlayerTurn && this.keys.delete.pressed) {
            await this.makeTurn();
        }
    }

    private async makeTurn(): Promise<void> {
        this.isPlayerTurn = false;

        await this.displayPlayerAttackAnimation();
        await this.calculateDamageToEnemy();
        await this.checkIfEnemyDown();
        if (this.runEnemyTurn) {
            await this.displayEnemyAttackAnimation();
            await this.calculateDamageToPlayer();
            await this.checkIfPlayerDown();

            if (!this.playerDown && !this.enemyDown) {
                setTimeout(() => {
                    this.isPlayerTurn = true;
                    this.battleDialogueController.displayPokemonAttacks(this.playerPokemon.attacks[0]?.name, this.playerPokemon.attacks[1]?.name, this.playerPokemon.attacks[2]?.name, this.playerPokemon.attacks[3]?.name);
                }, 1000);
            }
        }
    }

    private navigateCursor(): void {
        if (this.attackNumberSelected === 0) {
            if (this.keys.s.pressed && !!this.interfaceCursor[2].available) {
                this.attackNumberSelected = 2;
            }
            if (this.keys.d.pressed && !!this.interfaceCursor[1].available) {
                this.attackNumberSelected = 1;
            }
        } else if (this.attackNumberSelected === 1) {
            if (this.keys.a.pressed && !!this.interfaceCursor[0].available) {
                this.attackNumberSelected = 0;
            }
            if (this.keys.s.pressed && !!this.interfaceCursor[3].available) {
                this.attackNumberSelected = 3;
            }
        } else if (this.attackNumberSelected === 2) {
            if (this.keys.w.pressed && !!this.interfaceCursor[0].available) {
                this.attackNumberSelected = 0;
            }
            if (this.keys.d.pressed && !!this.interfaceCursor[3].available) {
                this.attackNumberSelected = 3;
            }
        } else if (this.attackNumberSelected === 3) {
            if (this.keys.a.pressed && !!this.interfaceCursor[2].available) {
                this.attackNumberSelected = 2;
            }
            if (this.keys.w.pressed && !!this.interfaceCursor[1].available) {
                this.attackNumberSelected = 1;
            }
        }
    }

    private async displayPlayerAttackAnimation(): Promise<void> {
        await delayTimeout(1);
    }

    private async displayEnemyAttackAnimation(): Promise<void> {
        await delayTimeout(1);
    }

    private async calculateDamageToEnemy(): Promise<void> {
        this.battleDialogueController.displayPokemonAttacks(this.playerPokemon.name + ' used ' + this.playerPokemon.attacks[this.attackNumberSelected].name);
        await delayTimeout(500);

        let attackPower = this.playerPokemon.attacks[this.attackNumberSelected].power ?? 0;
        for (let i = 0; i < 10; i++) {
            this.enemyPokemon.hp -= attackPower / 10;
            this.enemyPokemon.calculateLastIndexOfBarPointToDisplay();
            await delayTimeout(50);
        }
    }

    private async calculateDamageToPlayer(): Promise<void> {
        const randomEnemyAttack = this.randomizeEnemyAttack();
        this.battleDialogueController.displayPokemonAttacks(this.enemyPokemon.name + ' used ' + randomEnemyAttack.name);
        await delayTimeout(500);

        let attackPower = randomEnemyAttack.power ?? 0;
        for (let i = 0; i < 10; i++) {
            this.playerPokemon.hp -= attackPower / 10;
            this.playerPokemon.calculateLastIndexOfBarPointToDisplay();
            await delayTimeout(50);
        }
    }

    private async checkIfPlayerDown(): Promise<void> {
        if (this.playerPokemon.hp <= 0) {
            this.battleDialogueController.displayPokemonAttacks('Your pokemon fainted.');
            await delayTimeout(1000);

            this.playerDown = true;
            this.battleDialogueController.displayPokemonAttacks();
            await delayTimeout(1000);

            this.battleDialogueController.setBasePokemonDetails();
            this.isBattleCompleted = true;
        }
    }

    private async checkIfEnemyDown(): Promise<void> {
        if (this.enemyPokemon.hp <= 0) {
            this.runEnemyTurn = false;
            this.battleDialogueController.displayPokemonAttacks('Enemy ' + this.enemyPokemon.name + ' fainted.');
            await delayTimeout(1000);

            this.enemyDown = true;
            this.battleDialogueController.displayPokemonAttacks();
            await delayTimeout(1000);

            this.battleDialogueController.setBasePokemonDetails();
            this.isBattleCompleted = true;
        }
    }

    private randomizeEnemyAttack(): PokemonAttack {
        const availableEnemyMoves: PokemonAttack[] = [];
        if (!!this.enemyPokemon.attacks[0]) {
            availableEnemyMoves.push(this.enemyPokemon.attacks[0]);
        }
        if (!!this.enemyPokemon.attacks[1]) {
            availableEnemyMoves.push(this.enemyPokemon.attacks[1]);
        }
        if (!!this.enemyPokemon.attacks[2]) {
            availableEnemyMoves.push(this.enemyPokemon.attacks[2]);
        }
        if (!!this.enemyPokemon.attacks[3]) {
            availableEnemyMoves.push(this.enemyPokemon.attacks[3]);
        }

        const randomMove = Math.floor(Math.random() * availableEnemyMoves.length);
        return availableEnemyMoves[randomMove];
    }

}
