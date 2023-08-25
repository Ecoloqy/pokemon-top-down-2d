import { mapScale, singleTileHeight, singleTileWidth } from "../../data/variables.js";

export interface TileScale {
    width: number;
    height: number;
}

export const tileScale = (): TileScale => {
    return { width: mapScale * singleTileWidth, height: mapScale * singleTileHeight };
}
