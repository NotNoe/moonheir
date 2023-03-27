// eslint-disable-next-line no-undef
export class UIScene extends Phaser.Scene {

    constructor(){
        super({key : 'UIScene'});
    }

    init() {

    }

    preload() {
        this.load.image('btn', '/assets/images/btn.png');
    }

    create() {
        // Guarradas
        var btn_height = this.game.scale.height - 72 - 50;

        // Botones
        // Atq
        let atq_btn = this.add.sprite(158, btn_height, 'btn');
        atq_btn.setOrigin(0, 0);
        atq_btn.setScale(1.5, 1.5);
        atq_btn.setInteractive();
        atq_btn.on('pointerdown', () => {
            console.log("atq");
        });

        // Def
        let def_btn = this.add.sprite(this.game.scale.width / 2 - 72, btn_height, 'btn');
        def_btn.setOrigin(0, 0);
        def_btn.setScale(1.5, 1.5);
        def_btn.setInteractive();
        def_btn.on('pointerdown', () => {
            console.log("def");
        });

        // Obj
        let obj_btn = this.add.sprite(this.game.scale.width - 302, btn_height, 'btn');
        obj_btn.setOrigin(0, 0);
        obj_btn.setScale(1.5, 1.5);
        obj_btn.setInteractive();
        obj_btn.on('pointerdown', () => {
            console.log("obj");
            atq_btn.visible = false;
            def_btn.visible = false;
        });
        obj_btn.on('pointerup', () => {
            atq_btn.visible = true;
            def_btn.visible = true;
        });
        obj_btn.on('pointerout', () => {
            atq_btn.visible = true;
            def_btn.visible = true;
        });


    }

    update() {
        
    }

}