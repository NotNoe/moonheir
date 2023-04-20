import DialogBox from "./DialogBox";
import InputManager from "../input/InputManager";

// eslint-disable-next-line no-undef
export default class UIScene extends Phaser.Scene {

    constructor(){
        super({key : 'UIScene'});
        this.dialog = new DialogBox(this);
        this.atq_btn;
        this.def_btn;
        this.obj_btn;
        this.sceneCombat;
    }

    init() {
        this.dialog.init();
    }

    preload() {
        this.selected = 0;
    }

    create() {
        this.sceneCombat = this.scene.get('CombatScene');

        var btn_height = this.game.scale.height - 72 - 50;

        // Botones
        // Atq
        this.atq_btn = this.add.sprite(125, btn_height, 'btn');
        this.atq_btn.setOrigin(0, 0);
        this.atq_btn.setScale(1.5, 1.5);
        this.atq_btn.setInteractive();

        // Def
        this.def_btn = this.add.sprite(125 * 2 + 144, btn_height, 'btn');
        this.def_btn.setOrigin(0, 0);
        this.def_btn.setScale(1.5, 1.5);
        this.def_btn.setInteractive();

        // Obj
        this.obj_btn = this.add.sprite(125 * 3 + 288, btn_height, 'btn');
        this.obj_btn.setOrigin(0, 0);
        this.obj_btn.setScale(1.5, 1.5);
        this.obj_btn.setInteractive();

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
        this.inputManager.E.on('down', () => {
            if(this.selected == 0){
                this.dialog.setText('Seleni ataca al enemigo', true);
                console.log('atq');
                // @ts-ignore
                this.sceneCombat.seleniAtaca();
            }
            else if(this.selected == 1){
                this.dialog.setText('Seleni se defiende', true);
                console.log('def');
                // @ts-ignore
                this.sceneCombat.seleniDefiende();
            }
            else if(this.selected == 2){
                this.dialog.setText('Seleni ha usado una poción', true);
                console.log('obj');
                // @ts-ignore
                this.sceneCombat.seleniCura();
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

    setEnemyDialog(){
        this.dialog.setText('Enemigo pium pium', true);
    }

    desactivaInput() {
        this.input.keyboard.manager.enabled = false;
    }

    activaInput() {
        this.input.keyboard.manager.enabled = true;
    }
}