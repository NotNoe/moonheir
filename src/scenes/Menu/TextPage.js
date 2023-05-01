export default class TextPage extends Phaser.GameObjects.Container {
    constructor(scene, x, y, text){
        super(scene, x, y);
        const aux = scene.add.text(50,50,text,{fontSize: '35px'}).setOrigin(0,0);
        aux.setColor();
        aux.setFontFamily('CustomFont');
        aux.setColor('#000000');
        this.add(aux);
    }
}