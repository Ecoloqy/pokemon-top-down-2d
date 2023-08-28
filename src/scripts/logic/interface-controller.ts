import {Keys} from "./keys";

export class InterfaceController {

    constructor(keys: Keys) {
        ['a-button', 'b-button'].forEach((buttonName) => document.getElementById(buttonName).addEventListener('touchstart', (event: TouchEvent) => {
            event.preventDefault();
            event.stopImmediatePropagation();
            const buttonKey = buttonName === 'a-button' ? 'delete' : 'end';
            keys.setKeyPressed(buttonKey, true);
        }, { passive: false }));

        ['a-button', 'b-button'].forEach((buttonName) => document.getElementById(buttonName).addEventListener('touchend', (event: TouchEvent) => {
            event.preventDefault();
            event.stopImmediatePropagation();
            const buttonKey = buttonName === 'a-button' ? 'delete' : 'end';
            keys.setKeyPressed(buttonKey, false);
        }, { passive: false }));

        document.getElementById('reset-button').addEventListener('click', (event: MouseEvent) => {
            event.preventDefault();
            event.stopImmediatePropagation();
            location.reload();
        }, { passive: false });

        document.getElementById('mute-button').addEventListener('click', (event: MouseEvent) => {
            event.preventDefault();
            event.stopImmediatePropagation();
            document.getElementById('unmute-button').classList.remove('hidden');
            document.getElementById('mute-button').classList.add('hidden');
            document.querySelectorAll('audio').forEach((element: HTMLAudioElement) => {
                element.muted = true;
                element.pause();
            });
        }, { passive: false });

        document.getElementById('unmute-button').addEventListener('click', (event: MouseEvent) => {
            event.preventDefault();
            event.stopImmediatePropagation();
            document.getElementById('mute-button').classList.remove('hidden');
            document.getElementById('unmute-button').classList.add('hidden');
            document.querySelectorAll('audio').forEach((element: HTMLAudioElement) => {
                element.muted = false;
                element.play();
            });
        }, { passive: false });
    }

}
