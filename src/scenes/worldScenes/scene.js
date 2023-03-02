import Phaser from 'phaser'
import Seleni from '../../characters/seleni';

//La idea es que esto sea una "clase abstracta". Todas las escenas del mundo serán
//Una subclase de esta clase, porque la carga y todo eso es igual, lo único distinto será el
//tilemap en principio

export default class WorldScene extends Phaser.Scene {
	map; tileset; seleni; player_posX; player_posY;
	constructor(scene_name, tilemap, char_info) {
		super(scene_name);
		this.char_info = char_info;
		this.tilemap = tilemap;
	}

	init(pos){
		this.player_posX = pos.x;
		this.player_posY = pos.y;
	}


	create() {
		console.log("Estoy en un create");
		this.map = this.make.tilemap({
			key: this.tilemap
		});
		this.tileset = this.map.addTilesetImage('tileset_test', 'tileset');
		this.map.createLayer('Background/Floor', this.tileset);
		this.map.createLayer('Background/Flowers', this.tileset);
		let layer = this.map.createLayer('Solid', this.tileset);
		layer.setCollisionBetween(0,999);
		this.physics.add.collider(layer, this.seleni);

		this.seleni = new Seleni(this, this.char_info, this.player_posX, this.player_posY);
		this.seleni.setCollideWorldBounds(true);
		this.physics.add.collider(layer, this.seleni);
		
		//Esto registra los objetos de la capa "change". Ojo cuidao que es una guarrada lo de 
		//objeto.properties[0], pero no estaba consiguiendo hacerlo de otro modo. Si no lo añadimos att todo
		//Debería de ir bien

		for (const objeto of this.map.getObjectLayer('Change').objects) {
			console.log(objeto);
			let obj =  this.add.rectangle(objeto.x, objeto.y, objeto.width, objeto. height);
			this.physics.add.existing(obj);
			this.physics.add.overlap(obj, this.seleni, (o1, o2) => {
				let pos = {x:500, y:350};
				if(objeto.properties[0].value === "S"){
					pos.y = 650;
				}else if(objeto.properties[0].value === "N"){
					pos.y = 100;
				}else if(objeto.properties[0].value === "E"){
					pos.x = 950;
				}else if(objeto.properties[0].value === "W"){
					pos.x = 75;
				}
				this.scene.start(objeto.properties[1].value, pos);
			});
		}
		
	}
}
