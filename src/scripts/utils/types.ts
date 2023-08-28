import { Boundary } from "../models/boundary.js";
import { BattleZone } from "../models/battle-zone.js";

export type CharacterFacing = -1 | 0 | 1;
export type PokemonName = 'bulbasaur' | 'charmander' | 'squirtle' | 'pidgey';
export type InteractiveModel = typeof Boundary | typeof BattleZone;
export type Interactive = Boundary | BattleZone;
