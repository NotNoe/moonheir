const assets_folder = 'assets/'
const tiled_folder = assets_folder + 'tiled/';
const images_folder = assets_folder + 'images/';
const audio_folder = assets_folder + 'audio/';

export default class LoadScene extends Phaser.Scene {
    scenes_data; scenenames;
    constructor(){
        super({key: 'LoadScene'});
    }

    init(){}

    preload(){ //La idea es que esta escena cargue todos los recursos que necesitemos en todo el juego

        this.scenenames = [];
        //Carga de recursos de TILED (Tilemaps, Tileset, Atlas...)
        this.load.image('pixil_tileset_1', tiled_folder + 'pixil_tileset_1.png');
        this.load.image('pixil_tileset_2', tiled_folder + 'pixil_tileset_2.png');
        this.load.image('pixil_tileset_3', tiled_folder + 'pixil_tileset_3.png');

        let tilemaps = [];

        // Tilemaps del nivel 0
        tilemaps.push({key: 'tilemapWorld0_1', url: tiled_folder + 'World0_1.json'});
        tilemaps.push({key: 'tilemapWorld0_2', url: tiled_folder + 'World0_2.json'});
        this.scenenames.push('World0_1');
        this.scenenames.push('World0_2');

        // Tilemaps del nivel 1
        for(let i = 1; i <= 7; i++){
            tilemaps.push({key: 'tilemapWorld1_' + i, url: tiled_folder + 'World1_' + i + '.json'});
            this.scenenames.push('World1_' + i);
        }

        // Tilemaps del nivel 2
        for(let i = 1; i <= 4; i++){
            tilemaps.push({key: 'tilemapWorld2_' + i, url: tiled_folder + 'World2_' + i + '.json'});
            this.scenenames.push('World2_' + i);
        }

        tilemaps.forEach(element => {
            this.load.tilemapTiledJSON(element.key, element.url);
        });

        //Carga de sprites
        this.load.spritesheet('patxi', images_folder + 'patxi.png', {frameWidth: 40, frameHeight: 58});
        this.load.spritesheet('seleni', images_folder + 'seleni.png', {frameWidth: 47, frameHeight: 68});

        this.load.image('iratxo', images_folder + 'iratxo.png');
        
        //Carga de imágenes
        this.load.image("menu_bg", images_folder + "menu_bg.png");
        this.load.image("book_bg", images_folder + "book_bg.png");
        this.load.image("euskadi_bg", images_folder + "euskadi_bg.png");
        this.load.image('play_button', images_folder + 'play-pixilart.png');
        
        this.load.image('vDoorWater', images_folder + 'vDoorWater.png');
        this.load.image('hDoorPlants', images_folder + 'hDoorPlants.png');
        this.load.image('hDoorRocks', images_folder + 'hDoorRocks.png');
        this.load.image('hDoorLog', images_folder + 'hDoorLog.png');
        this.load.image('hDoorFire', images_folder + 'hDoorFire.png');

        this.load.image('chest', images_folder + 'chest.png');
        this.load.image('dialog_box', images_folder + 'dialog_box.png');
        this.load.image('bed', images_folder + 'bed.png');
        this.load.image('table', images_folder + 'table.png');


        //Botones
        this.load.image('btn', images_folder + 'btn.png');
        this.load.image('btn_selected', images_folder + 'btn_selected.png');
        this.load.image('attack_btn', images_folder + 'atack_btn.png');
        this.load.image('attack_btn_selected', images_folder + 'atack_pressed_btn.png');
        this.load.image('def_btn', images_folder + 'protect_btn.png');
        this.load.image('def_btn_selected', images_folder + 'protect_pressed_btn.png');
        this.load.image('obj_btn', images_folder + 'health_btn.png');
        this.load.image('obj_btn_selected', images_folder + 'health_pressed_btn.png');
        this.load.image('weapon_btn', images_folder + 'weapons_btn.png');
        this.load.image('weapon_btn_selected', images_folder + 'weapons_pressed_btn.png');
        this.load.image('exit_btn', images_folder + 'exit_btn.png');
        this.load.image('exit_btn_selected', images_folder + 'exit_pressed_btn.png');

        this.load.image('seleniCloseUp', images_folder + 'seleniCloseUp.png');
        this.load.image('greenBar', images_folder + 'green_bar.png');
        this.load.image('redBar', images_folder + 'red_bar.png');

        //Carga de sonidos
        this.load.audio('music', audio_folder + 'POL-treasure-match-short.wav');


        //Instancio la barra de carga
        let loading_bar = this.add.graphics({
            fillStyle: {
                color: 0xffffff //Color de la barra de carga
            }
        });

        this.load.on('progress', (percent) => {
            loading_bar.fillRect(0, this.game.renderer.height/2, this.game.renderer.width * percent, 50);
        });
    }

    create(){
        this.scenes_data = this.loadMaps(this.scenenames);
        this.scene.start('MenuScene', this.scenes_data);
    }

    loadMaps(scene_names){
        let scenes_data = {};
        scene_names.forEach(sceneName => {
            scenes_data[sceneName] = null;
        });
        return scenes_data;
    }
}