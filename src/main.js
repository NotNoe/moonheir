import Phaser from 'phaser'

import HelloWorldScene from './scenes/testScene'

const config = {
	type: Phaser.AUTO,
	parent: 'app',
	width: 1000,
	height: 750,
	physics: {
		default: 'arcade',
		arcade: {
			gravity: { y: 200 },
		},
	},
	scene: [HelloWorldScene],
}

export default new Phaser.Game(config)
