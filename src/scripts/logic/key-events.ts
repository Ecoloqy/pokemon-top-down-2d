import { Keys } from "./keys.js";

export class KeyEvents {

    private readonly moveDirectionModifier = 40;
    private readonly runDirectionModifier = 80;

    constructor(keys: Keys) {
        ['keydown', 'keyup'].forEach((eventName, index) => {
            window.addEventListener(eventName, (event: KeyboardEvent) => {
                keys.setKeyPressed(event.key.toLowerCase(), index === 0);
            });
        })

        window.addEventListener('touchstart', (event: TouchEvent) => {
            keys.touch.pressed = true;
            keys.touch.startX = event.targetTouches.item(0).clientX;
            keys.touch.startY = event.targetTouches.item(0).clientY;

            document.getElementById('x-axis').textContent = Math.round(keys.touch.startX) + '';
            document.getElementById('y-axis').textContent = Math.round(keys.touch.startY) + '';
        })

        window.addEventListener('touchmove', (event: TouchEvent) => {
            if (keys.touch.pressed) {
                const newXCursorPos = event.targetTouches.item(0).clientX;
                const newYCursorPos = event.targetTouches.item(0).clientY;

                keys.w.directed = keys.touch.startY > newYCursorPos + this.moveDirectionModifier;
                keys.a.directed = keys.touch.startX > newXCursorPos + this.moveDirectionModifier;
                keys.s.directed = newYCursorPos > keys.touch.startY + this.moveDirectionModifier;
                keys.d.directed = newXCursorPos > keys.touch.startX + this.moveDirectionModifier;

                if (!keys.a.directed && !keys.s.directed && !keys.d.directed) {
                    document.getElementById('y-axis').textContent = Math.round(keys.touch.startY) + ' - ' + Math.round(newYCursorPos);
                    keys.setKeyPressed('w', keys.touch.startY > newYCursorPos + this.moveDirectionModifier, keys.touch.startY > newYCursorPos + this.runDirectionModifier);
                }
                if (!keys.w.directed && !keys.s.directed && !keys.d.directed) {
                    document.getElementById('x-axis').textContent = Math.round(keys.touch.startX) + ' - ' + Math.round(newXCursorPos);
                    keys.setKeyPressed('a', keys.touch.startX > newXCursorPos + this.moveDirectionModifier, keys.touch.startX > newXCursorPos + this.runDirectionModifier);
                }
                if (!keys.w.directed && !keys.a.directed && !keys.d.directed) {
                    document.getElementById('y-axis').textContent = Math.round(keys.touch.startY) + ' + ' + Math.round(newYCursorPos);
                    keys.setKeyPressed('s', newYCursorPos > keys.touch.startY + this.moveDirectionModifier, newYCursorPos > keys.touch.startY + this.runDirectionModifier);
                }
                if (!keys.w.directed && !keys.a.directed && !keys.s.directed) {
                    document.getElementById('x-axis').textContent = Math.round(keys.touch.startX) + ' + ' + Math.round(newXCursorPos);
                    keys.setKeyPressed('d', newXCursorPos > keys.touch.startX + this.moveDirectionModifier, newXCursorPos > keys.touch.startX + this.runDirectionModifier);
                }
            }
        })

        window.addEventListener('touchend', (event: TouchEvent) => {
            keys.touch.pressed = false;
            keys.setKeyPressed('w', false, false);
            keys.setKeyPressed('a', false, false);
            keys.setKeyPressed('s', false, false);
            keys.setKeyPressed('d', false, false);
        })
    }

}
