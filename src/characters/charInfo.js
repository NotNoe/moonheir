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

    pages = [true, true, true, true, true, true, true, true];  //Las paginas desbloqueadas

    has_page(i){return this.pages[i];}
    unlock_page(i){this.pages[i]=true;}

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
}