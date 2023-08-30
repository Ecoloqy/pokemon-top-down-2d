import { CharacterFacing } from "../utils/types.js";

export interface SingleKeyProps {
    pressed: boolean;
}

export interface SingleDirectionKeyProps extends SingleKeyProps {
    directed: boolean;
}

export interface SingleTouchKeyProps extends SingleKeyProps {
    startX: number;
    startY: number;
}

export class Keys {

    public w: SingleDirectionKeyProps = { pressed: false, directed: false };
    public a: SingleDirectionKeyProps = { pressed: false, directed: false };
    public s: SingleDirectionKeyProps = { pressed: false, directed: false };
    public d: SingleDirectionKeyProps = { pressed: false, directed: false };
    public delete: SingleKeyProps = { pressed: false };
    public end: SingleKeyProps = { pressed: false };
    public insert: SingleKeyProps = { pressed: false };
    public home: SingleKeyProps = { pressed: false };
    public touch: SingleTouchKeyProps = { pressed: false, startX: 0, startY: 0 }
    public lastKeyPressed: string = '';

    setKeyPressed(key: string, status: boolean, runPressed?: boolean): void {
        const ignoredKeys = ['delete', 'end', 'insert', 'home'];

        switch(key) {
            case 'w': {
                this.w.pressed = status;
                break;
            }
            case 'a': {
                this.a.pressed = status;
                break;
            }
            case 's': {
                this.s.pressed = status;
                break;
            }
            case 'd': {
                this.d.pressed = status;
                break;
            }
            case 'delete': {
                this.delete.pressed = status;
                break;
            }
            case 'end': {
                this.end.pressed = status;
                break;
            }
            case 'insert': {
                this.insert.pressed = status;
                break;
            }
            case 'home': {
                this.home.pressed = status;
                break;
            }
        }

        if (status && !ignoredKeys.includes(key)) {
            this.lastKeyPressed = key;
        }

        if (!status && !ignoredKeys.includes(key) && this.lastKeyPressed === key) {
            if (this.w.pressed) {
                this.lastKeyPressed = 'w';
            }
            if (this.a.pressed) {
                this.lastKeyPressed = 'a';
            }
            if (this.s.pressed) {
                this.lastKeyPressed = 's';
            }
            if (this.d.pressed) {
                this.lastKeyPressed = 'd';
            }
        }

        if (runPressed !== undefined) {
            this.end.pressed = runPressed;
        }
    }

    getKeyFacing(key: string): { facingX: CharacterFacing, facingY: CharacterFacing } {
        switch(key) {
            case "w": {
                return { facingX: 0, facingY: 1 };
            }
            case "a": {
                return { facingX: 0, facingY: -1 };
            }
            case "s": {
                return { facingX: -1, facingY: 0 };
            }
            case "d": {
                return { facingX: 1, facingY: 0 };
            }
            default: {
                return { facingX: 0, facingY: 0 };
            }
        }
    }

    getFacingKey(coords: { facingX: CharacterFacing, facingY: CharacterFacing }): string{
        if (coords.facingX === 1 && coords.facingY === 0) {
            return 'd';
        }
        if (coords.facingX === 0 && coords.facingY === -1) {
            return 'a';
        }
        if (coords.facingX === -1 && coords.facingY === 0) {
            return 's';
        }
        return 'w';
    }

}
