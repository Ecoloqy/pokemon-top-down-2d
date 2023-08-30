import { Boundary } from "../models/boundary.js";
import { BattleZone } from "../models/battle-zone.js";

export type CharacterFacing = -1 | 0 | 1;
export type MapName = 'world' | 'poke_center' | 'poke_mart' | 'gardener' | 'house1' | 'house2' | 'oak_laboratory' | 'poke_mansion';
export type PokemonName = 'bulbasaur' | 'charmander' | 'squirtle' | 'pidgey';
export type AttackName = 'ember' | 'bubbles' | 'quick_attack' | 'tail_whip';
export type AttackType = 'Fire' | 'Water' | 'Normal' | 'Dark' | 'Ground' | 'Rock' | 'Fighting' | 'Psychic';
export type InteractiveModel = typeof Boundary | typeof BattleZone;
export type Interactive = Boundary | BattleZone;
