import InfoPage from "./InfoPage.js";
import MenuPage from "./MenuPage.js";
import TextPage from "./TextPage.js";
import textos from "./historia.js";

export default class Book extends Phaser.GameObjects.Container {
    constructor(scene, x, y, inventoryData){ //La i indica que tiene que mostrar la pagina 2*i y la 2*i + 1;
        let i = inventoryData.page_number;
        super(scene, x, y);
        let izq = 2*i;
        let der = izq + 1;
        const bg = new Phaser.GameObjects.Image(scene, 0, 0, 'book_bg');
        this.width = bg.width;
        this.height = bg.height;
        this.add(bg);
        this.left;
        this.right;
        //Pagina izquierda
        if(izq == 0){ //Menu
            this.left = new InfoPage(scene, -this.width/2, -this.height/2, inventoryData);
        }
        else{ //Pagina de texto
            this.left = new TextPage(scene, -this.width/2, -this.height/2, textos[(inventoryData.has_page(izq) ? izq : 0)]);
        }
        //Pagina derecha
        if(der == 7){ //Pagina final
            this.right = new MenuPage(scene, 0, -this.height/2);
        }else{
            this.right = new TextPage(scene, 0, -this.height/2, textos[(inventoryData.has_page(der) ? der : 0)]);
        }
        this.add(this.left);
        this.add(this.right);
        this.addToUpdateList();
    }

    preUpdate(t, dt){
        
    }


}