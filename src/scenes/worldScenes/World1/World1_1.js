import WorldScene from '../worldScene.js'
import Patxi from '../../../characters/patxi.js';

export default class World1_1 extends WorldScene{
    patxi;
    constructor(){
        super('World1_1', 'tilemapWorld1_1', 'tileset');
    }

    create(){
        super.create();
        this.patxi = new Patxi(this, this.game.renderer.width/2, this.game.renderer.height/2);
		this.patxi.scene_data = this.scene_data;
		this.patxi.setCollideWorldBounds(true);
		this.physics.add.collider(this.layer, this.patxi);
    }
}