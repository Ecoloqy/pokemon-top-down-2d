export class Pokemon {
    constructor(name, hp, frontImageSrc, backImageSrc) {
        this.hp = 20;
        this.frontImage = new Image();
        this.backImage = new Image();
        this.name = '';
        this.name = name;
        this.hp = hp;
        this.frontImage.src = frontImageSrc;
        this.backImage.src = backImageSrc;
    }
}
