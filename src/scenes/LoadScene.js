
export default class LoadScene extends Phaser.Scene {
    constructor(){
        super({key: 'LoadScene'});
    }

    init(){}

    preload(){ //La idea es que esta escena cargue todos los recursos que necesitemos en todo el juego

        const tilemaps = [];
        
        this.load.image("menu_bg", "./assets/MainMenu.png");
        this.load.image("play_button", "./assets/play_button.png");
        this.load.image("tittle", "./assets/Tittle.png");
        this.load.image('char', 'assets/character.png');
		this.load.image('tileset', './tiled/tileset_test.png');
        this.load.audio('music', 'sounds/POL-treasure-match-short.wav');

        //En un for cargamos todos los tilemaps
            this.load.tilemapTiledJSON('tilemap', "tiled/tilemap_test.json");
            this.load.tilemapTiledJSON('tilemap2', "tiled/tilemap_test2.json");


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