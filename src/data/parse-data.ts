import {getInteractive, getInteractiveBoundary} from "../scripts/utils/get-interactive.js";
import { Boundary } from "../scripts/models/boundary.js";
import { BattleZone } from "../scripts/models/battle-zone.js";
import { mapToArray } from "../scripts/utils/map-to-array.js";
import { MapName } from "../scripts/utils/types.js";
import { InteractiveBoundary } from "../scripts/models/interactive-boundary.js";
import { DialogueData } from "../scripts/utils/interfaces.js";
import { DialogueController } from "../scripts/logic/dialogue-controller.js";

export class ParseData {

    collisions: number[][] = [];
    interactive: number[][] = [];
    battleZones: number[][] = [];

    characters: number[][] = [];
    dialogues: DialogueData[] = [];

    fetchCharacters(mapName: MapName): Promise<string> {
        return fetch(`./data/dialogues/${mapName}.json`)
            .then((res) => res.json())
            .then((data) => {
                this.characters = [];
                this.dialogues = data.dialogues;
                return data;
            });
    }

    fetchData(mapName: MapName): Promise<string> {
        return fetch(`./data/map/${mapName}.json`)
            .then((res) => res.json())
            .then((data) => {
                this.collisions = mapToArray(data.layers.find((layer) => layer.name === 'Colliders').data);
                this.interactive = mapToArray(data.layers.find((layer) => layer.name === 'Interactive Objects').data);
                this.battleZones = mapToArray(data.layers.find((layer) => layer.name === 'Battle Zones').data);
                return data;
        });
    }

    getCollisions(): Boundary[] {
        return getInteractive(this.collisions, Boundary);
    }

    getInteractive(dialogueController: DialogueController): InteractiveBoundary[] {
        return getInteractiveBoundary(this.interactive, { dialogueController, dialogues: this.dialogues });
    }

    getBattleZones(): BattleZone[] {
        return getInteractive(this.battleZones, BattleZone);
    }

    getDialogues(): DialogueData[] {
        return this.dialogues;
    }

}
