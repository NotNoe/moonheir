import Bed from '../util/bed.js';
import Interactive from '../util/interactive.js';
import Table from '../util/table.js';
import WorldScene from '../worldScene.js'

export default class World0_2 extends WorldScene {
    constructor(){
        super('World0_2', 'tilemapWorld0_2', 'pixil_tileset_2');
    }
    create(){
        super.create();
        //Añadimos la cama y la mesa.
        if(this.scene_data.bed != null){ //Deberia de ser true siempre
            let obj = this.scene_data.bed['bed'];
            let bed = new Bed(this, obj.x, obj.y, this.char_info);
            obj = this.scene_data.bed['interactive'];
            let inter = new Interactive(this, obj.x, obj.y, obj.width, obj.height, this.seleni, bed, 'bed');
            this.physics.add.collider(this.seleni, bed);
            this.physics.add.overlap(this.seleni, inter);
        }if(this.scene_data.table != null){ //Deberia de ser true siempre
            let obj = this.scene_data.table['table'];
            let table = new Table(this, obj.x, obj.y, this.char_info);
            obj = this.scene_data.table['interactive'];
            let inter = new Interactive(this, obj.x, obj.y, obj.width, obj.height, this.seleni, table, 'table');
            this.physics.add.collider(this.seleni, table);
            this.physics.add.overlap(this.seleni, inter);
        }
        
    }
}