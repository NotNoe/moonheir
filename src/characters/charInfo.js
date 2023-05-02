export class charInfo{

    constructor() {
        
    }

    pos = {x: 0, y:0} //Posición en la que debe crearse el personaje en una escena
    currentWeapon = "none";
    unlockedWeapons = [];
    orient = 'down';
    max_health = 54;
    health = 54;
    attack = 57;
    defense = 56;
    potions = 0;

    stone = "fire";

    keys = [];
    drops = [];

    pages = [true, false, false, false, false, false, false, true];  //Las paginas desbloqueadas

    has_page(i){return this.pages[i];}
    unlock_page(page){
        if(page == "plant"){
            this.pages[1] = true;
            this.pages[4] = true;
        }
        if(page == "water"){
            this.pages[2] = true;
            this.pages[5] = true;
        }
        if(page == "fire"){
            this.pages[3] = true;
            this.pages[6] = true;
        }

    }

    can_open(type){
        if(type == "fire" || type == "water" || type == "plant") return type == this.currentWeapon;
        return this.keys.includes(type);
    }

    add_key(key){
        this.keys.push(key);
    }

    add_drop(potion){
        this.drops.push(potion);
    }

    getWeapon(){
        if(this.currentWeapon == "fire") return "Fuego";
        if(this.currentWeapon == "water") return "Agua";
        if(this.currentWeapon == "plant") return "Planta";
        return "Vacío"
    }

    addWeapon(type){
        // @ts-ignore
        this.unlockedWeapons.push(type);
    }

    addStone(type){
        this.stone = type;
    }
}