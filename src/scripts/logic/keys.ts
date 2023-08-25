import {CharacterFacing} from "../utils/interfaces";

export interface SingleKeyProps {
    pressed: boolean;
}

export class Keys {

    public w: SingleKeyProps = { pressed: false };
    public a: SingleKeyProps = { pressed: false };
    public s: SingleKeyProps = { pressed: false };
    public d: SingleKeyProps = { pressed: false };
    public shift: SingleKeyProps = { pressed: false };
    public lastKeyPressed: string = '';

    setKeyPressed(key: string, shiftPressed: boolean, status: boolean): void {
        switch(key) {
            case "w": {
                this.w.pressed = status;
                break;
            }
            case "a": {
                this.a.pressed = status;
                break;
            }
            case "s": {
                this.s.pressed = status;
                break;
            }
            case "d": {
                this.d.pressed = status;
                break;
            }
        }

        if (status && key !== 'shift') {
            this.lastKeyPressed = key;
        }

        this.shift.pressed = shiftPressed;
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

}
