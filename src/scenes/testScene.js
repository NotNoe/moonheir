import Phaser from 'phaser'
import Seleni from '../characters/seleni'

export default class HelloWorldScene extends Phaser.Scene {
	constructor() {
		super('hello-world')
	}

	preload() {
        
		this.load.image('background', 'assets/backgroun.jpg')
		this.load.image('char', 'assets/character.png')
	}

	create() {
		this.add.image(0, 0, 'background').setOrigin(0,0)
        const personaje = new Seleni(this,500,500);
        this.add.existing(personaje);
        this.input.keyboard.addKey('w');
        
        
	}
}
