var debugInfo=true;
var people=[];
var fires=[];
var ships=[];
var settlements=[];
var farms=[];
var ports=[];
var caravans=[];
var sealife=[];

var gameOver=null;

bConsoleBox=new textbox();
bConsoleBox.width=400;
bConsoleBox.height=CANVAS_HEIGHT-12;
bConsoleBox.log("Loading...");
bConsoleBox.y=18;
bConsoleBox.x=18;
bConsoleBox.lines=4;



var flipper=new dolphin(750,270);

sealife.push(flipper);

var showMap=false;

var trackShip=0;
var trackTown=0;
var trackCaravan=0;

var theWatch=new aWatch();


lights.push(new light(7092,3748,14));
lights.push(new light(7208,3777,14));


var Yoren=new caravan(CastleBlack);
Yoren.men[0].name="Yoren";
Yoren.upgrade();

Yoren.ports.push(Winterfell);
Yoren.ports.push(WidowsWatch);
Yoren.ports.push(WhiteHarbor);
Yoren.ports.push(TheEyrie);
Yoren.ports.push(Gulltown);
Yoren.ports.push(Saltpans);
Yoren.ports.push(Maidenpool);
Yoren.ports.push(Duskendale);
Yoren.ports.push(KingsLanding);
Yoren.ports.push(StormsEnd);
Yoren.ports.push(Sunspear);
Yoren.ports.push(Oldtown);
Yoren.ports.push(Highgarden);
Yoren.ports.push(Lannisport);
Yoren.ports.push(Harrenhal);
Yoren.ports.push(Riverrun);
Yoren.ports.push(TheTwins);
caravans.push(Yoren);
theWatch.caravans.push(Yoren);

var farmington=new farm(theWatch,458,260)
farms.push(farmington);

	
settlements.push(CastleBlack);
settlements.push(ShadowTower);
settlements.push(Eastwatch);
settlements.push(Winterfell);
settlements.push(Skagos);
settlements.push(WidowsWatch);
settlements.push(Sisterton);
settlements.push(WhiteHarbor);
settlements.push(Braavos);
settlements.push(Lorath);
settlements.push(Saath);
settlements.push(Morosh);
settlements.push(Gulltown);
settlements.push(Riverrun);
settlements.push(TheEyrie);
settlements.push(TheTwins);
settlements.push(Highgarden);
settlements.push(Harrenhal);
settlements.push(Saltpans);
settlements.push(Maidenpool);
settlements.push(Dragonstone);
settlements.push(Driftmark);
settlements.push(Duskendale);
settlements.push(KingsLanding);
settlements.push(Stonedance);
settlements.push(Pentos);
settlements.push(StormsEnd);
settlements.push(Tarth);
settlements.push(Greenstone);
settlements.push(Stonehelm);
settlements.push(GhastonGrey);
settlements.push(Tyrosh);
settlements.push(Myr);
settlements.push(Lys);
settlements.push(Volantis);
settlements.push(Sunspear);
settlements.push(Oldtown);
settlements.push(Ryamsport);
settlements.push(Lannisport);
settlements.push(Faircastle);
settlements.push(TheCrag);
settlements.push(Pyke);
settlements.push(GreatWyk);
settlements.push(TenTowers);
settlements.push(Seaguard);
settlements.push(FlintsFinger);
settlements.push(BearIsland);

for(var poj=0;poj<settlements.length;poj++)
{
	settlements[poj].resources.push(randomFood());
	settlements[poj].resources.push(randomFood());
}

ports.push(Eastwatch);
ports.push(Skagos);
ports.push(WidowsWatch);
ports.push(Sisterton);
ports.push(WhiteHarbor);
ports.push(Braavos);
ports.push(Lorath);
ports.push(Saath);
ports.push(Morosh);
ports.push(Gulltown);
ports.push(Saltpans);
ports.push(Maidenpool);
ports.push(Dragonstone);
ports.push(Driftmark);
ports.push(Duskendale);
ports.push(KingsLanding);
ports.push(Harrenhal);
ports.push(Stonedance);
ports.push(Pentos);
ports.push(StormsEnd);
ports.push(Tarth);
ports.push(Greenstone);
ports.push(Stonehelm);
ports.push(GhastonGrey);
ports.push(Tyrosh);
ports.push(Myr);
ports.push(Lys);
ports.push(Volantis);
ports.push(Sunspear);
ports.push(Oldtown);
ports.push(Ryamsport);
ports.push(Highgarden);
ports.push(Lannisport);
ports.push(Faircastle);
ports.push(TheCrag);
ports.push(Pyke);
ports.push(GreatWyk);
ports.push(TenTowers);
ports.push(Seaguard);
ports.push(FlintsFinger);
ports.push(BearIsland);

var miles=new dude();
miles.AI=false;
miles.tileX;//todo
miles.equip(legArmorList[Math.floor(Math.random()*legArmorList.length)]);
miles.equip(chestArmorList[Math.floor(Math.random()*chestArmorList.length)]);
miles.gun=miles.guns[0];
miles.torchHand=1;

//miles.tileX=221;
//miles.y=221*tileSize;

people.push(miles);
miles.task="wandering aimlessly";
theWatch.men.push(miles);
	for(var i=0;i<5;i++)
	{	var noop=new dude();
		noop.task="Manning the Wall.";
		theWatch.men.push(noop);
	}

theWatch.farms.push(farmington);
theWatch.settlements.push(CastleBlack);
theWatch.settlements.push(Eastwatch);
theWatch.settlements.push(ShadowTower);

theWatch.sendMan(1,farms[0]);

	
var booop=new light(0,0,32,miles.torchPoint);//.arms[0].joint2));
booop.offSetX=6;
booop.offSetY=6;

lights.push(booop);



var Blackbird=new ship(Eastwatch);
//Blackbird.ports=ports;
Blackbird.crewShip(1,theWatch);
Blackbird.men[0].name="Cotter";
Blackbird.ports.push(Highgarden);
/*Blackbird.ports.push(Oldtown);
Blackbird.ports.push(Lannisport);
Blackbird.ports.push(Skagos)*/
Blackbird.watch=true;
Blackbird.upgrade();
ships.push(Blackbird);
lights.push(Blackbird.lights[0]);
theWatch.ships.push(Blackbird);

var StormCrow=new ship(Eastwatch);
StormCrow.crewShip(1,theWatch);
StormCrow.name="Storm Crow";
StormCrow.upgrade();
StormCrow.ports=ports;
StormCrow.warpToPort(10);
//StormCrow.ports.push(Harrenhal);
StormCrow.watch=true;
ships.push(StormCrow);
lights.push(StormCrow.lights[0]);
theWatch.ships.push(StormCrow);

var Talon=new ship(Eastwatch);
Talon.crewShip(1,theWatch);
Talon.name="Talon";
//Talon.ports=ports;
Talon.ports.push(Sisterton);
Talon.ports.push(WhiteHarbor);
Talon.ports.push(Braavos);
Talon.warpToPort(2);
Talon.watch=true;
ships.push(Talon);
lights.push(Talon.lights[0]);
theWatch.ships.push(Talon);

/*var treasure=new ship(Pentos);
treasure.name="Treasure";
treasure.ports.push(Braavos);
treasure.ports.push(WhiteHarbor);
ships.push(treasure);

var merlinking=new ship(WhiteHarbor);
merlinking.name="Meling King";
merlinking.ports.push(Gulltown);
merlinking.ports.push(Braavos);
merlinking.speed=4;
merlinking.upgrade();
ships.push(merlinking);

var brightfish=new ship(Braavos);
brightfish.name="Brightfish";
brightfish.ports.push(Eastwatch);
brightfish.speed=4;
//brightfish.ports=[];
//brightfish.ports.push(Braavos);
//brightfish.ports.push(Eastwatch);
brightfish.watch=false;
brightfish.upgrade();
ships.push(brightfish);
*/


var mel=new flame(lights);
mel.x=450*16;//miles.x;
mel.y=221*16;//miles.y;
mel.alive=true;
fires.push(mel);

var mlel=new flame(lights);
mlel.x=6426;
mlel.type=0;
mlel.y=19148;
mlel.alive=true;
fires.push(mlel);



for(var i=0;i<12;i++)
{
	var giles=new dude();
	giles.x=Math.random()*(116+326)*16;
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

var radarElement = $("<canvas width='" + MAP_WIDTH + "' height='" + MAP_HEIGHT + "'></canvas");
var radarCanvas = radarElement.get(0).getContext("2d");

var mapCanvasElement = $("<canvas width='" + MAP_WIDTH + "' height='" + MAP_HEIGHT + "'></canvas");
var mapCanvas = mapCanvasElement.get(0).getContext("2d");

var concanvasElement = $("<canvas width='" + 432 + "' height='" + CANVAS_HEIGHT + "'></canvas");
var concanvas = concanvasElement.get(0).getContext("2d");

concanvasElement.css("position", "absolute").css("z-index", "2").css("top", canvasElement.position().top).css("left", CANVAS_WIDTH);
concanvasElement.appendTo('body');
canvasElement.css("position", "absolute").css("z-index", "1");
canvasElement.appendTo('body');
canvasElement.css("position", "absolute").css("z-index", "0").css("top", canvasElement.position().top).css("left", canvasElement.position().left);
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

curMap = new Map();
curMap.clear();

controller= new virtualGamePad();

var ksavekey=new akey("o"); //define the different keys
var loadkey=new akey("l");

var randomwalk=false;
var gamestart=false;
var radar=true;

function drawGUI(can)
{
	can.globalAlpha=0.75;
	can.fillStyle="blue";
	canvas.fillRect(6,6,221,142);
	can.fillStyle="yellow";
	can.fillText("Men: "+theWatch.countMen(),8,25);
	var cont=0;
	can.fillText("Men at Wall: "+theWatch.men.length,8,41);
	
	can.fillText("Men in training: "+theWatch.recruits.length,8,57);//+camera.x+","+camera.y,25,57);
	can.fillText("Food: "+theWatch.getFood()+ " (~"+theWatch.timeToStarve()+" days)",8,73);
	can.fillText(thyme.years+" AC "+thyme.days+ " days, "+thyme.hours+":"+thyme.minutes ,8,91);
	can.fillText("Meals Per Day: "+theWatch.mealsPerDay,8,107);
	can.fillText("Health: "+theWatch.health,8,125);
	can.fillText("Gold: "+theWatch.gold,8,143);//+camera.x+","+camera.y,25,57);
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
	can.fillText("Gamespeed: "+gameSpeed,675,41);
	can.fillText("FPS:"+FPS,675,57);//+camera.x+","+camera.y,25,57);
	can.fillText(""+ships[trackShip].name+" "+ships[trackShip].tileX+","+ships[trackShip].tileY,675,73);
	if(ships[trackShip].portTrack<0)
	{
		can.fillText("Going nowhere",675,91);
	}else
	{
		can.fillText("Heading to: "+ships[trackShip].ports[ships[trackShip].portTrack].name ,675,91);
	}
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
	return;
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
	//canvas.fillText("  Load Game",80,665);

	if(mmcur){
		//canvas.fillText("-",78,640);
	}else	{
		//canvas.fillText("-",78,665);

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


function computePortPaths(map,anyship)
{
	setTimeout(starter,1000);
	//computeSomePaths(map);
	return;
};

function startGame()
{
	mode=1;	
	setTimeout(computePortPaths(curMap,true),1000);
	curMap.buildMap("map");
	camera.tileX=1472/16;
	camera.tileY=3328/16;
	if(graphicsLevel>0)
	{
		monsta.snow(2500,8,1);
	}
	if(graphicsLevel>1)
	{
		monsta.snow(2500,8,1);
	}
	if(graphicsLevel>2)
	{
		monsta.snow(2500,8,1);
	}

	/*graphboat = mapToGraph(curMap,true);
	graph = mapToGraph(curMap,false);*/

}

function starter()
{		
	gamestart=true;	
	//bees=true;
	bConsoleBox.log("started");
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

//------------MAIN DRAW-----------------------------------------
function mainDraw() {
	
	curMap.draw(camera);
	if(customConsole)
	{
		bConsoleBox.draw(concanvas);
	}else
	{
		concanvas.clearRect(0,0,432,CANVAS_HEIGHT);
	}
	if(!gamestart) {return;}
	for(var i=0;i<people.length;i++)
	{
		if(people[i].showTail)
		{
			people[i].drawTail(canvas,camera);
		}
		people[i].draw(canvas,camera);
	}
	
	for(var i=0;i<settlements.length;i++)
	{
		settlements[i].draw(canvas,camera);
	}
	
	for(var i=0;i<farms.length;i++)
	{
		farms[i].draw(canvas,camera);
	}
	for(var i=0;i<ships.length;i++)
	{
		ships[i].draw(canvas,camera);
	}
	for(var i=0;i<caravans.length;i++)
	{
		caravans[i].draw(canvas,camera);
	}
	for(var i=0;i<fires.length;i++)
	{
		fires[i].draw(canvas,camera);
	}
	
	for(var i=0;i<settlements.length;i++)
	{
		if(isOver(settlements[i],camera))
		{
			drawMouseText(canvas,settlements[i],camera);
		}
	}
	
	for(var i=0;i<farms.length;i++)
	{
		if(isOver(farms[i],camera))
		{
			drawMouseText(canvas,farms[i],camera);
		}
	}
	for(var i=0;i<ships.length;i++)
	{
		if(isOver(ships[i],camera))
		{
			drawMouseText(canvas,ships[i],camera);
		}
	}
	for(var i=0;i<caravans.length;i++)
	{
		if(isOver(caravans[i],camera))
		{
			drawMouseText(canvas,caravans[i],camera);
		}
	}
	
	monsta.draw(canvas,camera);

	if(!stayDay)
	{
		canvas.globalAlpha=LightLevels[thyme.hours];
		canvas.fillStyle="black";
		canvas.fillRect(0,0,CANVAS_WIDTH, CANVAS_HEIGHT);
	}

	for(var i=0;i<lights.length;i++)
	{
		//lights[i].draw(canvas,camera);
		lightenGradient(canvas,camera,lights[i], lights[i].radius)
	}
	mapDirty=true;
	
	//canvas.globalAlpha=1;
	if(showMap)
	{
		curMap.drawMap(camera,0,0);
	}else
	{
		canvas.globalAlpha=1;//0.4;
		curMap.drawRadar(camera,665,475);
	}
	drawGUI(canvas);
	drawDebug(canvas);
	
	if(gameOver)
	{
		canvas.fillStyle="white";
		var wodth=78+gameOver.length*8;
		var yex=Math.floor(CANVAS_WIDTH/2-wodth*0.5);

		var yey=Math.floor(CANVAS_HEIGHT/2);
		canvas.fillRect(yex,yey,wodth,100);	
		canvas.fillStyle="blue";
		canvas.fillRect(yex+12,yey+12,wodth-24,100-24);
		canvas.fillStyle = "white";
		canvas.font = "12pt Calibri";
		//canvas.fillText("Press Enter",200,500);
		canvas.fillText("Game Over",yex+wodth/2-32,yey+38);
		canvas.fillText(gameOver,yex+wodth/6,yey+64);
	}
};
//------------MAIN LOOP-----------------------------------------
function mainUpdate()
{
	if(!gamestart) return;
	if(gameOver) return;
	controller.update();
	//mel.x=miles.x;
	//mel.y=miles.y-26+miles.headHeight;
	var tick=0;	
    lasttime=milliseconds;
    timestamp = new Date();
    milliseconds = timestamp.getTime();
    tick++;
	thyme.update();
	theWatch.update();

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
	
	if(logsetkey.check())
	{
		console.log(settlements[trackTown].name);
		console.log("coords: "+settlements[trackTown].tileX,settlements[trackTown].tileY);
		console.log("Port: "+settlements[trackTown].portTileX,settlements[trackTown].portTileY);
		console.log("Entrance: "+settlements[trackTown].entranceTileX(),settlements[trackTown].entranceTileY());
	}	
	if(tabtownkey.check())
	{
		trackTown++;
		if(trackTown>settlements.length-1)
		{
			trackTown=0;
		}
		camera.unFollow();
		camera.center(settlements[trackTown]);
	}
	if(tabtownkey.check())
	{
		trackTown++;
		if(trackTown>settlements.length-1)
		{
			trackTown=0;
		}
		camera.unFollow();
		camera.center(settlements[trackTown]);
	}
	if(tabcaravankey.check())
	{
		trackCaravan++;
		if(trackCaravan>caravans.length-1)
		{
			trackCaravan=0;
		}
		
		camera.follow(caravans[trackCaravan]);
	}
	
	
	if((controller.keyboard ) ||(controller.pad))
	{
		if(controller.buttons[7].check())
		{
			miles.x=221;
			miles.y=170;
		}
		if(controller.buttons[8].check())
		{
			trackShip++;
			if(trackShip>ships.length-1)
			{
				trackShip=0;
			}
			camera.follow(ships[trackShip]);
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
		/*if(controller.buttons[5].checkDown())//R
		{
			//miles.expression=Math.floor(Math.random()*numfaces);
			showMap=true;
		}else
		{
			showMap=false;
		}*/
		if(controller.buttons[5].check())//R
		{
			showMap=!showMap;
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
	if(logstoreskey.check())
	{
		theWatch.logStores();
	}
	if(logshipskey.check())
	{
		theWatch.logShips();
	}
	
	if(logmenkey.check())
	{
		theWatch.logMen();
	}
	if(consolekey.check())
	{
		customConsole=!customConsole;
		if(!customConsole)
		{
		concanvasElement.css("position", "absolute").css("z-index", "2").css("top", canvasElement.position().top).css("left", CANVAS_WIDTH);
		}
	}
	if(homekey.check())
	{
		camera.unFollow();
		camera.tileX=92+326;
		camera.tileY=212;
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
		//camera.follow(ships[0]);
	}
	if(controller.buttons[6].check())
	{
		//platformer=!platformer;
		thyme.hours=8;
	}
	
	 /*if(zoomkey.check()) {
		//curMap.zoom=2;
       // curMap.setZoom(camera);
    }*/
	
	if(outfitkey.check())
	{
		miles.equipOutfit(Math.floor(Math.random()*5));
	}
	
	if(pageupkey.checkDown())
	{
		gameSpeed+=.3;
		if (gameSpeed>maxGameSpeed) {gameSpeed=maxGameSpeed;}
	}
	if(pagedownkey.checkDown())
	{
		gameSpeed-=.3;
		if (gameSpeed<.3) {gameSpeed=0;}
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
	
	if(thyme.tock)
	{
		for(var i=0;i<ships.length;i++)
		{
			ships[i].update(curMap);
		}
		for(var i=0;i<caravans.length;i++)
		{
			caravans[i].update(curMap);
		}
		for(var i=0;i<farms.length;i++)
		{
			farms[i].update();
		}
		thyme.tock=false
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
		if(!showMap)
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
		}else
		{
			if(keydown.up)
			{
				curMap.miniMapY-=15;
				if(curMap.miniMapY<0) {curMap.miniMapY=0;}
			}
			if(keydown.down)
			{
				curMap.miniMapY+=15;
				if(curMap.miniMapY>MAP_HEIGHT-CANVAS_HEIGHT) {curMap.miniMapY=MAP_HEIGHT-CANVAS_HEIGHT;}
			}
			if(keydown.right)
			{
				curMap.miniMapX+=15;
				if(curMap.miniMapX>MAP_WIDTH-CANVAS_WIDTH) {curMap.miniMapX=MAP_WIDTH-CANVAS_WIDTH;}
			}
			if(keydown.left)
			{
				curMap.miniMapX-=15;
				if(curMap.miniMapX<0) {curMap.miniMapX=0;}
			}
		}
	}
};
merp();
startGame();
//console.log(curMap.tiles[Skagos.x/16][Skagos.y/16].data);
