export default class WorldEnemy extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, enemy_data, scene_name){
        super(scene, x, y, enemy_data.sprite);
        this.enemy_data = enemy_data;
        enemy_data.scene_name = scene_name; //Esto le hace falta para volver
        enemy_data.enemigo = this; //Esto para eliminarlo
        enemy_data.char_info = scene.seleni.char_info;
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.scene.physics.world.enable(this);
        this.scene.physics.add.overlap(scene.seleni, this, (ob1, ob2) => {
            if(ob1 == this){
                let aux = ob1;
                ob1 = ob2;
                ob2 = aux;
            } //ob1 siempre seleni y ob2 siempre yo
            // @ts-ignore
            ob1.setVelocityX(0);
            // @ts-ignore
            ob1.setVelocityY(0);
            this.scene.scene.pause(scene_name); //Pausa esta escena.
            this.scene.scene.launch('CombatScene', enemy_data);

        })

    }

    




}