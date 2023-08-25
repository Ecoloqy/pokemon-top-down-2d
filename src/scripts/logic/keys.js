export class Keys {
    constructor() {
        this.w = { pressed: false };
        this.a = { pressed: false };
        this.s = { pressed: false };
        this.d = { pressed: false };
        this.lastKeyPressed = '';
        this.anyMoveKeyPressed = false;
    }
    setKeyPressed(key, status) {
        switch (key) {
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
    getKeyFacing(key) {
        switch (key) {
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
