export default class SceneData {
    data = {}; //No es un buen nombre pero es algo pesado cambiarlo. Esto son las puertas y los changers.
	cofre;
	enemigo; // Suponemos que solo hay un enemigo
	map;
	table;
	bed;
    constructor(map){
		this.map = map;
        this.carga_intercambios(map);
		this.carga_cofres(map);
		this.carga_enemigos(map);
		this.carga_interior(map);
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
		layer = map.getObjectLayer('Doors/LibIn');
		if(layer != null) {
			this.data['lib_in'] = {};
			layer.objects.forEach(obj => { //Solo hay un objeto
                this.data['lib_in'] = obj;
			})
		}
		layer = map.getObjectLayer('Doors/LibOut');
		if(layer != null) {
			this.data['lib_out'] = {};
			layer.objects.forEach(obj => {
                this.data['lib_out'] = obj;
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
		let layer = map.getObjectLayer('Enemy');
		if(layer != null){ // Si es null, es que no hay enemigos
			this.enemigo = {};
			layer.objects.forEach(obj => {
				this.enemigo.data = obj;
			})
			//this.enemigo.defeated = false;
		}
	}

	carga_interior(map){
		let layer = map.getObjectLayer('Indoor/Bed');
		if(layer != null){ //Si es null, es que estamos afuera
			this.bed = {};
			layer.objects.forEach(obj => { //La capa tiene que tener dos objetos, uno con name chest y otro con name overlap (por ejemplo)
				this.bed[obj.name] = obj;
			})
		}
		layer = map.getObjectLayer('Indoor/Table');
		if(layer != null){ //Si es null, es que estamos afuera
			this.table = {};
			layer.objects.forEach(obj => { //La capa tiene que tener dos objetos, uno con name chest y otro con name overlap (por ejemplo)
				this.table[obj.name] = obj;
			})
		}
	}

	delete_door(dir){
		delete this.data[dir]['door'];
		delete this.data[dir]['lock'];
	}

	open_chest(){ //Supuesto que solo hay un cofre y que si se llama a la función es pq este existe.
		this.cofre.open = true;
	}

}