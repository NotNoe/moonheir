export default class Patxi extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y) {
		super(scene, x, y, 'patxi');
		this.setOrigin(0,0);
        scene.add.existing(this);
        scene.physics.add.existing(this);
        // @ts-ignore
        this.body.setImmovable(true);
    }

	interactuar(zone){
        console.log("Seleni interactua con Patxi");
        // @ts-ignore
        this.scene.scene_data.enemigo.defeated = true; //En tiempo dinámico existirá pq es una WorldScene
        zone.delete_zone(); // Le dice a la zona que deje de detectar las cosas.
    }

}
