import blockText from "../blockText.js";
import Interactive from "./interactive.js";

export default class Lock extends Interactive {
    constructor(scene, x, y, height, width, seleni, unlock, door, dir){
        super(scene, x, y, height, width, seleni, door, 'lock');
        this.dir = dir;
        this.unlock = unlock; //Esto es lo que necesita para abrirse (Luego veremos como hacerlo más fino)
    }


    interactuar(){
        //Aqui va el codigo de interactuar, que tendrá que checkear si puede abrir y abrirla en caso
        if(this.seleni.char_info.can_open(this.unlock)){
            super.interactuar(); //Solo interactua con su objeto si puede.
        }else{
            console.log("No tienes " + this.unlock);
            // @ts-ignore
            this.scene.scene.pause(this.scene.scene_name);
            // @ts-ignore
            this.scene.scene.launch("DialogBoxScene", {scene_name: this.scene.scene_name, text: blockText[this.unlock]});
        }
    }
}