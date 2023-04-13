import Enemy from "../../characters/Enemy";
import { charInfo } from "../../characters/charInfo";

// eslint-disable-next-line no-undef
export default class CombatScene extends Phaser.Scene {
    constructor(){
        super({key : 'CombatScene'});
        this.turnoJugadorAcabado = false;
        this.elapsedTime = 0;
    }

    init(enemy_data) {
        this.enemy_data = enemy_data;
    }

    preload() {

    }

    create(){
        this.scene.launch('UIScene');

        this.sceneUI = this.scene.get('UIScene');

        this.cameras.main.setBackgroundColor('rgb(245, 245, 220)');

        this.turn = 1;
        this.enemy = new Enemy(this, 500, 400);
        this.char_info = this.enemy_data.char_info;

    }

    seleniAtaca(){
        this.turnoJugadorAcabado = true;
    }

    seleniDefiende(){
        this.turnoJugadorAcabado = true;
    }

    seleniCura(){
        this.turnoJugadorAcabado = true;
        this.terminar_combate(); //Pongo para probar si puedo terminar el combate
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



    terminar_combate(){
        if(this.enemy_data.drop != "none"){
            this.char_info.add_key(this.enemy_data.drop);
            console.log("Conseguido " + this.enemy_data.drop);
        }
        this.enemy_data.enemigo.destroy();
        this.enemy_data.scene_data.enemigo = null;
        this.scene.stop('CombatScene');
        this.scene.stop('UIScene');
        this.scene.resume(this.enemy_data.scene_name);
    }
}