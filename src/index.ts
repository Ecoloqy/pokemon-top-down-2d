import { Sprite } from "./scripts/models/sprite.js";
import { Keys } from "./scripts/logic/keys.js";
import { Character } from "./scripts/models/character.js";
import { collisions } from "./data/map/collisions.js";
import { battleZones } from "./data/map/battle-zones.js";
import { mapToArray } from "./scripts/utils/map-to-array.js";
import {
    canvasWidth,
    canvasHeight,
    backgroundOffsetX,
    backgroundOffsetY,
    singleTileSize,
    playerCollisionPadding,
    keydownTransition,
    availableMoveKeys,
    playerMoveSpeedDelay,
    mapScale,
    playerRunSpeedDelay,
} from "./data/variables.js";
import { Boundary } from "./scripts/models/boundary.js";
import { tileScale } from "./scripts/utils/tile-scale.js";
import { Cell } from "./scripts/models/cell.js";
import { delayTimeout } from "./scripts/utils/delay-timeout.js";

const canvas: HTMLCanvasElement | null = document.querySelector('canvas');
const context = canvas.getContext('2d');

class GameController {
    private keys = new Keys();
    private collisionsMap = mapToArray(collisions);
    private battleZonesMap = mapToArray(battleZones);

    private player!: Character;
    private background!: Sprite;
    private foreground!: Sprite;
    private boundaries: Boundary[] = [];

    constructor(width: number, height: number) {
        canvas.width = width;
        canvas.height = height;
        context.fillRect(0, 0, width, height);

        this.collisionsMap.forEach((row, y) => {
            row.forEach((symbol, x) => {
                if (symbol !== 0) {
                    const newBoundary = new Boundary({
                        position: {
                            x: (x * tileScale().width) + backgroundOffsetX,
                            y: (y * tileScale().height) + backgroundOffsetY
                        }
                    });
                    this.boundaries.push(newBoundary);
                }
            })
        });

        this.background = new Sprite({
            src: './assets/img/map/map.png',
            position: { x: backgroundOffsetX, y: backgroundOffsetY }
        });
        this.player = new Character({
            src: './assets/img/characters/player.png',
            position: { x: canvasWidth / 2 - singleTileSize / 4, y: canvasHeight / 2 - singleTileSize / 4 },
            frames: { x: 4, y: 4 },
            collisionPadding: playerCollisionPadding
        });
        this.foreground = new Sprite({
            src: './assets/img/map/foreground.png',
            position: { x: backgroundOffsetX, y: backgroundOffsetY }
        });

        const animate = () => {
            window.requestAnimationFrame(animate);

            this.background.drawImage(context);
            this.player.drawImage(context);
            this.foreground.drawImage(context);

            this.boundaries.forEach((boundary) => {
                boundary.drawBoundary(context);
            })

            this.transformSpritePositionOnMove(this.background, this.foreground, ...this.boundaries).then(() => {

            })
        }

        animate();

        ['keydown', 'keyup'].forEach((eventName, index) => {
            window.addEventListener(eventName, (event: KeyboardEvent) => {
                this.keys.setKeyPressed(event.key, event.shiftKey, index === 0);
            });
        })
    }

    private async transformSpritePositionOnMove(...cells: Cell[]) {
        this.player.isRunning = this.keys.shift.pressed;

        if (this.player.isMoving) {
            return;
        }

        for (let key of availableMoveKeys) {
            if (this.keys[key].pressed && this.keys.lastKeyPressed === key) {
                for (let i = 0; i < this.boundaries.length; i++) {
                    if (this.player.checkCollidingWith(
                        new Cell({
                            position: {
                                x: this.boundaries[i].getPosition().x + keydownTransition[key].x * singleTileSize * mapScale,
                                y: this.boundaries[i].getPosition().y + keydownTransition[key].y * singleTileSize * mapScale,
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
console.log(context);
