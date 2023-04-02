import Enemy from "../../characters/Enemy";
import { charInfo } from "../../characters/charInfo";

// eslint-disable-next-line no-undef
export default class CombatScene extends Phaser.Scene {
    constructor(){
        super({key : 'CombatScene'});
        this.turnoJugadorAcabado = false;
        this.elapsedTime = 0;
    }

    init() {
        this.char_info = new charInfo();
    }

    preload() {

    }

    create(){
        this.scene.launch('UIScene');

        this.sceneUI = this.scene.get('UIScene');

        this.cameras.main.setBackgroundColor('rgb(245, 245, 220)');

        this.turn = 1;
        this.enemy = new Enemy(this, 500, 400);
        this.seleni = this.char_info;

    }

    seleniAtaca(){
        this.turnoJugadorAcabado = true;
    }

    seleniDefiende(){
        this.turnoJugadorAcabado = true;
    }

    seleniCura(){
        this.turnoJugadorAcabado = true;
    }

    // @ts-ignore
    update(t, dt) {
        if(this.turn == 0){
            // @ts-ignore
            this.sceneUI.activaInput();
            if(this.turnoJugadorAcabado){
                // @ts-ignore
                this.sceneUI.desactivaInput();
                this.elapsedTime += dt;
                if(this.elapsedTime > 4000){ // se esperan 4 segundos
                    this.turn = 1;
                    this.turnoJugadorAcabado = false;
                    this.elapsedTime = 0;
                }
            }
        }
        else {
            // ataca enemigo
            this.enemy.attack();
            // @ts-ignore
            this.sceneUI.setEnemyDialog(); // da error pero funciona :)
            this.turn = 0;
        }
    }
}