import {CharacterFacing} from "../utils/interfaces";

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
    public shift: SingleKeyProps = { pressed: false };
    public touch: SingleTouchKeyProps = { pressed: false, startX: 0, startY: 0 }
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

        console.log(shiftPressed);
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
