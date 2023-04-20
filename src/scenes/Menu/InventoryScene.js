import Book from "./Book.js";

export default class InventoryScene extends Phaser.Scene {
    inventoryData; Q; esc;

    MAXIMO_PAGINAS = 2;
    constructor(){
        super({key: 'InventoryScene'});
    }

    init(inventoryData){
        this.inventoryData = inventoryData;
    }

    create(){
        let book = new Book(this, this.game.renderer.width / 2, this.game.renderer.height / 2, this.inventoryData); //el libro siempre en medio
        this.add.existing(book);
        

        //Controles
        this.Q = this.input.keyboard.addKey('q', true, true);
        this.esc = this.input.keyboard.addKey('esc', true, true);
        this.A = this.input.keyboard.addKey('a', true, true);
        this.D = this.input.keyboard.addKey('d', true, true);

        this.Q.on('down', event => this.exit());
        this.esc.on('down', event => this.exit());
        this.A.on('down', event => {
            if(this.inventoryData.page_number > 0){
                this.inventoryData.page_number--;
                this.scene.start('InventoryScene', this.inventoryData);
            }
        })
        this.D.on('down', event => {
            if(this.inventoryData.page_number < this.MAXIMO_PAGINAS){
                this.inventoryData.page_number++;
                this.scene.start('InventoryScene', this.inventoryData);
            }
        })

    }

    exit(){
        this.scene.stop('InventoryScene');
        this.scene.resume(this.inventoryData.scene_name);
    }

}