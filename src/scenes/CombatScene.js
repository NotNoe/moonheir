// eslint-disable-next-line no-undef
export default class CombatScene extends Phaser.Scene {
    constructor(){
        super({key : 'CombatScene'});
    }

    init() {

    }

    preload() {

    }

    create(){
        this.scene.launch('UIScene');

        this.cameras.main.setBackgroundColor('rgb(245, 245, 220)');
    }

    update() {

    }

}