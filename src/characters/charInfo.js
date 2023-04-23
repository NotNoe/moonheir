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

    keys = [];
    drops = [];

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
}