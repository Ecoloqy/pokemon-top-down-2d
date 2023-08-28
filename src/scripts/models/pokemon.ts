export class Pokemon {

    public hp: number = 20;

    private readonly frontImage: HTMLImageElement = new Image();
    private readonly backImage: HTMLImageElement = new Image();
    private readonly name: string = '';

    constructor(name: string, hp: number, frontImageSrc: string, backImageSrc: string) {
        this.name = name;
        this.hp = hp;
        this.frontImage.src = frontImageSrc;
        this.backImage.src = backImageSrc;
    }

}
