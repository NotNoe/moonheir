// @ts-ignore
import DialogBox from "./DialogBox";

export default class Door extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, type) {
        super(scene, x, y, type);
        this.setOrigin(0,0);
        scene.add.existing(this);
        scene.physics.add.existing(this);
        // @ts-ignore
        this.body.setImmovable(true);
        
    }

    interactuar(zone){
        // @ts-ignore
        this.scene.scene_data.delete_door(zone.dir);
        zone.delete_zone();
        console.log("Puerta abierta correctamente");
        // @ts-ignore
        this.scene.scene.pause(this.scene.scene_name);
        // @ts-ignore
        this.scene.scene.launch("DialogBoxScene", {scene_name: this.scene.scene_name, text: "Has conseguido despejar el obstáculo."});
        this.destroy();
    }
}