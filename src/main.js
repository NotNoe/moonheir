//import Phaser from 'phaser'
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
import World2_1 from './scenes/worldScenes/World2/World2_1.js';
import World2_2 from './scenes/worldScenes/World2/World2_2.js';
import World2_3 from './scenes/worldScenes/World2/World2_3.js';
import World2_4 from './scenes/worldScenes/World2/World2_4.js';
import CombatScene from './scenes/combat/CombatScene.js';
import UIScene from './scenes/combat/UIScene.js';
import InventoryScene from './scenes/Menu/InventoryScene.js';
import ChangeWeaponScene from './scenes/Menu/ChangeWeapon.js';
import DialogBoxScene from './scenes/worldScenes/util/DialogBox.js';
import World0_2 from './scenes/worldScenes/World0/World0_2.js';

const scenes = [];
scenes.push(LoadScene);
scenes.push(MenuScene);
scenes.push(World0_1);
scenes.push(World0_2);
scenes.push(World1_1);
scenes.push(World1_2);
scenes.push(World1_3);
scenes.push(World1_4);
scenes.push(World1_5);
scenes.push(World1_6);
scenes.push(World1_7);
scenes.push(CombatScene);
scenes.push(UIScene);
scenes.push(InventoryScene);
scenes.push(ChangeWeaponScene);
scenes.push(DialogBoxScene);
scenes.push(World2_1);
scenes.push(World2_2);
scenes.push(World2_3);
scenes.push(World2_4);

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
			debug: false
		},
	},	
	scene: scenes
}

export default new Phaser.Game(config)
