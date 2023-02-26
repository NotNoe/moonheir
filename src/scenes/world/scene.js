import Phaser from 'phaser'
import Seleni from '../../characters/seleni';
import Changer from '../../util/changer';

//La idea es que esto sea una "clase abstracta". Todas las escenas del mundo serán
//Una subclase de esta clase, porque la carga y todo eso es igual, lo único distinto será el
//tilemap en principio

export default class WorldScene extends Phaser.Scene {
	map; tileset; seleni;
	constructor(scene_name, tilemap, char_info) {
		super(scene_name);
		this.char_info = char_info;
		this.tilemap = tilemap;
	}


	create() {
		console.log("Estoy en un create");
		this.map = this.make.tilemap({
			key: this.tilemap
		});
		this.tileset = this.map.addTilesetImage('tileset_test', 'tileset');
		this.map.createLayer('Background/Floor', this.tileset);
		this.map.createLayer('Background/Flowers', this.tileset);
		//const layer = this.map.createLayer('Solid', this.tileset);

		this.seleni = new Seleni(this, this.char_info);
		this.seleni.setCollideWorldBounds(true);
		
		//Esto registra los objetos de la capa "change". Ojo cuidao que es una guarrada lo de 
		//objeto.properties[0], pero no estaba consiguiendo hacerlo de otro modo. Si no lo añadimos att todo
		//Debería de ir bien

		for (const objeto of this.map.getObjectLayer('Change').objects) {
			console.log()
			let obj =  this.add.rectangle(objeto.x, objeto.y, objeto.width, objeto. height);
			this.physics.add.existing(obj);
			this.physics.add.collider(obj, this.seleni, (o1, o2) => {
				console.log("Nos cambiamos de escena");
				this.scene.start(objeto.properties[0].value);
			});
		}
		
	}
}
