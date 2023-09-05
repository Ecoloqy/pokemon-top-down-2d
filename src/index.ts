import { Sprite } from "./scripts/models/sprite.js";
import { Keys } from "./scripts/logic/keys.js";
import { Character } from "./scripts/models/character.js";
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
import { createBirdKeeperMale, createPlayer } from "./data/characters-initializer.js";
import { ParseData } from "./data/parse-data.js";
import { MapName } from "./scripts/utils/types.js";
import { BattleController } from "./scripts/logic/battle-controller.js";
import { DialogueController } from "./scripts/logic/dialogue-controller.js";
import { Npc } from "./scripts/models/npc.js";
import { DialogueData, InteractiveElement } from "./scripts/utils/interfaces.js";
import { InteractiveBoundary } from "./scripts/models/interactive-boundary.js";

const canvas: HTMLCanvasElement | null = document.querySelector('canvas');
const context = canvas.getContext('2d');

class GameController {
    private readonly player: Character = createPlayer();

    private readonly keys: Keys = new Keys();
    private readonly keyEvents: KeyEvents = new KeyEvents(this.keys);
    private readonly interfaceController: InterfaceController = new InterfaceController(this.keys);
    private readonly dialogueController: DialogueController = new DialogueController(this.player, this.keys);
    private readonly dataParser: ParseData = new ParseData();

    private charactersDialogues: DialogueData[];
    private boundaries: Boundary[] = [];
    private interactive: InteractiveBoundary[] = [];
    private battleZones: BattleZone[] = [];
    private characters: Npc[] = [
        createBirdKeeperMale(
            this.dialogueController,
            {
                position: { x: 1008, y: 266 }, interact: (same: Npc) => {
                    // TODO: set facing when starting conversation
                    // same.setFacing(this.player.getOppositeFacing());

                    const dialogues = this.charactersDialogues.find((dialogue) => dialogue.character === 'birdKeeperMale')?.content ?? [];
                    this.dialogueController.setDialogueText(dialogues[0]).then(async () => {
                        this.player.inInteraction = true;
                        await delayTimeout(1000);
                        this.dialogueController.setDialogueText();
                        const enemyClone = createPokemon('bulbasaur', 7, 40);
                        this.battleController = new BattleController(this.keys, this.player, enemyClone);
                    });
                }
            })
    ];

    private activeMap: MapName = 'world';

    private background!: Sprite;
    private foreground!: Sprite;

    private battleController: BattleController | null = null;

    private readonly enemyRandomizer: EnemyRandomizer = new EnemyRandomizer([
        { enemy: createPokemon('pidgey', 5, 20), changeInPercent: 10 },
    ]);

    constructor(width: number, height: number) {
        canvas.width = width;
        canvas.height = height;
        context.fillRect(0, 0, width, height);

        this.loadMapData(this.activeMap);

        const animate = () => {
            window.requestAnimationFrame(animate);

            this.background.drawImage(context);
            this.player.drawImage(context);
            this.foreground.drawImage(context);

            this.characters.forEach((character) => {
                character.drawImage(context);
            })

            this.boundaries.forEach((boundary) => {
                boundary.drawCell(context);
            })

            this.interactive.forEach((inter) => {
                inter.drawCell(context);
            })

            this.battleZones.forEach((battleZone) => {
                battleZone.drawCell(context);
            })

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

            if (!!this.battleController?.isBattleCompleted) {
                this.player.inInteraction = false;
                this.battleController = null;
            }

            this.dialogueController.drawText(context);
        }

        animate();
    }

    private loadMapData(mapName: MapName): void {
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
        })
    }

    private async checkInteractive(): Promise<void> {
        if (this.player.isMoving) {
            return;
        }

        const key = this.keys.getFacingKey(this.player.getFacing());
        if (key && this.keys.lastKeyPressed === key) {
            const interactiveElements: InteractiveElement[] = [...this.interactive, ...this.characters];
            for (let i = 0; i < interactiveElements.length; i++) {
                if (this.player.checkCollidingWith(
                    new Cell({
                        position: {
                            x: interactiveElements[i].getPosition().x + keydownTransition[key].x * singleTileSize,
                            y: interactiveElements[i].getPosition().y + keydownTransition[key].y * singleTileSize,
                        }
                    })
                )) {
                    this.player.isInteractionAvailable = true;
                    if (this.keys.delete.pressed) {
                        this.keys.delete.pressed = false;
                        this.player.nextInteractiveElement = interactiveElements[i];
                    }
                    return;
                }
            }

            this.player.isInteractionAvailable = false;
        }
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
                            this.player.inInteraction = true;
                            const newEnemyClone = createPokemon(randomEnemy.symbol);
                            this.battleController = new BattleController(this.keys, this.player, newEnemyClone);
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

        const collisionElements = [...this.interactive, ...this.boundaries, ...this.characters];
        for (let key of availableMoveKeys) {
            if (this.keys[key].pressed && this.keys.lastKeyPressed === key) {
                const keyPlayerFacing = this.keys.getKeyFacing(key);
                this.player.setFacing(keyPlayerFacing);

                for (let i = 0; i < collisionElements.length; i++) {
                    if (this.player.checkCollidingWith(
                        new Cell({
                            position: {
                                x: collisionElements[i].getPosition().x + keydownTransition[key].x * singleTileSize,
                                y: collisionElements[i].getPosition().y + keydownTransition[key].y * singleTileSize,
                            }
                        })
                    )) {
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
                    await delayTimeout(moveDelay);
                }
                this.player.isMoving = false;
            }
        }
    }
}

const gameController = new GameController(canvasWidth, canvasHeight);
console.log(gameController);
