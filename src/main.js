import Phaser from 'phaser'
import LoadScene  from './scenes/LoadScene';
import MenuScene  from './scenes/MenuScene';
import World0_1  from './scenes/worldScenes/World0/World0_1';
import World1_1  from './scenes/worldScenes/World1/World1_1';
import World1_2 from './scenes/worldScenes/World1/World1_2';
import World1_3 from './scenes/worldScenes/World1/World1_3';
import World1_4 from './scenes/worldScenes/World1/World1_4';
import World1_5 from './scenes/worldScenes/World1/World1_5';
import World1_6 from './scenes/worldScenes/World1/World1_6';
import World1_7 from './scenes/worldScenes/World1/World1_7';
import World1_8 from './scenes/worldScenes/World1/World1_8';
import World1_9 from './scenes/worldScenes/World1/World1_9';

const scenes = [];
scenes.push(LoadScene);
scenes.push(MenuScene);
scenes.push(World0_1);
scenes.push(World1_1);
scenes.push(World1_2);
scenes.push(World1_3);
scenes.push(World1_4);
scenes.push(World1_5);
scenes.push(World1_6);
scenes.push(World1_7);
scenes.push(World1_8);
scenes.push(World1_9);

const config = {
	type: Phaser.CANVAS,
	canvas: document.getElementById('juego'),
	pixelArt: true,
	scale: {
		mode: Phaser.Scale.FIT,
		autoCenter: Phaser.Scale.CENTER_BOTH
	},
	width: 1000,
	height: 750,
	physics: {
		default: 'arcade',
		arcade: {
			gravity: { y: 0 },
			debug: true
		},
	},	
	scene: scenes
}

export default new Phaser.Game(config)
