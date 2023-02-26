import Phaser from 'phaser'

const SPEED = 200;

export default class Seleni extends Phaser.Physics.Arcade.Sprite{
    //Creo que cada escena tiene que tener un personaje distinto, porque el Sprite
    //se crea asociado a la escena
    constructor(scene, info) {
        super(scene, 0, 0, 'char');
        this.info = info; //Esto son los datos del personaje
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

    setPos(x, y){
        this.setPosition(x, y);
    } //Lo usaremos para mover el personaje a la posición adecuada.
}