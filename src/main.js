import Phaser from 'phaser'
import { CombatScene } from './scenes/CombatScene';
import  LoadScene  from './scenes/LoadScene';
import  MenuScene  from './scenes/MenuScene';
import { UIScene } from './scenes/UIScene';
import  World0_0  from './scenes/worldScenes/World0_0';
import  World0_1  from './scenes/worldScenes/World0_1';

const scenes = [];
scenes.push(CombatScene);
scenes.push(UIScene);
scenes.push(LoadScene);
scenes.push(MenuScene);
scenes.push(World0_0);
scenes.push(World0_1);

const config = {
	type: Phaser.AUTO,
	pixelArt: true,
	scale: {
		mode: Phaser.Scale.FIT,
		autoCenter: Phaser.Scale.CENTER_BOTH
	},
	parent: 'app',
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
