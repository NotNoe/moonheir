export default class HealthBar extends Phaser.GameObjects.Container {
    constructor(scene, x, y, char_info){
        super(scene, x, y);
        let seleniCloseUp = scene.add.image(45, 10, 'seleniCloseUp').setOrigin(0).setScale(2.5);

        this.backgroundBar = scene.add.image(40, 140, 'redBar').setScale(0.6, 1).setOrigin(0);
        this.healthBar = scene.add.image(40, 140, 'greenBar').setScale(0.6, 1).setOrigin(0);

        this.add([seleniCloseUp, this.backgroundBar, this.healthBar]);
        this.char_info = char_info;

        this.currentHealth = char_info.health;
        this.healthBar.setScale((char_info.health / this.char_info.max_health) * 0.6, 1);
        this.addToUpdateList();
    }

    preUpdate(t, dt){
        if(this.char_info.health < this.currentHealth){
            this.currentHealth -= 0.4;
            if(this.currentHealth < this.char_info.health){
                this.currentHealth = this.char_info.health;
            }
        }else if(this.char_info.health > this.currentHealth){
            this.currentHealth += 0.4;
            if(this.currentHealth > this.char_info.health){
                this.currentHealth = this.char_info.health;
            }
        }
        this.healthBar.setScale((this.currentHealth / this.char_info.max_health) * 0.6, 1);
    }
}