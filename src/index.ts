import { Sprite } from "./scripts/models/sprite.js";
import { Keys } from "./scripts/logic/keys.js";
import { Character } from "./scripts/models/character.js";
import { collisions } from "./data/map/collisions.js";
import { battleZones } from "./data/map/battle-zones.js";
import { mapToArray } from "./scripts/utils/map-to-array.js";
import {
    canvasWidth,
    canvasHeight,
    singleTileSize,
    keydownTransition,
    availableMoveKeys,
    playerMoveSpeedDelay,
    mapScale,
    playerRunSpeedDelay,
} from "./data/variables.js";
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
import { BattleInitiator } from "./scripts/logic/battle-initiator.js";

const canvas: HTMLCanvasElement | null = document.querySelector('canvas');
const context = canvas.getContext('2d');

class GameController {
    private readonly keys: Keys = new Keys();
    private readonly keyEvents: KeyEvents = new KeyEvents(this.keys);
    private readonly interfaceController: InterfaceController = new InterfaceController(this.keys);

    private readonly collisionMap = mapToArray(collisions);
    private readonly battleZonesMap = mapToArray(battleZones);
    private readonly boundaries: Boundary[] = getInteractive(this.collisionMap, Boundary);
    private readonly battleZones: BattleZone[] = getInteractive(this.battleZonesMap, BattleZone);

    private readonly background: Sprite = createBackground();
    private readonly foreground: Sprite = createForeground();

    private readonly player: Character = createPlayer();

    private readonly enemyRandomizer: EnemyRandomizer = new EnemyRandomizer([
        { enemy: createPokemon('pidgey'), changeInPercent: 10 },
    ]);

    private battleInitiator: BattleInitiator | null = null;

    constructor(width: number, height: number) {
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
            })

            this.battleZones.forEach((battleZone) => {
                battleZone.drawCell(context);
            })

            if (this.player && !this.player.isInBattle) {
                this.checkBattleZoneOnMove();
                this.transformSpritePositionOnMove(this.background, this.foreground, ...this.boundaries, ...this.battleZones);
            }

            if (!!this.battleInitiator) {
                if (this.battleInitiator.isBattleInitialized) {
                    this.battleInitiator.drawBattlefield(context, canvasWidth, canvasHeight);
                }
            }
            if (!!this.battleInitiator?.isBattleCompleted) {
                this.player.isInBattle = false;
                this.battleInitiator = null;
            }
        }

        animate();
    }

    private async checkBattleZoneOnMove(): Promise<void> {
        if (this.player.isMoving) {
            return;
        }

        for (let key of availableMoveKeys) {
            if (this.keys[key].pressed && this.keys.lastKeyPressed === key) {
                for (let i = 0; i < this.battleZones.length; i++) {
                    if (this.player.checkCollidingWith(
                        new Cell({
                            position: {
                                x: this.battleZones[i].getPosition().x + keydownTransition[key].x * singleTileSize,
                                y: this.battleZones[i].getPosition().y + keydownTransition[key].y * singleTileSize,
                            }
                        })
                    )) {
                        const randomEnemy = this.enemyRandomizer.getRandomEnemy();
                        if (randomEnemy) {
                            this.player.isInBattle = true;
                            const newEnemyClone = createPokemon(randomEnemy.symbol);
                            this.battleInitiator = new BattleInitiator(this.keys, this.player, newEnemyClone);
                        }
                        return;
                    }
                }
            }
        }
    }

    private async transformSpritePositionOnMove(...cells: Cell[]): Promise<void> {
        this.player.isRunning = this.keys.end.pressed;

        if (this.player.isMoving) {
            return;
        }

        for (let key of availableMoveKeys) {
            if (this.keys[key].pressed && this.keys.lastKeyPressed === key) {
                for (let i = 0; i < this.boundaries.length; i++) {
                    if (this.player.checkCollidingWith(
                        new Cell({
                            position: {
                                x: this.boundaries[i].getPosition().x + keydownTransition[key].x * singleTileSize,
                                y: this.boundaries[i].getPosition().y + keydownTransition[key].y * singleTileSize,
                            }
                        })
                    )) {
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
                    await delayTimeout(moveDelay);
                }
                this.player.isMoving = false;
            }
        }
    }
}

const gameController = new GameController(canvasWidth, canvasHeight);
console.log(gameController);
