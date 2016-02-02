var debugInfo=true;
var people=[];
var fires=[];
var ships=[];
var ports=[];

var settlements=[];
var nightsWatch=new theWatch();
settlements.push(new settlement());
eastwatch=new settlement();
eastwatch.x=160*16;
eastwatch.y=230*16;
eastwatch.name="Eastwatch";
eastwatch.sprite=Sprite("eastwatch");

shadowtower=new settlement();
shadowtower.x=52*16;
shadowtower.y=229*16;
shadowtower.name="shadowtower";
shadowtower.sprite=Sprite("shadowtower");
settlements.push(eastwatch);
settlements.push(shadowtower);


lights.push(new light(1865,3760,14));
lights.push(new light(1976,3777,14));


ports.push(Eastwatch);
ports.push(Skagos);
ports.push(WhiteHarbor);
ports.push(Gulltown);
ports.push(Braavos);
ports.push(Lorath);
var miles=new dude();
miles.AI=false;
miles.equip(legArmorList[Math.floor(Math.random()*legArmorList.length)]);
miles.equip(chestArmorList[Math.floor(Math.random()*chestArmorList.length)]);
miles.gun=miles.guns[0];
miles.torchHand=1;

//miles.tileX=221;
//miles.y=221*tileSize;

people.push(miles);
nightsWatch.men.push(miles);

var booop=new light(0,0,32,miles.torchPoint);//.arms[0].joint2));
booop.offSetX=6;
booop.offSetY=6;

lights.push(booop);



var betha=new ship();
ships.push(betha);
lights.push(betha.lights[0]);
nightsWatch.ships.push(betha);

var mel=new flame(lights);
mel.x=124*16;//miles.x;
mel.y=221*16;//miles.y;
mel.alive=true;
fires.push(mel);

var thyme=new theTime();

for(var i=0;i<2;i++)
{
	var giles=new dude();
	giles.x=Math.random()*116*16;
	giles.y=Math.random()*128+10;
	giles.doGesture(Math.floor(Math.random()*8),100000,miles);
	giles.equip(legArmorList[Math.floor(Math.random()*legArmorList.length)]);
	giles.equip(chestArmorList[Math.floor(Math.random()*chestArmorList.length)]);
	giles.equip(helmetList[Math.floor(Math.random()*helmetList.length)]);
	people.push(giles);
	var boop=new light(0,0,32,giles.torchPoint);
	boop.offSetX=6;
	boop.offSetY=6;
	lights.push(boop)
}

function allPoint(guy)
{
	for (var i=1;i<people.length;i++)
	{
		people[i].stopGesturing();
		people[i].doGesture(Math.floor(Math.random()*6),50000,miles);
		//console.log(":yar:");
	}
}

//camera.center(miles);
camera.follow(ships[0]);
//camera.tileX=1472;
//camera.tileY=3360;

document.body.addEventListener("click", mouseClick, false);
//document.body.addEventListener("dblclick", mouseDblClick, false);
document.body.addEventListener("mousewheel",mouseWheel,false);
document.body.addEventListener("DOMMouseScroll", mouseWheel, false);


//-----------------------------------------------


requestAnimationFrame = window.requestAnimationFrame || 
                        window.mozRequestAnimationFrame || 
                        window.webkitRequestAnimationFrame || 
                        window.msRequestAnimationFrame || 
                        setTimeout; 


var canvasElement = $("<canvas width='" + CANVAS_WIDTH + "' height='" + CANVAS_HEIGHT + "'></canvas");
var canvas = canvasElement.get(0).getContext("2d");

var sillycanvasElement = $("<canvas width='" + CANVAS_WIDTH + "' height='" + CANVAS_HEIGHT + "'></canvas");
var sillycanvas = sillycanvasElement.get(0).getContext("2d");

var battleCanvasElement = $("<canvas width='" + CANVAS_WIDTH + "' height='" + CANVAS_HEIGHT + "'></canvas");
var battleCanvas = battleCanvasElement.get(0).getContext("2d");

var radarElement = $("<canvas width='" + MAP_WIDTH + "' height='" + MAP_HEIGHT + "'></canvas");
var radarCanvas = radarElement.get(0).getContext("2d");

var mapCanvasElement = $("<canvas width='" + MAP_WIDTH + "' height='" + MAP_HEIGHT + "'></canvas");
var mapCanvas = mapCanvasElement.get(0).getContext("2d");

canvasElement.css("position", "absolute").css("z-index", "1");
canvasElement.appendTo('body');
canvasElement.css("position", "absolute").css("z-index", "0").css("top", canvasElement.position().top).css("left", canvasElement.position().left);
sillycanvasElement.css("position", "absolute").css("z-index", "1").css("top", canvasElement.position().top).css("left", canvasElement.position().left);
battleCanvasElement.css("position", "absolute").css("z-index", "2").css("top", canvasElement.position().top).css("left", canvasElement.position().left);
sillycanvasElement.appendTo('body');
battleCanvasElement.appendTo('body');
canvasElement.get(0).addEventListener("mousemove", mouseXY, false);

var gamepadSupportAvailable = !!navigator.getGamepads || !!navigator.webkitGamepads;

var gamepad = navigator.getGamepads && navigator.getGamepads()[0];

window.addEventListener("GamepadConnected", function(e) {
  console.log("Gamepad connected at index %d: %s. %d buttons, %d axes.",
  e.gamepad.index, e.gamepad.id,
  e.gamepad.buttons.length, e.gamepad.axes.length);
});

window.addEventListener("GamepadDisconnected", function(e) {
  console.log("Gamepad disconnected from index %d: %s",
  e.gamepad.index, e.gamepad.id);
});


function playSound(name){
    
    nerp=document.getElementById(name);
    if(nerp.ended === true || nerp.currentTime === 0){
        nerp.play();
        numsounds++;
    }
    
}

function akey(k) {  //represents a keyboard button
    k = k || "space";
    this.key =k;
    this.aflag=false;
    this.dflag=false;
	this.desc="A small brown mushroom.";
    this.check= function(){
       
		if (keydown[this.key]) { 
            this.aflag=true;
            return false;
        }
        if((!keydown[this.key]) && (this.aflag===true)){
            this.aflag=false;
            return true;
        }
		
    };
    this.checkDown= function(){
        if (keydown[this.key] )
		{
            return true;
        }
        return false;
    };
    return this;
}

function aPadButton(k,pad) {  //represents a keyboard button
    k = k || 0;
    this.key =k;
    this.aflag=false;
    this.dflag=false;
	this.pressedTime=0;
	this.parentPad=pad;
	this.desc="A small brown mushroom.";
    this.check= function(){
        if ((this.parentPad.buttons[this.key]) && (!this.aflag)){ 
            this.aflag=true;
			timestamp = new Date();
			this.pressedTime=timestamp.getTime();
            return false;
        }
        if((!this.parentPad.buttons[this.key]) && (this.aflag===true)){
            this.aflag=false;
			timestamp = new Date();
			var nurp=timestamp.getTime();
			if(nurp-this.pressedTime<1000)
			{	
				//console.log(nurp-this.pressedTime);
				return true;
			}else
			{
				return false;
			}
        }
		
    };
    this.checkDown= function(){
        /*if ((parentPad.buttons[this.key] )  && (!this.dflag)) { 
            this.dflag=true;
            return true;
        }
        if(!parentPad.buttons[this.key]){
            this.dflag=false;
            return false;
        }*/
		if (this.parentPad.buttons[this.key] )
		{
			return true;
		}
		return false;
    };
    return this;
}

function virtualGamePad()
{
	this.buttons=[];
	this.dpad=[];
	this.keyboard=false;
		
		this.pad = navigator.getGamepads && navigator.getGamepads()[0];
		if(navigator.getGamepads()[0]){
		//if(this.pad){
			this.keyboard=false;
			this.dpad.push(this.pad.axes[0])
			this.dpad.push(this.pad.axes[1]);
			for(var i=0;i<this.pad.buttons.length;i++)
			{
				var daisy=new aPadButton(i,this.pad);
				this.buttons.push(daisy);
			}
			console.log("Controller detected.");
		}else
		{
			this.buttons=[];
			this.keyboard=true;
			this.buttons.push(new akey("z")); //a
			this.buttons[0].desc="Remove hat";
			this.buttons.push(new akey("space")); //b
			this.buttons[1].desc="Jump";
			this.buttons.push(new akey("x")); //x
			this.buttons[2].desc="Change clothes";
			this.buttons.push(new akey("shift")); //y
			this.buttons[3].desc="Run / Pound the ground";
			this.buttons.push(new akey("n"));
			this.buttons[4].desc="Change hair";
			this.buttons.push(new akey("m"));
			this.buttons[5].desc="Change face";
			this.buttons.push(new akey("j"));
			this.buttons[6].desc="Toggle platformer mode";
			this.buttons.push(new akey("return"));
			this.buttons[7].desc="Respawn";
			console.log("No controller detected, use keyboard.");
		}
	
};

virtualGamePad.prototype.switchToKeyboard=function()
{
	this.buttons=[];
	this.keyboard=true;
	this.buttons.push(new akey("z")); //a
	this.buttons[0].desc="Remove hat";
	this.buttons.push(new akey("space")); //b
	this.buttons[1].desc="Jump";
	this.buttons.push(new akey("x")); //x
	this.buttons[2].desc="Change clothes";
	this.buttons.push(new akey("shift")); //y
	this.buttons[3].desc="Run / Pound the ground";
	this.buttons.push(new akey("n"));
	this.buttons[4].desc="Change hair";
	this.buttons.push(new akey("m"));
	this.buttons[5].desc="Change face";
	this.buttons.push(new akey("j"));
	this.buttons[6].desc="Toggle platformer mode";
	this.buttons.push(new akey("return"));
	this.buttons[7].desc="Respawn";
	console.log("controller no longer detected, switching to keyboard controls");
};

virtualGamePad.prototype.switchToController=function()
{
	this.buttons=[];
	this.dpad=[];
	this.keyboard=false;
	this.pad = navigator.getGamepads && navigator.getGamepads()[0];
	if((!this.keyboard) && (navigator.getGamepads()[0])){
	//if(this.pad){
		this.keyboard=false;
		this.dpad.push(this.pad.axes[0])
		this.dpad.push(this.pad.axes[1]);
		for(var i=0;i<this.pad.buttons.length;i++)
		{
			var daisy=new aPadButton(i,this.pad);
			this.buttons.push(daisy);
		}
	}
	
	console.log("controller detected, disabling keyboard controls.");
};

virtualGamePad.prototype.checkLeft=function()
{
	if(this.keyboard)
	{
		if(keydown.a)
		{
			return true;
		}else
		{
			return false;
		}
	}else
	{
		if(this.pad.axes[0]===-1)
		{
			return true;
		}else
		{
			return false;
		}
	}
};

virtualGamePad.prototype.checkRight=function()
{
	if(this.keyboard)
	{
		if(keydown.d)
		{
			return true;
		}else
		{
			return false;
		}
	}else
	{
		if(this.pad.axes[0]===1)
		{
			return true;
		}else
		{
			return false;
		}
	}
};

virtualGamePad.prototype.checkUp=function()
{
	if(this.keyboard)
	{
		if(keydown.w)
		{
			return true;
		}else
		{
			return false;
		}
	}else
	{
		if(this.pad.axes[1]===-1)
		{
			return true;
		}else
		{
			return false;
		}
	}
};

virtualGamePad.prototype.checkDown=function()
{
	if(this.keyboard)
	{
		if(keydown.s)
		{
			return true;
		}else
		{
			return false;
		}
	}else
	{
		if(this.pad.axes[1]===1)
		{
			return true;
		}else
		{
			return false;
		}
	}
};

virtualGamePad.prototype.checkUpLeft=function()
{
	if(this.keyboard)
	{
		return false;
	}else
	{
		if((this.pad.axes[1]===-1) && (this.pad.axes[0]===-1))
		{
			return true;
		}else
		{
			return false;
		}
	}
};

virtualGamePad.prototype.checkUpRight=function()
{
	if(this.keyboard)
	{
		return false;
	}else
	{
		if((this.pad.axes[1]===-1) && (this.pad.axes[0]===1))
		{
			return true;
		}else
		{
			return false;
		}
	}
};

virtualGamePad.prototype.checkDownLeft=function()
{
	if(this.keyboard)
	{
		return false;
	}else
	{
		if((this.pad.axes[1]===1) && (this.pad.axes[0]===-1))
		{
			return true;
		}else
		{
			return false;
		}
	}
};

virtualGamePad.prototype.checkDownRight=function()
{
	if(this.keyboard)
	{
		return false;
	}else
	{
		if((this.pad.axes[1]===1) && (this.pad.axes[0]===1))
		{
			return true;
		}else
		{
			return false;
		}
	}
};

virtualGamePad.prototype.update=function()
{
	this.pad = navigator.getGamepads && navigator.getGamepads()[0];
	if((!this.keyboard) && (!navigator.getGamepads()[0]))
	{
		this.switchToKeyboard();

	}else if((this.keyboard) && (navigator.getGamepads()[0]))
	{
		this.switchToController();
	}
	
};

curMap = new Map();
curMap.clear();

controller= new virtualGamePad();

distance=function(one,two){
	return(Math.pow(one.x-two.x,2)+Math.pow(one.y-two.y,2));
};

function time(){
    this.hours=0; 
    this.minutes=0;
    this.seconds=0;
    this.days=0;
}
time.prototype.update=function(){
    this.seconds++;
    if(this.seconds>60){
        this.seconds=0;
        this.minutes++;
        if (this.minutes>60){
            this.hours++;
            if(this.hours>24) {
				this.hours=0; 
				this.days++;
			} 
            this.minutes=0;
            this.seconds=0;
        }
    }
};

var theTime=new time();

var ksavekey=new akey("o"); //define the different keys
var loadkey=new akey("l");

var randomwalk=false;
var gamestart=false;
var radar=true;

var edskeys=[];

var pausekey=new akey("space");
pausekey.desc="Pause";
edskeys.push(pausekey);
var debugkey=new akey("l");
debugkey.desc="Debug key";

var troopskey=new akey("t");
troopskey.desc="Debug key";

edskeys.push(debugkey);
var escapekey=new akey("esc");
escapekey.desc="Pause and bring up menu";
edskeys.push(escapekey);
var pageupkey=new akey("pageup");
pageupkey.desc="Nothing yet."
edskeys.push(pageupkey);
var pagedownkey=new akey("pagedown");
pagedownkey.desc="Nothing yet."
edskeys.push(pagedownkey);
var serversavekey=new akey("i");
serversavekey.desc="Server save, eventually."
edskeys.push(serversavekey);
var serverloadkey=new akey("k");
serverloadkey.desc="Server load, eventually."
edskeys.push(serverloadkey);
var upkey=new akey("up");
upkey.desc="Move camera"
edskeys.push(upkey);
var rightkey=new akey("right");
rightkey.desc="Move camera."
edskeys.push(rightkey);
var downkey=new akey("down");
downkey.desc="Move camera."
edskeys.push(downkey);
var leftkey=new akey("left");
leftkey.desc="Move camera."
edskeys.push(leftkey);

var zoomkey=new akey("z");
zoomkey.desc="Zoom";
edskeys.push(zoomkey);
var helpkey=new akey("h");
helpkey.desc="You just pressed it."
edskeys.push(helpkey);

var outfitkey=new akey("o");
outfitkey.desc="change into a random outfit."
edskeys.push(outfitkey);

var startkey=new akey("return");
pageupkey.desc="It's the fucking enter button."
edskeys.push(startkey);

var letterkeys=[];
letterkeys.push(new akey("a"));
letterkeys.push(new akey("b"));
letterkeys.push(new akey("c"));
letterkeys.push(new akey("d"));
letterkeys.push(new akey("e"));
letterkeys.push(new akey("f"));
letterkeys.push(new akey("g"));
letterkeys.push(new akey("h"));
letterkeys.push(new akey("i"));
letterkeys.push(new akey("j"));
letterkeys.push(new akey("k"));
letterkeys.push(new akey("l"));
letterkeys.push(new akey("m"));
letterkeys.push(new akey("n"));
letterkeys.push(new akey("o"));
letterkeys.push(new akey("p"));
letterkeys.push(new akey("q"));
letterkeys.push(new akey("r"));
letterkeys.push(new akey("s"));
letterkeys.push(new akey("t"));
letterkeys.push(new akey("u"));
letterkeys.push(new akey("v"));
letterkeys.push(new akey("w"));
letterkeys.push(new akey("x"));
letterkeys.push(new akey("y"));
letterkeys.push(new akey("z"));

var numberkeys=[];
numberkeys.push(new akey("0"));
numberkeys.push(new akey("1"));
numberkeys.push(new akey("2"));
numberkeys.push(new akey("3"));
numberkeys.push(new akey("4"));
numberkeys.push(new akey("5"));
numberkeys.push(new akey("6"));
numberkeys.push(new akey("7"));
numberkeys.push(new akey("8"));
numberkeys.push(new akey("9"));

function drawGUI(can)
{
	can.globalAlpha=0.75;
	can.fillStyle="blue";
	canvas.fillRect(6,6,221,90);
	can.fillStyle="yellow";
	can.fillText("Men: "+nightsWatch.men.length,8,25);
	can.fillText("Fighting Men: "+(nightsWatch.men.length-nightsWatch.wounded),8,41);
	can.fillText("Gold: "+nightsWatch.gold,8,57);//+camera.x+","+camera.y,25,57);
	can.fillText("Food: "+nightsWatch.getFood(),8,73);
	can.fillText(+thyme.years+" AC "+thyme.days+ " days, "+thyme.hours+":"+thyme.minutes ,8,91);
	//can.fillText(": "+Math.floor(miles.numJumps-miles.jumpTrack),755,55);
	can.globalAlpha=1;
}

function drawDebug(can)
{
	if(!debugInfo) {return;}
	can.globalAlpha=0.75;
	can.fillStyle="blue";
	canvas.fillRect(672,6,221,90);
	can.fillStyle="yellow";
	can.fillText("Particles: "+monsta.particles.length,675,25);
	can.fillText("Lights: "+lights.length,675,41);
	can.fillText("FPS:"+FPS,675,57);//+camera.x+","+camera.y,25,57);
	can.fillText("Make rain later.",675,73);
	can.fillText(thyme.days+ " days, "+thyme.hours+":"+thyme.minutes ,675,91);
	//can.fillText(": "+Math.floor(miles.numJumps-miles.jumpTrack),755,55);
	can.globalAlpha=1;
}

function merp() {
requestAnimationFrame(merp,canvas);

FPS=countFPS();
	if(mode==0){
		mainMenuUpdate();
		mainMenuDraw();
	}else if(mode==1){
		mainUpdate();
		mainDraw();	
	}else if(mode==2){
		troopScreenUpdate();
		troopScreenDraw();
	}
	//canvas.beginPath();
	//osCanvas.drawImage(canvasElement,0,0);
}




/*document.getElementById("myAudio").addEventListener('ended', function() { //loops music
    this.currentTime = 0;
    this.play();
}, false);*/

function menuDraw()
{

    battletick++;
    //canvas.save();
    canvas.globalAlpha=0.80;
    canvas.fillStyle =  "#DCDCDC";
    canvas.fillRect(25,95,850,500);
    canvas.fillStyle =bColors[6];//Math.floor(Math.random()*5)];// "#483D8B ";
    canvas.fillRect(40,110,820,470);
    //canvas.restore();
	canvas.globalAlpha=1;
    canvas.font = "14pt Calibri";
    canvas.textAlign = "left";
    canvas.textBaseline = "middle";
    
}

	bConsoleBox=new textbox();
	bConsoleBox.width=460;
	bConsoleBox.height=90;
	
	bConsoleBox.msg[0]=bConsoleStr[0+bConsoleBox.scroll];//[bConsoleStr.length-4];
	bConsoleBox.msg[1]=bConsoleStr[1+bConsoleBox.scroll];//[bConsoleStr.length-3];
	bConsoleBox.msg[2]=bConsoleStr[2+bConsoleBox.scroll];//[bConsoleStr.length-2];
	bConsoleBox.msg[3]=bConsoleStr[3+bConsoleBox.scroll];//[bConsoleStr.length-1];
	bConsoleBox.y=15;
	bConsoleBox.x=30;
	bConsoleBox.lines=4;
	

if(MUSIC_ON){
	document.getElementById("titleAudio").volume=MUSIC_VOL;
	document.getElementById("titleAudio").play(); //starts music
}

function mainMenuDraw(){
	canvas.fillStyle = "black";
	canvas.fillRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT);
	titlesprite.draw(canvas,0,0);
	canvas.fillStyle = "black";
	canvas.font = "16pt Calibri";
	//canvas.fillText("Press Enter",200,500);
	canvas.fillText("  New Game",80,640);
	canvas.fillStyle = "grey";
	canvas.fillText("  Load Game",80,665);

	if(mmcur){
		canvas.fillText("-",78,640);
	}else	{
		canvas.fillText("-",78,665);

	}
	//monsta.draw(canvas,camera);
	//canvas.fillText("Particles: "+ monsta.particles.length,460,550);
};

function troopScreenDraw(){
	canvas.fillStyle = "black";
	canvas.fillRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT);
	troopScreensprite.draw(canvas,0,0);
	canvas.fillStyle = "black";
	canvas.font = "12pt Calibri";
	//canvas.fillText("Press Enter",200,500);
	canvas.fillText("0",71,757);
	monsta.draw(canvas,camera);
	//canvas.fillText("Particles: "+ monsta.particles.length,460,550);
};

function startGame()
{
	mode=1;	
	gamestart=true;
	curMap.buildMap("map");
	camera.tileX=1472/16;
	camera.tileY=3328/16;
	monsta.snow(2500,8,1);
	for(var i=0;i<3;i++)
	{
		nightsWatch.men.push(new dude());
	}
}

function troopScreenUpdate(){
	//startGame();
	var tick=0;
	lasttime=milliseconds;
    timestamp = new Date();
    milliseconds = timestamp.getTime();
    tick++;
	monsta.update();
	 if(debugkey.check()) {
		MUSIC_ON=!MUSIC_ON;
		document.getElementById("titleAudio").pause();
		//monsta.startOrbit(40000,Math.floor(Math.random()*CANVAS_WIDTH),Math.floor(Math.random()*CANVAS_HEIGHT),60);
	 }
	
	
	
	gamepad = navigator.getGamepads && navigator.getGamepads()[0];
	if(controller.buttons[7].check())
	{
		mode=1;
	}
		
	if(escapekey.check()){
		mode=1;
	}

	//TODO HERE
};

function mainMenuUpdate(){
	//startGame();
	var tick=0;
	lasttime=milliseconds;
    timestamp = new Date();
    milliseconds = timestamp.getTime();
    tick++;
	monsta.update();
	 if(debugkey.check()) {
		MUSIC_ON=!MUSIC_ON;
		document.getElementById("titleAudio").pause();
		//monsta.startOrbit(40000,Math.floor(Math.random()*CANVAS_WIDTH),Math.floor(Math.random()*CANVAS_HEIGHT),60);
	 }
	
	
	
	gamepad = navigator.getGamepads && navigator.getGamepads()[0];
	if(controller.buttons[7].check())
	{
		startGame();
	}else if(startkey.check()){
		startGame();
	}
	if(downkey.check()){
		mmcur=!mmcur;
	}
	if(upkey.check()){
		mmcur=!mmcur;
	}
	
};

function reqsMet(dex){
	if(dex==0) {return true;}
	for(var i=0;i<maps[dex].numReqs;i++)
	{
		if(maps[maps[dex].preReq[i]].team==1)
		{
			return false;
		}
	}
	return true;
};


function worldMapDraw(){

};




function worldMapUpdate(){

};

function dingle(x,y)
{
	canvas.save()
	canvas.globalAlpha=0.4;
	
	if(curMap.walkable(Math.floor(miles.tileX)+x,Math.floor(miles.tileY)+y))
	{
		canvas.fillStyle="white";
	}else
	{
		canvas.fillStyle="red";
	}

	canvas.translate(((miles.tileX+x)*16-camera.tileX*16)*camera.zoom,((miles.tileY+y)*16-camera.tileY*16)*camera.zoom);
	canvas.fillRect(0,0,16,16);
	canvas.restore();

}

//------------MAIN DRAW-----------------------------------------
function mainDraw() {
	curMap.draw(camera);
	/*canvas.fillStyle="white";
	canvas.fillRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT);*/
	for(var i=0;i<people.length;i++)
	{
		if(people[i].showTail)
		{
			people[i].drawTail(canvas,camera);
		}
		people[i].draw(canvas,camera);
	}
	
	for(var i=0;i<fires.length;i++)
	{
		fires[i].draw(canvas,camera);
	}
	
	for(var i=0;i<ports.length;i++)
	{
		ports[i].draw(canvas,camera);
	}
	
	for(var i=0;i<ships.length;i++)
	{
		ships[i].draw(canvas,camera);
	}
	
	for(var i=0;i<settlements.length;i++)
	{
		settlements[i].draw(canvas,camera);
	}
	
	monsta.draw(canvas,camera);

	/*dingle(0,1);
	dingle(0,0);
	dingle(1,0);
	dingle(1,1);*/
	
	//canvas.fillRect(miles.tileX+camera.x,miles.tileY+camera.y,16,16);

	canvas.globalAlpha=LightLevels[thyme.hours];
	canvas.fillStyle="black";
	canvas.fillRect(0,0,CANVAS_WIDTH, CANVAS_HEIGHT);
	//ligthenGradient(canvas,camera,fires[0], 24)

	for(var i=0;i<lights.length;i++)
	{
		//lights[i].draw(canvas,camera);
		ligthenGradient(canvas,camera,lights[i], lights[i].radius)
	}
	/*for(var i=0;i<people.length;i++)
	{
		if(people[i].torch)
		{
			if(!people[i].aiming)
			{
				var tehg=[];
				//console.log(people[i].y+people[i].arms[0].backArm.joint2.y);
				tehg.x=people[i].x+5;//people[i].arms[0].backArm.joint2.x;
				tehg.y=people[i].y+2;//people[i].arms[0].backArm.joint2.y;
				ligthenGradient(canvas,camera,tehg, 40);
			}else{
				var tehg=[];
				//console.log(people[i].y+people[i].arms[0].backArm.joint2.y);
				tehg.x=people[i].x+13;//people[i].arms[0].backArm.joint2.x;
				tehg.y=people[i].y-8;//people[i].arms[0].backArm.joint2.y;
				ligthenGradient(canvas,camera,tehg, 40);
			}
		}
	}*/
	mapDirty=true;
	canvas.globalAlpha=1;//0.4;
	curMap.drawRadar(camera,665,475);
	//canvas.globalAlpha=1;
	drawGUI(canvas);
	drawDebug(canvas);

	
};
//------------MAIN LOOP-----------------------------------------
function mainUpdate()
{
	if(!gamestart) return;
	controller.update();
	//mel.x=miles.x;
	//mel.y=miles.y-26+miles.headHeight;
	var tick=0;	
    lasttime=milliseconds;
    timestamp = new Date();
    milliseconds = timestamp.getTime();
    tick++;
	thyme.update();
	nightsWatch.update();
	gamepad = navigator.getGamepads && navigator.getGamepads()[0];
	
	for(var i=0;i<people.length;i++)
	{
		if(!people[i].alive)
		{
			people.splice(i,1);
			i--;
		}
	}
	for(var i=0;i<fires.length;i++)
	{
		if(!fires[i].alive)
		{
			fires.splice(i,1);
			i--;
		}
	}
	
	
	if((controller.keyboard ) ||(controller.pad))
	{
		if(controller.buttons[7].check())
		{
			miles.x=221;
			miles.y=170;
		}
	
		if(controller.buttons[1].check())
		{
			if(miles.crouching)
			{
				miles.bigJump();
			}else
			{
				miles.jump();
			}
		}
		if(controller.buttons[2].check())
		{
			/*miles.equip(legArmorList[Math.floor(Math.random()*legArmorList.length)]);
			miles.equip(chestArmorList[Math.floor(Math.random()*chestArmorList.length)]);
			miles.equip(helmetList[Math.floor(Math.random()*helmetList.length)]);*/
			miles.cycleGuns();
		}
		
		if(!platformer)
		{
			/*if(controller.buttons[0].checkDown())
			{
				miles.crouching=true;
			}else
			{
				miles.crouching=false;
			}*/
			if(controller.buttons[0].checkDown())//A
			{
				//miles.equip(noHelmet);
				console.log("frog");
				miles.arms[0].backArm.angle=195;
				miles.arms[1].backArm.angle=345;
				miles.arms[0].update();
				miles.arms[1].update();
			}else
			{
				miles.arms[0].backArm.angle=90;
				miles.arms[1].backArm.angle=90;
				miles.arms[0].update();
				miles.arms[1].update();
			}
		}else
		{
			if(miles.aiming)
			{
			
				if(controller.buttons[0].check())
				{
					miles.shoot();
				}
			}else
			{
				if(controller.buttons[0].checkDown())
				{
					miles.wingsOut=true;
				}else
				{
					miles.wingsOut=false;
				}
			}
		}
		if(controller.buttons[3].check())//Y
		{
			if(miles.jumpTrack>0)
			{
				if(true)//(miles.dongle)
				{
					miles.pound();
				}
			}
		}
		if(controller.buttons[5].checkDown())//R
		{
			//miles.expression=Math.floor(Math.random()*numfaces);
			miles.aiming=true;
		}else
		{
			miles.aiming=false;
		}
		if(controller.buttons[4].check()) //X
		{
			miles.backDash();
			
		}
	}
	if(troopskey.check())
	{
		mode=2;
	}
	if(debugkey.check())
	{
		//platformer=!platformer;
		//debugInfo=!debugInfo;
		//allPoint(miles);
		//miles.equip(helmetList[Math.floor(Math.random()*helmetList.length)]);
		/*for(var i=0;i<people.length;i++)
		{
			people[i].setDestination(75,26,curMap);
		}*/
		//mode=2;
		//monsta.startOrbit(40000,Math.floor(Math.random()*CANVAS_WIDTH),Math.floor(Math.random()*CANVAS_HEIGHT),60);
		//monsta.snow(10000,4,1);
		//console.log(Math.floor(ships[0].x/16),Math.floor(ships[0].y/16));
		//console.log(curMap.tiles[69][11].data);
		//ships[0].setDestination(Math.floor(Skagos.x/16),Math.floor(Skagos.y/16),curMap);
		for(var i=1;i<people.length;i++)
		{
		
			//people[i].setDestination(settlements[0].tileX,settlements[0].tileY-5,curMap);
		}
		bees=true;
		camera.follow(ships[0]);
	}
	if(controller.buttons[6].check())
	{
		platformer=!platformer;
	}
	
	 /*if(zoomkey.check()) {
		//curMap.zoom=2;
       // curMap.setZoom(camera);
    }*/
	
	if(outfitkey.check())
	{
		miles.equipOutfit(Math.floor(Math.random()*5));
	}
	
	if(helpkey.check())
	{
		//stars[curSystem].planets[stars[curSystem].selected].orbitDecay=1;
		/*for(var i=0;i<edskeys.length;i++)
		{
			console.log(edskeys[i].key.toUpperCase() + ": "+edskeys[i].desc);
		}*/
		if(controller.keyboard)
		{
			for(var i=0;i<controller.buttons.length;i++)
			{
				console.log(controller.buttons[i].key.toUpperCase() + ": "+controller.buttons[i].desc);
			}
		}else
		{
			console.log("Use the controller.");
			for(var i=0;i<edskeys.length;i++)
			{
				console.log(edskeys[i].key.toUpperCase() + ": "+edskeys[i].desc);
			}
		}
	}
	
	if ((milliseconds-lastani>WATER_RATE) &&(!isBattle))
	{
		tileani++;
		lastani=milliseconds;
		anicount=0;
		mapDirty=true;
    }
    if (tileani>3) {tileani=0} //tile animations
	camera.update();
	monsta.update();
	for(var i=0;i<people.length;i++)
	{
		people[i].update(curMap);
	}
	
	for(var i=0;i<fires.length;i++)
	{
		fires[i].update();
	}
	
	for(var i=0;i<ships.length;i++)
	{
		ships[i].update(curMap);
	}
	
	for(var i=0;i<lights.length;i++)
	{
		lights[i].update();
		if(!lights[i].alive)
		{
			lights.splice(i,1);
			i--;
		}
	}
	
	var speeMulti=1;
	
		//miles.dongle=false;
		if((controller.buttons[3].checkDown()) &&(miles.onSurface()) && ((controller.checkLeft()) || (controller.checkRight())) )
		{
			//speedMulti=3;
			//miles.speedFactor=30;
			miles.running=1;
			//controller.buttons[3].aflag=false;
			miles.accelerate();
			if(miles.speedFactor>15)
			{
				miles.showTail=true;
			}
			miles.tailLength=2;
			if(miles.tail.length>2)
			{
				miles.tail.splice(0,miles.tail.length-2);
			}
		}else
		{
			//miles.speedFactor=10;
			miles.running=1;
			miles.deccelerate();
			//speedMulti=1;
			if(!miles.pounding)
			{
				miles.showTail=false;
			}
			miles.tailLength=5;
		}
	
	if (controller.buttons[3].checkDown())
	{
			miles.running=2;
	}else
	{
		miles.running=1;
	}
	
	if(true)
	{
		
		if(controller.checkUp())
		{
			camera.follow(miles);
			miles.yV=-4*miles.running;
			//console.log(miles.running);
			//camera.y-=miles.speed*speedMulti;
			//camera.y=miles.y-CANVAS_HEIGHT/2;
			if(miles.y<0) {miles.y=0;}
			mapDirty=true;
		}else if(controller.checkDown())
		{
			camera.follow(miles);
			miles.yV=4*miles.running;;//miles.speed*(miles.speedFactor/10);
			//camera.y+=miles.speed*speedMulti;
			//camera.y=miles.y-CANVAS_HEIGHT/2;
			if(miles.y>curMap.height*tileSize-miles.height) {miles.y=(curMap.height-2)*tileSize}
			mapDirty=true;
		}else
		{
			miles.yV=0;
	
		}
		if(controller.checkLeft())
		{
			camera.follow(miles);
			miles.xV=-4*miles.running;;//miles.speed*(miles.speedFactor/10);
			//camera.x-=miles.speed*speedMulti;
			//camera.x=miles.x-CANVAS_WIDTH/2;
			if(miles.x<0) {miles.x=0;}
			mapDirty=true;
		}else if(controller.checkRight())
		{
			camera.follow(miles);
			miles.xV=4*miles.running;//miles.speed*(miles.speedFactor/10);
			//camera.x+=miles.speed*speedMulti;
			//camera.x=miles.x-CANVAS_WIDTH/2;
			if(miles.x>(curMap.width-5)*tileSize) {miles.x=(curMap.width-5)*tileSize}
			mapDirty=true;
		}else
		{
			miles.xV=0;
		}
	}	
	if(true)
	{
		if(keydown.up)
		{
			camera.unFollow();
			camera.tileY-=camera.moveSpeed*camera.zoomMove;
			camera.update();
			if(camera.tileY<0) {camera.y=0; camera.tileY=0;}
			mapDirty=true;
		}
		if(keydown.down)
		{
			camera.unFollow();
			camera.tileY+=camera.moveSpeed*camera.zoomMove;
			camera.update();
			if(camera.tileY>curMap.height-camera.height) {camera.tileY=curMap.height-camera.height;camera.y=camera.tileY;}
			mapDirty=true;
		}
		if(keydown.right)
		{
			camera.unFollow();
			camera.tileX+=camera.moveSpeed*camera.zoomMove;
			camera.update();
			if(camera.tileX>curMap.width-camera.width) {camera.tileX=curMap.width-camera.width;}
			mapDirty=true;
		}
		if(keydown.left)
		{
			camera.unFollow();
			camera.tileX-=camera.moveSpeed*camera.zoomMove;
			camera.update();
			if(camera.tileX<0) {camera.tileX=0; camera.x=0;}//todo
			mapDirty=true;
		}
	}
};
merp();
startGame();
//console.log(curMap.tiles[Skagos.x/16][Skagos.y/16].data);
