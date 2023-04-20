export default class TextPage extends Phaser.GameObjects.Container {
    constructor(scene, x, y, text){
        super(scene, x, y);
        const aux = scene.add.text(50,50,text,{fontSize: '40px'}).setOrigin(0,0);
        aux.setColor();
        aux.setFontFamily('CustomFont');
        aux.setColor('#FFFFFF');
        this.add(aux);
    }
}