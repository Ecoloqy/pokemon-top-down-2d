import { tileScale } from "./tile-scale.js";
import { backgroundOffsetX, backgroundOffsetY } from "../../data/variables.js";
export const getInteractive = (cells, objectType) => {
    const newObjects = [];
    cells.forEach((row, y) => {
        row.forEach((symbol, x) => {
            if (symbol !== 0) {
                const newCell = new objectType({
                    position: {
                        x: (x * tileScale().width) + backgroundOffsetX,
                        y: (y * tileScale().height) + backgroundOffsetY
                    }
                });
                newObjects.push(newCell);
            }
        });
    });
    return newObjects;
};