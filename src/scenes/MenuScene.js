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
            this.scene.start('World0_0', {x: 500,y: 350});
        })
    }
}