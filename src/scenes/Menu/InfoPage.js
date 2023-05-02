import HealthBar from "../combat/HealthBar";

export default class InfoPage extends Phaser.GameObjects.Container {
    inventoryData;
    constructor(scene, x, y, inventoryData){
        super(scene, x, y);
        this.height = 650;
        this.width = 400;
        this.inventoryData = inventoryData;
        this.potion_btn = this.scene.add.sprite(0,-50,'obj_btn');
        this.weapon_btn = this.scene.add.sprite(0,50,'weapon_btn');
        let buttons = this.scene.add.container(this.width/2,0.75*this.height);
        this.add(buttons);
        //potion_btn.setScale(1,1);
        this.potion_btn.setInteractive();
        this.weapon_btn.setInteractive();
        buttons.add([this.potion_btn, this.weapon_btn]);


        this.info = this.scene.add.container(this.width/2, 0.25*this.height);
        this.h = new HealthBar(scene, -this.width*0.45 ,-this.height*0.15, scene.inventoryData.char_info);
        this.addToUpdateList();
        this.info.add(this.h);
        this.add(this.info);
        let text =  "Vida: " + this.inventoryData.char_info.health + "\nAtaque: " + this.inventoryData.char_info.attack;
        text += "\nDefensa: " + this.inventoryData.char_info.defense + "\nArma: " + this.inventoryData.char_info.getWeapon() + "\nPociones: " + this.inventoryData.char_info.potions;
        this.t = this.scene.add.text(this.width/4, 0, text, {fontSize: '35px'}).setOrigin(0.5,0.5);
        this.t.setFontFamily('CustomFont');
        this.t.setColor('#000000');
        this.info.add(this.t);


        //Botones
        this.selected = -1;
        this.W = scene.input.keyboard.addKey('w', true, true);
        this.S = scene.input.keyboard.addKey('s', true, true);
        this.E = scene.input.keyboard.addKey('e', true, true);

        this.W.on('down', event => {
            this.weapon_btn.setTexture('weapon_btn');
            this.potion_btn.setTexture('obj_btn');
            if(this.selected != 1){
                this.selected = 1;
                this.weapon_btn.setTexture('weapon_btn_selected');
            }else if(this.selected == 1){
                this.selected = 0;
                this.potion_btn.setTexture('obj_btn_selected');
            }
        })
        this.S.on('down', event => {
            this.weapon_btn.setTexture('weapon_btn');
            this.potion_btn.setTexture('obj_btn');
            if(this.selected != 0){
                this.selected = 0;
                this.potion_btn.setTexture('obj_btn_selected');
            }else if(this.selected == 0){
                this.selected = 1;
                this.weapon_btn.setTexture('weapon_btn_selected');
            }
        })


        this.E.on('down', event => {
            if(this.selected == 0)
                this.usePotion();
            if(this.selected == 1)
                this.changeWeapon()
        })
        this.scene.events.off('resume');
        this.scene.events.on('resume', this.refreshText, this);

    }

    

    usePotion(){
        let char_info = this.inventoryData.char_info;
        if(char_info.potions > 0 && char_info.health < char_info.max_health){
            char_info.potions--;
            char_info.health = Math.min(char_info.health + char_info.max_health * 0.6, char_info.max_health);
            this.refreshText();
        }
    }

    changeWeapon(){
        this.scene.scene.launch('ChangeWeaponScene', this.inventoryData);
		this.scene.scene.pause('InventoryScene'); //Se pausa
    }

    refreshText(){
        console.log("Text uptadted");
        let text =  "Vida: " + this.inventoryData.char_info.health + "\nAtaque: " + this.inventoryData.char_info.attack;
        text += "\nDefensa: " + this.inventoryData.char_info.defense + "\nArma: " + this.inventoryData.char_info.getWeapon() + "\nPociones: " + this.inventoryData.char_info.potions;
        this.t.setText(text);
    }
}