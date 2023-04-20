export class charInfo{

    constructor() {
        
    }

    pos = {x: 0, y:0} //Posición en la que debe crearse el personaje en una escena
    currentWeapon = "fire";
    unlockedWeapons = ["fire"];
    orient = 'down';
    max_health = 54;
    health = 54;
    attack = 57;
    defense = 56;
    potions = 5;

    keys = [];
    drops = [];

    pages = [true, true, false, false, false, true];  //Las paginas desbloqueadas

    has_page(i){return this.pages[i];}
    unlock_page(i){this.pages[i]=true;}

    can_open(type){
        if(type == "fire" || type == "water" || type == "earth") return type == this.currentWeapon;
        return this.keys.includes(type);
    }

    add_key(key){
        this.keys.push(key);
    }

    add_drop(potion){
        this.drops.push(potion);
    }

    getWeapon(){
        if(this.currentWeapon == "fire") return "Fire";
        if(this.currentWeapon == "water") return "Water";
        if(this.currentWeapon == "earth") return "Earth";
    }
}