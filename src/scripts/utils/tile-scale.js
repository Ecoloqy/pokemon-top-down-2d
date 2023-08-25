import { mapScale, singleTileHeight, singleTileWidth } from "../../data/variables.js";
export const tileScale = () => {
    return { width: mapScale * singleTileWidth, height: mapScale * singleTileHeight };
};
