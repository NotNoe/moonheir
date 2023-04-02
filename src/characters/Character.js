// eslint-disable-next-line no-undef
export default class Character extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, sprite){
        super(scene, x, y, sprite);
        scene.add.existing(this);
        scene.physics.add.existing(this);
    }

    preUpdate(t, dt) {
        super.preUpdate(t, dt);
    }
}