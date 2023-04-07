export default class Patxi extends Phaser.Physics.Arcade.Sprite{
    //Creo que cada escena tiene que tener un personaje distinto, porque el Sprite
    //se crea asociado a la escena
    interactuable; scene_data;
    constructor(scene, x, y) {
        super(scene, x, y, 'patxi');
        console.log("Creando a Patxi");
        scene.add.existing(this);
        scene.physics.add.existing(this);

		//Controles
		{
			this.E = this.scene.input.keyboard.addKey('E', true, false);
			this.space = this.scene.input.keyboard.addKey('SPACE', true, false);
			this.enter = this.scene.input.keyboard.addKey('Enter', true, false);
			this.E.on('down', event => this.interactuar());
			this.space.on('down', event => this.interactuar());
			this.enter.on('down', event => this.interactuar());
		}
		//Animaciones
		{
			this.scene.anims.create({
				key: 'idle_down',
				frames: this.scene.anims.generateFrameNumbers('patxi',{start: 0, end: 0}),
				frameRate: 5,
				repeat: -1
			})
		}
        
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
        this.play('idle_down', true);
	}

}
