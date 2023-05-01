export default class MenuPage extends Phaser.GameObjects.Container {
    constructor(scene, x, y){
        super(scene, x, y);
        this.height = 650;
        this.width = 400;
        this.exit_btn = this.scene.add.sprite(this.width / 2, this.height / 2, 'exit_btn');
        this.exit_btn.setScale(1.5, 1.5);
        this.exit_btn.setInteractive();
        this.add(this.exit_btn);

        this.S = scene.input.keyboard.addKey('s', true, true);
        this.W = scene.input.keyboard.addKey('w', true, true);
        this.E = scene.input.keyboard.addKey('e', true, true);

        this.selected = -1;

        this.S.on('down', event => {
            this.selected = 0;
            this.exit_btn.setTexture('exit_btn_selected');
        })
        this.W.on('down', event => {
            this.selected = 0;
            this.exit_btn.setTexture('exit_btn_selected');
        })

        this.E.on('down', event => {
            if(this.selected == 0)
                window.location.reload();
        })
       
    }
}