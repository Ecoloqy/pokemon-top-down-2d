import {CharacterFacing} from "../utils/interfaces";

export interface SingleKeyProps {
    pressed: boolean;
}

export class Keys {

    public w: SingleKeyProps = { pressed: false };
    public a: SingleKeyProps = { pressed: false };
    public s: SingleKeyProps = { pressed: false };
    public d: SingleKeyProps = { pressed: false };
    public lastKeyPressed: string = '';
    public anyMoveKeyPressed: boolean = false;

    setKeyPressed(key: string, status: boolean): void {
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

        if (status) {
            this.lastKeyPressed = key;
        }

        this.anyMoveKeyPressed = this.w.pressed || this.a.pressed || this.s.pressed || this.d.pressed;
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
