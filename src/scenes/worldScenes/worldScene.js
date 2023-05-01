// @ts-nocheck
// import Phaser from 'phaser'
import Seleni from '../../characters/seleni.js';
import Changer from './util/changer.js';
import Door from './util/door.js';
import Lock from './util/lock.js';
import Chest from './util/chest.js';
import Interactive from './util/interactive.js';
import Enemy_Data from '../../characters/enemy_data.js';
import WorldEnemy from './util/worldEnemy.js';
import InventoryData from '../Menu/InventoryData.js';
import SceneData from './util/sceneData.js';
import LibChanger from './util/LibChanger.js';

//La idea es que esto sea una "clase abstracta". Todas las escenas del mundo serán
//Una subclase de esta clase, porque la carga y todo eso es igual, lo único distinto será el
//tilemap en principio

export default class WorldScene extends Phaser.Scene {
	char_info; scene_data; scenes_data; layer;
	esc; Q;
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
		this.events.on("resume", envent => {
			this.seleni.dir.x = 0;
			this.seleni.dir.y = 0;
		})
	}


	create() {
		if(this.scene_data == null){
			let map = this.make.tilemap({key: this.tilemap});
			this.scene_data = new SceneData(map);
			this.scenes_data[this.scene_name] = this.scene_data;
		}
		let map = this.make.tilemap({
			key: this.tilemap
		});

		map.addTilesetImage(this.tileset, this.tileset); //Lo primero es el nombre del set que se puso en tiled, lo segundo el nombre del recurso en memoria

		//Creamos el fondo, que no necesita colisiones ni nada
		map.createLayer('Back/Background', this.tileset);
		map.createLayer('Back/Path', this.tileset);
		//Creamos la capa de obstáculos y le ponemos colisiones
		this.layer = map.createLayer('Obstacles', this.tileset);
		// @ts-ignore
		this.layer.setCollisionByExclusion(-1, true);

		//Creamos el personaje y hacemos que se choque contra los obstáculos
		this.seleni = new Seleni(this, this.char_info.pos.x, this.char_info.pos.y);
		this.seleni.char_info = this.char_info;
		this.seleni.scene_data = this.scene_data;
		this.seleni.setCollideWorldBounds(true);
		this.physics.add.collider(this.layer, this.seleni);

		// Añadimos los interactuables
		this.addDoors();
		this.addChest();
		this.addEnemies();

		//Controles para menu
		this.esc = this.input.keyboard.addKey('esc', true, true);
		this.esc.on('down', event => {
			let inventoryData = new InventoryData();
			inventoryData.scene_name = this.scene_name;
			inventoryData.char_info = this.char_info;
			inventoryData.page_number = 2; //TODO:Cambiar si cambia el num de pags
			this.seleni.dir.x = 0;
			this.seleni.dir.y = 0;
			this.scene.launch('InventoryScene', inventoryData);
			this.scene.pause(this.scene_name); //Se pausa
			
		});
		this.Q = this.input.keyboard.addKey('q', true, true);
		this.Q.on('down', event => {
			let inventoryData = new InventoryData();
			inventoryData.scene_name = this.scene_name;
			inventoryData.char_info = this.char_info;
			inventoryData.page_number = 0;
			this.seleni.dir.x = 0;
			this.seleni.dir.y = 0;
			this.scene.launch('InventoryScene', inventoryData);
			this.scene.pause(this.scene_name); //Se pausa
			
		});
	}

	addEnemies(){
		if(this.scene_data.enemigo != undefined && !this.scene_data.enemigo.defeated) {
			console.log("Hay un Enemigo");

			//Ponemos el objeto
			let enemy_obj = this.scene_data.enemigo.data;

			let enemy_data = new Enemy_Data();
			for (const { name, value } of enemy_obj.properties) {
				enemy_data[name] = value;
			}
			enemy_data.scene_data = this.scene_data;
			new WorldEnemy(this, enemy_obj.x, enemy_obj.y, enemy_data, this.scene_name);
		}
	}

	addChest(){
		if(this.scene_data.cofre != undefined) {
			console.log("Hay un cofre");
			//Ponemos el objeto
			let chest_obj = this.scene_data.cofre.chest;
			let overlap_obj = this.scene_data.cofre.overlap;
			let open = this.scene_data.cofre.open;
			let drop;
			for (const { name, value } of chest_obj.properties) {
				if(name == "drop") drop = value;
			}
			//Pintamos el cofre
			let chest = new Chest(this, chest_obj.x, chest_obj.y, open, drop);
			this.physics.add.collider(chest, this.seleni);
			let overlap;
			if(!open){ //Solo ponemos la interacción si estaba cerrado
				overlap = new Interactive(this, overlap_obj.x, overlap_obj.y, overlap_obj.width, overlap_obj.height, this.seleni, chest, 'chest');
				this.physics.add.overlap(overlap, this.seleni);
			}
		}
	}

	addLibDoor(direccion){
		let obj = this.scene_data.data[direccion]; //V1 es el changer
		let changer = new LibChanger(this, obj.x, obj.y, direccion); //En realidad esto no existe como tal, simplemente se pone
		let inter = new Interactive(this, obj.x, obj.y, obj.width, obj.height, this.seleni, changer);
	}

	addDoors() {
		for (const direccion in this.scene_data.data) {
			if(direccion == 'lib_in' || direccion == 'lib_out'){
				this.addLibDoor(direccion);
				continue;
			} //Las puertas de la librería se hacen aparte.
			let v1 = this.scene_data.data[direccion];
			let lock, door;
			let type, img, obj_aux;
			for (const tipo in v1) {
				let obj = v1[tipo];
				switch (tipo) {
					case 'lock': { //Esto siempre tiene que hacerse despues de door
						for (const { name, value } of obj.properties) {
							if (name == "type") type = value;
						}
						obj_aux = obj;
						break;
					}
					case 'door': {
						for (const { name, value } of obj.properties) {
							if (name == "img") img = value;
						}
						door = new Door(this, obj.x, obj.y, img);
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
									console.log(this.scenes_data);
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
			}
			if(door != undefined && obj_aux != undefined){ //Esto es para tener ya la puerta
				lock = new Lock(this, obj_aux.x, obj_aux.y, obj_aux.width, obj_aux.height, this.seleni, type, door, direccion);
				this.physics.add.overlap(lock, this.seleni);
			}
		}
	}
	
	
}
