import { getInteractive } from "../../scripts/utils/get-interactive.js";
import { Boundary } from "../../scripts/models/boundary.js";
import { BattleZone } from "../../scripts/models/battle-zone.js";
import { mapToArray } from "../../scripts/utils/map-to-array.js";
import { MapName } from "../../scripts/utils/types.js";

export class ParseData {

    collisions: number[][] = [];
    interactive: number[][] = [];
    battleZones: number[][] = [];

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

    getInteractive(): Boundary[] {
        return getInteractive(this.interactive, Boundary);
    }

    getBattleZones(): BattleZone[] {
        return getInteractive(this.battleZones, BattleZone);
    }

}
