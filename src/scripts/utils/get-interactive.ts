import { tileScale } from "./tile-scale.js";
import { backgroundOffsetX, backgroundOffsetY } from "../../data/variables.js";
import { DialogueController } from "../logic/dialogue-controller.js";
import { DialogueData } from "./interfaces.js";
import { InteractiveBoundary } from "../models/interactive-boundary.js";
import { TerrainBlockModel } from "./types";

export const getInteractiveBoundary = (cells: number[][], data: { dialogueController: DialogueController, dialogues: DialogueData[] }) => {
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
                        const textContent = data.dialogues.find((dialogue) => dialogue.x === xPos && dialogue.y === yPos)?.content[0] ?? '';
                        dialogueController?.setDialogueText(textContent);
                    },
                });

                newObjects.push(newCell);
            }
        })
    });
    return newObjects;
}

export const getInteractive = <T>(cells: number[][], objectType: TerrainBlockModel): T[] => {
    const newObjects = [];
    cells.forEach((row, y) => {
        row.forEach((symbol, x) => {
            if (symbol !== 0) {
                const newCell = new objectType({
                    position: {
                        x: (x * tileScale().width) + backgroundOffsetX,
                        y: (y * tileScale().height) + backgroundOffsetY
                    }
                }) as T;

                newObjects.push(newCell);
            }
        })
    });
    return newObjects;
}
