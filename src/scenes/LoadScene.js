const assets_folder = "assets/"
const tiled_folder = assets_folder + "tiled/";
const images_folder = assets_folder + "images/";
const audio_folder = assets_folder + "audio/";

export default class LoadScene extends Phaser.Scene {
    constructor(){
        super({key: 'LoadScene'});
    }

    init(){}

    preload(){ //La idea es que esta escena cargue todos los recursos que necesitemos en todo el juego

        const tilemaps = [];
        
        this.load.image("menu_bg", images_folder + "MainMenu.png");
        this.load.image("play_button", images_folder + "play_button.png");
        this.load.image("tittle", images_folder + "Tittle.png");
        this.load.image('char', images_folder + 'character.png');
		this.load.image('tileset', tiled_folder + 'tileset_test.png');
        this.load.audio('music', audio_folder + 'POL-treasure-match-short.wav');

        //En un for cargamos todos los tilemaps
            this.load.tilemapTiledJSON('tilemap', tiled_folder + "tilemap_test.json");
            this.load.tilemapTiledJSON('tilemap2', tiled_folder + "tilemap_test2.json");


        let loading_bar = this.add.graphics({
            fillStyle: {
                color: 0xffffff //Color de la barra de carga
            }
        });

        this.load.on("progress", (percent) => {
            loading_bar.fillRect(0, this.game.renderer.height/2, this.game.renderer.width * percent, 50);
        });
    }

    create(){
        this.scene.start("MenuScene");
    }
}