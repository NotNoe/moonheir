// @ts-nocheck
// import Phaser from 'phaser'

const SPEED = 200;

export default class Seleni extends Phaser.Physics.Arcade.Sprite{
    interactuable; char_info; scene_data;
    constructor(scene, x, y) {
        super(scene, x, y, 'seleni');
        scene.add.existing(this);
        scene.physics.add.existing(this);
		//Controles
		{
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
			this.E.on('down', event => this.interactuar());
		}
		//Animaciones
		{
			this.scene.anims.create({
				key: 'down',
				frames: this.scene.anims.generateFrameNumbers('seleni',{start: 1, end: 3}),
				frameRate: 10,
				repeat: -1
			})
			
			this.scene.anims.create({
				key: 'up',
				frames: this.scene.anims.generateFrameNumbers('seleni',{start: 9, end: 11}),
				frameRate: 10,
				repeat: -1
			})
			
			this.scene.anims.create({
				key: 'side',
				frames: this.scene.anims.generateFrameNumbers('seleni',{start: 5, end: 7}),
				frameRate: 10,
				repeat: -1
			})
	
			this.scene.anims.create({
				key: 'idle_down',
				frames: this.scene.anims.generateFrameNumbers('seleni',{start: 0, end: 0}),
				frameRate: 5,
				repeat: -1
			})
			
			this.scene.anims.create({
				key: 'idle_up',
				frames: this.scene.anims.generateFrameNumbers('seleni',{start: 8, end: 8}),
				frameRate: 5,
				repeat: -1
			})
			
			this.scene.anims.create({
				key: 'idle_side',
				frames: this.scene.anims.generateFrameNumbers('seleni',{start: 4, end: 4}),
				frameRate: 5,
				repeat: -1
			})
		}
        
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

    addInteractuable(gm){ //IMPORTANTE QUE NO PUEDA ESTAR EN MÁS DE UN INTERACTUABLE A LA VEZ NUNCA
        this.interactuable = gm; //Pone el suyo
    }

    interactuar(){
        if(this.interactuable == null) return;
		this.interactuable.interactuar();
    }

	preUpdate(t, dt) {
		super.preUpdate(t, dt);
		
		if(this.A.isDown || this.LArrow.isDown){
			this.play('side', true);
			this.flipX = true;
			this.char_info.orient = 'left';
		}
		else if(this.D.isDown|| this.RArrow.isDown){
			this.play('side', true);
			this.flipX = false;
			this.char_info.orient = 'right';
		}
		else if(this.S.isDown|| this.DArrow.isDown){
			this.play('down', true);
			this.flipX = false;
			this.char_info.orient = 'down';
		}
		else if(this.W.isDown|| this.UArrow.isDown){
			this.play('up', true);
			this.flipX = false;
			this.char_info.orient = 'up';
		}
		else if (this.char_info.orient == 'down'){
			this.play('idle_down', true);
		}
		else if (this.char_info.orient == 'up'){
			this.play('idle_up', true);
		}
		else if (this.char_info.orient == 'right'){
			this.play('idle_side', true);
		}
		else if (this.char_info.orient == 'left'){
			this.play('idle_side', true);
		}
	}

}
