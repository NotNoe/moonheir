import Interactive from "./interactive";

export default class Lock extends Interactive {
    constructor(scene, x, y, height, width, seleni, unlock, door, dir){
        super(scene, x, y, height, width, seleni, door, 'lock');
        this.dir = dir;
        this.unlock = unlock; //Esto es lo que necesita para abrirse (Luego veremos como hacerlo más fino)
    }


    interactuar(){
        //Aqui va el codigo de interactuar, que tendrá que checkear si puede abrir y abrirla en caso
        if(this.seleni.char_info.currentWeapon == this.unlock){
            super.interactuar(); //Solo interactua con su objeto si puede.
        }else{
            console.log("No tienes " + this.unlock);
        }
    }
}