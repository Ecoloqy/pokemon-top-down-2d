import { tileScale } from "./tile-scale.js";
import { backgroundOffsetX, backgroundOffsetY } from "../../data/variables.js";
import { InteractiveBoundary } from "../models/interactive-boundary.js";
export const getInteractiveBoundary = (cells, data) => {
    const newObjects = [];
    cells.forEach((row, y) => {
        row.forEach((symbol, x) => {
            if (symbol !== 0) {
                const xPos = (x * tileScale().width) + backgroundOffsetX;
                const yPos = (y * tileScale().height) + backgroundOffsetY;
                const dialogueController = data.dialogueController;
                const newCell = new InteractiveBoundary({
                    position: { x: xPos, y: yPos },
                    dialogueController,
                    interact: () => {
                        var _a, _b;
                        const textContent = (_b = (_a = data.dialogues.find((dialogue) => dialogue.x === xPos && dialogue.y === yPos)) === null || _a === void 0 ? void 0 : _a.content[0]) !== null && _b !== void 0 ? _b : '';
                        dialogueController === null || dialogueController === void 0 ? void 0 : dialogueController.setDialogueText(textContent);
                    },
                });
                newObjects.push(newCell);
            }
        });
    });
    return newObjects;
};
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
