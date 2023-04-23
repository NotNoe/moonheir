export default class DialogBox {
    constructor(scene) {
        this.scene = scene;
    }

    init() {
        this.borderThickness = 3;
        this.borderColor = 0x000000;
        this.borderAlpha = 1; 
        this.windowAlpha = 0.8; 
        this.windowColor = 0x303030;
        this.windowHeight = 150; 
        this.padding = 128; 
        this.dialogSpeed = 10;
        this.x = this.padding + 80;
        this.y = 10;
        this.eventCounter = 0; //Contador de eventos
        this.visible = true; //Variable que dice si el cuadro de texto es visible o no
        this.text; //Referencia a Phaser.Text
        this.textColor = '#FFFFFF';
        this.dialog; //Referencia a Phaser.Dialog
        this.graphics; //Referencia a Phaser.Graphics
        this.beingAnimated; //Nos dice si el texto está siendo o no activado
        this.createWindow(); //Crear la ventana
    }

    getGameWidth() {
        return this.scene.sys.game.config.width;
    }

    getGameHeight() {
        return this.scene.sys.game.config.height;
    }

    calculateWindowDimensions(width, height) {
        var x = this.x;
        var y = this.y || height - this.windowHeight - this.padding;
        var rectWidth = width - (this.padding * 2);
        var rectHeight = this.windowHeight;
        return {
            x,
            y,
            rectWidth,
            rectHeight
        };
    }

    createInnerWindow(x, y, rectWidth, rectHeight) {
        this.graphics.fillStyle(this.windowColor, this.windowAlpha);
        this.graphics.fillRect(x + 1, y + 1, rectWidth - 1, rectHeight - 1);
    }

    createOuterWindow(x, y, rectWidth, rectHeight) {
        this.graphics.lineStyle(this.borderThickness, this.borderColor, this.borderAlpha);
        this.graphics.strokeRect(x, y, rectWidth, rectHeight);
    }

    createWindow() {
        var gameHeight = this.getGameHeight();
        var gameWidth = this.getGameWidth();
        var dimensions = this.calculateWindowDimensions(gameWidth, gameHeight);
        this.graphics = this.scene.add.graphics();
        this.createOuterWindow(dimensions.x, dimensions.y, dimensions.rectWidth, dimensions.rectHeight);
        this.createInnerWindow(dimensions.x, dimensions.y, dimensions.rectWidth, dimensions.rectHeight);
    }

    toggleWindow() {
        this.visible = !this.visible;
        if (this.text) this.text.visible = this.visible;
        if (this.graphics) this.graphics.visible = this.visible;
        if (this.timedEvent) this.timedEvent.remove();
        if (this.text) this.text.destroy();
    }

    setText(text, animate) {
        this.eventCounter = 0;
        this.dialog = text.split('');
        if (this.timedEvent) this.timedEvent.remove();

        var tempText = animate ? '' : text;

        this.textPosition(tempText);
        this.text.setColor(this.textColor);
        this.text.setFontFamily('CustomFont');
        if (animate) {
            this.timedEvent = this.scene.time.addEvent({
            delay: 150 - (this.dialogSpeed * 30),
            callback: this.animateText,
            callbackScope: this,
            loop: true
            });
        }
    }

    animateText() {
        this.beingAnimated = true;
        this.eventCounter++;
        this.text.setText(this.text.text + this.dialog[this.eventCounter - 1]);
        if (this.eventCounter === this.dialog.length) {
          this.timedEvent.remove();
          this.scene.time.addEvent({
            delay: 180,
            callback: this.endTextAnimation,
            callbackScope: this,
            loop: false
        });
        }
    }

    endTextAnimation() {
        this.beingAnimated = false;
    }

    textPosition(text) {
        if (this.text) this.text.destroy();
        var x = this.x + 10 || this.padding + 10;
        var y = this.y + 10 || this.getGameHeight() - this.windowHeight - this.padding + 10;
        this.text = this.scene.add.text(
            x,
            y,
            text,
            {
                color: this.textColor,
                fontSize: '32px',
                wordWrap: { width: this.getGameWidth() - (this.padding * 2) - 25 }
            }
        );
    }
}