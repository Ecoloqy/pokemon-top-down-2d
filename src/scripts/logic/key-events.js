export class KeyEvents {
    constructor(keys) {
        this.moveDirectionModifier = 40;
        this.runDirectionModifier = 80;
        ['keydown', 'keyup'].forEach((eventName, index) => {
            window.addEventListener(eventName, (event) => {
                keys.setKeyPressed(event.key.toLowerCase(), index === 0);
            });
        });
        document.querySelector('canvas').addEventListener('touchstart', (event) => {
            event.preventDefault();
            event.stopImmediatePropagation();
            keys.touch.pressed = true;
            keys.touch.startX = event.targetTouches.item(0).clientX;
            keys.touch.startY = event.targetTouches.item(0).clientY;
        }, { passive: false });
        document.querySelector('canvas').addEventListener('touchmove', (event) => {
            event.preventDefault();
            event.stopImmediatePropagation();
            if (keys.touch.pressed) {
                const newXCursorPos = event.targetTouches.item(0).clientX;
                const newYCursorPos = event.targetTouches.item(0).clientY;
                keys.w.directed = keys.touch.startY > newYCursorPos + this.moveDirectionModifier;
                keys.a.directed = keys.touch.startX > newXCursorPos + this.moveDirectionModifier;
                keys.s.directed = newYCursorPos > keys.touch.startY + this.moveDirectionModifier;
                keys.d.directed = newXCursorPos > keys.touch.startX + this.moveDirectionModifier;
                if (!keys.a.directed && !keys.s.directed && !keys.d.directed) {
                    keys.setKeyPressed('w', keys.touch.startY > newYCursorPos + this.moveDirectionModifier, keys.touch.startY > newYCursorPos + this.runDirectionModifier);
                }
                if (!keys.w.directed && !keys.s.directed && !keys.d.directed) {
                    keys.setKeyPressed('a', keys.touch.startX > newXCursorPos + this.moveDirectionModifier, keys.touch.startX > newXCursorPos + this.runDirectionModifier);
                }
                if (!keys.w.directed && !keys.a.directed && !keys.d.directed) {
                    keys.setKeyPressed('s', newYCursorPos > keys.touch.startY + this.moveDirectionModifier, newYCursorPos > keys.touch.startY + this.runDirectionModifier);
                }
                if (!keys.w.directed && !keys.a.directed && !keys.s.directed) {
                    keys.setKeyPressed('d', newXCursorPos > keys.touch.startX + this.moveDirectionModifier, newXCursorPos > keys.touch.startX + this.runDirectionModifier);
                }
            }
        }, { passive: false });
        document.querySelector('canvas').addEventListener('touchend', (event) => {
            event.preventDefault();
            event.stopImmediatePropagation();
            keys.touch.pressed = false;
            keys.setKeyPressed('w', false, false);
            keys.setKeyPressed('a', false, false);
            keys.setKeyPressed('s', false, false);
            keys.setKeyPressed('d', false, false);
        }, { passive: false });
    }
}
