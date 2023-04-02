import DialogBox from "./DialogBox";
import InputManager from "./InputManager";

// eslint-disable-next-line no-undef
export default class UIScene extends Phaser.Scene {

    constructor(){
        super({key : 'UIScene'});
        
    }

    init() {

    }

    preload() {
        this.selected = 0;
        this.load.image('btn', '../../assets/images/btn.png');
        this.load.image('btn_selected', '../../assets/images/btn_selected.png');
    }

    create() {
        // Dialogo
        this.dialog = new DialogBox(this);
        this.dialog.init();

        // Guarradas
        var btn_height = this.game.scale.height - 72 - 50;

        // Botones
        // Atq
        this.atq_btn = this.add.sprite(125, btn_height, 'btn');
        this.atq_btn.setOrigin(0, 0);
        this.atq_btn.setScale(1.5, 1.5);
        this.atq_btn.setInteractive();
        this.atq_btn.on('pointerdown', () => {
            console.log("atq");
        });

        // Def
        this.def_btn = this.add.sprite(125 * 2 + 144, btn_height, 'btn');
        this.def_btn.setOrigin(0, 0);
        this.def_btn.setScale(1.5, 1.5);
        this.def_btn.setInteractive();
        this.def_btn.on('pointerdown', () => {
            console.log("def");
        });

        // Obj
        this.obj_btn = this.add.sprite(125 * 3 + 288, btn_height, 'btn');
        this.obj_btn.setOrigin(0, 0);
        this.obj_btn.setScale(1.5, 1.5);
        this.obj_btn.setInteractive();
        this.obj_btn.on('pointerdown', () => {
            console.log("obj");
            this.atq_btn.visible = false;
            this.def_btn.visible = false;
        });
        this.obj_btn.on('pointerup', () => {
            this.atq_btn.visible = true;
            this.def_btn.visible = true;
        });
        this.obj_btn.on('pointerout', () => {
            this.atq_btn.visible = true;
            this.def_btn.visible = true;
        });

        // MOVIMIENTO FLECHAS
        this.inputManager = new InputManager(this);
        this.inputManager.A.on('down', () => {
            --this.selected;
            if(this.selected < 0){
                this.selected = 2;
            }
        });
        this.inputManager.D.on('down', () => {
            ++this.selected;
            if(this.selected > 2){
                this.selected = 0;
            }
        });
        
        // PULSAR OPCIÓN
        this.inputManager.SPACE.on('down', () =>{
            if(this.selected == 0){
                this.dialog.setText('Seleni ataca al enemigo', true);
                console.log('atq');
            }
            else if(this.selected == 1){
                this.dialog.setText('Seleni se defiende', true);
                console.log('def');
            }
            else if(this.selected == 2){
                this.dialog.setText('Seleni ha usado una poción', true);
                console.log('obj');
            }
        });
        

    }

    update() {
        if(this.selected == 0) {
            this.atq_btn.setTexture('btn_selected');
            this.def_btn.setTexture('btn');
            this.obj_btn.setTexture('btn');
        }
        else if(this.selected == 1) {
            this.atq_btn.setTexture('btn');
            this.def_btn.setTexture('btn_selected');
            this.obj_btn.setTexture('btn');
        }
        else if(this.selected == 2) {
            this.atq_btn.setTexture('btn');
            this.def_btn.setTexture('btn');
            this.obj_btn.setTexture('btn_selected');
        }
    }
}