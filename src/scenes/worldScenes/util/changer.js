export default class Changer extends Phaser.GameObjects.Zone {
    constructor(scene, x, y, horizontal){
        super(scene, x, y, horizontal ? 100 : 1, horizontal ? 1 : 100);
        scene.add.existing(this);
        this.setOrigin(0, 0);
        scene.physics.world.enable(this);
    }
}