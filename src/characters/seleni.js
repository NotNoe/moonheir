import Phaser from 'phaser'

const SPEED = 200;

export default class Seleni extends Phaser.Physics.Arcade.Sprite{
    //Creo que cada escena tiene que tener un personaje distinto, porque el Sprite
    //se crea asociado a la escena
    interactuable; char_info;
    constructor(scene, x, y) {
        super(scene, x, y, 'char');
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.W = this.scene.input.keyboard.addKey('W', true, true);
        this.A = this.scene.input.keyboard.addKey('A', true, true);
        this.S = this.scene.input.keyboard.addKey('S', true, true);
        this.D = this.scene.input.keyboard.addKey('D', true, true);
        this.UArrow = this.scene.input.keyboard.addKey('UP', true, true);
        this.LArrow = this.scene.input.keyboard.addKey('LEFT', true, true);
        this.DArrow = this.scene.input.keyboard.addKey('DOWN', true, true);
        this.RArrow = this.scene.input.keyboard.addKey('RIGHT', true, true);

        this.W.on('down', event => this.goUp(true));
        this.A.on('down', event => this.goLeft(true));
        this.S.on('down', event => this.goDown(true));
        this.D.on('down', event => this.goRight(true));
        this.UArrow.on('down', event => this.goUp(true));
        this.LArrow.on('down', event => this.goLeft(true));
        this.DArrow.on('down', event => this.goDown(true));
        this.RArrow.on('down', event => this.goRight(true));
        this.W.on('up', event => this.goUp(false));
        this.A.on('up', event => this.goLeft(false));
        this.S.on('up', event => this.goDown(false));
        this.D.on('up', event => this.goRight(false));
        this.UArrow.on('up', event => this.goUp(false));
        this.LArrow.on('up', event => this.goLeft(false));
        this.DArrow.on('up', event => this.goDown(false));
        this.RArrow.on('up', event => this.goRight(false));


        this.E = this.scene.input.keyboard.addKey('E', true, false);
        this.space = this.scene.input.keyboard.addKey('SPACE', true, false);
        this.enter = this.scene.input.keyboard.addKey('Enter', true, false);
        this.E.on('down', event => this.interactuar());
        this.space.on('down', event => this.interactuar());
        this.enter.on('down', event => this.interactuar());
        
    }
    goUp(b){
        if(b)
            this.setVelocityY(-SPEED);
        else
            this.setVelocityY(0);
    }
    goLeft(b){
        if(b)
            this.setVelocityX(-SPEED);
        else
            this.setVelocityX(0);
    }
    goRight(b){
        if(b)
            this.setVelocityX(SPEED);
        else
            this.setVelocityX(0);
        
    }
    goDown(b){
        if(b)
            this.setVelocityY(SPEED);
        else
            this.setVelocityY(0);
    }

    deleteInteractuable(gm){
        if(this.interactuable === gm) this.interactuable = null; //Si es el que estaba, lo borra
    }

    addInteractuable(gm){
        this.interactuable = gm; //Pone el suyo
    }

    interactuar(){
        if(this.interactuable == null) return;
        this.interactuable.interactuar();
    }
}