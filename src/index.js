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
import { collisions } from "./data/map/collisions.js";
import { battleZones } from "./data/map/battle-zones.js";
import { mapToArray } from "./scripts/utils/map-to-array.js";
import { canvasWidth, canvasHeight, singleTileSize, keydownTransition, availableMoveKeys, playerMoveSpeedDelay, mapScale, playerRunSpeedDelay, } from "./data/variables.js";
import { Boundary } from "./scripts/models/boundary.js";
import { Cell } from "./scripts/models/cell.js";
import { delayTimeout } from "./scripts/utils/delay-timeout.js";
import { KeyEvents } from "./scripts/logic/key-events.js";
import { InterfaceController } from "./scripts/logic/interface-controller.js";
import { BattleZone } from "./scripts/models/battle-zone.js";
import { EnemyRandomizer } from "./scripts/utils/enemy-randomizer.js";
import { createPokemon } from "./data/enemy-initializer.js";
import { createBackground, createForeground } from "./data/surroundings-initializer.js";
import { createPlayer } from "./data/characters-initializer.js";
import { getInteractive } from "./scripts/utils/get-interactive.js";
import { WildBattleInitiator } from "./scripts/logic/wild-battle-initiator.js";
const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');
class GameController {
    constructor(width, height) {
        this.keys = new Keys();
        this.keyEvents = new KeyEvents(this.keys);
        this.interfaceController = new InterfaceController(this.keys);
        this.boundaries = getInteractive(mapToArray(collisions), Boundary);
        this.battleZones = getInteractive(mapToArray(battleZones), BattleZone);
        this.background = createBackground();
        this.foreground = createForeground();
        this.player = createPlayer();
        this.enemyRandomizer = new EnemyRandomizer([
            { enemy: createPokemon('pidgey'), changeInPercent: 10 },
        ]);
        this.battleInitiator = null;
        canvas.width = width;
        canvas.height = height;
        context.fillRect(0, 0, width, height);
        const animate = () => {
            window.requestAnimationFrame(animate);
            this.background.drawImage(context);
            this.player.drawImage(context);
            this.foreground.drawImage(context);
            this.boundaries.forEach((boundary) => {
                boundary.drawCell(context);
            });
            this.battleZones.forEach((battleZone) => {
                battleZone.drawCell(context);
            });
            if (this.player.isInBattle) {
                this.battleInitiator;
            }
            if (!this.player.isInBattle) {
                this.checkBattleZoneOnMove();
                this.transformSpritePositionOnMove(this.background, this.foreground, ...this.boundaries, ...this.battleZones);
            }
            if (!!this.battleInitiator) {
                if (this.battleInitiator.isBattleInitialized) {
                    this.battleInitiator.battleBackground.drawImage(context, canvasWidth, canvasHeight);
                }
                if (this.battleInitiator.isBattleCompleted) {
                    this.battleInitiator.player.isInBattle = false;
                    this.battleInitiator = null;
                }
            }
        };
        animate();
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
                                this.player.isInBattle = true;
                                this.battleInitiator = new WildBattleInitiator(this.player, randomEnemy);
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
            for (let key of availableMoveKeys) {
                if (this.keys[key].pressed && this.keys.lastKeyPressed === key) {
                    for (let i = 0; i < this.boundaries.length; i++) {
                        if (this.player.checkCollidingWith(new Cell({
                            position: {
                                x: this.boundaries[i].getPosition().x + keydownTransition[key].x * singleTileSize,
                                y: this.boundaries[i].getPosition().y + keydownTransition[key].y * singleTileSize,
                            }
                        }))) {
                            return;
                        }
                    }
                    this.player.isMoving = true;
                    const keyPlayerFacing = this.keys.getKeyFacing(key);
                    this.player.setFacing(keyPlayerFacing);
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
