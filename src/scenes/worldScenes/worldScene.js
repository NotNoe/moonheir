// @ts-nocheck
import Phaser from 'phaser'
import Seleni from '../../characters/seleni';
import Changer from './util/changer';
import Door from './util/door';
import Lock from './util/lock';

//La idea es que esto sea una "clase abstracta". Todas las escenas del mundo serán
//Una subclase de esta clase, porque la carga y todo eso es igual, lo único distinto será el
//tilemap en principio

export default class WorldScene extends Phaser.Scene {
	char_info; interactive = [];
	constructor(scene_name, tilemap, tileset) {
		super(scene_name);
		this.scene_name = scene_name;
		this.tilemap = tilemap;
		this.tileset = tileset;
	}

	init(char_info){
		this.char_info = char_info;
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
		this.seleni.setCollideWorldBounds(true);
		this.physics.add.collider(layer, this.seleni);
		
		//Ponemos las puertas (Una panzá de código repetitivo :D)
		
			layer = map.getObjectLayer('Doors/North'); //Norte
			if(layer != null) {
				let lock, door;
				layer.objects.forEach(obj => {
					switch(obj.name){
						case 'lock':{
							let type;
							for (const { name, value } of obj.properties) {
								if(name == "type") type = value;
							}
							lock = new Lock(this, obj.x, obj.y, obj.width, obj.height, this.seleni, type);
							this.physics.add.overlap(lock, this.seleni);
							break;
						}
						case 'door':{
							door = new Door(this, obj.x, obj.y, true);
							this.physics.add.collider(door, this.seleni);
							break;
						}
						case 'changer':{
							let changer = new Changer(this, obj.x, obj.y, true);
							let nextScene;
							for (const { name, value } of obj.properties) {
								if(name == "nextScene") nextScene = value;
							}
							this.physics.add.overlap(this.seleni, changer, (obj1, obj2) => {
								this.char_info.pos.x = this.game.renderer.width/2;
								this.char_info.pos.y = this.game.renderer.height - this.seleni.height/2 - 1;
								console.log(nextScene);
								this.scene.start(nextScene, this.char_info);
							})
							break;
						}
					}
				})
				if(lock != null && door != null) lock.ponRef(door);
			}
			layer = map.getObjectLayer('Doors/South');
			if(layer != null) {
				let lock, door;
				layer.objects.forEach(obj => {
					switch(obj.name){
						case 'lock':{
							let type;
							for (const { name, value } of obj.properties) {
								if(name == "type") type = value;
							}
							lock = new Lock(this, obj.x, obj.y, obj.width, obj.height, this.seleni, type);
							this.physics.add.overlap(lock, this.seleni);
							break;
						}
						case 'door':{
							door = new Door(this, obj.x, obj.y, true);
							this.physics.add.collider(door, this.seleni);
							break;
						}
						case 'changer':{
							let changer = new Changer(this, obj.x, obj.y, true);
							let nextScene;
							for (const { name, value } of obj.properties) {
								if(name == "nextScene") nextScene = value;
							}
							this.physics.add.overlap(this.seleni, changer, (obj1, obj2) => {
								this.char_info.pos.x = this.game.renderer.width/2;
								this.char_info.pos.y = this.seleni.height/2 + 1;
								console.log(nextScene);
								this.scene.start(nextScene, this.char_info);
							})
							break;
						}
					}
				})
				if(lock != null && door != null) lock.ponRef(door);
			}
			layer = map.getObjectLayer('Doors/East');
			if(layer != null) {
				let lock, door;
				layer.objects.forEach(obj => {
					switch(obj.name){
						case 'lock':{
							let type;
							for (const { name, value } of obj.properties) {
								if(name == "type") type = value;
							}
							lock = new Lock(this, obj.x, obj.y, obj.width, obj.height, this.seleni, type);
							this.physics.add.overlap(lock, this.seleni);
							break;
						}
						case 'door':{
							door = new Door(this, obj.x, obj.y, false);
							this.physics.add.collider(door, this.seleni);
							break;
						}
						case 'changer':{
							let changer = new Changer(this, obj.x, obj.y, false);
							let nextScene;
							for (const { name, value } of obj.properties) {
								if(name == "nextScene") nextScene = value;
							}
							this.physics.add.overlap(this.seleni, changer, (obj1, obj2) => {
								this.char_info.pos.x = this.seleni.width/2 + 1;
								this.char_info.pos.y = this.game.renderer.height/2;
								console.log(nextScene);
								this.scene.start(nextScene, this.char_info);
							})
							break;
						}
					}
				})
				if(lock != null && door != null) lock.ponRef(door);
			}
			layer = map.getObjectLayer('Doors/West');
			if(layer != null) {
				let lock, door;
				layer.objects.forEach(obj => {
					switch(obj.name){
						case 'lock':{
							let type;
							for (const { name, value } of obj.properties) {
								if(name == "type") type = value;
							}
							lock = new Lock(this, obj.x, obj.y, obj.width, obj.height, this.seleni, type);
							this.physics.add.overlap(lock, this.seleni);
							break;
						}
						case 'door':{
							door = new Door(this, obj.x, obj.y, false);
							this.physics.add.collider(door, this.seleni);
							break;
						}
						case 'changer':{
							let changer = new Changer(this, obj.x, obj.y, false);
							let nextScene;
							for (const { name, value } of obj.properties) {
								if(name == "nextScene") nextScene = value;
							}
							this.physics.add.overlap(this.seleni, changer, (obj1, obj2) => {
								this.char_info.pos.x = this.seleni.width/2 + 1;
								this.char_info.pos.y = this.game.renderer.height/2;
								console.log(nextScene);
								this.scene.start(nextScene, this.char_info);
							})
							break;
						}
					}
				})
				if(lock != null && door != null) lock.ponRef(door);
			}
		

	}
	
}
