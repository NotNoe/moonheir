import Enemy from "../../characters/Enemy";

// eslint-disable-next-line no-undef
export default class CombatScene extends Phaser.Scene {
    constructor(){
        super({key : 'CombatScene'});
        this.turnoJugadorAcabado = false;
        this.elapsedTime = 0;
        this.finalTextTime = 0;
    }

    init(enemy_data) {
        this.enemy_data = enemy_data;
        this.char_info = enemy_data.char_info;
    }

    create() {
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
        // @ts-ignore
        this.sceneUI.dialog.init();
        this.enemy_data.level = 1;
        if(this.enemy_data.level == 1){
            if(this.enemy_data.sprite == 'patxi'){
                // @ts-ignore
                this.sceneUI.setDialog('Aiba la ordiga, ' + this.enemy_data.sprite + ' se ha cruzado en tu camino');
            }
        }
        
    }

    damage(level, atq, def, base_pot){
        return Math.floor(Math.floor(Math.floor(2 * level / 5 + 2) * atq * base_pot / def) / 50);
    }

    seleniAtaca(){
        
        //var dmg = this.damage(this.enemy_data.level * 10, this.char_info.attack, this.char_info.defense, 70)
        var dmg = this.enemy_data.hp;
        this.enemy_data.hp -= dmg;
        // animación de ataque
        this.enemy.setTint(0xff0000, 0xff0000, 0xff0000, 0xff0000);
        this.turnoJugadorAcabado = true;
        return dmg;
    }

    seleniDefiende(){
        // la idea es que evite parte del ataque (50%)
        this.turnoJugadorAcabado = true;
    }

    seleniCura(){
        // se cura un 60% y como mucho su vida máxima
        this.char_info.health = Math.min(this.char_info.health + this.char_info.max_health * 0.6, this.char_info.max_health);
        this.turnoJugadorAcabado = true;
    }

    enemigoAtaca(){
        var dmg = this.damage(this.enemy_data.level * 10, this.enemy_data.attack, this.enemy_data.def, 30);
        this.char_info.health -= dmg;
        return dmg;
    }

    // @ts-ignore
    update(t, dt) {
        // condición de final de 
        if(this.enemy_data.hp <= 0){
            console.log("seleni gana");
            // @ts-ignore
            this.sceneUI.setDialog('¡Seleni ha ganado!');
            this.finalTextTime += dt;
            if(this.finalTextTime > 2000){
                this.terminar_combate();
            }
        }
        else if(this.char_info.health <= 0){
            console.log("paxti gana");
            // @ts-ignore
            this.sceneUI.setDialog('Oh no! Seleni ha perdido en la batalla.');
            this.finalTextTime += dt;
            if(this.finalTextTime > 2000){
                this.terminar_combate();
            }
        }


        if(this.turn == 0){
            // @ts-ignore
            this.sceneUI.activaInput();
            if(this.turnoJugadorAcabado){
                // @ts-ignore
                this.sceneUI.desactivaInput();
                this.elapsedTime += dt;
                if(this.elapsedTime > 300){
                    this.enemy.clearTint();
                }
                if(this.elapsedTime > 2000){ // se esperan 3 segundos
                    this.turn = 1;
                    this.turnoJugadorAcabado = false;
                    // @ts-ignore
                    this.sceneUI.activaInput();
                    this.elapsedTime = 0;
                }
            }
        }
        else {
            // ataca enemigo
            var dmg = this.enemigoAtaca();
            // @ts-ignore
            this.sceneUI.setDialog('Patxi ataca. Le quita a Seleni ' + dmg + ' de vida.');
            this.turn = 0;
            console.log("vida de seleni:"+this.char_info.health);
            console.log("vida de paxti:"+this.enemy_data.hp);
        }
    }



    terminar_combate(){
        // @ts-ignore
        this.sceneUI.activaInput();
        console.log(this.input.keyboard.manager.enabled);
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