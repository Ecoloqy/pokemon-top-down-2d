import { mapScale, singleTileSize } from "../../data/variables.js";
export const tileScale = () => {
    return { width: mapScale * singleTileSize, height: mapScale * singleTileSize };
};
