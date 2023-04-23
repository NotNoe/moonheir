// eslint-disable-next-line no-undef
export default class InputManager extends Phaser.GameObjects.Sprite {
    constructor(scene){
        super(scene, -100, -100, '../../assets/images/input.png');

        // Controles
		this.A = this.scene.input.keyboard.addKey('A');
		this.D = this.scene.input.keyboard.addKey('D');
		this.E = this.scene.input.keyboard.addKey('E'); 
		this.scene.add.existing(this); 
    }
}