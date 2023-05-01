export default class ChangeWeaponScene extends Phaser.Scene {
    inventoryData;

    MAXIMO_PAGINAS = 2;
    constructor(){
        super({key: 'ChangeWeaponScene'});
    }

    init(inventoryData){
        this.inventoryData = inventoryData;
    }

    create(){
        
        let text = "Presiona el número del arma que quieras:\n";

        //Controles
        this._1 = this.input.keyboard.addKey('ONE', true, true);
        this._2 = this.input.keyboard.addKey('TWO', true, true);
        this._3 = this.input.keyboard.addKey('THREE', true, true);
        this._4 = this.input.keyboard.addKey('FOUR', true, true);

        this._4.on('down', event => this.exit());
        
        if(this.inventoryData.char_info.unlockedWeapons.includes("fire")){
            this._1.on('down', event => {
                this.inventoryData.char_info.currentWeapon = "fire";
                this.exit();
            })
            text += "1 - Fuego\n"
        }else{
            text += "1 - ???\n"
        }
        if(this.inventoryData.char_info.unlockedWeapons.includes("plant")){
            this._2.on('down', event => {
                this.inventoryData.char_info.currentWeapon = "plant";
                this.exit();
            })
            text += "2 - Planta\n"
        }else{
            text += "2 - ???\n"
        }
        if(this.inventoryData.char_info.unlockedWeapons.includes("water")){
            this._3.on('down', event => {
                this.inventoryData.char_info.currentWeapon = "water";
                this.exit();
            })
            text += "3 - Agua\n"
        }else{
            text += "3 - ???\n"
        }
        text += "4 - Cancelar"

        //Visual
        this.add.image(this.game.renderer.width / 2, this.game.renderer.height / 2,'dialog_box');
        this.add.text(this.game.renderer.width / 2, this.game.renderer.height / 2, text, {fontSize:'35px', fontFamily:'CustomFont', color: '#FFFFFF'}).setOrigin(0.5,0.5);


    }

    exit(){
        this.scene.stop('ChangeWeaponScene');
        this.scene.resume('InventoryScene');
    }

}