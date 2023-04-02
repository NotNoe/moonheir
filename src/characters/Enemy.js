// eslint-disable-next-line no-undef
export default class Enemy extends Phaser.Physics.Arcade.Sprite {

    constructor(scene, x, y){
        super(scene, x, y, 'seleni');
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.displayWidth = 57;
		this.displayHeight = 78;
    }

    attack() {
        console.log('enemigo ataca');
    }
}