
var gameSpeed=.3;
var snoop=[];

var loadscreen=Sprite("loading");

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


canvasElement.css("position", "absolute").css("z-index", "1");
canvasElement.appendTo('body');
canvasElement.css("position", "absolute").css("z-index", "1").css("top", canvasElement.position().top).css("left", canvasElement.position().left);

canvasElement.get(0).addEventListener("mousemove", mouseXY, false);

function blurp(){
requestAnimationFrame(blurp,canvas);
loadscreen.draw(canvas,0,0);
}
blurp();

function playSound(name){
    
    nerp=document.getElementById(name);
    if(nerp.ended === true || nerp.currentTime === 0){
        nerp.play();
        numsounds++;
    }
    
}



var productionBar=new progressBar();
var researchBar=new progressBar();

var civScreenButton=new button(this);
civScreenButton.x=10;
civScreenButton.y=60;
civScreenButton.width=80;
civScreenButton.object=this.object;
civScreenButton.text="    Civilizations";
civScreenButton.on=false;
civScreenButton.parent=null;
civScreenButton.doThings=function()
{
	//this.on=!this.on;
	roland.visible=!roland.visible;
};
civScreenButton.visible=true;
buttons.push(civScreenButton);

productionBar.x=10;
productionBar.label="Production:";
productionBar.y=8;
researchBar.x=10;
researchBar.label="Research:  ";
researchBar.y=30;
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
        if ((keydown[this.key] )  && (!this.dflag)) { 
            this.dflag=true;
            return true;
        }
        if(!keydown[this.key]){
            this.dflag=false;
            return false;
        }
    };
    return this;
}


	//curMap = new Map();
//INITSDONKEY
distance=function(one,two){
	return(Math.pow(one.x-two.x,2)+Math.pow(one.y-two.y,2));
};

initUniverse();
newInitShips();
camera.follow(selectedShip);
var debugText=false;

var ksavekey=new akey("o"); //define the different keys
var loadkey=new akey("l");

var randomwalk=false;
var gamestart=false;
var radar=true;

var edskeys=[];


var pausekey=new akey("space");
pausekey.desc="Set game speed to 0";
edskeys.push(pausekey);

var escapekey=new akey("esc");
escapekey.desc="Evacuate a ship or back out of a menu.";
edskeys.push(escapekey);


var homekey=new akey("home");
homekey.desc="Jump to homeworld";
edskeys.push(homekey);
var endkey=new akey("end");
endkey.desc="Jump to Bord cube";
edskeys.push(endkey);
var upkey=new akey("up");
upkey.desc="Manual Control: Increase Speed.  Otherwise moves the camera";
edskeys.push(upkey);
var rightkey=new akey("right");
rightkey.desc="Manual Control: Turn Speed.  Otherwise moves the camera";
edskeys.push(rightkey);

var downkey=new akey("down");
downkey.desc="Manual Control: Decrese Speed.  Otherwise moves the camera";
edskeys.push(downkey);
var leftkey=new akey("left");
leftkey.desc="Manual Control: Turns ship.  Otherwise moves the camera";
edskeys.push(leftkey);
var tabkey=new akey("tab");
tabkey.desc="Cycle through your ships";
edskeys.push(tabkey);
var camspeedkey=new akey("shift");
camspeedkey.desc="Hold to increase camera pan speed";
edskeys.push(camspeedkey);
var plkey=new akey("p");
plkey.desc="Toggle Planets.  this might not do anything anymore.";
edskeys.push(plkey);
var startkey=new akey("return");
startkey.desc="";
var phaserkey=new akey("u");
phaserkey.desc="Manually fire phasers";
edskeys.push(phaserkey);
var tractorkey=new akey("b");
tractorkey.desc="Deploy tractor beam";
edskeys.push(tractorkey);
var tractortargetkey=new akey("n");
tractortargetkey.desc="Target tractor beam";
edskeys.push(tractortargetkey);
var beamkey=new akey("i");
beamkey.desc="Transporter";
edskeys.push(beamkey);
var beamtargetkey=new akey("a");
beamtargetkey.desc="Target transporter";
edskeys.push(beamtargetkey);

var debugkey=new akey("k");
debugkey.desc="dunno"
edskeys.push(debugkey);
var pageupkey=new akey("o");
pageupkey.desc="Increase gamespeed";
edskeys.push(pageupkey);
var pagedownkey=new akey("l");
pagedownkey.desc="Decrease gamespeed";
edskeys.push(pagedownkey);
var dkey=new akey("d");
dkey.desc="";
var starkey=new akey("s");
starkey.dext="cycle stars?";
var gokey=new akey("g");
gokey.desc="";
edskeys.push(gokey);
var helpkey=new akey("h");
helpkey.desc="You just pressed it.";
edskeys.push(helpkey);
var toggleallshipskey=new akey("v");
toggleallshipskey.desc="";
var shipleftkey=new akey("q");
shipleftkey.desc="";
var shiprightkey=new akey("w");
shiprightkey.desc="";
var shipgokey=new akey("e");
shipgokey.desc="";

var shipslowkey=new akey("r");
shipslowkey.desc="";
var evackey=escapekey;

var minekey=new akey("m");
minekey.desc="Deploy Mine";
edskeys.push(minekey);
var crewscreenkey=new akey("c");
crewscreenkey.desc="Display crew pool";
edskeys.push(crewscreenkey);
var targetkey=new akey("del");
targetkey.desc="Target weapons";
edskeys.push(targetkey);
var firekey=new akey("shift");
firekey.desc="Fire torpedos";
var fleetattackkey=new akey("j");
fleetattackkey.desc="Order a fleet to attack*";
edskeys.push(fleetattackkey);
var enterkey=startkey;
enterkey.desc="Call your allies to defend Earth";
edskeys.push(enterkey);
var colonizekey=new akey("z");
colonizekey.desc="Colonize?";
edskeys.push(colonizekey);



var maxspeedkey=new akey("0");
maxspeedkey.desc="Set the gamespeed to maximum";
edskeys.push(maxspeedkey);
var textkey=new akey("1");
textkey.desc="Display debug info";
edskeys.push(textkey);
var shipscreenkey=new akey("2");
shipscreenkey.desc="Toggle display of ship info panel";
edskeys.push(shipscreenkey);
var autoplaykey=new akey("3");
autoplaykey.desc="Toggle AI control of player Civilization";
edskeys.push(autoplaykey);
var soundkey=new akey("4");
soundkey.desc="Mute / unmute";
edskeys.push(soundkey);
var toggleinfokey=new akey("5");
toggleinfokey.desc="Cycle through civilizations on civilzation screen";
edskeys.push(toggleinfokey);
var infokey=new akey("6");
infokey.desc="Display civilization screen";
edskeys.push(infokey);
var shieldskey=new akey("7");
shieldskey.desc="Toggle selected ship's shields, if availible";
edskeys.push(shieldskey);
var mapkey=new akey("8");
mapkey.desc="Display the map";
edskeys.push(mapkey);
var cleartailskey=new akey("9");
cleartailskey.desc="Clear the map trails";
edskeys.push(cleartailskey);
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

backkey=new akey(8);
backkey.key=8;
function merp() {
requestAnimationFrame(merp,canvas);
	if(mode===0){
		mainMenuUpdate();
		mainMenuDraw();
	}else if(mode==1){
		crewScreenUpdate();
		crewScreenDraw();
	}else if(mode==2){
		mainUpdate();
		mainDraw();
		
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

function drawGUI()
{
	canvas.fillText("Gamespeed: "+gameSpeed,755,25);
	//canvas.fillText("Particles: "+ monsta.particles.length,755,100);
	//canvas.fillText("Stars drawn: "+ starsDrawn,755,115);
	canvas.fillText("Stardate: "+ Math.floor(theTime.years)+"."+Math.floor(theTime.days) ,755,40);
	canvas.fillText("Money: $"+civs[playerCiv].money ,755,55);
	
	productionBar.val=civs[playerCiv].productionTick;
	productionBar.maxVal=civs[playerCiv].nextProduction;
	productionBar.draw(canvas,camera);
	researchBar.val=civs[playerCiv].researchTick;
	researchBar.maxVal=civs[playerCiv].nextResearch;
	researchBar.draw(canvas,camera);
	civScreenButton.draw(canvas,camera);
}
function drawDebug()
{
	if(!debugText) {return;}
	if(flashGUITick>0)
	{
		canvas.fillStyle=bColors[flashGUITrack];
		flashGUITick-=1;//*gameSpeed;
		flashGUITrack++;
		if(flashGUITrack>bColors.length-1)
		{
			flashGUITrack=0;
		}
	}	
	canvas.font = "8pt Calibri";
	//canvas.fillText("Press Enter",200,500);
	//canvas.fillText("  New Game",175,450);
	//canvas.fillStyle = "grey";
	//canvas.fillText("  Load Game",175,475);
	canvas.fillText("Camera: "+Math.floor(camera.x)+", "+Math.floor(camera.y),755,10);

   // canvas.fillText("Gamespeed: "+gameSpeed,755,25);
	canvas.fillText("Particles: "+ monsta.particles.length,755,130);
	canvas.fillText("Stars drawn: "+ starsDrawn,755,115);
	//canvas.fillText("Stardate: "+ Math.floor(theTime.years)+"."+Math.floor(theTime.days) ,755,70);
	canvas.fillText("Zoom: "+camera.zoom ,755,100);
	canvas.fillText("Your Ships: "+civs[playerCiv].ships.length ,755,70);
	canvas.fillText("Total Ships: "+ships.length ,755,85);
	
	/*canvas.fillText("System: "+stars[curSystem].name,25,55);
	canvas.fillText("Planets: "+ stars[curSystem].numPlanets,25,70);
	canvas.fillText("moons: "+ stars[curSystem].countMoons(),25,85);
	canvas.fillText("Astroids: "+ stars[curSystem].numAstroids,25,100);
	canvas.fillText("Coords: "+stars[curSystem].x+","+stars[curSystem].y,25,115);
	canvas.fillText(getQuadrant(stars[curSystem])+" Quadrant",25,130);
	if(stars[curSystem].numPlanets>0)
	{
		var typestr="Class M!";
		if (stars[curSystem].planets[stars[curSystem].selected].type===0) {typestr="Earthy!"}
		if (stars[curSystem].planets[stars[curSystem].selected].type==1) {typestr="Rocky";}
		if (stars[curSystem].planets[stars[curSystem].selected].type==2) {typestr="Hot";}
		if (stars[curSystem].planets[stars[curSystem].selected].type==3) {typestr="Icey";}
		if (stars[curSystem].planets[stars[curSystem].selected].type==4) {typestr="Gas Giant";}
		if (stars[curSystem].planets[stars[curSystem].selected].type==5) {typestr="....Rings!";}
		if (stars[curSystem].planets[stars[curSystem].selected].type==6) {typestr="WTF have you found here.";}
	
		canvas.fillText("Planet Name: "+ stars[curSystem].planets[stars[curSystem].selected].name,25,145);
		canvas.fillText("Planet Type: "+ typestr,25,160);
		canvas.fillText("Planet HP: "+stars[curSystem].planets[stars[curSystem].selected].hp,25,175);
		}

		if(stars[curSystem].planets[stars[curSystem].selected].orbitDecay>0)
		{
			canvas.fillStyle = "red";
			canvas.fillText("WARNING: ORBIT DECAYING",25,205);
			canvas.fillStyle = "white";
		
		}
		
	}		*/
		if((Cube) && (Cube.alive) &&(Cube.planetTarget)){
		canvas.fillText("Cube "+Math.floor(distance(Cube.planetTarget,Cube))+" AU from "+Cube.planetTarget.name,25,190);
		}
	//ship info
	if(!selectedShip) {canvas.restore(); return;}
	selectedShip.actionText="Full Stop";
	if(selectedShip.speed>0){
		if((selectedShip.desiredOrbitTarg) || (selectedShip.destination) || (selectedShip.escorting))
		{
			//selectedShip.actionText=selectedShip.status;
		}else
		{
			selectedShip.actionText="Exploring the " +getQuadrant(selectedShip) + " Quadrant";
		}
	}
	if(selectedShip.nearbyPods.length>0)
	{
			canvas.fillStyle = "red";
			if(selectedShip.nearbyPods.length>1)
			{
				canvas.fillText(selectedShip.nearbyPods.length+ " escape pods detected nearby",755,315);
			}else
			{
				canvas.fillText(selectedShip.nearbyPods.length+ " escape pod detected nearby",755,315);
			}
			canvas.fillStyle = "white";
	}
	if(selectedShip.orbiting)
	{
		if(selectedShip.leavingProgress)
		{
			selectedShip.actionText="Breaking Orbit1";
		}else
		{
			selectedShip.actionText="Orbiting "+selectedShip.orbitTarg.name;
		}
	}else if(selectedShip.turning)
	{
		selectedShip.actionText="Adjusting Heading";
	}else if(selectedShip.desiredOrbitTarg)//TODO
	{
				selectedShip.actionText="Enroute to "+selectedShip.desiredOrbitTarg.name;
	}
	if(selectedShip.destination)
	{
		if(selectedShip.destination.planet)
		{
			selectedShip.actionText="Enroute to "+selectedShip.destination.name;
		}else if(selectedShip.destination.ship)
		{
			if(selectedShip.orders==Orders.MeetFleet)
				{
					selectedShip.actionText="Enroute to meet with the fleet";
				}else if(selectedShip.civ.autoHostile.indexOf(selectedShip.destination.civ)>-1)
				{
					selectedShip.actionText="Enroute to attack "+selectedShip.destination.prefix+" "+selectedShip.destination.name;
					selectedShip.orders==Orders.Attack
				}else 
				{
					selectedShip.actionText="Enroute to rendezvous with the "+selectedShip.destination.prefix+" "+selectedShip.destination.name;
				}
			
		}
	}
	canvas.fillText("Ship: "+selectedShip.prefix+" "+selectedShip.name,755,250);
	canvas.fillText("Class: "+ selectedShip.class.name,755,265);
	if(selectedShip.destination)
	{
		var dost=Math.floor(distance(selectedShip,selectedShip.destination));
		canvas.fillText("Following: "+selectedShip.destination.prefix+" "+selectedShip.destination.name+",D: "+dost,755,365);
	}
	if(selectedShip.torpedoTarget)
	{
		canvas.fillText("Targeting: "+selectedShip.torpedoTarget.prefix+" "+selectedShip.torpedoTarget.name,755,380);
	}//else if selectedShip.
	canvas.fillText("Hull Integrity: "+selectedShip.hp+"/"+selectedShip.maxHp,755,395);
	canvas.fillText("02: "+Math.floor(selectedShip.oxygen/10)+"%",755,410);
	if(selectedShip.breaches>0)
	{
		if(selectedShip.breaches<2)
		{
			canvas.fillStyle = "red";
			canvas.fillText("HULL BREACH",755,425);
			canvas.fillStyle = "white";
		}else
		{
			canvas.fillStyle = "red";
			canvas.fillText("MULTIPLE HULL BREACHES",755,425);
			canvas.fillStyle = "white";
		}
	}
	canvas.fillText("Torpedos: "+selectedShip.numTorpedos+" Mines: "+selectedShip.numMines,755,440);
	if(selectedShip.selfDestructActive)
	{
		canvas.fillStyle = "red";
		canvas.fillText("SELF DESTRUCT IN " +selectedShip.selfDestructTick,755,455);
		canvas.fillStyle = "white";
	}
	canvas.fillText("Crew Compliment: "+ selectedShip.crew.length+"/"+selectedShip.crewMax,755,470);
	if(selectedShip.awayTeamAt==null)
	{
		canvas.fillText("Away Team Ready: "+ selectedShip.awayTeam.length,755,485);	
	}else
	{
		canvas.fillText("Away Team on: "+ selectedShip.awayTeamAt.name,755,485);
	}
	
	canvas.fillText(selectedShip.actionText,755,500);
	canvas.fillText("Coords: "+Math.floor(selectedShip.x)+","+Math.floor(selectedShip.y),755,515);
	canvas.fillText("Heading: "+ Math.floor(selectedShip.heading),755,530);
	canvas.fillText("Desired Heading: "+ selectedShip.desiredHeading,755,545);
	canvas.fillText("Speed: "+ selectedShip.speed+" / "+selectedShip.desiredSpeed+" / "+selectedShip.maxSpeed,755,560);
	var ghjk="";
	if(selectedShip.cloaked) {ghjk+="Cloaked ";}
	if(selectedShip.shields>0) {ghjk+="Shields: "+selectedShip.shields;}
	canvas.fillText(ghjk,755,575);
	//if(selectedShip.cloaked) {canvas.fillText("Cloaked",755,575);}

	canvas.fillText("Crew Lost: "+ selectedShip.crewLost,755,590);
	canvas.fillText("OrbitTrack: "+ selectedShip.orbitTrack,755,605);
	canvas.fillText("Ships Detected Nearby: "+ selectedShip.nearbyVessels.length,755,620)
	canvas.fillText("Systems Detected Nearby: "+ selectedShip.nearbySystems.length,755,635)
	
	
	//-===========/take out this whole section?
	if((selectedShip.torpedoTarget) && (false))
	{
	var actionText="Full Stop";
	if((Math.abs(selectedShip.torpedoTarget.x-selectedShip.x)<selectedShip.phaserRange) && (Math.abs(selectedShip.torpedoTarget.y-selectedShip.y)<selectedShip.phaserRange)) //todo distance!
	{
		canvas.fillStyle="red";
		canvas.fillText("IN PHASER RANGE!",55,330);
		canvas.fillStyle="white";
	}
	if((selectedShip.destination) && (selectedShip.orders==Orders.Attack))
	{
		if(selectedShip.torpedoTarget.speed>0){
			if(selectedShip.torpedoTarget.desiredOrbitTarg)
			{
				actionText=selectedShip.torpedoTarget.status;
			}else
			{
				actionText="Exploring the " +getQuadrant(selectedShip) + " Quadrant";
			}
		}
	}
	if(selectedShip.torpedoTarget.orbiting)
	{
		if(selectedShip.torpedoTarget.leavingProgress)
		{
			//actionText="Breaking Orbit2";
		}else
		{
			actionText="Orbiting "+selectedShip.torpedoTarget.orbitTarg.name;
		}
	}else if(selectedShip.torpedoTarget.turning)
	{
		//selectedShip.actionText="Adjusting Heading";
	}
	canvas.fillText("Ship: "+selectedShip.torpedoTarget.prefix+" "+selectedShip.torpedoTarget.name,55,350);
	if(selectedShip.torpedoTarget.destination)
	{
		canvas.fillText("Following: "+selectedShip.torpedoTarget.destination.prefix+" "+selectedShip.torpedoTarget.destination.name,55,365);
	}
	if(selectedShip.torpedoTarget.torpedoTarget)
	{
		canvas.fillText("Targeting: "+selectedShip.torpedoTarget.torpedoTarget.prefix+" "+selectedShip.torpedoTarget.torpedoTarget.name,55,380);
	}//else if selectedShip.torpedoTarget.
	canvas.fillText("Hull Integrity: "+selectedShip.torpedoTarget.hp+"/"+selectedShip.torpedoTarget.maxHp,55,395);
	canvas.fillText("02: "+Math.floor(selectedShip.torpedoTarget.oxygen/10)+"%",55,410);
	if(selectedShip.torpedoTarget.breaches>0)
	{
		if(selectedShip.torpedoTarget.breaches<2)
		{
			canvas.fillStyle = "red";
			canvas.fillText("HULL BREACH",55,425);
			canvas.fillStyle = "white";
		}else
		{
			canvas.fillStyle = "red";
			canvas.fillText("MULTIPLE HULL BREACHES",55,425);
			canvas.fillStyle = "white";
		}
	}
	canvas.fillText("Torpedos: "+selectedShip.torpedoTarget.numTorpedos+" Mines: "+selectedShip.torpedoTarget.numMines,55,440);
	if(selectedShip.torpedoTarget.selfDestructActive)
	{
		canvas.fillStyle = "red";
		canvas.fillText("SELF DESTRUCT IN " +selectedShip.torpedoTarget.selfDestructTick,55,455);
		canvas.fillStyle = "white";
	}
	canvas.fillText("Crew Compliment: "+ selectedShip.torpedoTarget.crew.length+"/"+selectedShip.torpedoTarget.crewMax,55,470);
	canvas.fillText("Class: "+ selectedShip.torpedoTarget.class.name,55,485);
	canvas.fillText(actionText,55,500);
	canvas.fillText("Coords: "+Math.floor(selectedShip.torpedoTarget.x)+","+Math.floor(selectedShip.torpedoTarget.y),55,515);
	canvas.fillText("Heading: "+ Math.floor(selectedShip.torpedoTarget.heading),55,530);
	canvas.fillText("Desired Heading: "+ selectedShip.torpedoTarget.desiredHeading,55,545);
	canvas.fillText("Speed: "+ selectedShip.torpedoTarget.speed+" / "+selectedShip.torpedoTarget.desiredSpeed+" / "+selectedShip.torpedoTarget.maxSpeed,55,560);
	var ghjk="";
	if(selectedShip.torpedoTarget.cloaked) {ghjk+="Cloaked ";}
	if(selectedShip.torpedoTarget.shields>0) {ghjk+="Shields: "+selectedShip.torpedoTarget.shields;}
	canvas.fillText(ghjk,55,575);
	//if(selectedShip.torpedoTarget.cloaked) {canvas.fillText("Cloaked",55,575);}

	canvas.fillText("Crew Lost: "+ selectedShip.torpedoTarget.crewLost,55,590);
	canvas.fillText("OrbitTrack: "+ selectedShip.torpedoTarget.orbitTrack,55,605);
	canvas.fillText("Ships Detected Nearby: "+ selectedShip.torpedoTarget.nearbyVessels.length,55,620)
	canvas.fillText("Systems Detected Nearby: "+ selectedShip.torpedoTarget.nearbySystems.length,55,635)
	}
};

function mainMenuDraw(){
    newDrawStarfield(canvas,camera);
	monsta.draw(canvas,camera);
	//canvas.fillStyle = "black";
	//canvas.fillRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT);
	//titlesprite.draw(canvas,0,0);
	//canvas.fillStyle = "white";
	
	/*if(mmcur){
		canvas.fillText("-",160,450);
	}else	{
		canvas.fillText("-",160,475);

	}*/
	
	blamera={};
	blamera.x=-camera.x;
	blamera.y=-camera.y;
	blamera.zoom=camera.zoom;
	
	for(var i=0;i<numSystems;i++)
	{
		stars[i].draw(canvas,camera);
		if(isOver(stars[i],camera))
		{
			drawmousetext(canvas,stars[i],camera);
		}
		for(var j=0;j<stars[i].planets.length;j++)
		{
			if(isOver(stars[i].planets[j],camera))
			{
				drawmousetext(canvas,stars[i].planets[j],camera);
			
				var larry=new screenBox(stars[i].planets[j]);
				larry.x=20;
				larry.y=50;
				larry.width=256;
				larry.height=250;
				larry.draw(canvas,camera);
			}
		}
	}

	
	canvas.save();
	
	//selected.draw(canvas,camera);
	if((stars[curSystem].planets[stars[curSystem].selected].type==4) || (stars[curSystem].planets[stars[curSystem].selected].type==5))
	{
		canvas.translate((stars[curSystem].planets[stars[curSystem].selected].x+camera.x)*camera.zoom,(stars[curSystem].planets[stars[curSystem].selected].y+camera.y)*camera.zoom);
		canvas.scale(stars[curSystem].planets[stars[curSystem].selected].size*camera.zoom,stars[curSystem].planets[stars[curSystem].selected].size*camera.zoom);
		selectedSpriteBig.draw(canvas, -32,-32);
	}else
	{
		canvas.translate((stars[curSystem].planets[stars[curSystem].selected].x+camera.x)*camera.zoom,(stars[curSystem].planets[stars[curSystem].selected].y+camera.y)*camera.zoom);
		canvas.scale(stars[curSystem].planets[stars[curSystem].selected].size*camera.zoom,stars[curSystem].planets[stars[curSystem].selected].size*camera.zoom);
		selectedSprite.draw(canvas, -16,-16);
	}
	canvas.restore();
	
	canvas.save(); 
	if((selectedShip) && (selectedShip.class=="Type 2 Shuttle"))//.target?
	{
		canvas.translate((selectedShip.x+camera.x)*camera.zoom,(selectedShip.y+camera.y)*camera.zoom);
		canvas.scale(camera.zoom,camera.zoom);
		shipSelSprite.draw(canvas, -8,-8);
	}else if(selectedShip)
	{
		canvas.translate((selectedShip.x+camera.x)*camera.zoom,(selectedShip.y+camera.y)*camera.zoom);
		canvas.scale(camera.zoom,camera.zoom);
		shipSelSpriteB.draw(canvas, -16,-16);
	}
	canvas.restore();
	for(var i=0;i<escapes.length;i++)
	{
		escapes[i].draw(canvas,camera);
	}
	for(var i=0;i<mines.length;i++)
	{
		mines[i].draw(canvas,camera);
	}
	for(var i=0;i<torpedos.length;i++)
	{
		torpedos[i].draw(canvas,camera);
	}
	for(var i=0;i<numNebulas;i++)
	{
		nebulas[i].draw(canvas,camera);
	}
	drawGUI();
	drawDebug();
	for(var i=0;i<ships.length;i++)
	{
		ships[i].draw(canvas,camera);
		ships[i].menu.visible=false;
		if((isOver(ships[i],camera)) && (ships[i]!=selectedShip))
		{
			drawmousetext(canvas,ships[i],camera);
			var larry=new screenBox(ships[i]);
			larry.x=20;
			larry.y=50;
			larry.width=270;
			larry.height=270;
			larry.visible=true;
			larry.draw(canvas,camera);
		}else
		{
			//larry.visible=false;
		}
	}
	//draw messages
	//for (var i=0;i<civs[playerCiv].messages.length;i++)
	
	
	if(showShipMenu)
	{
		selectedShip.menu.visible=true;
	}else
	{
		var pt=canvas.font;
		canvas.font = "10pt Calibri";
		canvas.fillText("Hit "+shipscreenkey.key+" to show ship menu",40,600);
		canvas.font=pt;
	}
	selectedShip.menu.draw(canvas,camera)
	
	if(civs[playerCiv].messages.length>0)
	{
		civs[playerCiv].messages[0].draw(canvas,camera);
	}
	
	
	
	if(Map.visible)//keydown[mapkey.key])
	{
		showShipMenu=false;
		drawLittleMap(canvas,camera);
	}
	
	roland.draw(canvas,camera);
	/*canvas.save();
		canvas.strokeStyle = "red";
		canvas.beginPath();
		canvas.lineWidth = 8;

		canvas.moveTo((20),(20));
		canvas.lineTo((200),200);
		
		canvas.closePath();
		canvas.stroke();
		canvas.restore();*/
};

var neddard=false;

function mainMenuUpdate(){
	var tick=0;
	lasttime=milliseconds;
    timestamp = new Date();
    milliseconds = timestamp.getTime();
    tick++;
	if(yearFlag)
	{
		for(var i=0;i<civs.length;i++)
		{
			civs[i].yearFlag=true;
		}
		yearFlag=false;
	}
	for(var i=0;i<civs.length;i++)
	{
		civs[i].update();
	}
	
	if(autoplaykey.check())
	{
		civs[playerCiv].AI=!civs[playerCiv].AI;
		if(civs[playerCiv].AI)
		{
			console.log("AI taking over control of the "+civs[playerCiv].namePlural);
		}else
		{
			console.log("Player taking over control of the "+civs[playerCiv].namePlural);
		}
	}
	
	if(!holdInput)
	{
		if(shipscreenkey.check())
		{
			showShipMenu=!showShipMenu;
		}
		
		if(mapkey.check())
		{
			Map.visible=!Map.visible;
			if(Map.visible)
			{
				mapXButton.visible=true;
				showShipMenu=false;
			}
		}
		
		if(infokey.check())
		{
			roland.visible=!roland.visible;
			if(!roland.visible)
			{
				showShipMenu=true;
			}
		}
		
		if(toggleinfokey.check())
		{
			roland.cycleCiv();
		}
		
		if(roland.visible)
		{
			showShipMenu=false;
			roland.update();
		}
	}
	if(this.holdEverything) {return;}
	var allworlds=[];
	for (var i=0;i<stars.length;i++)
	{
		for(var j=0;j<stars[i].planets.length;j++)
		{
			allworlds.push(stars[i].planets[j]);
		}
	}
	
	for(var i=0;i<ships.length;i++)
	{
		if(ships[i].alive)
		{
			ships[i].nearbySystems=ships[i].inSensorRange(stars);	
			//ships[i].nearbyVessels=ships[i].inSensorRange(ships);
			ships[i].scanNearby(ships);
			ships[i].sortNearbyVessels();
			ships[i].nearbyPods=ships[i].inSensorRange(escapes);
			ships[i].nearbyPlanets=ships[i].inSensorRange(allworlds);
			if(ships[i].nearbyVessels==null)
			{
				ships[i].torpedoTarget=null;
			}
			if(i!=curShip)
			{
				ships[i].drawTarget=false;
			}else
			{
				ships[i].drawTarget=true;
			}
			if(selectedShip)
			{
				selectedShip.drawTarget=true;
			}
			ships[i].update();

		}
	}
	holdInput=false;
	for(var i=0;i<textBoxes.length;i++)
	{
		if((textBoxes[i].hasFocus))//todo...
		{
				holdInput=true;
		}
	}
	
	monsta.update();
	
	if(debugkey.check()) {
		selectedShip.menu.turnPage();
		/*MUSIC_ON=!MUSIC_ON;
		document.getElementById("titleAudio").pause();*/
		/*if(!neddard){
			neddard=true;
			civs[playerCiv].fleets.push(new fleet());
			for(var i=0;i<3;i++)
			{
				civs[playerCiv].fleets[0].addShip(ships[i]);
				if(ships[i].orbiting){
					//ships[i].orderLeaveOrbit();
				}
			}
			console.log("First Fleet established");
		}*/
	 }
	 camera.update();
	updateEscapes();
	snoop=ships.concat(torpedos);
	snoop=snoop.concat(escapes);
	updateMines(snoop);
	snoop=ships.concat(mines);
	snoop=snoop.concat(escapes);
	updateTorpedos(snoop);
	theTime.update(Earth);
	for(var i=0;i<civs.length;i++)
	{
		civs[i].update();
		for(var j=0;j<civs[i].fleets.length;j++)
		{
			civs[i].fleets[j].orderShips();
		}
	}
	if(this.holdInput) {return;}
	if(crewscreenkey.check())
	{
		mode=1;
	}

	if((startkey.check()) && (!roland.visible)){
		//mode=1;
		for(var i=0;i<ships.length;i++)
		{
			if(ships[i].civ.allied)
			{
				ships[i].orderOrbit(stars[0].planets[Math.floor(Math.random()*stars[0].planets.length)]);
			}
			
		}
		console.log("All allied ships coming to help defend the Sol System.");
	}
	
	if(ships.length<1)
	{
		//console.log("No more ships!!!");
		//return;
	}
	
	if((fleetattackkey.check()) && (civs[playerCiv].fleets[0]))
	{
		civs[playerCiv].fleets[0].attacking=!civs[playerCiv].fleets[0].attacking;
	}
	if(evackey.check())
		{
			if(roland.visible)
			{
				roland.visible=false;
				showShipMenu=true;
			}else if(Map.visible)
			{
				Map.visible=false;
				showShipMenu=true;
				if(Map.visible)
				{
					mapXButton.visible=false;
				}
			}else
			{
				if((selectedShip.evacuating) || (selectedShip.evacDone))
				{
					selectedShip.selfDestructActive=true;
				}else
				{
					if(selectedShip.systems[SystemIDs.EscapePods].functional())
					{
						selectedShip.Evac(selectedShip.civ.homeworld);
						if(selectedShip.crew.length>1)
						{
							console.log(selectedShip.name+ "'s crew is abandoning ship.");
						}else if(selectedShip.crew.length>0)
						{
							console.log(selectedShip.name+ "'s captain is abandoning ship.");
						}else if(selectedShip.crew.length<0)
						{
							console.log(selectedShip.name+ "Confirm self destruct?");
						}
						//selectedShip.captainFlees=true;
					}else
					{
					 //todo some way to self destruct without escape pods?
					}
				}
			}
		}
	if((selectedShip) &&(!selectedShip.adrift) && (selectedShip.crew.length>0))
	{
		
		
		if(tractorkey.check())
		{
			if(selectedShip.tractorClient)
			{
				selectedShip.unTractorSomething();
			}else if(selectedShip.tractorTarget)
			{
				selectedShip.tractorSomething(selectedShip.tractorTarget);
			}
		}
		
		if(shipleftkey.check())
		{
			selectedShip.adjustHeading(selectedShip.heading-20);
			selectedShip.manualHelm();
		}
		if(shiprightkey.check())
		{
			selectedShip.adjustHeading(selectedShip.heading+20);
			selectedShip.manualHelm();
		}
		if(shipgokey.check())
		{
			if(selectedShip.desiredSpeed<selectedShip.maxSpeed)
			{
				selectedShip.desiredSpeed++;
			}
		}
		if(minekey.check())
		{
			selectedShip.layMine();
		}
		/*if(firekey.check())
		{
			selectedShip.fireTorpedo();
		}*/
		if(phaserkey.check())
		{
			selectedShip.firePhasers();
		}
		if(shipslowkey.check())
		{
			if(selectedShip.desiredSpeed>0)
			{
				selectedShip.desiredSpeed--;
			}
		}
		if(shieldskey.check())
		{
			//selectedShip.activeShields=!selectedShip.activeShields;
			 //selectedShip.systems[SystemIDs.Shields].on=! selectedShip.systems[SystemIDs.Shields].on
		}
		if(gokey.check())
		{
			
			selectedShip.manualHelm();
			/*ships[0].gotoDest=true;
			ships[0].destx=420;
			ships[0].desty=300;*/
			/*if(selectedShip.orbiting)
			{
				selectedShip.orderLeaveOrbit();
			}else
			{
				selectedShip.orderOrbit(selectedShip.civ.homeworld);
				console.log(selectedShip.prefix+" "+selectedShip.name+" has been sent to " +selectedShip.civ.homeworld.name);
			}*/
		}
	}else
	{
		if( (gokey.check()) || (shipslowkey.check()) || (shipgokey.check()) || (shiprightkey.check()) || (shipleftkey.check()))
		{
			console.log("No crew aboard "+selectedShip.name+ " to execute orders!");
		}
	}
	
	if(tabbed)
	{
		tabbed=false;
		civs[playerCiv].cycleShips(camera);
	}
	
	if(maxspeedkey.check())
	{
		gameSpeed=10;
	}
	
	if(textkey.check())
	{
		debugText=!debugText;
	}
	
	if(toggleallshipskey.check()) //todo!
	{
		if(ships.length<1)
		{
			console.log("there are no ships anywhere.");
			}else{
				curShip++;
			if(curShip>ships.length-1) {
				curShip=0;
			}
			selectedShip=ships[curShip];
			camera.center(selectedShip);
			camera.follow(selectedShip);
		}
	}
	
	if(starkey.check())
	{
		curSystem++;
		if (curSystem>numSystems-1) {curSystem=0;}
		camera.center(stars[curSystem]);
	}
	
	if(helpkey.check())
	{
		//stars[curSystem].planets[stars[curSystem].selected].orbitDecay=1;
		for(var i=0;i<edskeys.length;i++)
		{
			console.log(edskeys[i].key.toUpperCase() + ": "+edskeys[i].desc);
		}
	}
	
	if(plkey.check())
	{
		stars[curSystem].cyclePlanets();
	}
	if(colonizekey.check())
	{
		civs[playerCiv].orderColonize(stars[curSystem].planets[stars[curSystem].selected]);
	}
	
	if(pageupkey.checkDown())
	{
		gameSpeed+=.3;
		if (gameSpeed>10) {gameSpeed=10;}
	}
	if(pagedownkey.checkDown())
	{
		gameSpeed-=.3;
		if (gameSpeed<.3) {gameSpeed=0;}
	}


	if(keydown.shift)
	{
	  cmoverate=10;
	}else
	{
	  cmoverate=5;
	}
	if(!selectedShip.manualControl)
	{
		if((keydown.left) && (!roland.visible))
		{
			//if(camera.x<universeWidth-CANVAS_WIDTH)
			{
				camera.x+=cmoverate*camera.zoomMove;
			}
			camera.unFollow();
		}
		if((keydown.right) && (!roland.visible))
		{
			//if(camera.x>0)
			{
				camera.x-=cmoverate*camera.zoomMove;
			}
			camera.unFollow();
		}
		if((keydown.up) && (!roland.visible))
		{
			//if(camera.y<universeHeight-CANVAS_HEIGHT)
			{
				camera.y+=cmoverate*camera.zoomMove;
			}
			camera.unFollow();
		}
		if((keydown.down) && (!roland.visible))
		{
			//if(camera.y>0)
			{
				camera.y-=cmoverate*camera.zoomMove;
			}
			camera.unFollow();
		}
	}else
	{
		camera.follow(selectedShip);
	}
	if(endkey.check())
	{
		selectedShip=Cube;
		camera.follow(Cube);
	}

	if(homekey.check())
	{
		camera.x=0-stars[0].x+CANVAS_WIDTH/2;
		camera.y=0-stars[0].y+CANVAS_HEIGHT/2;
		camera.center(stars[0]);
		curSystem=0;
		//camera.unFollow();
		if(civs[playerCiv].homeworld)
		{
			camera.follow(civs[playerCiv].homeworld);
		}
		/*for(var i=0;i<ships.length;i++)
		{
			ships[i].Evac();
		}*/
	}
	if(pausekey.check())
	{
			//spinArt=!spinArt;
			gameSpeed=0;
	}
	if(beamkey.check())
	{
		if(selectedShip.awayTeamAt!==null)
		{
			selectedShip.beamUpAwayTeam();
		}else if(selectedShip.awayTeamAt==null)
		{
			if(selectedShip.awayTeam.length<1)
			{
				selectedShip.prepareAwayTeam(selectedShip.crew.length-2);
			}else if((selectedShip.beamTarget) && (selectedShip.awayTeam.length>0))
			{
				selectedShip.beamDown(selectedShip.beamTarget);
			}
		}
	}
	if(cleartailskey.check())
	{
		clearTails();
	}
	
	if(targetkey.check())
	{
		selectedShip.cycleTarget();
	}
	if(tractortargetkey.check())
	{
		selectedShip.cycleTractorTarget();
	}
	if(beamtargetkey.check())
	{
		selectedShip.cycleBeamTarget();
	}
	
	/*for(var i=0;i<this.escapes.length;i++)
	{
		escapes[i].update();
	}
	for(var i=0;i<this.mines.length;i++)
	{
		mines[i].update(ships);
	}*/
	
	
};

ed=new textbox();

function crewScreenDraw(){
	canvas.save();
	ed.draw(canvas,camera);
	canvas.font = "16pt Calibri";
	canvas.textAlign = "center";
	canvas.textBaseline = "middle";
	canvas.fillStyle = "black";
	canvas.fillText("Crew Pool",80,20);
	canvas.restore();
};




function crewScreenUpdate(){
	ed.x=20;
	ed.y=20;
	ed.width=700;
	ed.height=600;
	ed.msg[0]="Crew: "
	for(var i=0;i<civs[playerCiv].crewPool.length;i++)
	{
		ed.msg[0]+=civs[playerCiv].crewPool[i].title+" "+civs[playerCiv].crewPool[i].name+", ";
	}
	ed.msg[0]=ed.msg[0].substring(0,ed.msg[0].length-2);

	if((escapekey.check()) || (crewscreenkey.check()))
	{
		mode=0;
	}
	if(starting)
	{
		
	}
};

//------------MAIN DRAW-----------------------------------------
function mainDraw() {
	
};
//------------MAIN LOOP-----------------------------------------
function mainUpdate()
{
	if(!gamestart) return;
	
	var tick=0;	
    lasttime=milliseconds;
    timestamp = new Date();
    milliseconds = timestamp.getTime();
    tick++;
	if ((milliseconds-lastani>WATER_RATE) &&(!isBattle))
	{
		tileani++;
		lastani=milliseconds;
		anicount=0;
		mapDirty=true;
    }
    if (tileani>3) {tileani=0} //tile animations
	};
merp();
