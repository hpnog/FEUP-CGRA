/**
 * MyInterface
 * @constructor
 */
 
 
function MyInterface() {
	//call CGFinterface constructor 
	CGFinterface.call(this);
};

MyInterface.prototype = Object.create(CGFinterface.prototype);
MyInterface.prototype.constructor = MyInterface;

/**
 * init
 * @param {CGFapplication} application
 */
MyInterface.prototype.init = function(application) {
	// call CGFinterface init
	CGFinterface.prototype.init.call(this, application);
	
	// init GUI. For more information on the methods, check:
	//  http://workshop.chromeexperiments.com/examples/gui
	
	this.gui = new dat.GUI();

	// add a button:
	// the first parameter is the object that is being controlled (in this case the scene)
	// the identifier 'doSomething' must be a function declared as part of that object (i.e. a member of the scene class)
	// e.g. LightingScene.prototype.doSomething = function () { console.log("Doing something..."); }; 

	this.gui.add(this.scene, 'doSomething');	//-Do something

	// add a group of controls (and open/expand by defult)
	
						//var group=this.gui.addFolder("Options");
						//group.open();

	// add two check boxes to the group. The identifiers must be members variables of the scene initialized in scene.init as boolean
	// e.g. this.option1=true; this.option2=false;
	
						//group.add(this.scene, 'option1');
						//group.add(this.scene, 'option2');
	
	// add a slider
	// must be a numeric variable of the scene, initialized in scene.init e.g.
	// this.speed=3;
	// min and max values can be specified as parameters
	
	this.gui.add(this.scene, 'speed', 0, 10);
	this.gui.add(this.scene, 'Relogio');

	//----------------------------------ADD LIGHT GROUP-----------------------------------------------
	var lights = this.gui.addFolder("Luzes");
	lights.open();

	lights.add(this.scene, 'Luz_1');
	lights.add(this.scene, 'Luz_2');
	lights.add(this.scene, 'Luz_3');
	lights.add(this.scene, 'Luz_4');
	//------------------------------------------------------------------------------------------------
	this.gui.add(this.scene, 'currRobotAppearance', this.scene.robotAppearanceList);
	

	return true;
};

/**
 * processKeyboard
 * @param event {Event}
 */
MyInterface.prototype.processKeyboard = function(event) {
	// call CGFinterface default code (omit if you want to override)
	CGFinterface.prototype.processKeyboard.call(this,event);
	
	// Check key codes e.g. here: http://www.asciitable.com/
	// or use String.fromCharCode(event.keyCode) to compare chars
	
	// for better cross-browser support, you may also check suggestions on using event.which in http://www.w3schools.com/jsref/event_key_keycode.asp
	if (event.keyCode == 65 || event.keyCode == 97)
	{
		this.scene.robot.rotateLeft(this.scene.speed);
	}
	else if (event.keyCode == 68 || event.keyCode == 100)
	{
		this.scene.robot.rotateRight(this.scene.speed);
	}
	else if (event.keyCode == 87 || event.keyCode == 119)
	{
		this.scene.robot.moveArms(this.scene.speed);
		this.scene.robot.moveForward(this.scene.speed);
	}
	else if (event.keyCode == 83 || event.keyCode == 115)
	{
		this.scene.robot.moveArms(this.scene.speed);
		this.scene.robot.moveBack(this.scene.speed);
	}
	else if (event.keyCode == 111 || event.keyCode == 79)
	{
		if(this.scene.robot.handMove == 0)
			this.scene.robot.handMove = 1;
	}
};

