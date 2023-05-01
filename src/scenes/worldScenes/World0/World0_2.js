import WorldScene from '../worldScene.js'

export default class World0_2 extends WorldScene {
    constructor(){
        super('World0_2', 'tilemapWorld0_2', 'tileset2');
        console.log("El nextScene funciona bien");
    }
}