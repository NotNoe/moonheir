import { charInfo } from "../characters/charInfo";

export default class MenuScene extends Phaser.Scene{
    constructor(){
        super({key: 'MenuScene'});
    }

    init(){
        
    }

    create(){
        this.add.image(0,0,'menu_bg').setOrigin(0,0);
        this.add.image(this.game.renderer.width/2, this.game.renderer.height * 0.2, "tittle");
        let button = this.add.sprite(this.game.renderer.width/2, this.game.renderer.height*0.6, "play_button");
        //this.sound.add('music', {loop: true}).play(); //Esto comentado porque no me apetece escuchar la musiquita cada vez
        button.setInteractive();
        button.on("pointerup", ()=>{
            let info = new charInfo();
            info.pos.x = this.game.renderer.width/2;
            info.pos.y = this.game.renderer.height/2;
            this.scene.start('World0_1', info);
        })
    }
}