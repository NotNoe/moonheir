
import Phaser from 'phaser'
import LoadScene  from './scenes/LoadScene.js';
import MenuScene  from './scenes/MenuScene.js';
import World0_1  from './scenes/worldScenes/World0/World0_1.js';
import World1_1  from './scenes/worldScenes/World1/World1_1.js';
import World1_2 from './scenes/worldScenes/World1/World1_2.js';
import World1_3 from './scenes/worldScenes/World1/World1_3.js';
import World1_4 from './scenes/worldScenes/World1/World1_4.js';
import World1_5 from './scenes/worldScenes/World1/World1_5.js';
import World1_6 from './scenes/worldScenes/World1/World1_6.js';
import World1_7 from './scenes/worldScenes/World1/World1_7.js';
import World1_8 from './scenes/worldScenes/World1/World1_8.js';
import World1_9 from './scenes/worldScenes/World1/World1_9.js';
import CombatScene from './scenes/combat/CombatScene.js';
import UIScene from './scenes/combat/UIScene.js';
import InventoryScene from './scenes/Menu/InventoryScene.js';
import ChangeWeaponScene from './scenes/Menu/ChangeWeapon.js';

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
scenes.push(CombatScene);
scenes.push(UIScene);
scenes.push(InventoryScene);
scenes.push(ChangeWeaponScene);

const config = {
	type: Phaser.WEBGL,
	canvas: document.getElementById('juego'),
	pixelArt: true,
	scale: {
		mode: Phaser.Scale.FIT,  
		autoCenter: Phaser.Scale.CENTER_HORIZONTALLY
	},
	width: 1000,
	height: 750,
	physics: {
		default: 'arcade',
		arcade: {
			gravity: { y:0 },
			debug: true
		},
	},	
	scene: scenes
}

export default new Phaser.Game(config)
