export default class Interactive extends Phaser.GameObjects.Zone { //Una vez más, una clase abstracta para las cosas con las que seleni interactua
    constructor(scene, x, y, height, width, seleni, interaccion, type){
        super(scene, x, y, height, width);
        scene.add.existing(this);
        this.setOrigin(0, 0);
        scene.physics.world.enable(this);
        this.seleni = seleni;
        this.interaccion = interaccion;
        this.type = type;
    }
    
    preUpdate(){ //Es un poco palo, pero en el update hace eso
        // @ts-ignore
        if(this.scene.physics.overlap(this, this.seleni)){
            this.seleni.addInteractuable(this);
        }else{
            this.seleni.deleteInteractuable(this);
        }
    }

    interactuar(){
        console.log("esta interactuando");
        this.interaccion.interactuar(this); //Todos los objetos con los que se puede interactuar tendrán el método homónimo
                                        //Que además recibe una referencia a la zona por si la necesita para algo (por ejemplo borrarla)
    }

    delete_zone(){ //Esto es para que lo sobreescriban y cada uno haga lo que tenga que hacer en su muerte :D
        this.seleni.deleteInteractuable(this); //Antes de morir siempre tiene que dejar de ser interactivo.
        this.destroy();
    }
}