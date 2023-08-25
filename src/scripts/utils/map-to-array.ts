import { mapWidth } from "../../data/variables.js";

export const mapToArray = (array: number[]): number[][] => {
    const newArrayMap: number[][] = [];
    for (let i = 0; i < array.length; i += mapWidth) {
        newArrayMap.push(array.slice(i, i + mapWidth));
    }
    return newArrayMap;
}
