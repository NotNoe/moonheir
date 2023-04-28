export default class Bed extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, char_info) {
        super(scene, x, y, "bed");
        this.setOrigin(0,0);
        this.char_info = char_info;
        scene.add.existing(this);
        scene.physics.add.existing(this);
        // @ts-ignore
        this.body.setImmovable(true);
    }

    interactuar(zone){
        console.log("Vida recuperada");
        this.char_info.health = this.char_info.max_health;
        // @ts-ignore
        this.scene.scene.pause(this.scene.scene_name);
        // @ts-ignore
        this.scene.scene.launch("DialogBoxScene", {scene_name: this.scene.scene_name, text: "Descansas y recuperas toda la vida."});
    }
}