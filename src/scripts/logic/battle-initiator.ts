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
import {
    attack1Field,
    attack2Field,
    attack3Field,
    attack4Field,
    enemyPokeLvl,
    enemyPokeName,
    gameBattleFrame,
    playerPokeLvl,
    playerPokeName
} from "../utils/selectors.js";

export class BattleInitiator {

    public battleBackground = createBattleBackground();
    public interfaceBackground = createBattleInterface();
    public interfaceCursor = {
        0: createBattleAttackSelectIndicator(0),
        1: createBattleAttackSelectIndicator(1),
        2: createBattleAttackSelectIndicator(2),
        3: createBattleAttackSelectIndicator(3),
    };

    public playerHealthBlock = createPlayerBattleBlock();
    public enemyHealthBlock = createEnemyBattleBlock();
    public playerHealthBar = createPlayerBattleBar();
    public enemyHealthBar = createEnemyBattleBar();

    public playerHealthBarPoints: Sprite[] = new Array(200);
    public enemyHealthBarPoints: Sprite[] = new Array(200);
    public attackNumberSelected: 0 | 1 | 2 | 3 = 0;
    public availableAttacks!: { 0: boolean, 1: boolean, 2: boolean, 3: boolean };

    public keys: Keys;
    public player: Character;
    public playerPokemon: Pokemon | null;
    public enemyPokemon: Pokemon | null;

    public isBattleCompleted = false;
    public isBattleInitialized = false;
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
        this.availableAttacks = {
            0: !!this.playerPokemon.attacks[0],
            1: !!this.playerPokemon.attacks[1],
            2: !!this.playerPokemon.attacks[2],
            3: !!this.playerPokemon.attacks[3],
        }

        setTimeout(() => {
            this.renderEnterBattleAnimation();
        }, 1000);

        setTimeout(() => {
            this.isBattleInitialized = true;
            this.renderExitBattleAnimation();
        }, 3000);
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
            this.interfaceCursor[this.attackNumberSelected].drawImage(context);

            if (this.attackNumberSelected === 0) {
                if (this.keys.s.pressed && !!this.availableAttacks[2]) {
                    this.attackNumberSelected = 2;
                }
                if (this.keys.d.pressed && !!this.availableAttacks[1]) {
                    this.attackNumberSelected = 1;
                }
            } else if (this.attackNumberSelected === 1) {
                if (this.keys.a.pressed && !!this.availableAttacks[0]) {
                    this.attackNumberSelected = 0;
                }
                if (this.keys.s.pressed && !!this.availableAttacks[3]) {
                    this.attackNumberSelected = 3;
                }
            } else if (this.attackNumberSelected === 2) {
                if (this.keys.w.pressed && !!this.availableAttacks[0]) {
                    this.attackNumberSelected = 0;
                }
                if (this.keys.d.pressed && !!this.availableAttacks[3]) {
                    this.attackNumberSelected = 3;
                }
            } else if (this.attackNumberSelected === 3) {
                if (this.keys.a.pressed && !!this.availableAttacks[2]) {
                    this.attackNumberSelected = 2;
                }
                if (this.keys.w.pressed && !!this.availableAttacks[1]) {
                    this.attackNumberSelected = 1;
                }
            }
        }

        if (this.isPlayerTurn && this.keys.delete.pressed) {
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
                        this.displayPokemonAttacks(this.playerPokemon.attacks[0]?.name, this.playerPokemon.attacks[1]?.name, this.playerPokemon.attacks[2]?.name, this.playerPokemon.attacks[3]?.name);
                    }, 1000);
                }
            }
        }
    }

    private async displayPlayerAttackAnimation(): Promise<void> {
        await delayTimeout(1);
        console.log('player animated');
    }

    private async displayEnemyAttackAnimation(): Promise<void> {
        await delayTimeout(1);
        console.log('enemy animated');
    }

    private async calculateDamageToEnemy(): Promise<void> {
        this.displayPokemonAttacks(this.playerPokemon.name + ' used ' + this.playerPokemon.attacks[this.attackNumberSelected].name);
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
        this.displayPokemonAttacks(this.enemyPokemon.name + ' used ' + randomEnemyAttack.name);
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
            this.displayPokemonAttacks('Your pokemon fainted.');
            await delayTimeout(1000);

            this.playerDown = true;
            this.displayPokemonAttacks();
            await delayTimeout(1000);

            this.setBasePokemonDetails();
            this.isBattleCompleted = true;
        }
    }

    private async checkIfEnemyDown(): Promise<void> {
        if (this.enemyPokemon.hp <= 0) {
            this.runEnemyTurn = false;
            this.displayPokemonAttacks('Enemy ' + this.enemyPokemon.name + ' fainted.');
            await delayTimeout(1000);

            this.enemyDown = true;
            this.displayPokemonAttacks();
            await delayTimeout(1000);

            this.setBasePokemonDetails();
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

    private renderEnterBattleAnimation(): void {
        const newEnterBattleAnimation = document.createElement('div');
        newEnterBattleAnimation.id = 'enter-battle-animation';

        const firstBattleFrameChild = gameBattleFrame.firstChild;
        if (firstBattleFrameChild) {
            gameBattleFrame.removeChild(firstBattleFrameChild);
        }

        gameBattleFrame.appendChild(newEnterBattleAnimation);
    }

    private renderExitBattleAnimation(): void {
        const newExitBattleAnimation = document.createElement('div');
        newExitBattleAnimation.id = 'exit-battle-animation';

        const firstBattleFrameChild = gameBattleFrame.firstChild;
        if (firstBattleFrameChild) {
            gameBattleFrame.removeChild(firstBattleFrameChild);
        }

        gameBattleFrame.appendChild(newExitBattleAnimation);
        this.setBasePokemonDetails(this.playerPokemon.name, this.enemyPokemon.name, this.playerPokemon.lvl + '', this.enemyPokemon.lvl + '');
        this.displayPokemonAttacks(this.playerPokemon.attacks[0]?.name, this.playerPokemon.attacks[1]?.name, this.playerPokemon.attacks[2]?.name, this.playerPokemon.attacks[3]?.name);

        setTimeout(() => {
            gameBattleFrame.removeChild(newExitBattleAnimation);
        }, 2000);
    }

    private setBasePokemonDetails(playerPokemonName?: string, enemyPokemonName?: string, playerPokemonLvl?: string, enemyPokemonLvl?: string): void {
        playerPokeName.textContent = playerPokemonName ?? '';
        enemyPokeName.textContent = enemyPokemonName ?? '';
        playerPokeLvl.textContent = playerPokemonLvl ?? '';
        enemyPokeLvl.textContent = enemyPokemonLvl ?? '';
    }

    private displayPokemonAttacks(text1?: string, text2?: string, text3?: string, text4?: string): void {
        attack1Field.textContent = text1 ?? '';
        attack2Field.textContent = text2 ?? '';
        attack3Field.textContent = text3 ?? '';
        attack4Field.textContent = text4 ?? '';
    }

}
