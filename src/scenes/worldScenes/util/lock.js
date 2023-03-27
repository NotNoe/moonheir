export default class Lock extends Phaser.GameObjects.Zone {
    constructor(scene, x, y, height, width, seleni, type, dir){
        super(scene, x, y, height, width);
        scene.add.existing(this);
        this.setOrigin(0, 0);
        scene.physics.world.enable(this);
        this.seleni = seleni;
        this.type = type;
        this.dir = dir;
    }
    
    preUpdate(){ //Es un poco palo, pero en el update hace eso :D
        // @ts-ignore
        if(this.scene.physics.overlap(this, this.seleni)){
            this.seleni.addInteractuable(this);
        }else{
            this.seleni.deleteInteractuable(this);
        }
    }
    ponRef(door){
        this.door = door;
    }
    interactuar(){
        //Aqui va el codigo de interactuar, que tendrá que checkear si puede abrir y abrirla en caso
        if(this.seleni.char_info.currentWeapon == this.type){
            this.seleni.deleteInteractuable(this);
            this.door.destroy();
            this.destroy();
            console.log("Puerta abierta correctamente");
            return true;
        }else{
            console.log("No tienes " + this.type);
            return false;
        }
    }
}