import Phaser from 'phaser'

export default class Seleni extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y) {
        super(scene, x, y, 'char');
        const w = this.scene.input.keyboard.addKey('W', false, true);
        const a = this.scene.input.keyboard.addKey('A', false, true);
        const s = this.scene.input.keyboard.addKey('S', false, true);
        const d = this.scene.input.keyboard.addKey('D', false, true);
        w.on('down', event => {
            if(this.y-5 >= 0)
                this.y-=5;
            else
                this.y=0;
        })
        a.on('down', event => {
            if(this.x-5 >= 0)
                this.x-=5;
            else
                this.x=0;
        })
        s.on('down', event => {
            if(this.y+5 < 750)
                this.y+=5;
            else
                this.y=750;
        })
        d.on('down', event => {
            if(this.x+5 < 1000)
                this.x+=5;
            else
                this.x=1000;
        })
    }

    preUpdate(t, dt){
        super.preUpdate(t, dt);

    }
}