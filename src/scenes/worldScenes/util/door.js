export default class Door extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, type) {
        super(scene, x, y, type);
        this.setOrigin(0,0);
        scene.add.existing(this);
        scene.physics.add.existing(this);
        // @ts-ignore
        this.body.setImmovable(true);

    }

    interactuar(zone){
        this.scene.scene_data.delete_door(zone.dir);
        zone.delete_zone();
        this.destroy();
        console.log("Puerta abierta correctamente");
    }
}