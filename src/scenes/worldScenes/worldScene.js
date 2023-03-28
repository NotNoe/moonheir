// @ts-nocheck
import Phaser from 'phaser'
import Seleni from '../../characters/seleni';
import Changer from './util/changer';
import Door from './util/door';
import Lock from './util/lock';
import SceneData from './util/sceneData.js';

//La idea es que esto sea una "clase abstracta". Todas las escenas del mundo serán
//Una subclase de esta clase, porque la carga y todo eso es igual, lo único distinto será el
//tilemap en principio

export default class WorldScene extends Phaser.Scene {
	char_info; scene_data; scenes_data;
	constructor(scene_name, tilemap, tileset) {
		super(scene_name);
		this.scene_name = scene_name;
		this.tilemap = tilemap;
		this.tileset = tileset;
	}

	init(data) {
		this.char_info = data.char_info;
		this.scenes_data = data.scenes_data;
		this.scene_data = this.scenes_data[this.scene_name];
	}


	create() {
		let map = this.make.tilemap({
			key: this.tilemap
		});
		this.tileset = map.addTilesetImage('tileset', 'tileset'); //Lo primero es el nombre del set que se puso en tiled, lo segundo el nombre del recurso en memoria

		//Creamos el fondo, que no necesita colisiones ni nada
		map.createLayer('Back/Background', this.tileset);
		map.createLayer('Back/Details', this.tileset);
		map.createLayer('Back/Path', this.tileset);
		//Creamos la capa de obstáculos y le ponemos colisiones
		let layer = map.createLayer('Obstacles', this.tileset);
		// @ts-ignore
		layer.setCollisionByExclusion(-1, true);

		//Creamos el personaje y hacemos que se choque contra los obstáculos
		this.seleni = new Seleni(this, this.char_info.pos.x, this.char_info.pos.y);
		this.seleni.char_info = this.char_info;
		this.seleni.scene_data = this.scene_data;
		this.seleni.setCollideWorldBounds(true);
		this.physics.add.collider(layer, this.seleni);

		//Ponemos las puertas (Una panzá de código repetitivo :D)
		this.addDoors();

	}

	addDoors() {
		for (const direccion in this.scene_data.data) {
			let v1 = this.scene_data.data[direccion];
			let lock, door;
			for (const tipo in v1) {
				let obj = v1[tipo];
				switch (tipo) {
					case 'lock': {
						let type;
						for (const { name, value } of obj.properties) {
							if (name == "type") type = value;
						}
						lock = new Lock(this, obj.x, obj.y, obj.width, obj.height, this.seleni, type, direccion);
						this.physics.add.overlap(lock, this.seleni);
						break;
					}
					case 'door': {
						door = new Door(this, obj.x, obj.y, direccion == 'south' || direccion == 'north');
						this.physics.add.collider(door, this.seleni);
						break;
					}
					case 'changer': {
						let changer = new Changer(this, obj.x, obj.y, direccion == 'south' || direccion == 'north');
						let nextScene;
						for (const { name, value } of obj.properties) {
							if (name == "nextScene") nextScene = value;
						}
						this.physics.add.overlap(this.seleni, changer, (obj1, obj2) => {
							switch(direccion){
								case 'north':{
									this.char_info.pos.x = this.game.renderer.width / 2;
									this.char_info.pos.y = this.game.renderer.height - this.seleni.displayHeight / 2 - 1;
									console.log("Iniciando escena: " + nextScene);
									this.scene.start(nextScene, {char_info:this.char_info, scenes_data:this.scenes_data});
									break;
								}
								case 'west':{
									this.char_info.pos.x = this.game.renderer.width - this.seleni.displayWidth / 2 - 1;
									this.char_info.pos.y = this.game.renderer.height / 2;
									console.log("Iniciando escena: " +nextScene);
									this.scene.start(nextScene, {char_info:this.char_info, scenes_data:this.scenes_data});
									break;
								}case 'east':{
									this.char_info.pos.x = this.seleni.displayWidth / 2 + 1;
									this.char_info.pos.y = this.game.renderer.height / 2;
									console.log("Iniciando escena: " +nextScene);
									this.scene.start(nextScene, {char_info:this.char_info, scenes_data:this.scenes_data});
									break;
								}case 'south':{
									this.char_info.pos.x = this.game.renderer.width / 2;
									this.char_info.pos.y = this.seleni.displayHeight / 2 + 1;
									console.log("Iniciando escena: " +nextScene);
									this.scene.start(nextScene, {char_info:this.char_info, scenes_data:this.scenes_data});
									break;
								}
							}
						})
						break;
					}
				}
				if (lock != undefined && door != undefined) lock.ponRef(door);
			}
		}
	}	
}
