export class Keys {
    constructor() {
        this.w = { pressed: false };
        this.a = { pressed: false };
        this.s = { pressed: false };
        this.d = { pressed: false };
        this.shift = { pressed: false };
        this.lastKeyPressed = '';
    }
    setKeyPressed(key, shiftPressed, status) {
        switch (key.toLowerCase()) {
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
        if (status && key !== 'Shift') {
            this.lastKeyPressed = key.toLowerCase();
        }
        this.shift.pressed = shiftPressed;
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
