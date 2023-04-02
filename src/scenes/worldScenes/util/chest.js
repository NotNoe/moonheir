

export default class Chest extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'chest');
        this.setOrigin(0,0);
        scene.add.existing(this);
        scene.physics.add.existing(this);
        // @ts-ignore
        this.body.setImmovable(true);

    }

    interactuar(zone){ //La función de abrir el cofre, por ahora solo pone un mensaje en pantalla
        console.log("Cofre abierto correctamente");
        // @ts-ignore
        this.scene.scene_data.cofre.open = true; //En tiempo dinámico existirá pq es una WorldScene
        zone.delete_zone(); //Le dice a la zona que deje de detectar las cosas.
    }
}