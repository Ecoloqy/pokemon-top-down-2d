export class InterfaceController {
    constructor() {
        document.getElementById('reset-button').addEventListener('click', (event) => {
            location.reload();
        });
        document.getElementById('mute-button').addEventListener('click', (event) => {
            console.log(event);
            document.getElementById('unmute-button').classList.remove('hidden');
            document.getElementById('mute-button').classList.add('hidden');
            document.querySelectorAll('audio').forEach((element) => {
                element.muted = true;
                element.pause();
            });
        });
        document.getElementById('unmute-button').addEventListener('click', (event) => {
            document.getElementById('mute-button').classList.remove('hidden');
            document.getElementById('unmute-button').classList.add('hidden');
            document.querySelectorAll('audio').forEach((element) => {
                element.muted = false;
                element.play();
            });
        });
    }
}
