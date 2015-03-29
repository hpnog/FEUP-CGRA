var degToRad = Math.PI / 180.0;

var BOARD_WIDTH = 6.0;
var BOARD_HEIGHT = 4.0;

var BOARD_A_DIVISIONS = 30;
var BOARD_B_DIVISIONS = 100;

function LightingScene() {
	CGFscene.call(this);
}

LightingScene.prototype = Object.create(CGFscene.prototype);
LightingScene.prototype.constructor = LightingScene;

LightingScene.prototype.init = function(application) {
	CGFscene.prototype.init.call(this, application);

	this.initCameras();

	this.initLights();

	this.gl.clearColor(0.0, 0.0, 0.0, 1.0);
	this.gl.clearDepth(100.0);
	this.gl.enable(this.gl.DEPTH_TEST);
	this.gl.enable(this.gl.CULL_FACE);
	this.gl.depthFunc(this.gl.LEQUAL);

	this.axis = new CGFaxis(this);

	// Scene elements
	this.table = new MyTable(this);
	this.wall = new Plane(this);
	this.boardA = new Plane(this, BOARD_A_DIVISIONS);
	this.boardB = new Plane(this, BOARD_B_DIVISIONS);
	this.prism = new MyPrism(this, 8, 20);
	this.cylinder = new MyCylinder(this, 8, 20);
	this.lamp = new MyLamp(this, 25, 19);

	// Materials
	this.materialDefault = new CGFappearance(this);
	
	this.materialA = new CGFappearance(this);
	this.materialA.setAmbient(0.3,0.3,0.3,1);
	this.materialA.setDiffuse(0.6,0.6,0.6,1);
	this.materialA.setSpecular(0,0.2,0.8,1);
	this.materialA.setShininess(120);

	this.materialB = new CGFappearance(this);
	this.materialB.setAmbient(0.3,0.3,0.3,1);
	this.materialB.setDiffuse(0.6,0.6,0.6,1);
	this.materialB.setSpecular(0.8,0.8,0.8,1);	
	this.materialB.setShininess(120);

	
	this.materialFloor = new CGFappearance(this);
	this.materialFloor.setAmbient(0.25,0.25,0.25,1);
	this.materialFloor.setDiffuse(0.25,0.25,0.25,1);
	this.materialFloor.setSpecular(0.25,0.25,0.25,1);	
	this.materialFloor.setShininess(120);

	this.materialMetal = new CGFappearance(this);
	this.materialMetal.setAmbient(0.24,0.24,0.24,1);
	this.materialMetal.setDiffuse(0.24,0.24,0.24,1);
	this.materialMetal.setSpecular(0.5,0.5,0.5,1);	
	this.materialMetal.setShininess(120);

	this.materialWall = new CGFappearance(this);
	this.materialWall.setAmbient(1,1,0.6,1);
	this.materialWall.setDiffuse(1,1,0.6,1);
	this.materialWall.setSpecular(1,1,0.6,1);	
	this.materialWall.setShininess(120);};



LightingScene.prototype.initCameras = function() {
	this.camera = new CGFcamera(0.4, 0.1, 500, vec3.fromValues(30, 30, 30), vec3.fromValues(0, 0, 0));
};

LightingScene.prototype.initLights = function() {
	this.setGlobalAmbientLight(0.4,0.4,0.4,0.4);

	this.shader.bind();
	
	// Positions for four lights
	this.lights[0].setPosition(16, 5, 16, 1);
	this.lights[1].setPosition(10, 10, 6.0, 1.0);
	this.lights[2].setPosition(5, 5, 5, 8.0);
	this.lights[3].setPosition(10, 5.0, 5.0, 1.0);


	this.lights[0].setAmbient(0, 0, 0, 1);
	this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
	this.lights[0].setSpecular(1,1,1,1);
	this.lights[0].setConstantAttenuation(0);
	this.lights[0].setLinearAttenuation(1);
	this.lights[0].setQuadraticAttenuation(0);
	this.lights[0].setVisible(true);
	this.lights[0].enable();

	this.lights[1].setAmbient(0, 0, 0, 1);
	this.lights[1].setDiffuse(1.0, 1.0, 1.0, 1.0);
	this.lights[1].enable();
	this.lights[1].setVisible(true);

	this.lights[2].setAmbient(0, 0, 0, 1);
	this.lights[2].setDiffuse(1.0, 1.0, 1.0, 1.0);
	this.lights[2].setSpecular(1,1,1,1);
	this.lights[2].setConstantAttenuation(0);
	this.lights[2].setLinearAttenuation(1);
	this.lights[2].setQuadraticAttenuation(0);
	this.lights[2].setVisible(true);
	this.lights[2].enable();

	this.lights[3].setAmbient(0, 0, 0, 1);
	this.lights[3].setDiffuse(1.0, 1.0, 1.0, 1.0);
	this.lights[3].setSpecular(1,1,1,1);
	this.lights[3].setConstantAttenuation(0);
	this.lights[3].setLinearAttenuation(1);
	this.lights[3].setQuadraticAttenuation(0);
	this.lights[3].setVisible(true);
	this.lights[3].enable();
	
	this.shader.unbind();
};

LightingScene.prototype.updateLights = function() {
	for (i = 0; i < this.lights.length; i++)
		this.lights[i].update();
}

LightingScene.prototype.display = function() {
	this.shader.bind();

	// ---- BEGIN Background, camera and axis setup

	// Clear image and depth buffer everytime we update the scene
	this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
	this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);

	// Initialize Model-View matrix as identity (no transformation)
	this.updateProjectionMatrix();
	this.loadIdentity();

	// Apply transformations corresponding to the camera position relative to the origin
	this.applyViewMatrix();

	// Update all lights used
	this.updateLights();

	// Draw axis
	this.axis.display();

	this.materialDefault.apply();

	// ---- END Background, camera and axis setup
	// ---- BEGIN Primitive drawing section


//-----------Columns-------------------------------
	this.materialMetal.apply();
	
	this.prism.display();

	this.pushMatrix();
	this.translate (4, 0, 0);
	this.lamp.display();
	this.popMatrix();

	this.pushMatrix();
	this.translate (0, 4, 0);
	this.cylinder.display();
	this.popMatrix();

	//-----------Why the transformation-----------------
	
	// ---- END Primitive drawing section

	this.shader.unbind();
};
