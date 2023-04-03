//Aqui va a ir tod
export default class SceneData {
    data = {}; //No es un buen nombre pero es algo pesado cambiarlo. Esto son las puertas y los changers.
	cofre; //Aquí la información del cofre que haya (tendrá dos campos, 'chest' y colider, y un booleano que dice si está abierto).
	enemies = [];
    constructor(map){
        this.carga_intercambios(map);
		this.carga_cofres(map);
		this.carga_enemigos(map);
    }

	carga_intercambios(map){
		let layer = map.getObjectLayer('Doors/North'); //Norte
		if(layer != null) {
            this.data['north'] = {};
			layer.objects.forEach(obj => {
            	this.data['north'][obj.name] = obj;
			})
		}
		layer = map.getObjectLayer('Doors/South');
		if(layer != null) {
            this.data['south'] = {};
			layer.objects.forEach(obj => {
                this.data['south'][obj.name] = obj;
			})
		}
		layer = map.getObjectLayer('Doors/East');
		if(layer != null) {
            this.data['east'] = {};
            layer.objects.forEach(obj => {
                this.data['east'][obj.name] = obj;
            })
	    }
		layer = map.getObjectLayer('Doors/West');
		if(layer != null) {
			this.data['west'] = {};
			layer.objects.forEach(obj => {
                this.data['west'][obj.name] = obj;
			})
		}
	}

	carga_cofres(map){
		let layer = map.getObjectLayer('Chest');
		if(layer != null){ //Si es null, es que no hay cofres en esta pantalla.
			this.cofre = {};
			layer.objects.forEach(obj => { //La capa tiene que tener dos objetos, uno con name chest y otro con name overlap (por ejemplo)
            	this.cofre[obj.name] = obj;
			})
			this.cofre.open = false;
		}
	}

	carga_enemigos(map){
		let layer = map.getObjectLayer('Enemies');
		if(layer != null){
			let i = 0;
			layer.objects.forEach(obj => {
				obj.data.number(i++);
            	this.enemies.push(obj);
			})
		}
	}

	delete_enemy(i){
		this.enemies[i] = null;
	}

	get_enemies(){ //Devuelve los enemigos que hay de verdad
		let aux = [];
		this.enemies.forEach(ob1 => {
			if(ob1 != null)
			aux.push(ob1);
		})
		return aux;
	}

	delete_door(dir){
		delete this.data[dir]['door'];
		delete this.data[dir]['lock'];
	}

	open_chest(){ //Supuesto que solo hay un cofre y que si se llama a la función es pq este existe.
		this.cofre.open = true;
	}

}