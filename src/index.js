var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Keys } from "./scripts/logic/keys.js";
import { canvasWidth, canvasHeight, singleTileSize, keydownTransition, availableMoveKeys, playerMoveSpeedDelay, mapScale, playerRunSpeedDelay, } from "./data/variables.js";
import { Cell } from "./scripts/models/cell.js";
import { delayTimeout } from "./scripts/utils/delay-timeout.js";
import { KeyEvents } from "./scripts/logic/key-events.js";
import { InterfaceController } from "./scripts/logic/interface-controller.js";
import { EnemyRandomizer } from "./scripts/utils/enemy-randomizer.js";
import { createPokemon } from "./data/enemy-initializer.js";
import { createBackground, createForeground } from "./data/surroundings-initializer.js";
import { createBirdKeeperMale, createPlayer } from "./data/characters-initializer.js";
import { ParseData } from "./data/parse-data.js";
import { BattleController } from "./scripts/logic/battle-controller.js";
import { DialogueController } from "./scripts/logic/dialogue-controller.js";
const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');
class GameController {
    constructor(width, height) {
        this.player = createPlayer();
        this.keys = new Keys();
        this.keyEvents = new KeyEvents(this.keys);
        this.interfaceController = new InterfaceController(this.keys);
        this.dialogueController = new DialogueController(this.player, this.keys);
        this.dataParser = new ParseData();
        this.boundaries = [];
        this.interactive = [];
        this.battleZones = [];
        this.characters = [
            createBirdKeeperMale(this.dialogueController, {
                position: { x: 1008, y: 266 }, interact: (same) => {
                    // TODO: set facing when starting conversation
                    // same.setFacing(this.player.getOppositeFacing());
                    var _a, _b;
                    const dialogues = (_b = (_a = this.charactersDialogues.find((dialogue) => dialogue.character === 'birdKeeperMale')) === null || _a === void 0 ? void 0 : _a.content) !== null && _b !== void 0 ? _b : [];
                    this.dialogueController.setDialogueText(dialogues[0]).then(() => __awaiter(this, void 0, void 0, function* () {
                        this.dialogueController.setDialogueText();
                        this.player.inInteraction = true;
                        const enemyClone = createPokemon('bulbasaur', 7, 40);
                        this.battleController = new BattleController(this.keys, this.player, enemyClone);
                    }));
                }
            })
        ];
        this.activeMap = 'world';
        this.battleController = null;
        this.enemyRandomizer = new EnemyRandomizer([
            { enemy: createPokemon('pidgey', 5, 20), changeInPercent: 10 },
        ]);
        canvas.width = width;
        canvas.height = height;
        context.fillRect(0, 0, width, height);
        this.loadMapData(this.activeMap);
        const animate = () => {
            var _a;
            window.requestAnimationFrame(animate);
            this.background.drawImage(context);
            this.player.drawImage(context);
            this.foreground.drawImage(context);
            this.characters.forEach((character) => {
                character.drawImage(context);
            });
            this.boundaries.forEach((boundary) => {
                boundary.drawCell(context);
            });
            this.interactive.forEach((inter) => {
                inter.drawCell(context);
            });
            this.battleZones.forEach((battleZone) => {
                battleZone.drawCell(context);
            });
            if (this.player.isInteractionAvailable && this.player.nextInteractiveElement) {
                this.player.nextInteractiveElement.interact(this.player.nextInteractiveElement);
                this.player.nextInteractiveElement = null;
            }
            if (this.player && !this.player.inInteraction) {
                this.checkInteractive();
                this.checkBattleZoneOnMove();
                this.transformSpritePositionOnMove(this.background, this.foreground, ...this.boundaries, ...this.interactive, ...this.battleZones, ...this.characters);
            }
            if (!!this.battleController) {
                if (this.battleController.battleTransitionController.isBattleInitialized) {
                    this.battleController.drawBattlefield(context, canvasWidth, canvasHeight);
                }
            }
            if (!!((_a = this.battleController) === null || _a === void 0 ? void 0 : _a.isBattleCompleted)) {
                this.player.inInteraction = false;
                this.battleController = null;
            }
            this.dialogueController.drawText(context);
        };
        animate();
    }
    loadMapData(mapName) {
        this.background = createBackground(this.activeMap);
        this.foreground = createForeground(this.activeMap);
        this.charactersDialogues = [];
        this.dataParser.fetchData(mapName).then(() => {
            this.boundaries = this.dataParser.getCollisions();
            this.interactive = this.dataParser.getInteractive(this.dialogueController);
            this.battleZones = this.dataParser.getBattleZones();
        });
        this.dataParser.fetchCharacters(mapName).then(() => {
            this.charactersDialogues = this.dataParser.getDialogues();
        });
    }
    checkInteractive() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.player.isMoving) {
                return;
            }
            const key = this.keys.getFacingKey(this.player.getFacing());
            if (key && this.keys.lastKeyPressed === key) {
                const interactiveElements = [...this.interactive, ...this.characters];
                for (let i = 0; i < interactiveElements.length; i++) {
                    if (this.player.checkCollidingWith(new Cell({
                        position: {
                            x: interactiveElements[i].getPosition().x + keydownTransition[key].x * singleTileSize,
                            y: interactiveElements[i].getPosition().y + keydownTransition[key].y * singleTileSize,
                        }
                    }))) {
                        this.player.isInteractionAvailable = true;
                        if (this.keys.delete.pressed && !this.player.inInteraction) {
                            this.keys.delete.pressed = false;
                            this.player.nextInteractiveElement = interactiveElements[i];
                        }
                        return;
                    }
                }
                this.player.isInteractionAvailable = false;
            }
        });
    }
    checkBattleZoneOnMove() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.player.isMoving) {
                return;
            }
            for (let key of availableMoveKeys) {
                if (this.keys[key].pressed && this.keys.lastKeyPressed === key) {
                    for (let i = 0; i < this.battleZones.length; i++) {
                        if (this.player.checkCollidingWith(new Cell({
                            position: {
                                x: this.battleZones[i].getPosition().x + keydownTransition[key].x * singleTileSize,
                                y: this.battleZones[i].getPosition().y + keydownTransition[key].y * singleTileSize,
                            }
                        }))) {
                            const randomEnemy = this.enemyRandomizer.getRandomEnemy();
                            if (randomEnemy) {
                                this.player.inInteraction = true;
                                const newEnemyClone = createPokemon(randomEnemy.symbol);
                                this.battleController = new BattleController(this.keys, this.player, newEnemyClone);
                            }
                            return;
                        }
                    }
                }
            }
        });
    }
    transformSpritePositionOnMove(...cells) {
        return __awaiter(this, void 0, void 0, function* () {
            this.player.isRunning = this.keys.end.pressed;
            if (this.player.isMoving) {
                return;
            }
            const collisionElements = [...this.interactive, ...this.boundaries, ...this.characters];
            for (let key of availableMoveKeys) {
                if (this.keys[key].pressed && this.keys.lastKeyPressed === key) {
                    const keyPlayerFacing = this.keys.getKeyFacing(key);
                    this.player.setFacing(keyPlayerFacing);
                    for (let i = 0; i < collisionElements.length; i++) {
                        if (this.player.checkCollidingWith(new Cell({
                            position: {
                                x: collisionElements[i].getPosition().x + keydownTransition[key].x * singleTileSize,
                                y: collisionElements[i].getPosition().y + keydownTransition[key].y * singleTileSize,
                            }
                        }))) {
                            return;
                        }
                    }
                    this.player.isMoving = true;
                    for (let i = 0; i < singleTileSize * mapScale;) {
                        const moveDelay = this.player.isRunning ? playerRunSpeedDelay : playerMoveSpeedDelay;
                        cells.forEach((cell) => {
                            cell.transformPosition(keydownTransition[key]);
                        });
                        i += keydownTransition[key].abs;
                        yield delayTimeout(moveDelay);
                    }
                    this.player.isMoving = false;
                }
            }
        });
    }
}
const gameController = new GameController(canvasWidth, canvasHeight);
console.log(gameController);
