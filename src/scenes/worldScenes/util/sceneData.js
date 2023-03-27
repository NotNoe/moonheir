//Aqui va a ir tod
export default class SceneData {
    data = {};
    constructor(map){
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

	delete_door(dir){
		delete this.data[dir]['door'];
		delete this.data[dir]['lock'];
	}

}