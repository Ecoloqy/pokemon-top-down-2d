export class Keys {
    constructor() {
        this.w = { pressed: false, directed: false };
        this.a = { pressed: false, directed: false };
        this.s = { pressed: false, directed: false };
        this.d = { pressed: false, directed: false };
        this.delete = { pressed: false };
        this.end = { pressed: false };
        this.insert = { pressed: false };
        this.home = { pressed: false };
        this.touch = { pressed: false, startX: 0, startY: 0 };
        this.lastKeyPressed = '';
    }
    setKeyPressed(key, status, runPressed) {
        const ignoredKeys = ['delete', 'end', 'insert', 'home'];
        switch (key) {
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
