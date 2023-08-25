import { mapScale, singleTileSize } from "../../data/variables.js";

export interface TileScale {
    width: number;
    height: number;
}

export const tileScale = (): TileScale => {
    return { width: mapScale * singleTileSize, height: mapScale * singleTileSize };
}
