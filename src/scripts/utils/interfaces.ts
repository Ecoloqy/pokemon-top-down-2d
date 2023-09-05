import { Cell } from "../models/cell.js";

export interface DialogueData {
    x?: number;
    y?: number;
    character?: string;
    content: string[];
}

export interface InteractiveElement extends Cell {
    interact: (same: Object) => void;
}
