export default class LibChanger extends Phaser.GameObjects.Zone {
    // @ts-ignore
    constructor(scene, x, y, direccion){
        super(scene, x, y);
        this.direccion = direccion; //in/out
    }
    interactuar(){
        if(this.direccion == 'lib_in'){
            // @ts-ignore
            this.scene.char_info.pos.x = this.scene.game.renderer.width / 2;
			// @ts-ignore
			this.scene.char_info.pos.y = this.scene.game.renderer.height - this.scene.seleni.displayHeight / 2 - 1;
			console.log("Iniciando escena: " + 'World0_2');
			// @ts-ignore
			this.scene.scene.start('World0_2', {char_info:this.scene.char_info, scenes_data:this.scene.scenes_data});
        }else if(this.direccion == "lib_out"){
            // @ts-ignore
            this.scene.char_info.pos.x = 225;
			// @ts-ignore
			this.scene.char_info.pos.y = 350 + 2 + this.scene.seleni.height / 2;
			console.log("Iniciando escena: " + 'World0_1');
			// @ts-ignore
			this.scene.scene.start('World0_1', {char_info:this.scene.char_info, scenes_data:this.scene.scenes_data});
        }
    }
}