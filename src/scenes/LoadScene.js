const assets_folder = 'assets/'
const tiled_folder = assets_folder + 'tiled/';
const images_folder = assets_folder + 'images/';
const audio_folder = assets_folder + 'audio/';

export default class LoadScene extends Phaser.Scene {
    constructor(){
        super({key: 'LoadScene'});
    }

    init(){}

    preload(){ //La idea es que esta escena cargue todos los recursos que necesitemos en todo el juego


        //Carga de recursos de TILED (Tilemaps, Tileset, Atlas...)
        this.load.image('tileset', tiled_folder + 'tileset_test.png');
        let tilemaps = [];
        tilemaps.push({key: 'tilemapWorld0_1', url: tiled_folder + 'World0_1.json'});
        for(let i = 1; i <= 9; i++){
            tilemaps.push({key: 'tilemapWorld1_' + i, url: tiled_folder + 'World1_' + i + '.json'});
        }

        tilemaps.forEach(element => {
            this.load.tilemapTiledJSON(element.key, element.url);
        });

        //Carga de imágenes
        this.load.image('menu_bg', images_folder + 'MainMenu.png');
        this.load.image('play_button', images_folder + 'play_button.png');
        this.load.image('tittle', images_folder + 'Tittle.png');
        this.load.image('char', images_folder + 'character.png');
        this.load.image('vDoor', images_folder + 'vDoor.png');
        this.load.image('hDoor', images_folder + 'hDoor.png');

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
        this.scene.start('MenuScene');
    }
}