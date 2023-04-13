import Enemy from "../../characters/Enemy";
import { charInfo } from "../../characters/charInfo";

// @ts-ignore
export default class CombatScene extends Phaser.Scene {
    constructor(){
        super({key : 'CombatScene'});
        this.turnoJugadorAcabado = false;
        this.elapsedTime = 0;
    }

    init(enemy_data) {
        this.enemy_data = enemy_data;
        this.char_info = enemy_data.char_info;
    }

    create(){
        // cargamos la interfaz (botones + dialogo)
        this.scene.launch('UIScene');
        this.sceneUI = this.scene.get('UIScene');

        // el fondo
        this.bg = this.add.image(0, 0, 'euskadi_bg');
        this.bg.setOrigin(0,0);
        this.bg.setScale(10);

        // fade in 2s black
        this.cameras.main.fadeIn(2000, 0, 0, 0);

        // primer turno seleni
        this.turn = 0;

        // enemigo
        this.enemy = new Enemy(this, 500, 400);
        this.enemy.setScale(3);
        this.char_info = this.enemy_data.char_info;

        // texto inicial
        this.sceneUI.setDialog('Aiba la ordiga, patxi se ha cruzado en tu camino');
        
    }

    damage(level, atq, def, base_pot){
        return Math.floor(Math.floor(Math.floor(2 * level / 5 + 2) * atq * base_pot / def) / 50);
    }

    seleniAtaca(){
        this.enemy_data.hp -= this.damage(10, this.char_info.attack, this.char_info.defense, 70);
        this.enemy.setTint(0xff0000, 0xff0000, 0xff0000, 0xff0000);
        this.turnoJugadorAcabado = true;
    }

    seleniDefiende(){
        this.turnoJugadorAcabado = true;
    }

    seleniCura(){
        // se cura un 60% y como mucho su vida máxima
        this.char_info.health = Math.min(this.char_info.health + this.char_info.max_health * 0.6, this.char_info.max_health);
        this.turnoJugadorAcabado = true;
    }

    enemigoAtaca(){
        this.char_info.health -= this.damage(10, this.enemy_data.attack, this.enemy_data.def, 30);
    }

    // @ts-ignore
    update(t, dt) {
        // condición de final de 
        if(this.enemy_data.hp <= 0){
            console.log("seleni gana");
            this.terminar_combate();
        }
        else if(this.char_info.health <= 0){
            console.log("paxti gana");
            this.terminar_combate();
        }


        if(this.turn == 0){
            // @ts-ignore
            //this.sceneUI.activaInput();
            this.input.keyboard.manager.enabled = true;
            if(this.turnoJugadorAcabado){
                // @ts-ignore
                //this.sceneUI.desactivaInput();
                this.input.keyboard.manager.enabled = false;
                this.elapsedTime += dt;
                if(this.elapsedTime > 200){
                    this.enemy.clearTint();
                }
                if(this.elapsedTime > 2000){ // se esperan 3 segundos
                    this.turn = 1;
                    this.turnoJugadorAcabado = false;
                    this.elapsedTime = 0;
                }
            }
        }
        else {
            // ataca enemigo
            this.enemigoAtaca();
            // @ts-ignore
            this.sceneUI.setDialog('Patxi ataka');
            this.turn = 0;
            console.log("vida de seleni:"+this.char_info.health);
            console.log("vida de paxti:"+this.enemy_data.hp);
        }
    }



    terminar_combate(){
        this.input.keyboard.manager.enabled = true;
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