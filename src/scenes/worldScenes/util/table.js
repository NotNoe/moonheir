export default class Table extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, char_info) {
        super(scene, x, y, "table");
        this.setOrigin(0,0);
        this.char_info = char_info;
        scene.add.existing(this);
        scene.physics.add.existing(this);
        // @ts-ignore
        this.body.setImmovable(true);
        this.setScale(2,2);
    }

    interactuar(zone){
        let text = "";
        if(this.char_info.stone == null){
            text = "Hay un libro antiguo sobre forja de armas mágicas"
        }else if(this.char_info.stone == "fire"){
            text = "La piedra de fuego vibra ante las palabras del libro"
            this.char_info.unlockedWeapons.push("fire");
            this.char_info.stone == null;
        }else if(this.char_info.stone == "water"){
            text = "La piedra de agua vibra ante las palabras del libro"
            this.char_info.unlockedWeapons.push("water");
            this.char_info.stone == null;
        }else if(this.char_info.stone == "plant"){
            text = "La piedra de planta vibra ante las palabras del libro"
            this.char_info.unlockedWeapons.push("planta");
            this.char_info.stone == null;
        }

        // @ts-ignore
        this.scene.scene.pause(this.scene.scene_name);
        // @ts-ignore
        this.scene.scene.launch("DialogBoxScene", {scene_name: this.scene.scene_name, text: text});
    }
}