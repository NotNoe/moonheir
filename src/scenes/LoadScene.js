import SceneData from './worldScenes/util/sceneData.js';
import WorldScene from './worldScenes/worldScene.js';

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
        this.load.image('tileset', tiled_folder + 'pixil_tileset_1.png');
        let tilemaps = [];
        tilemaps.push({key: 'tilemapWorld0_1', url: tiled_folder + 'World0_1.json'});
        this.scenenames.push('World0_1');
        for(let i = 1; i <= 9; i++){
            tilemaps.push({key: 'tilemapWorld1_' + i, url: tiled_folder + 'World1_' + i + '.json'});
            this.scenenames.push('World1_' + i);
        }
        tilemaps.forEach(element => {
            this.load.tilemapTiledJSON(element.key, element.url);
        });

        //Carga de sprites
        this.load.spritesheet('patxi', images_folder + 'patxi.png', {frameWidth: 40, frameHeight: 58});
        this.load.spritesheet('seleni', images_folder + 'seleni.png', {frameWidth: 19, frameHeight: 26});

        //Carga de imágenes
        this.load.image("menu_bg", images_folder + "menu_bg.png");
        this.load.image("euskadi_bg", images_folder + "euskadi_bg.png");
        this.load.image('play_button', images_folder + 'play-pixilart.png');
        this.load.image('vDoor', images_folder + 'vDoor.png');
        this.load.image('hDoor', images_folder + 'hDoor.png');
        this.load.image('chest', images_folder + 'chest.png');
        this.load.image('btn', images_folder + 'btn.png');
        this.load.image('btn_selected', images_folder + 'btn_selected.png');

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

    loadMaps(scene_names){ //Esta funcion se va a encargar de cargar los mapas :D
        let scenes_data = {};
        scene_names.forEach(sceneName => {
            let map = this.make.tilemap({
                key: 'tilemap' + sceneName
            });
            let scene_data = new SceneData(map);
            scenes_data[sceneName] = scene_data;
        });
        return scenes_data;
    }
}