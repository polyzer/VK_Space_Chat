/*
 * Класс описывает объект, на котором будет отображаться запись с web-камеры.
 * Летающая плоскость, на которой будет отображаться картинка с web-камеры;
 * */

var _VisualKeeper = function (json_params)
{	
	this.Geometry = new THREE.PlaneGeometry(100, 100);
	this.Material = null;
	
	this.Status = "live"; // ("live", "dead")
	
	this.Scene = null;
	this.Camera = null;

	if(json_params !== undefined)
	{
		
		if(json_params.position !== undefined)
		{
			this.Mesh.position.set(json_params.position);
		}

		if(json_params.scene !== undefined)
		{
			this.Scene = json_params.scene;
		}
		if(json_params.camera !== undefined)
		{
			this.Camera = json_params.camera;
		}
		if(json_params.video_texture !== undefined)
		{
			this.Material = new THREE.MeshBasicMaterial( { map: json_params.video_texture, overdraw: true, side:THREE.DoubleSide, color: 0xff0000 } );
		}
	}
	
	if(this.Material === null)
	{
		this.Material = new THREE.MeshBasicMaterial();			
	}

	// Для локального игрока
	if(this.Camera !== null)
	{
		this.ShipMesh = new THREE.Mesh(this.Geometry, this.Material);		
		this.Mesh = new THREE.Object3D();
		this.Mesh.position.set(0,0,0);
		this.ShipMesh.position.set(0, 0, 0);
		this.BBox = new THREE.BoundingBoxHelper(this.ShipMesh, 0x00ff00);	
		
		this.Camera.position.copy(this.ShipMesh.position);
		
		this.Camera.position.y = this.ShipMesh.position.y + 400;
		this.Camera.position.z = this.ShipMesh.position.z + 400;
		var vec = this.Mesh.getWorldDirection();
		this.Camera.lookAt(this.Mesh.position);
		this.Mesh.add(this.ShipMesh);
		this.Mesh.add(this.Camera);
	}	else
	// Для удаленного игрока
	{
		this.Mesh = new THREE.Mesh(this.Geometry, this.Material);
		this.BBox = new THREE.BoundingBoxHelper(this.Mesh, 0x00ff00);	
	}
	
	if(json_params.random !== undefined)
	{
		this.setRandomPosition();
	} else
	{
		this.Mesh.position.set(0,0,0);
	}
	this.Scene.add(this.Mesh);
//	this.Scene.add(this.BBox);

};

_VisualKeeper.prototype.setRandomPosition = function ()
{
	this.Mesh.position.set(Math.random() * 400 - 200, Math.random() * 400 - 200, Math.random() * 400 - 200);				
};



// это функция, которая должна вызываться в главной игровой функции
_VisualKeeper.prototype.Life = function ()
{
	this.BBox.update();
};

/* Устанавливает позицию корабля
 */ 
_VisualKeeper.prototype.setPosition = function (json_params)
{
	if(typeof(json_params) === "string")
		json_params = JSON.parse(json_params);
	
//	this.Mesh.position.set();	
	this.Mesh.position.copy(json_params);
};
/* Устанавливает поворот корабля в пространстве
 */
_VisualKeeper.prototype.setRotation = function (json_params)
{
	if(typeof(json_params) === "string")
		json_params = JSON.parse(json_params);
		
	this.Mesh.rotation.copy(json_params);
};


/* Возвращает позицию корабля 
 */
_VisualKeeper.prototype.getPosition = function ()
{
	return this.Mesh.position.clone();
};
/* Возвращает поворот корабля
 */
_VisualKeeper.prototype.getRotation = function ()
{
	return this.Mesh.rotation.clone();
};

_VisualKeeper.prototype.getMesh = function ()
{
	return this.Mesh;
};

_VisualKeeper.prototype.removeMesh = function ()
{
	this.Scene.remove(this.Mesh);
};

