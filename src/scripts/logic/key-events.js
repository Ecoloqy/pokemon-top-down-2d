export class KeyEvents {
    constructor(keys) {
        this.moveDirectionModifier = 40;
        this.runDirectionModifier = 80;
        ['keydown', 'keyup'].forEach((eventName, index) => {
            window.addEventListener(eventName, (event) => {
                keys.setKeyPressed(event.key.toLowerCase(), event.shiftKey, index === 0);
            });
        });
        window.addEventListener('touchstart', (event) => {
            keys.touch.pressed = true;
            keys.touch.startX = event.targetTouches.item(0).clientX;
            keys.touch.startY = event.targetTouches.item(0).clientY;
        });
        window.addEventListener('touchmove', (event) => {
            if (keys.touch.pressed) {
                keys.w.directed = keys.touch.startY > event.targetTouches.item(0).clientY + this.moveDirectionModifier;
                keys.a.directed = keys.touch.startX > event.targetTouches.item(0).clientX + this.moveDirectionModifier;
                keys.s.directed = event.targetTouches.item(0).clientY > keys.touch.startY + this.moveDirectionModifier;
                keys.d.directed = event.targetTouches.item(0).clientX > keys.touch.startX + this.moveDirectionModifier;
                if (!keys.a.directed && !keys.s.directed && !keys.d.directed) {
                    keys.setKeyPressed('w', keys.touch.startY > event.targetTouches.item(0).clientY + this.runDirectionModifier, keys.touch.startY > event.targetTouches.item(0).clientY + this.moveDirectionModifier);
                }
                if (!keys.w.directed && !keys.s.directed && !keys.d.directed) {
                    keys.setKeyPressed('a', keys.touch.startX > event.targetTouches.item(0).clientX + this.runDirectionModifier, keys.touch.startX > event.targetTouches.item(0).clientX + this.moveDirectionModifier);
                }
                if (!keys.w.directed && !keys.a.directed && !keys.d.directed) {
                    keys.setKeyPressed('s', event.targetTouches.item(0).clientY > keys.touch.startY + this.runDirectionModifier, event.targetTouches.item(0).clientY > keys.touch.startY + this.moveDirectionModifier);
                }
                if (!keys.w.directed && !keys.a.directed && !keys.s.directed) {
                    keys.setKeyPressed('d', event.targetTouches.item(0).clientX > keys.touch.startX + this.runDirectionModifier, event.targetTouches.item(0).clientX > keys.touch.startX + this.moveDirectionModifier);
                }
            }
        });
        window.addEventListener('touchend', () => {
            keys.touch.pressed = false;
            keys.setKeyPressed('w', false, false);
            keys.setKeyPressed('a', false, false);
            keys.setKeyPressed('s', false, false);
            keys.setKeyPressed('d', false, false);
        });
    }
}
