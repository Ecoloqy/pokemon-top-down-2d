var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { createBattleAttackSelectIndicator, createBattleBackground, createBattleInterface, createEnemyBattleBar, createEnemyBattleBarPoint, createEnemyBattleBlock, createPlayerBattleBar, createPlayerBattleBarPoint, createPlayerBattleBlock } from "../../data/battle-initializer.js";
import { pokemonHealthBarParts, pokemonSpriteSize } from "../../data/variables.js";
import { delayTimeout } from "../utils/delay-timeout.js";
import { BattleDialogueController } from "./battle-dialogue-controller.js";
import { BattleTransitionController } from "./battle-transition-controller.js";
export class BattleController {
    constructor(keys, player, wildPokemon) {
        this.battleBackground = createBattleBackground();
        this.interfaceBackground = createBattleInterface();
        this.playerHealthBlock = createPlayerBattleBlock();
        this.enemyHealthBlock = createEnemyBattleBlock();
        this.playerHealthBar = createPlayerBattleBar();
        this.enemyHealthBar = createEnemyBattleBar();
        this.playerHealthBarPoints = new Array(200);
        this.enemyHealthBarPoints = new Array(200);
        this.attackNumberSelected = 0;
        this.isBattleCompleted = false;
        this.isPlayerTurn = true;
        this.runEnemyTurn = true;
        this.playerDown = false;
        this.enemyDown = false;
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
    drawBattlefield(context, canvasWidth, canvasHeight) {
        return __awaiter(this, void 0, void 0, function* () {
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
                yield this.makeTurn();
            }
        });
    }
    makeTurn() {
        return __awaiter(this, void 0, void 0, function* () {
            this.isPlayerTurn = false;
            yield this.displayPlayerAttackAnimation();
            yield this.calculateDamageToEnemy();
            yield this.checkIfEnemyDown();
            if (this.runEnemyTurn) {
                yield this.displayEnemyAttackAnimation();
                yield this.calculateDamageToPlayer();
                yield this.checkIfPlayerDown();
                if (!this.playerDown && !this.enemyDown) {
                    setTimeout(() => {
                        var _a, _b, _c, _d;
                        this.isPlayerTurn = true;
                        this.battleDialogueController.displayPokemonAttacks((_a = this.playerPokemon.attacks[0]) === null || _a === void 0 ? void 0 : _a.name, (_b = this.playerPokemon.attacks[1]) === null || _b === void 0 ? void 0 : _b.name, (_c = this.playerPokemon.attacks[2]) === null || _c === void 0 ? void 0 : _c.name, (_d = this.playerPokemon.attacks[3]) === null || _d === void 0 ? void 0 : _d.name);
                    }, 1000);
                }
            }
        });
    }
    navigateCursor() {
        if (this.attackNumberSelected === 0) {
            if (this.keys.s.pressed && !!this.interfaceCursor[2].available) {
                this.attackNumberSelected = 2;
            }
            if (this.keys.d.pressed && !!this.interfaceCursor[1].available) {
                this.attackNumberSelected = 1;
            }
        }
        else if (this.attackNumberSelected === 1) {
            if (this.keys.a.pressed && !!this.interfaceCursor[0].available) {
                this.attackNumberSelected = 0;
            }
            if (this.keys.s.pressed && !!this.interfaceCursor[3].available) {
                this.attackNumberSelected = 3;
            }
        }
        else if (this.attackNumberSelected === 2) {
            if (this.keys.w.pressed && !!this.interfaceCursor[0].available) {
                this.attackNumberSelected = 0;
            }
            if (this.keys.d.pressed && !!this.interfaceCursor[3].available) {
                this.attackNumberSelected = 3;
            }
        }
        else if (this.attackNumberSelected === 3) {
            if (this.keys.a.pressed && !!this.interfaceCursor[2].available) {
                this.attackNumberSelected = 2;
            }
            if (this.keys.w.pressed && !!this.interfaceCursor[1].available) {
                this.attackNumberSelected = 1;
            }
        }
    }
    displayPlayerAttackAnimation() {
        return __awaiter(this, void 0, void 0, function* () {
            yield delayTimeout(1);
        });
    }
    displayEnemyAttackAnimation() {
        return __awaiter(this, void 0, void 0, function* () {
            yield delayTimeout(1);
        });
    }
    calculateDamageToEnemy() {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            this.battleDialogueController.displayPokemonAttacks(this.playerPokemon.name + ' used ' + this.playerPokemon.attacks[this.attackNumberSelected].name);
            yield delayTimeout(500);
            let attackPower = (_a = this.playerPokemon.attacks[this.attackNumberSelected].power) !== null && _a !== void 0 ? _a : 0;
            for (let i = 0; i < 10; i++) {
                this.enemyPokemon.hp -= attackPower / 10;
                this.enemyPokemon.calculateLastIndexOfBarPointToDisplay();
                yield delayTimeout(50);
            }
        });
    }
    calculateDamageToPlayer() {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const randomEnemyAttack = this.randomizeEnemyAttack();
            this.battleDialogueController.displayPokemonAttacks(this.enemyPokemon.name + ' used ' + randomEnemyAttack.name);
            yield delayTimeout(500);
            let attackPower = (_a = randomEnemyAttack.power) !== null && _a !== void 0 ? _a : 0;
            for (let i = 0; i < 10; i++) {
                this.playerPokemon.hp -= attackPower / 10;
                this.playerPokemon.calculateLastIndexOfBarPointToDisplay();
                yield delayTimeout(50);
            }
        });
    }
    checkIfPlayerDown() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.playerPokemon.hp <= 0) {
                this.battleDialogueController.displayPokemonAttacks('Your pokemon fainted.');
                yield delayTimeout(1000);
                this.playerDown = true;
                this.battleDialogueController.displayPokemonAttacks();
                yield delayTimeout(1000);
                this.battleDialogueController.setBasePokemonDetails();
                this.isBattleCompleted = true;
            }
        });
    }
    checkIfEnemyDown() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.enemyPokemon.hp <= 0) {
                this.runEnemyTurn = false;
                this.battleDialogueController.displayPokemonAttacks('Enemy ' + this.enemyPokemon.name + ' fainted.');
                yield delayTimeout(1000);
                this.enemyDown = true;
                this.battleDialogueController.displayPokemonAttacks();
                yield delayTimeout(1000);
                this.battleDialogueController.setBasePokemonDetails();
                this.isBattleCompleted = true;
            }
        });
    }
    randomizeEnemyAttack() {
        const availableEnemyMoves = [];
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
