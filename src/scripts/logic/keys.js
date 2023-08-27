export class Keys {
    constructor() {
        this.w = { pressed: false, directed: false };
        this.a = { pressed: false, directed: false };
        this.s = { pressed: false, directed: false };
        this.d = { pressed: false, directed: false };
        this.shift = { pressed: false };
        this.touch = { pressed: false, startX: 0, startY: 0 };
        this.lastKeyPressed = '';
    }
    setKeyPressed(key, shiftPressed, status) {
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
        if (status && key !== 'shift') {
            this.lastKeyPressed = key;
        }
        console.log(shiftPressed);
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
