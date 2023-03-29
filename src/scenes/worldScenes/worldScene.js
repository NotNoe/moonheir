// @ts-nocheck
// import Phaser from 'phaser'
import Seleni from '../../characters/seleni.js';
import Changer from './util/changer.js';
import Door from './util/door.js';
import Lock from './util/lock.js';
import Chest from './util/chest.js';
import Interactive from './util/interactive.js';

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
		this.tileset = map.addTilesetImage('tileset-pixilart', 'tileset'); //Lo primero es el nombre del set que se puso en tiled, lo segundo el nombre del recurso en memoria

		//Creamos el fondo, que no necesita colisiones ni nada
		map.createLayer('Back/Background', this.tileset);
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
		this.addChest();
	}

	addChest(){
		if(this.scene_data.cofre != undefined) {
			console.log("Hay un cofre");
			//Ponemos el objeto
			let chest_obj = this.scene_data.cofre.chest;
			let overlap_obj = this.scene_data.cofre.overlap;
			let open = this.scene_data.cofre.open;
			//Pintamos el cofre
			let chest = new Chest(this, chest_obj.x, chest_obj.y, open);
			this.physics.add.collider(chest, this.seleni);
			let overlap;
			if(!open){ //Solo ponemos la interacción si estaba cerrado
				overlap = new Interactive(this, overlap_obj.x, overlap_obj.y, overlap_obj.width, overlap_obj.height, this.seleni, chest, 'chest');
				this.physics.add.overlap(overlap, this.seleni);
			}
		}
	}

	addDoors() {
		for (const direccion in this.scene_data.data) {
			let v1 = this.scene_data.data[direccion];
			let lock, door;
			let type, obj_aux;
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
									this.char_info.pos.y = this.game.renderer.height - this.seleni.displayHeight / 2 - 1 - 10;
									console.log("Iniciando escena: " + nextScene);
									this.scene.start(nextScene, {char_info:this.char_info, scenes_data:this.scenes_data});
									break;
								}
								case 'west':{
									this.char_info.pos.x = this.game.renderer.width - this.seleni.displayWidth / 2 - 1 - 10;
									this.char_info.pos.y = this.game.renderer.height / 2;
									console.log("Iniciando escena: " +nextScene);
									this.scene.start(nextScene, {char_info:this.char_info, scenes_data:this.scenes_data});
									break;
								}case 'east':{
									this.char_info.pos.x = this.seleni.displayWidth / 2 + 1 + 10;
									this.char_info.pos.y = this.game.renderer.height / 2;
									console.log("Iniciando escena: " +nextScene);
									this.scene.start(nextScene, {char_info:this.char_info, scenes_data:this.scenes_data});
									break;
								}case 'south':{
									this.char_info.pos.x = this.game.renderer.width / 2;
									this.char_info.pos.y = this.seleni.displayHeight / 2 + 1 + 10;
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
