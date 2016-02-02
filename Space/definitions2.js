var showShipMenu=true;
var cuntx=-149550;
var cunty=-149680;
var universeWidth=600000;
var universeHeight=600000;
var quadSize=37500;//*4;
var perQuad=6000;
var numStars=950000;
function backStar(quad)
{
	this.x=quad.x+Math.random()*quadSize;
	this.y=quad.y+Math.random()*quadSize;
	this.size=Math.floor((Math.random()*2)+1);
};


function starQuadrant(x,y)
{
	this.stars=[];
	this.sx=x;
	this.sy=y;
	this.x=x*quadSize;
	this.y=y*quadSize;
	this.width=quadSize;
	this.height=quadSize;
	for(var i=0;i<perQuad;i++)
	{
		this.stars.push(new backStar(this));
	}
	
}
var starQuads=[];
//for(var i=0;i<universeWidth/quadSize;i++)
for(var i=0;i<16;i++)
{
	//for(var j=0;j<universeHeight/quadSize;j++)
	for(var j=0;j<16;j++)
	{
		var lemmy=new starQuadrant(j,i);

		starQuads.push(lemmy);
	}
}

function getStarQuad(thing)
{
	var sx=Math.floor(thing.x/quadSize);
	var sy=Math.floor(thing.y/quadSize);
	//console.log(sx,sy);
	var turnip=0
	for(var i=0;i<starQuads.length;i++)
	{
			if((starQuads[i].sx==sx) && (starQuads[i].sy==sy))
			{
				//console.log(i);
				return i;
			}
		
	}
	return turnip;
};

function getStarQuadID(x,y)
{
	var sx=x;
	var sy=y;
	//console.log(sx,sy);
	var turnip=0
	for(var i=0;i<starQuads.length;i++)
	{
			if((starQuads[i].sx==sx) && (starQuads[i].sy==sy))
			{
				//console.log(i);
				return i;
			}
		
	}
	return turnip;
	
	
};

function checkCamQuad(thing,cam)
{
		//if(((thing.x+cam.x)>0) && ((thing.x+cam.x)<CANVAS_WIDTH)&& ((thing.y+cam.y)>0) && ((thing.y+cam.y)<CANVAS_HEIGHT))
		var mam={};
		mam.x=-cam.x;
		mam.y=-cam.y;
		if ((thing.x+thing.width<mam.x) || (mam.x+mam.width<thing.x) || (thing.y+thing.height<mam.y) ||( mam.y+mam.height<thing.y))
		{
			return false;
		}
		return true;
}

function getVisibleQuads(cam)
{
	var nurkle=[];
	for(var i=0;i<starQuads.length;i++)
	{
		//if(cam.isOn(starQuads[i]))
		if(checkCamQuad(starQuads[i],cam))
		{
			nurkle.push(starQuads[i]);
		}
	}
	return nurkle;
}

function shittyGetVisibleQuads(cam)
{
	var peem=starQuads[getStarQuad(selectedShip)];
	var nurkle=[];

	nurkle.push(peem);
	nurkle.push(starQuads[getStarQuadID(peem.sx-1,peem.sy)]);
	nurkle.push(starQuads[getStarQuadID(peem.sx+1,peem.sy)]);
	
	nurkle.push(starQuads[getStarQuadID(peem.sx,peem.sy-1)]);
	nurkle.push(starQuads[getStarQuadID(peem.sx-1,peem.sy-1)]);
	nurkle.push(starQuads[getStarQuadID(peem.sx+1,peem.sy-1)]);
	
	nurkle.push(starQuads[getStarQuadID(peem.sx,peem.sy+1)]);
	nurkle.push(starQuads[getStarQuadID(peem.sx-1,peem.sy+1)]);
	nurkle.push(starQuads[getStarQuadID(peem.sx+1,peem.sy+1)]);

	return nurkle;
}

var backStarsX=new Array(numStars);
var backStarsY=new Array(numStars);
var backStarsS=new Array(numStars);
var spinArt=false;
var flicker=true;
var twinkRate=10;
var curSystem=0;
var numNebulas=50;
var Earth=null;
var selectedShip=null;
var Cube=null;
	var mapFactor=1000;
	var mapedgex=140;
	var mapedgey=20;
//var drawMap=false;
//var things=[];
var numCivilizations=18;

for(var i=0;i<numCivilizations;i++)
{
	civs[i]=new civilization();
	civs[i].civID=i;
	civs[i].name=races[i];
	civs[i].namePlural=racesPlural[i];
}

function clearTails()
{
	for(var i=0;i<ships.length;i++)
	{
		ships[i].tail=[];
	}
}

function elipseString(str,limit){
	if(str.length>limit)
	{
		var pr="";
		for(var i=0;i<limit-3;i++)
		{
			pr+=str[i];
		}
		pr+="...";
		return pr;
	}else
	{
		return str;
	}
}

for(var j=0;j<civs.length;j++)
{
	if(j!=civIDs.Borg)
	{
		civs[civIDs.Borg].autoHostile.push(civs[j]);
	}
	if(j!=civIDs.Breen)
	{
		//civs[civIDs.Breen].autoHostile.push(civs[j]);
	}
	if(j!=civIDs.Hirogen)
	{
		//civs[civIDs.Hirogen].autoHostile.push(civs[j]);
	}
	if(j!=civIDs.Dominion)
	{
		//civs[civIDs.Dominion].autoHostile.push(civs[j]);
	}
	//civs[j].autoHostile.push(civs[civIDs.Borg]);
	
}
civs[playerCiv].autoHostile.push(civs[civIDs.Borg]);
civs[civIDs.Klingon].autoHostile.push(civs[civIDs.Romulan]);
civs[civIDs.Romulan].autoHostile.push(civs[civIDs.Klingon]);
civs[civIDs.Cardassian].autoHostile.push(civs[civIDs.Bajoran]);
civs[civIDs.Borg].numShipsStart=1;
civs[civIDs.Human].numShipsStart=2;
civs[civIDs.Klingon].numShipsStart=6;
civs[civIDs.Klingon].targetPods=true;
civs[civIDs.Romulan].numShipsStart=1;
civs[civIDs.Ferengi].numShipsStart=4;
civs[civIDs.Vulcan].numShipsStart=4;
civs[civIDs.Cardassian].numShipsStart=6;
civs[civIDs.Dominion].numShipsStart=4;
civs[civIDs.Dominion].money=9000;
civs[civIDs.Hirogen].numShipsStart=5;

civs[civIDs.Vidiian].numShipsStart=5;
civs[civIDs.Andorian].numShipsStart=6;
civs[civIDs.Telaxian].numShipsStart=1;
civs[civIDs.Tellarite].numShipsStart=4;
civs[civIDs.Bajoran].numShipsStart=2;
civs[civIDs.Breen].numShipsStart=5;
civs[civIDs.Breen].money=5000;
civs[civIDs.Breen].hostileOnIncursion=true;
civs[civIDs.Romulan].hostileOnIncursion=true;
civs[civIDs.Borg].hostileOnContact=true;
civs[civIDs.Dominion].hostileOnContact=true;
civs[civIDs.Hirogen].hostileOnContact=true;
civs[civIDs.Pakled].numShipsStart=2;
civs[civIDs.Orion].numShipsStart=4;
civs[civIDs.Klingon].mode=AIModes.Agressive;

civs[civIDs.Human].color="#0033CC";//"#0066FF";
civs[civIDs.Vulcan].color="#CC9900";
civs[civIDs.Andorian].color="#00FFFF";//"#0066CC";
civs[civIDs.Tellarite].color="#990000";
civs[civIDs.Romulan].color="#336600";
civs[civIDs.Klingon].color="#CC0000";
civs[civIDs.Betazoid].color="#FF9999";
civs[civIDs.Vidiian].color="#CCFF99";
civs[civIDs.Cardassian].color="#660033";
civs[civIDs.Borg].color="#194719";//"#003300"
civs[civIDs.Orion].color="#00CC00";
civs[civIDs.Telaxian].color="#FF9966";
civs[civIDs.Ferengi].color="#CC3300";
civs[civIDs.Pakled].color="#800000";
civs[civIDs.Bajoran].color="#FF00FF";
civs[civIDs.Breen].color="#003366";
civs[civIDs.Hirogen].color="#FFFF66";
civs[civIDs.Dominion].color="#666699";

civs[playerCiv].AI=false;
civs[playerCiv].player=true;
civs[civIDs.Borg].AI=true; //for now.
civs[civIDs.Borg].allied=false; //for now.
//civs[civIDs.Romulan].mode=AIModes.Defense;
civs[civIDs.Dominion].mode=AIModes.Agressive;

var ships=[];
//var stations=[]; //todo add to civilization

var curShip=0;
var planetTypes = ["Class M","Class L","Class N","Class F","Class J","Class T","Demon Class"];

function hdgDiff (h1, h2) { // angle between two headings
   var diff = fmod(h1 - h2 + 3600, 360);
   return diff <= 180 ? diff : 360 - diff;
}

function isTurnCCW(hdg, newHdg) { // should a new heading turn left ie. CCW?
   var diff = newHdg - hdg;        // CCW = counter-clockwise ie. left
   return diff > 0 ? diff > 180 : diff >= -180;
}

var buttons=[];

function button(pt)
{
	this.x=0;
	this.y=0;
	this.font= "8pt Calibri";
	if(pt){
	this.parent=pt;
	}
	this.ID=0;
	this.onlink=false;
	this.center=false;
	this.hasFocus=false;
	this.visible=false;
	this.greyed=false;
	this.decorative=false;
	this.yCenter=true;
	this.yTop=false
	this.object=null;
	this.width=30;
	this.onoff=false;
	this.height=24;
	this.blinkRate=30;
	this.blink=false;
	this.textLimit=20;
	this.choice=null;
	this.text="Go!";
	this.blinkTrack=0;
	this.backColor="green";
	this.borderSize=2;
	this.linked=[]; //turn these off when this goes on.
	this.doThings=function()
	{
		this.on=!this.on;
	};
	this.update=function()
	{
		
		if(this.hasFocus)
		{
			//holdInput=true;
			
			if(startkey.check())
			{
				this.doThings();
				//somehow order ship to move there.
			}
	}	

	};
}

	button.prototype.draw=function(can,cam,nerf)
	{
		if((!nerf) && (!this.visible)) {return;}
		can.save();
		can.font=this.font;
		can.fillStyle="white";
		if(this.hasFocus)
		{
			can.fillStyle="yellow";
		}
		if((this.object) && (this.onlink))
		{
			this.on=this.object.systems[this.ID].on;
		}
		if(this.onoff)
		{
			if(this.on)
			{
				this.backColor="green";
			}else
			{
				this.backColor="red";
			}
		
		}
		can.fillRect(this.x,this.y,this.width+this.borderSize,this.height+this.borderSize);
		if(this.greyed)
		{
			can.fillStyle="grey";
		}else
		{
			can.fillStyle=this.backColor;
		}
		can.fillRect(this.x+this.borderSize,this.y+this.borderSize,this.width-this.borderSize,this.height-this.borderSize);
		can.fillStyle="white";
		if(this.center)
		{
			can.fillText(this.text,this.x+this.width/2-8,this.y+this.height-8);
		}else if(this.yTop)
		{
			var peek=elipseString(this.text,this.textLimit);
			can.fillText(peek,this.x+4,this.y+10);
		}else if(this.yCenter)
		{
			var peek=elipseString(this.text,this.textLimit);
			can.fillText(peek,this.x+4,this.y+14);
		}else
		{
			var peek=elipseString(this.text,this.textLimit);
			can.fillText(peek,this.x+4,this.y+10);
		}
		can.restore();
	};
	button.prototype.specialDraw=function(can,cam,thing)
	{
		//if(!this.visible) {return;} //todo, right now visibe means clickible and not visible.
		can.save();
		can.font=this.font;
		can.fillStyle="white";
		if(this.hasFocus)
		{
			can.fillStyle="yellow";
		}
		if((this.object) && (this.onlink))
		{
			this.on=this.object.systems[this.ID].on;
		}
		if(this.onoff)
		{
			if(this.on)
			{
				this.backColor="green";
			}else
			{
				this.backColor="red";
			}
		
		}
		can.fillRect(this.x,this.y,this.width+this.borderSize,this.height+this.borderSize);
		if(this.greyed)
		{
			can.fillStyle="grey";
		}else
		{
			can.fillStyle=this.backColor;
		}
		can.fillRect(this.x+this.borderSize,this.y+this.borderSize,this.width-this.borderSize,this.height-this.borderSize);
		can.fillStyle="white";
		if(this.yCenter)
		{
			var peek=elipseString(this.text,this.textLimit);
			can.fillText(peek,this.x+4,this.y+14);
		}else if(this.center)
		{
			can.fillText(this.text,this.x+this.width/2-8,this.y+this.height-8);
		}else
		{
			var peek=elipseString(this.text,this.textLimit);
			can.fillText(peek,this.x+4,this.y+10);
		}
		can.restore();
	};
	
	var Map={};
	var mapXButton=new button();
	mapXButton.text="X";

	mapXButton.x=mapedgex+universeWidth/mapFactor-14;
	mapXButton.y=mapedgey;
	mapXButton.object=Map;
	mapXButton.width-=18;
	mapXButton.height-=12;
	mapXButton.yCenter=false;
	mapXButton.on=false;
	mapXButton.onoff=true;
	mapXButton.doThings=function()
	{
		if(this.object)
		{
			this.object.visible=false;
		}
		this.visible=false;
	};
	buttons.push(mapXButton);


Map.visible=false;
	
function drawLittleMap(can, cam)
{

	can.fillStyle="black";
	var mapedgex=140;
	var mapedgey=20;
	can.fillRect(mapedgex,mapedgey,universeWidth/mapFactor,universeHeight/mapFactor);
	can.fillStyle="white";
	/*for(var i=0;i<starQuads.length;i++)
	{
		if(i==15)
		{
			can.fillStyle="red";
		}else if(i==13)
		{
			can.fillStyle="blue";
		}else if(i==11)
		{
			can.fillStyle="green";
		}else if(i==9)
		{
			can.fillStyle="yellow";
		}else if(i==7)
		{
			can.fillStyle="brown";
		}else if(i==5)
		{
			can.fillStyle="purple";
		}else if(i==3)
		{
			can.fillStyle="pink";
		}else if(i==1)
		{
			can.fillStyle="grey";
		}else
		{
			can.fillStyle="white";
		}*/
		var i=getStarQuad(selectedShip);
		can.globalAlpha=0.10;
		can.fillRect(mapedgex+starQuads[i].x/mapFactor,mapedgey+starQuads[i].y/mapFactor,quadSize/mapFactor,quadSize/mapFactor);
		can.globalAlpha=1.0;
	can.font = "8pt Calibri";
	mapXButton.visible=true;
	var xp=0;
	var yp=0;
	var hostileMapMode=false;
	for(var i=0;i<stars.length;i++)
	{
		xp=stars[i].x/mapFactor-1;
		yp=stars[i].y/mapFactor-1;
		can.fillRect(mapedgex+xp,mapedgey+yp,4,4);
		if(stars[i].civs.length>0)
		{
			can.fillStyle=stars[i].civs[0].color;
		}
		can.fillText(stars[i].name,mapedgex+xp+6,mapedgey+yp);
		can.fillStyle="white";
		
	}
	for(var i=0;i<nebulas.length;i++)
	{
		can.fillStyle="pink";
		xp=nebulas[i].x/mapFactor-1;
		yp=nebulas[i].y/mapFactor-1;
		can.globalAlpha=0.50;
		can.fillRect(mapedgex+xp,mapedgey+yp,6,6);
		can.fillStyle="blue";
		can.fillRect(mapedgex+xp-3,mapedgey+yp+2,6,6);
		can.fillStyle="green";
		can.fillRect(mapedgex+xp+3,mapedgey+yp+2,6,6);
		if((mX>mapedgex+xp) && (mX<mapedgex+xp+6) &&(mY>mapedgey+yp) &&(mY<mapedgey+yp+6))
		{
			can.fillText(nebulas[i].name,mapedgex+xp+6,mapedgey+yp);
		}
		can.fillStyle="white";
		can.globalAlpha=1;
		
	}
	for(var i=0;i<ships.length;i++)
	{
		xp=ships[i].x/mapFactor;
		yp=ships[i].y/mapFactor;
		can.fillStyle=ships[i].civ.color;
		if(hostileMapMode)
		{
			if(ships[i].civ==civs[playerCiv])
			{
				can.fillStyle="green";
			}else if(civs[playerCiv].autoHostile.indexOf(ships[i].civ)>-1)
			{
				can.fillStyle="red";
			}else if(ships[i].civ.allied)
			{
				can.fillStyle="blue";
			}else
			{
				can.fillStyle="yellow";
			}
		}
		can.fillRect(mapedgex+xp,mapedgey+yp,2,2);
		for(var p=0;p<ships[i].tail.length;p++)
		{
			var txp=ships[i].tail[p].x/mapFactor;
			var typ=ships[i].tail[p].y/mapFactor;
			can.globalAlpha=0.30;
			can.fillRect(mapedgex+txp,mapedgey+typ,2,2);
		}
		can.globalAlpha=1;
		if((mX>mapedgex+xp) && (mX<mapedgex+xp+2) &&(mY>mapedgey+yp) &&(mY<mapedgey+yp+2))
		{
			can.fillText(ships[i].name,mapedgex+xp+6,mapedgey+yp);
		}
		
		can.fillStyle="white";
		
	}
	
	//nebulas, escape pods? 
	can.strokeStyle="yellow";
	can.lineWidth =1;
	var point1={};
	var point2={};
	//point1.x=-(cam.x+cam.width/2)/mapFactor;
	//point1.y=-(cam.y+cam.height/2)/mapFactor;
	point1.x=-cam.x/mapFactor;
	point1.y=-cam.y/mapFactor;
	point2.x=(0-(cam.x+cam.width)/(mapFactor*cam.zoom));
	point2.y=(0-(cam.y+cam.height)/(mapFactor*cam.zoom));
	//console.log(point1,point2);
	can.beginPath();
	
	can.moveTo(mapedgex+point1.x,mapedgey+point1.y);
	can.lineTo(mapedgex+point1.x+cam.width/(mapFactor*cam.zoom),mapedgey+point1.y);
	can.lineTo(mapedgex+point1.x+cam.width/(mapFactor*cam.zoom),mapedgey+point1.y+cam.height/(mapFactor*cam.zoom));
	can.lineTo(mapedgex+point1.x,mapedgey+point1.y+cam.height/(mapFactor*cam.zoom));
	can.lineTo(mapedgex+point1.x,mapedgey+point1.y);

    can.stroke();
	can.closePath();	
	mapXButton.draw(can,camera);
	//can.fillRect(mapedgex+point1.x,mapedgey+point1.y,cam.width/(mapFactor*cam.zoom),cam.height/(mapFactor*cam.zoom));
}

function honorDead(iv)
{
	if(!iv.deadShips) {return;}
	for(var i=0;i<iv.deadShips.length;i++){
		console.log(iv.deadShips[i].prefix+iv.deadShips[i].name);
		for(var j=0;j<iv.deadShips[i].crew.length;j++){
			console.log("    "+iv.deadShips[i].crew[j].title+" "+iv.deadShips[i].crew[j].name);
		}
	}
}

function timesavertwo()
{
	for(var i=0;i<10;i++)
	{
		civs[playerCiv].produceShip(1);
	}
}

function whoseleft()
{
	for(var i=0;i<civs.length;i++)
	{
		if(civs[i].alive)
		{
			console.log(civs[i].name+ " "+civs[i].worlds.length+" worlds and "+civs[i].ships.length+" ships.");
		}
	}
}

function howsitgoing(iv)
{
	console.log("Ships: "+iv.ships.length);
	console.log("Ships Lost: "+iv.deadShips.length);
	var totalcrew=0;
	var totalbattles=0;
	var totalkills=0;
	for(var i=0;i<iv.ships.length;i++)
	{
		totalcrew+=iv.ships[i].crew.length;
		totalbattles+=iv.ships[i].battles;
		totalkills+=iv.ships[i].kills;
	}
	console.log("Crew: "+totalcrew);
	console.log("Worlds: "+iv.worlds.length);
	console.log("Money: "+iv.money);
	console.log("Production Rate: "+iv.getProductionRate());
	console.log("Resaerch Rate: "+iv.getResearchRate());
	console.log("Number of Kills: "+totalkills);
	if(iv.productionQueue.length>0)
	{
		if(iv.productionQueue[0].building)
		{
			console.log("Currently producing a "+ iv.productionQueue[0].name+ " on " +iv.productionQueue[0].world.name);	
		}else //ship
		{
			console.log("Currently producing the "+ iv.productionQueue[0].prefix+" "+iv.productionQueue[0].name);
		}
	}else
	{
		console.log("Not currently producing anything");
	}
	var ted="";
	console.log("Warring With: "+ted);
	for(var i=0;i<iv.autoHostile.length;i++)
	{
		//ted.concat(",");
		//ted.concat(iv.autoHostile[i].name);
		console.log("    "+iv.autoHostile[i].name);
	}
	
}

Upgrades={};
Upgrades.Shields=0;
Upgrades.MaxShields=1;
Upgrades.AddPhaser=2;
Upgrades.PhaserPower=3;
Upgrades.MaxTorpedos=4;
Upgrades.MaxMines=5;
Upgrades.MaxSpeed=6;
Upgrades.MaxCrew=7;
Upgrades.SensorRange=8;
Upgrades.WeaponsRange=9;

statusModes={};
statusModes.Overview=0;
statusModes.CivView=1;
statusModes.WarView=3;

var reek="";

function statusBox()
{
	this.civ=civs[playerCiv];
	this.civTrack=0;
	this.visible=false;
	this.mode=statusModes.CivView;
	this.x=140;
	this.y=20;
	this.worldTrack=0;
	this.shipTrack=0;
	this.collumTrack=0;
	this.productionBar=new progressBar();
	this.researchBar=new progressBar();
	this.productionBar.x=550;
	this.productionBar.label="Production:";
	this.productionBar.y=25;
	this.scale=1;
	this.height=550;
	this.width=650;
	this.backColor="blue";
	this.borderSize=4;
	this.researchBar.x=550;
	this.researchBar.label="Research:  ";
	this.researchBar.y=45;

	
		this.buildShipButton=new button(this);
		this.buildShipButton.x=this.x+500;
		this.buildShipButton.y=this.y+50;
		this.buildShipButton.width=60;
		this.buildShipButton.height=16;
		this.buildShipButton.text="Build Ship";
		this.buildShipButton.object
		this.buildShipButton.parent=this;
		this.buildShipButton.yCenter=false;
		this.buildShipButton.update=function()
		{
			if((this.parent.civ==civs[playerCiv]) && (this.parent.civ.alive))
			{	
				this.greyed=false;
			}else
			{
				this.greyed=true;
			}
		};
		this.buildShipButton.doThings=function()
		{
			this.parent.civ.produceShip(9,this.homeworld);
		};
		buttons.push(this.buildShipButton);
	
	this.nextCivButton=new button(this);
	this.nextCivButton.x=this.x+10+624;
	this.nextCivButton.y=this.y+532;
	this.nextCivButton.width=12;
	this.nextCivButton.height=12;
	this.nextCivButton.text="+";
	this.nextCivButton.object=this;
	this.nextCivButton.parent=this;
	this.nextCivButton.yCenter=false;

	this.nextCivButton.update=function()
	{
	
	};
	this.nextCivButton.doThings=function()
	{
		if(this.parent.visible)
		{
			this.object.cycleCiv();
		}
	};
	buttons.push(this.nextCivButton);
	
	this.prevCivButton=new button(this);
	this.prevCivButton.x=this.x+6;
	this.prevCivButton.y=this.y+532;
	this.prevCivButton.width=12;
	this.prevCivButton.height=12;
	this.prevCivButton.text="-";
	this.prevCivButton.object=this;
	this.prevCivButton.parent=this;
	this.prevCivButton.yCenter=false;
	this.prevCivButton.update=function()
	{
	
	};
	this.prevCivButton.doThings=function()
	{
		if(this.parent.visible)
		{
			this.object.cycleCiv(true);
		}
	};
	buttons.push(this.prevCivButton);
		
	this.XButton=new button();
	this.XButton.text="X";

	this.XButton.x=this.x+this.width-14;
	this.XButton.y=this.y+2;
	this.XButton.object=this;
	this.XButton.parent=this;
	this.XButton.width-=18;
	this.XButton.height-=12;
	this.XButton.yCenter=false;
	this.XButton.on=false;
	this.XButton.onoff=true;
	this.XButton.doThings=function()
	{
		if(this.object)
		{
			this.object.visible=false;
		}
		this.visible=false;
	};
	buttons.push(this.XButton);
	
}
	statusBox.prototype.cycleCiv=function(neg)
	{
		if(neg)
		{
			this.civTrack--;
			if(this.civTrack<0)
			{
				this.civTrack=17;
			}
			this.worldTrack=0;
			this.shipTrack=0;
			this.collumTrack=0;
			this.civ=civs[this.civTrack];
		}else
		{
			this.civTrack++;
			if(this.civTrack>17)
			{
				this.civTrack=0;
			}
			this.worldTrack=0;
			this.shipTrack=0;
			this.collumTrack=0;
			this.civ=civs[this.civTrack];
		}
	};
	statusBox.prototype.update=function()
	{
		
		this.buildShipButton.update();
		if(this.visible)
		{
			this.nextCivButton.visible=true;
			this.prevCivButton.visible=true;
			this.buildShipButton.visible=true;
			this.XButton.visible=true;
		}else
		{
			this.nextCivButton.visible=false;
			this.prevCivButton.visible=false;
			this.buildShipButton.visible=false;
			this.XButton.visible=false;
		}
		if(leftkey.check())
		{
			if(this.collumTrack>0)
			{
				this.collumTrack--;
			}
		}
		if(rightkey.check())
		{
			if(this.collumTrack<2)
			{
				this.collumTrack++;
			}
		}
		if(upkey.check())
		{
			if((this.collumTrack==1) && (this.worldTrack>0))
			{
				this.worldTrack--;
			}else if((this.collumTrack==2) && (this.shipTrack>0))
			{
				this.shipTrack--;
			}
		}
		if(downkey.check())
		{
			if((this.collumTrack==1) && (this.worldTrack<this.civ.worlds.length-1) && (this.worldTrack<24))
			{
				this.worldTrack++;
			}else if((this.collumTrack==2) && (this.shipTrack<this.civ.ships.length-1)&& (this.shipTrack<24))
			{
				this.shipTrack++;
			}
		}
		if(startkey.check())
		{
			if(this.collumTrack==2)
			{
				selectedShip=this.civ.ships[this.shipTrack];
				camera.follow(selectedShip);
				this.visible=false;
				this.worldTrack=0;
				this.shipTrack=0;
				this.collumTrack=0;
			}else if(this.collumTrack==1)
			{
				camera.follow(this.civ.worlds[this.worldTrack]);
				this.visible=false;
				this.worldTrack=0;
				this.shipTrack=0;
				this.collumTrack=0;
			}
		}
	};
	statusBox.prototype.draw=function(can,cam)
	{
		if(!this.visible)
		{
			return;
		}
		can.save();
		can.font = "12pt Calibri";
		can.fillStyle="white";
		can.fillStyle=this.civ.color;
		can.fillRect(this.x,this.y,this.width+this.borderSize,this.height+this.borderSize);
		can.fillStyle=this.backColor;
		can.globalAlpha=0.80;
		can.fillRect(this.x+this.borderSize,this.y+this.borderSize,this.width-this.borderSize,this.height-this.borderSize);
		can.fillStyle="white";
		if(this.mode==statusModes.Overview)
		{
		
		}else if(this.mode==statusModes.CivView)
		{
			this.nextCivButton.draw(can,cam);
			this.prevCivButton.draw(can,cam);
			this.buildShipButton.draw(can,cam);
			this.XButton.draw(can,cam);
			//can.fillStyle=this.civ.color;
			can.fillText(this.civ.name,this.x+10,this.y+2+16);
			//can.fillStyle="white";
			can.fillText("Money: " +this.civ.money,this.x+10,this.y+2+32);
			var pump="dunno";
			if(this.civ.mode==AIModes.Agressive)
			{
				if(this.civ.autoHostile.length>0)
				{
					pump="Agressive";
				}else
				{
					pump="Agressive, but with no enemies";
				}
			}else if(this.civ.mode==AIModes.Defense)
			{
				pump="Defending";
			}else if(this.civ.mode==AIModes.Explore)
			{
				pump="Exploring";
			}
			if(this.civ.fallingBack)
			{
				pump="Preparing for Borg invasion";
			}
			if(this.civ.homeworld.civ!=this.civ)//revenge at all costs against enemyciv.
			{
				pump="Seeking revenge against "+this.civ.homeworld.civ.name + " at all costs";
			}
			if(!this.civ.AI)
			{
				pump="Manual Control";
			}
			can.fillText("AI Mode: "+pump,this.x+10,this.y+2+48);
			if(this.civ.allied)
			{
				can.fillText("Allied with humans.",this.x+10,this.y+2+64);
			}
			
			if(this.civ.autoHostile.length>0)
			{
				var george="";
				if(this.civ.autoHostile.length>15)
				{
					george=" Just about Everybody.";
				}else
				{
				
					for(var i=0;i<this.civ.autoHostile.length;i++)
					{
						george+=this.civ.autoHostile[i].name+ " ";
					}
					george=elipseString(george,88);
				}
				can.fillText("At War With: "+george,this.x+10,this.y+2+78);
			}

			can.fillText("Worlds: "+this.civ.worlds.length,this.x+10,this.y+2+112);
			var kim=this.civ.worlds.length;
			var elipsis=false;
			if(kim>25)
			{
				kim=25;
				elipsis=true;
			}else
			{
				elipsis=false;
			}

			for(var i=0;i<kim;i++)
			{
				var mike="";
				if(this.civ.worlds[i]==this.civ.homeworld)
				{
					mike=" (Homeworld)";
				}
				if((this.collumTrack==1) && (i==this.worldTrack))
				{
					can.fillStyle="green";
				}
				reek=this.civ.worlds[i].name+mike+", "+this.civ.worlds[i].sun.name+" system";
				reek=elipseString(reek,50);
				can.fillText(reek,this.x+10,this.y+2+128+i*16);
				can.fillStyle="white";
			}
			if(elipsis)
			{
				can.fillText("....",this.x+10,this.y+2+128+kim*16);
			}
			can.fillText("Ships: "+this.civ.ships.length,this.x+350,this.y+2+112);
			kim=this.civ.ships.length;
			elipsis=false;
			if(kim>25)
			{
				kim=25;
				elipsis=true;
			}else
			{
				elipsis=false;
			}
			for(var i=0;i<kim;i++)
			{
				if((this.collumTrack==2) && (i==this.shipTrack))
				{
					can.fillStyle="green";
				}
				var reek=elipseString(this.civ.ships[i].name+", "+this.civ.ships[i].actionText,45);
				can.fillText(reek,this.x+350,this.y+2+128+i*16);
				can.fillStyle="white";
			}
			if(elipsis)
			{
				can.fillText("....",this.x+350,this.y+2+128+kim*16);
			}
		}else if(this.mode==statusModes.WarView)
		{
		
		}
		
		if(this.civ.productionQueue.length>0)
		{
			if((this.civ.productionQueue[0]) &&(this.civ.productionQueue[0].building))
			{
				reek="Producing a "+ this.civ.productionQueue[0].name+ " on " +this.civ.productionQueue[0].world.name;
				reek=elipseString(reek,44);
				can.fillText(reek,this.x+350,this.y+90);	
			}else if(this.civ.productionQueue[0])
			{
				can.fillText("Producing: "+this.civ.productionQueue[0].name,this.x+400,this.y+90);
			}
		}
		
		this.productionBar.val=this.civ.productionTick;
		this.productionBar.maxVal=this.civ.nextProduction;
		this.productionBar.draw(canvas,camera);
	
		this.researchBar.val=this.civ.researchTick;
		this.researchBar.maxVal=this.civ.nextResearch;
		this.researchBar.draw(canvas,camera);
		if(!this.civ.alive)
		{
			can.strokeStyle="red";
			can.lineWidth =10;

			//console.log(point1,point2);
			can.beginPath();
			
			can.moveTo(this.x,this.y);
			can.lineTo(this.x+this.width,this.y+this.height);
			can.moveTo(this.x+this.width,this.y);
			can.lineTo(this.x,this.y+this.height);


			can.stroke();
			can.closePath();	
		}
		can.restore();
	};


var roland=new statusBox();
roland.civTrack=playerCiv;
var textBoxes=[];


function textBox(pt)
{
	this.x=0;
	this.y=0;
	this.font="14pt Calibri";
	this.colorText=false;
	this.limit=16;
	this.hasFocus=false;
	this.visible=false;
	this.visibleOnlyFocus=false;
	this.width=80;
	this.object=null;
	this.height=16;
	this.blinkRate=30;
	this.blink=false;
	this.finalText=null;
	this.type=0;
	this.listTrack=0;
	this.list=null;//civs[playerCiv].knownWorlds;
	this.choice=null;
	this.text="";
	this.blinkTrack=0;
	this.backColor="white";
	this.borderSize=2;
	if(pt){
	this.parent=pt;
	this.onClick=function()
	{
		if(this.type==1)
		{
			this.listTrack++;
			if(this.listTrack>this.list.length-1)
			{
				this.listTrack=0;
			}
			if((this.list)  && (this.list.length>0))
			{
				if(this.listTrack>this.list.length-1)
				{
					this.listTrack=this.list.length-1;
				}
				this.text=this.list[this.listTrack].name;
				//this.width=(this.text.length+2)*6+6;
			}else
			{
				this.text="";
			}

		}
	};
	}
}
	textBox.prototype.enter=function()
	{
		this.finalText=this.text;
		this.hasFocus=false;
		if((this.object) && (this.object.orbiting))
		{
			this.object.orderLeaveOrbit();
		}
		if(this.object)
		{
			
			var dole=parseInt(this.text);
			if((dole<361) && (dole>-1))
			{
				this.object.desiredHeading=parseInt(this.text);
				this.object.destination=null;
				this.object.desiredOrbitTarg=null;
			}else
			{
				console.log("Not a valid heading!");
			}
		}
	};


	textBox.prototype.update=function()
	{
		if(this.hasFocus)
		{
			this.blinkTrack++;
			if(this.blinkTrack>this.blinkRate)
			{
				this.blink=!this.blink;
				this.blinkTrack=0;
			}
		}
		if(this.type===0) //text
		{
			if(this.hasFocus)
			{
				for(var i=0;i<letterkeys.length;i++)
				{
					if((letterkeys[i].check()) &&(this.text.length<this.limit))
					{
						if(keydown.shift)
						{
							this.text+=letterkeys[i].key.toUpperCase();
						}else
						{
							this.text+=letterkeys[i].key;
						}
					}
				}
				for(var i=0;i<numberkeys.length;i++)
				{
					if((numberkeys[i].check()) &&(this.text.length<this.limit))
					{
						this.text+=numberkeys[i].key;
					}
				}
				
				if((pausekey.check())  &&(this.text.length<this.limit))
				{
					this.text+=" ";
				}
				
				if(backspaced)
				{
					backspaced=false;
					if(this.text.length>0)
					{
						this.text=this.text.substring(0,this.text.length-1);
					}
				}
				
				if((this.type===0) &&(startkey.check()))
				{
					this.enter();
				}
			}
		}else if(this.type==1) //dropdown basically.
		{
			if(this.hasFocus)
			{
				//holdInput=true;
				
				if(startkey.check())
				{
					holdInput=false;
					this.hasFocus=false;
					this.choice=this.list[this.listTrack];
					//somehow order ship to move there.
				}
				
				if(upkey.check())
				{
					if(this.listTrack>0)
					{
						this.listTrack--;
					}
				}else if(downkey.check())
				{
					if(this.listTrack<this.list.length-1)
					{
						this.listTrack++;
					}
				}
				
			}
			if((this.list) && (this.list.length>0))
				{
					if(this.listTrack>this.list.length-1)
					{
						this.listTrack=this.list.length-1;
					}
					this.text=this.list[this.listTrack].name;
					//this.width=(this.text.length+2)*6+6;
				}else
				{
					this.text="";
				}
		}
	};
	textBox.prototype.draw=function(can,cam)
	{
		if(!this.visible) {return;}
		
		if((this.visibleOnlyFocus) && (!this.hasFocus))
		{
			return;
		}
		can.save();
		//can.font=this.font;
		can.fillStyle="grey";
		if(this.hasFocus)
		{
			can.fillStyle="yellow";
		}
		can.fillRect(this.x,this.y,this.width+this.borderSize,this.height+this.borderSize);
		can.fillStyle=this.backColor;
		can.fillRect(this.x+this.borderSize,this.y+this.borderSize,this.width-this.borderSize,this.height-this.borderSize);
		can.fillStyle="black";
			if(this.colorText)
			{
			if((this.list ) && (this.list.length>0)&&(this.list[this.listTrack].civs) && (this.list[this.listTrack].civs.length>0))
			{
				can.fillStyle=this.list[this.listTrack].civs[0].color;
			}else if((this.list ) && (this.list.length>0)&&(this.list[this.listTrack].civ))
			{
				can.fillStyle=this.list[this.listTrack].civ.color;
			}
		}
		var darry="";
		if((this.blink) && (this.hasFocus))
		{
			darry="|";
		}
		can.fillText(this.text+darry,this.x+2,this.y+14);
		can.fillStyle="white";
		can.restore();
	};

clearFocus=function()
{
	for(var i=0;i<textBoxes.length;i++)
	{
		textBoxes[i].hasFocus=false;
	}
};

var boxTabs=[];

function boxTab(parent,page,label)
{
	this.parent=parent;
	this.page=page;
	this.width=100;
	this.height=20;
	this.visible=false;
	this.active=false;
	this.backColor=parent.backColor;
	this.label=label;
	this.onClick=function()
	{
		this.active=true;
		this.parent.page=this.page;
		//others.active=false;
		//each screenbox has a tab for each page.  pages don't have tabs.  scan box is a screen box with a page/tab for each detected object.
	};
	this.ID=this.parent.tabs.length;
	this.parent.tabs.push(this);
	this.draw=function(can,cam)
	{
		//return; //sic provomkalmas
		this.width=this.parent.width/this.parent.pages;
		this.x=this.parent.x+(this.width/2*this.ID)+2;
		this.y=this.parent.y-this.height;
		can.save();
		canvas.font = "8pt Calibri";
		if(this.parent.page==this.page)//(this.active)
		{
			can.globalAlpha=1;
		}else
		{
			can.globalAlpha=.30;
		}
		can.fillStyle="blue";
		can.fillRect(this.x,this.y,this.width,this.height);
		can.fillStyle="white";
		can.strokeStyle="white";
		can.fillText(this.label, this.x+2,this.y+14);
		can.beginPath();
		
	
		
		can.moveTo(this.x,this.y);
		can.lineTo(this.x+this.width,this.y);
		can.lineTo(this.x+this.width,this.y+this.height)
		can.moveTo(this.x,this.y);
		can.lineTo(this.x,this.y+this.height);


		can.stroke();
		can.closePath();
		can.restore();
	}
}

function screenBox(obj)
{
	this.object=obj;
	this.x=20;
	this.y=350;
	this.scale=1;
	this.height=180;
	this.width=80;
	this.page=0;
	this.visible=false;
	this.targetScreen=false;
	this.awayTeamScreen=false;
	this.pages=6;
	this.tabs=[];
	this.type=0;
	this.backColor="blue";
	this.borderSize=4;
	for(var i=0;i<this.pages;i++)
	{
		var smurt="";
		if(i==0) {smurt="Main";}
		if(i==1) {smurt="Crew";}
		if(i==2) {smurt="Helm";}
		if(i==3) {smurt="Combat";} //tactical?
		if(i==4) {smurt="Systems";}
		if(i==5) {smurt="Orders";}
		if(i==6) {smurt="???";}
		dilly=new boxTab(this,i,smurt);
		dilly.width=this.width/this.pages; //really suprised if this works
		boxTabs.push(dilly);
		this.tabs.push(dilly);
	}
	
	if(this.object.ship)
	{
		this.sysButtons=[];
		var ip=0;
		for(var g=0;((g<3)&&(ip<this.object.systems.length));g++)
		{
			for(var h=0;((h<7)&&(ip<this.object.systems.length));h++)
			{
				var liddle=new button(this);
				liddle.object=this.object;
				liddle.parent=this;
				liddle.ID=ip;
				liddle.on=this.object.systems[ip].on;
				liddle.x=this.x+8+g*85;
				liddle.y=this.y+40+h*32;
				liddle.width=80;
				liddle.text=this.object.systems[ip].name;
				liddle.onoff=true;
				//liddle.onlink=true;
				if((this.object.civ) &&(this.object.civ!=civs[playerCiv]))
				{
					liddle.decorative=true;
				}
				
				liddle.doThings=function()
				{
					if(this.parent.damageControlScreen)
					{
						//repair?!
					}else
					{
						if(this.object.systems[this.ID].installed)//also check power!
						{
							
							if(this.object.systems[this.ID].on)
							{
								this.object.systems[this.ID].turnOff();
								//this.on=false
							}else
							{
								if(this.object.systems[this.ID].turnOn())
								{
									//this.on=true;
								}
							}
							this.on=this.object.systems[this.ID].on;
							//this.object.systems[this.ID].on=!this.object.systems[this.ID].on;
						}
					}
				};
				if(!liddle.object.systems[liddle.ID].installed)
				{
					liddle.greyed=true;
				}
				this.sysButtons.push(liddle);
				ip++;
			}
		}
	}
	
	this.damageControlButton=new button(this);
	this.damageControlButton.x=this.x+10+205;
	this.damageControlButton.y=this.y+8;
	this.damageControlButton.width+=15;
	this.damageControlButton.text="Damage";
	this.damageControlButton.object=this.object;
	this.damageControlButton.parent=this;
	this.damageControlButton.doThings=function()
	{
	
		this.parent.damageControlScreen=!this.parent.damageControlScreen;
		if(this.parent.damageControlScreen)
		{
			//do damage shit?
			this.text="Power";
		}else
		{
			this.text="Damage";
		}
	};
	buttons.push(this.damageControlButton);
		
	if((this.object.ship) && (this.object.civ) &&(this.object.civ==civs[playerCiv]))
	{
		this.targButtons=[];
		var ip=0;
		for(var g=0;((g<3)&&(ip<this.object.systems.length));g++)
		{
			for(var h=0;((h<7)&&(ip<this.object.systems.length));h++)
			{
				var liddle=new button(this);
				liddle.object=this.object;
				liddle.parent=this;
				liddle.ID=ip;
				liddle.on=false;
				liddle.x=this.x+8+g*85;
				liddle.y=this.y+40+h*32;
				liddle.width=80;
				liddle.greyed=true;
				liddle.text=this.object.systems[ip].name;
				liddle.onoff=true;
				//liddle.onlink=true;
				liddle.update=function()
				{
					if(this.object.torpedoTarget)
					{
						if(this.object.torpedoTarget.systems[this.ID].installed)
						{
							this.greyed=false;
	
							
						}else
						{
							this.greyed=true;
						}
					}else
					{
						this.greyed=true;
					}
				};
				liddle.doThings=function()
				{
					if(this.object.torpedoTarget)
					{
						if(this.object.torpedoTarget.systems[this.ID].installed)
						{
							this.greyed=false;
							if(!this.on)
							{
								this.on=true
								//do targeting!
							}else
							{
								this.on=false;	
							}
							
						}else
						{
							this.greyed=true;
						}
					}else
					{
						this.greyed=false
					}

				};

				this.targButtons.push(liddle);
				ip++;
			}
		}
		this.headingBox=new textBox(this);
		this.nameBox=new textBox(this);
		this.nameBox.object=this.object;
		this.nameBox.width=120;
		this.nameBox.type=0;
		this.nameBox.visibleOnlyFocus=true;
		this.nameBox.text=this.object.name;
		this.nameBox.limit=21;
		this.nameBox.enter=function()
		{
			this.finalText=this.text;
			this.hasFocus=false;
			this.object.name=this.text;
		};
		this.headingBox.object=this.object;
		this.headingBox.limit=3;
		this.systemBox=new textBox(this);
		this.systemBox.type=1;
		this.systemBox.width=150;
		this.planetBox=new textBox(this);
		this.planetBox.type=1;
		this.planetBox.colorText=true;
		this.systemBox.colorText=true;
		//this.planetBox.hasFocus=true;
		this.planetBox.width=150;
		//this.planetBox.list=civs[playerCiv].knownWorlds;
		this.systemBox.list=stars;
		this.planetBox.list=this.systemBox.list[this.systemBox.listTrack].planets;
		this.raceBox=new textBox(this);
		this.raceBox.type=1;
		this.raceBox.width=150;
		this.shipBox=new textBox(this);
		this.shipBox.type=1;
		//this.planetBox.hasFocus=true;
		this.shipBox.width=150;
		//this.planetBox.list=civs[playerCiv].knownWorlds;
		this.raceBox.list=civs;

		this.shipBox.list=this.raceBox.list[this.raceBox.listTrack].ships;
		textBoxes.push(this.headingBox);
		textBoxes.push(this.systemBox);
		textBoxes.push(this.planetBox);
		textBoxes.push(this.raceBox);
		textBoxes.push(this.shipBox);
		textBoxes.push(this.nameBox);
		
		this.backButton=new button(this);
		this.backButton.x=this.x+10+214;
		this.backButton.y=this.y+8;
		this.backButton.width+=6;
		this.backButton.text="Target";
		this.backButton.object=this.object;
		this.backButton.parent=this;
		this.backButton.doThings=function()
		{
			this.parent.targetScreen=!this.parent.targetScreen;
			if(this.parent.targetScreen)
			{
				this.text="Back";
			}else
			{
				this.text="Target";
			}
		};
		buttons.push(this.backButton);
		
		this.awayTeamButton=new button(this);
		this.awayTeamButton.x=this.x+10+210;
		this.awayTeamButton.y=this.y+8;
		this.awayTeamButton.width+=10;
		this.awayTeamButton.text="Away";
		this.awayTeamButton.object=this.object;
		this.awayTeamButton.parent=this;
		this.awayTeamButton.doThings=function()
		{
			this.on=!this.on;
			this.parent.awayTeamScreen=!this.parent.awayTeamScreen;
			if(this.parent.awayTeamScreen)
			{
				this.text="Back";
			}else
			{
				this.text="Away";
			}
		};
		buttons.push(this.awayTeamButton);
		
		this.evacButton=new button(this);
		this.evacButton.x=this.x+10+210;
		this.evacButton.y=this.y+240;
		this.evacButton.width+=10;
		this.evacButton.text="Evac";
		this.evacButton.object=this.object;
		this.evacButton.parent=this;
		this.evacButton.update=function()
		{
			
			
			if((!this.object.evacDone) && (this.object.systems[SystemIDs.EscapePods].functional()))
			{
				this.greyed=false;
			}else
			{
				this.greyed=true;
			}
		};
		this.evacButton.doThings=function()
		{
			selectedShip.Evac(selectedShip.civ.homeworld);
			//captain?
		};
		buttons.push(this.evacButton);
		
		
		
		this.awayBeamButton=new button(this);
		this.awayBeamButton.x=this.x+10+210;
		this.awayBeamButton.y=this.y+240;
		this.awayBeamButton.width+=10;
		this.awayBeamButton.text="Beam";
		this.awayBeamButton.object=this.object;
		this.awayBeamButton.parent=this;
		this.awayBeamButton.update=function()
		{
			
			
			if((this.object.awayTeam.length>0) && (this.object.systems[SystemIDs.Transporter].functional()) && (this.object.beamTarget))
			{
				this.greyed=false;
			}else
			{
				this.greyed=true;
			}
		};
		this.awayBeamButton.doThings=function()
		{
			//beam back!, if no target, retur
			if(this.object.awayTeamAt!==null)
			{
				this.object.beamUpAwayTeam();
			}else if(this.object.beamTarget)
			{
				this.object.beamDown(this.object.beamTarget);
			}
			if(this.object.awayTeamAt)
			{
				this.text="Recall";
			}else
			{
				this.text="Beam";
			}
		};
		buttons.push(this.awayBeamButton);
		
		this.awayFormButton=new button(this);
		this.awayFormButton.x=this.x+10+160;
		this.awayFormButton.y=this.y+8;
		this.awayFormButton.width+=10;
		this.awayFormButton.text="Form";
		this.awayFormButton.object=this.object;
		this.awayFormButton.parent=this;
		this.awayFormButton.update=function()
		{
			if((this.object.awayTeamAt))
			{
				this.greyed=true;
			}else
			{
				this.greyed=false;
			}
		};
		this.awayFormButton.doThings=function()
		{
			
			//console.log(this.object.awayTeam.length);
			if((!this.object.awayTeam)||(this.object.awayTeam.length<1))
			{
				console.log("forming away team");
				if(this.object.prepareAwayTeam(this.object.crew.length-2))
				{
					this.text="Disband";
				}
			}else
			{
				if(this.object.awayTeam)
				{
					this.object.recallAwayTeam();
					console.log("disbanding away team");
				}
				this.text="Form";
			}
		};
		buttons.push(this.awayFormButton);
		
		this.mapShowButton=new button(this);
		this.mapShowButton.x=this.x+10+210;
		this.mapShowButton.y=this.y+45;
		this.mapShowButton.object=this.object;
		this.mapShowButton.text="Map";
		this.mapShowButton.parent=this;
		this.mapShowButton.center=true;
		this.mapShowButton.doThings=function()
		{
			Map.visible=true;
		};
		buttons.push(this.mapShowButton);
		
		this.manualControlButton=new button(this);
		this.manualControlButton.x=this.x+10+205;
		this.manualControlButton.width+=15;
		this.manualControlButton.y=this.y+75;
		this.manualControlButton.object=this.object;
		this.manualControlButton.text="Manual";
		this.manualControlButton.parent=this;
		//this.manualControlButton.center=true;
		this.manualControlButton.doThings=function()
		{
			this.object.manualHelm();
		};
		buttons.push(this.manualControlButton);
		
		this.goPlanetButton=new button(this);
		this.goPlanetButton.x=this.x+10+120;
		this.goPlanetButton.y=this.y+145;
		this.goPlanetButton.object=this.object;
		this.goPlanetButton.parent=this;
		this.goPlanetButton.center=true;
		this.goPlanetButton.doThings=function()
		{
			
			if(!this.parent.planetBox) {return;}
			if(!this.parent.planetBox.list) {return;}
			var sally=this.parent.planetBox.list[this.parent.planetBox.listTrack];
			if(!sally) {return;}
			/*this.object.orderOrbit(sally);
			this.object.destination=null;
			console.log(this.object.name+" heading to "+sally.name);*/
			this.object.setDestination(sally,this.object.crusingSpeed);
		};
		buttons.push(this.goPlanetButton);
		this.goShipButton=new button(this);
		this.goShipButton.x=this.x+10+120;
		this.goShipButton.y=this.y+145;
		this.goShipButton.object=this.object;
		this.goShipButton.parent=this;
		this.goShipButton.center=true;
		this.goShipButton.doThings=function()
		{
			console.log(this.object.name,this.visible,this.parent.visible);
			if(!this.parent.shipBox) {return;}
			if(!this.parent.shipBox.list) {return;}
			var sally=this.parent.shipBox.list[this.parent.shipBox.listTrack];
			if(!sally) {return;}
			if(this.object.orbiting)
			{
				this.object.orderLeaveOrbit();
			}
			this.object.setDestination(sally,this.object.crusingSpeed);
		};
		buttons.push(this.goShipButton);

		this.speedPlusButton=new button(this);
		this.speedPlusButton.x=this.x+10+120;
		this.speedPlusButton.y=this.y+86;
		this.speedPlusButton.width=12;
		this.speedPlusButton.height=12;
		this.speedPlusButton.text="+";
		this.speedPlusButton.object=this.object;
		this.speedPlusButton.parent=this;
		this.speedPlusButton.yCenter=false;
		this.speedPlusButton.update=function()
		{
			if((this.object.orbiting) || (!this.object.systems[SystemIDs.Engines].functional()) || (this.object.desiredSpeed==this.object.maxSpeed))
			{
				this.greyed=true;
			}else
			{
				this.greyed=false;
			}
		}
		this.speedPlusButton.doThings=function()
		{
			this.object.desiredSpeed+=0.5;
			if(this.object.desiredSpeed>this.object.maxSpeed)
			{
				this.object.desiredSpeed=this.object.maxSpeed;
			}
		};
		buttons.push(this.speedPlusButton);
		
		this.speedMinusButton=new button(this);
		this.speedMinusButton.x=this.x+10+46;
		this.speedMinusButton.y=this.y+86;
		this.speedMinusButton.text="-";
		this.speedMinusButton.width=12;
		this.speedMinusButton.height=12;
		this.speedMinusButton.object=this.object;
		this.speedMinusButton.parent=this;
		this.speedMinusButton.yCenter=false;
		
		this.speedMinusButton.update=function()
		{
			if((this.object.orbiting) || (!this.object.systems[SystemIDs.Engines].functional()) ||(this.object.desiredSpeed===0))
			{
				this.greyed=true;
			}else
			{
				this.greyed=false;
			}
		}
		this.speedMinusButton.doThings=function()
		{
			this.object.desiredSpeed-=0.5;
			if(this.object.desiredSpeed<1)
			{
				this.object.desiredSpeed=0;
			}
		};
		
		buttons.push(this.speedMinusButton);
		
		for(var i=0;i<this.sysButtons.length;i++)
		{
			for(var j=0;j<this.targButtons.length;j++) //only for radio buttons!
			{
				if(i!=j)
				{
					this.targButtons[i].linked.push(this.targButtons[j]);
				}
			}
			buttons.push(this.sysButtons[i]);
			buttons.push(this.targButtons[i]);
		}
	}
}
	screenBox.prototype.update=function()
	{
		if((this.visible) && (showShipMenu)){
			for(var i=0;i<this.tabs.length;i++)
			{
				this.tabs[i].visible=true;
			}
			if((this.headingBox) && (this.systemBox) &&(this.planetBox))
			{
				this.planetBox.list=this.systemBox.list[this.systemBox.listTrack].planets;
				this.shipBox.list=this.raceBox.list[this.raceBox.listTrack].ships;
				if((this.page==2)&&(this.object==selectedShip)&&(this.object.systems[SystemIDs.Navigation].functional()))
				{
					this.headingBox.visible=true;
					this.systemBox.visible=true;
					this.planetBox.visible=true;
					this.goPlanetButton.visible=true;
					this.raceBox.visible=true;
					this.shipBox.visible=true;
					this.speedPlusButton.update();
					this.speedMinusButton.update();
					this.goShipButton.visible=true;
					this.speedPlusButton.visible=true;
					this.speedMinusButton.visible=true;
					this.mapShowButton.visible=true;
					this.manualControlButton.visible=true;
				}else
				{
					this.headingBox.visible=false;
					this.systemBox.visible=false;
					this.planetBox.visible=false;
					this.goPlanetButton.visible=false;
					this.mapShowButton.visible=false;
					this.raceBox.visible=false;
					this.shipBox.visible=false;
					this.speedPlusButton.visible=false;
					this.speedMinusButton.visible=false;
					this.goShipButton.visible=false;
					this.manualControlButton.visible=false;
				}
				if((this.page===0)&&(this.object==selectedShip))
				{
					this.nameBox.visible=true;
				}else
				{
					this.nameBox.visible=false;
				}
				if((this.page==4) && (this.object==selectedShip)) //yaar?
				
				{
					for(var i=0;i<this.sysButtons.length;i++)
					{
						this.sysButtons[i].visible=true;
						this.sysButtons[i].update();
					}
					this.damageControlButton.visible=true;
				}else
				{
					for(var i=0;i<this.sysButtons.length;i++)
					{
						this.sysButtons[i].visible=false;
					}
					this.damageControlButton.visible=false;
				}
				if((this.page==3) && (this.object==selectedShip)) //yaar?
				
				{
					for(var i=0;i<this.targButtons.length;i++)
					{
						this.targButtons[i].visible=true;
						this.targButtons[i].update();
					}
					this.backButton.visible=true;
				}else
				{
					for(var i=0;i<this.targButtons.length;i++)
					{
						this.targButtons[i].visible=false;
					}
					this.backButton.visible=false;
				}
				if((this.page==1) && (this.object==selectedShip)) //yaar?
				{
					this.awayTeamButton.visible=true;
					if(this.awayTeamScreen)
					{
						this.awayBeamButton.visible=true;
						this.awayBeamButton.update();
						this.awayFormButton.visible=true;
						this.awayFormButton.update();
						this.evacButton.visible=false;
					}else
					{
						this.awayBeamButton.visible=false;
						this.awayFormButton.visible=false;
						this.evacButton.visible=true;
						this.evacButton.update();
					}
				}else
				{
					this.awayTeamButton.visible=false;
					this.awayFormButton.visible=false;
					this.awayBeamButton.visible=false;
					this.evacButton.visible=false;
				}
				this.headingBox.update();
				var emily=this.systemBox.listTrack;
				this.systemBox.update();
				if(this.systemBox.listTrack!=emily)
				{
					this.planetBox.list=this.systemBox.list[this.systemBox.listTrack].planets;	
					this.planetBox.listTrack=0;
				}

				emily=this.raceBox.listTrack;
				this.raceBox.update();
				if(this.raceBox.listTrack!=emily)
				{
					this.shipBox.list=this.raceBox.list[this.raceBox.listTrack].ships;	
					this.shipBox.listTrack=0;
				}
				this.shipBox.update();
				this.planetBox.update();
				this.nameBox.update();
			}
		}else
		{
			for(var i=0;i<this.tabs.length;i++)
			{
				this.tabs[i].visible=false;
			}
			if((this.headingBox) && (this.systemBox) &&(this.planetBox))
			{
				this.headingBox.visible=false;
				this.systemBox.visible=false;
				this.planetBox.visible=false;
				this.goPlanetButton.visible=false;
				this.mapShowButton.visible=false;
				this.raceBox.visible=false;
				this.shipBox.visible=false;
				this.speedPlusButton.visible=false;
				this.speedMinusButton.visible=false;
				this.goShipButton.visible=false;
				
				this.nameBox.visible=false;
		
				for(var i=0;i<this.sysButtons.length;i++)
				{
					this.sysButtons[i].visible=false;
				}
				this.damageControlButton.visible=false;
				
				for(var i=0;i<this.targButtons.length;i++)
				{
					this.targButtons[i].visible=false;
				}
				this.backButton.visible=false;
		
				this.awayTeamButton.visible=false;
				this.awayFormButton.visible=false;
				this.awayBeamButton.visible=false;
				this.evacButton.visible=false;
				this.manualControlButton.visible=false;
			}
		}
		
	};
	screenBox.prototype.turnPage=function(back)
	{
		if(!back)
		{
			this.page++;
			if(this.page>this.pages-1)
			{
				//this.page=this.pages-1;
				this.page=0;
			}
		}else
		{
			this.page--;
			if(this.page<0)
			{
				//this.page=0;
				this.page=this.pages-1;
			}
		}

	};
	screenBox.prototype.draw=function(can,cam)
	{
		if(!this.visible){return;}
		can.save();
		can.font = "12pt Calibri";
		can.fillStyle="white";
		can.globalAlpha=0.75;
		can.fillRect(this.x,this.y,this.width+this.borderSize,this.height+this.borderSize);
		can.fillStyle=this.backColor;
		can.globalAlpha=0.65;
		can.fillRect(this.x+this.borderSize,this.y+this.borderSize,this.width-this.borderSize,this.height-this.borderSize);
		can.fillStyle="white";
		if(this.object.ship)
		{
			for(var i=0;i<this.tabs.length;i++)
			{
				//if(this.page==this.tabs[i].page)
				//{
					this.tabs[i].draw(can,cam);
				//}
			}
			if(this.page===0)
			{
				
				if(this.object.civ==civs[playerCiv])
				{
					can.fillText(this.object.prefix+" "+this.object.name,this.x+10,this.y+2+16);
					this.nameBox.x=this.x+50;
					this.nameBox.y=this.y+4;
					this.nameBox.draw(can,cam);
				}else
				{
					can.fillText(this.object.prefix+" "+this.object.name,this.x+10,this.y+2+16);
				}
				can.fillText(this.object.civ.name+ " Lanch Date: " +this.object.launchDate,this.x+10,this.y+2+32);
				var reek=elipseString(this.object.actionText,38);
				can.fillText(reek,this.x+10,this.y+2+48);
				can.fillText("HP: "+this.object.hp+"/"+this.object.maxHp,this.x+10,this.y+2+64);
				can.fillText("Shields: "+this.object.shields+"/"+this.object.maxShields,this.x+10,this.y+2+80);
				
				can.fillText("Phasers:"+this.object.phaserBanks.length+" Torpedos: "+this.object.numTorpedos+" Mines: "+this.object.numMines,this.x+10,this.y+2+96);
				if(this.object.systems[SystemIDs.Targeting].functional())
				{
					if(this.object.torpedoTarget)
					{
						can.fillText("Targeting: "+this.object.torpedoTarget.name,this.x+10,this.y+2+112);
					}else
					{
						can.fillText("No Weapons Lock",this.x+10,this.y+2+112);
					}
				}else
				{
					can.fillStyle="red";
					can.fillText("Weapons Offline!",this.x+10,this.y+2+112);
					can.fillStyle="white";
				}
				var gt=can.font;
				can.font== "8pt Calibri";
				if(this.object.awayTeamAt)
				{
					can.fillText("Away team on "+this.object.awayTeamAt.name,this.x+10,this.y+2+262);
				}
				can.font=gt;
			}else if(this.page==1)
			{
				can.fillText(this.object.prefix+" "+this.object.name,this.x+10,this.y+2+16);
				
				if(!this.awayTeamScreen)
				{
					can.fillText("O2:"+(this.object.oxygen/10)+"%",this.x+10,this.y+2+32);
					for(var i=0;i<this.object.crew.length;i++)
					{
						can.fillText(this.object.crew[i].title+" "+this.object.crew[i].name+" Lvl: "+this.object.crew[i].level,this.x+10,this.y+2+46+i*32);
						can.fillText("   "+this.object.crew[i].hp+"/"+this.object.crew[i].maxHp,this.x+10,this.y+2+46+i*32+16);
					}
					if(this.evacButton)
					{
						this.evacButton.draw(can,cam);
					}
				}else
				{
					if(!this.object.systems[SystemIDs.Transporter].functional())
					{	
						can.fillStyle="red";
						can.fillText("Transporter Offline!",this.x+10,this.y+2+260);
						can.fillStyle="white";
					}else
					{
						var gt=can.font;
						can.font== "8pt Calibri";
						can.fillText("hit "+beamtargetkey.key.toUpperCase()+" to choose a target",this.x+10,this.y+2+242);
						if(this.object.beamTarget)
						{
							can.fillText("Targeting "+this.object.beamTarget.name,this.x+10,this.y+2+262);
						}
						can.font=gt;
					}
					for(var i=0;i<this.object.awayTeam.length;i++)
					{
						var poole="ship.";
						var snoole=(this.object.oxygen/10)+"%";
						if(this.object.awayTeamAt)
						{
							poole=this.object.awayTeamAt.name+".";
							if(this.object.awayTeamAt.ship) 
							{
								snoole=this.object.awayTeamAt.oxygen/10+"%";
							}else if(this.object.awayTeamAt.planet) 
							{
								snoole=this.object.awayTeamAt.oxygen/10+"%";
							}else
							{
								snoole="110%";
							}
						}
						can.fillText("Away team on "+poole,this.x+10,this.y+2+32);
						can.fillText("O2: "+snoole,this.x+10,this.y+2+48);
						can.fillText(this.object.awayTeam[i].title+" "+this.object.awayTeam[i].name+" Lvl: "+this.object.awayTeam[i].level,this.x+10,this.y+2+64+i*32);
						can.fillText("   "+this.object.awayTeam[i].hp+"/"+this.object.awayTeam[i].maxHp,this.x+10,this.y+2+64+i*32+16);
					}
				}
				if(!this.object.systems[SystemIDs.LifeSupport].functional())
				{
					can.fillStyle="red";
					can.fillText("LIFE SUPORT OFFLINE",this.x+128,this.y+2+32);
					can.fillStyle="white";
				}
				if(this.object.civ==civs[playerCiv])
				{
					this.awayTeamButton.draw(can,cam);
					this.awayBeamButton.draw(can,cam);
					this.awayFormButton.draw(can,cam);
				}
			}else if(this.page==2)//navigation
			{
				can.fillText(this.object.prefix+" "+this.object.name,this.x+10,this.y+2+16);
				can.fillText("Navigation: ",this.x+10,this.y+2+32);
				var cindy=Math.floor(this.object.heading);
				if(cindy>360) {cindy-=360;}
				can.fillText("Heading: "+cindy,this.x+10,this.y+2+48);
				var destext="Nowhere";
				var destdist=0;
				if(this.object.destination) 
				{
					destext="Starship "+this.object.destination.name;
					destdist=Math.floor(distance(this.object,this.object.destination));
				}
				if(this.object.desiredOrbitTarg) 
				{
					destext="Destination: "+this.object.desiredOrbitTarg.name+","+this.object.desiredOrbitTarg.sun.name+ " system";
					destext=elipseString(destext,37);
					destdist=Math.floor(distance(this.object,this.object.desiredOrbitTarg));
				}
				can.fillText(destext,this.x+10,this.y+2+64);
				can.fillText("Distance: "+destdist+" AU",this.x+10,this.y+2+80);
				var neeep=Math.round(this.object.speed*10)/10;
				can.fillText("Speed:      "+neeep+"/"+this.object.maxSpeed,this.x+10,this.y+2+96); //todo add decimal place
				
				if(this.object.civ==civs[playerCiv])
				{
					this.speedPlusButton.draw(can,cam);
					this.speedMinusButton.draw(can,cam);
				}
				
				if((this.object.civ==civs[playerCiv]) && (this.object.systems[SystemIDs.Navigation].functional()) &&(!this.object.manualControl))
				{
					can.fillStyle="white";
					can.fillText("Enter Heading:",this.x+10,this.y+2+122);
					this.headingBox.x=this.x+10+110;
					this.headingBox.y=this.y+112;
					this.headingBox.draw(can,camera);
					
					can.fillText("System:",this.x+10,this.y+2+144);
					this.systemBox.x=this.x+10+50;
					this.systemBox.y=this.y+132;
					this.systemBox.draw(can,camera);
					
					can.fillText("Planet:",this.x+10,this.y+2+160);
					this.planetBox.x=this.x+10+50;
					this.planetBox.y=this.y+152;
					this.planetBox.draw(can,camera);
					
					this.goPlanetButton.x=this.x+10+208;
					this.goPlanetButton.y=this.y+136;
					this.goPlanetButton.draw(can,camera);
					
					this.mapShowButton.draw(can,camera);
					this.manualControlButton.draw(can,camera);
					
					can.fillText("Civ:",this.x+10,this.y+2+184);
					this.raceBox.x=this.x+10+50;
					this.raceBox.y=this.y+174;
					this.raceBox.draw(can,camera);
					
					can.fillText("Ship:",this.x+10,this.y+2+204);
					this.shipBox.x=this.x+10+50;
					this.shipBox.y=this.y+194;
					this.shipBox.draw(can,camera);
					
					this.goShipButton.x=this.x+10+208;
					this.goShipButton.y=this.y+182;
					this.goShipButton.draw(can,camera);
				}else if((this.object.civ==civs[playerCiv]) && (!this.object.systems[SystemIDs.Navigation].functional()))
				{
					can.fillStyle="red";
					can.fillText("NAVIGATION OFFLINE",this.x+10,this.y+2+122);
					can.fillStyle="white";
				}else if(this.object.manualControl)
				{
					can.fillText("Manual Control, use Arrow keys.",this.x+10,this.y+2+140);
					can.fillText(firekey.key.toUpperCase()+" to fire",this.x+10,this.y+2+153);
					if(this.mapShowButton){
						this.mapShowButton.draw(can,camera);
					}
					if(this.manualControlButton)
					{
						this.manualControlButton.draw(can,camera);
					}
				}
			}else if(this.page==3)//combat //somehow add list of nearby hostile ships.
			{
				can.fillText(this.object.prefix+" "+this.object.name,this.x+10,this.y+2+16);
				
				if((this.object.systems[SystemIDs.Targeting].functional()) && (this.object.civ==civs[playerCiv]))
				{
					this.backButton.draw(can,cam);
					if(this.targetScreen)
					{
						
						if(this.object.torpedoTarget)
						{
							can.fillText("Targeting "+this.object.torpedoTarget.name,this.x+10,this.y+2+32);
						}else
						{
							can.fillText(this.object.nearbyHostiles.length+" enemy ships in sensor range.",this.x+10,this.y+2+32);
						}
						
						for(var i=0;i<this.targButtons.length;i++)
						{
							this.targButtons[i].draw(can,cam);
						}
					}else if(this.object.torpedoTarget)
					{
						can.fillText(this.object.nearbyHostiles.length+" enemy ships in sensor range.",this.x+10,this.y+2+32);
						can.fillText("Targeting: "+this.object.torpedoTarget.name,this.x+10,this.y+2+64);
						can.fillText(this.object.torpedoTarget.civ.name+" "+this.object.torpedoTarget.class.name +" Starship",this.x+10,this.y+2+80); //todo class!
						can.fillText("Target HP: "+this.object.torpedoTarget.hp+"/"+this.object.torpedoTarget.maxHp,this.x+10,this.y+2+96);
						can.fillText("Target Shields: "+this.object.torpedoTarget.shields+"/"+this.object.torpedoTarget.maxShields,this.x+10,this.y+2+112);
						can.fillText("Target Crew: "+this.object.torpedoTarget.crew.length,this.x+10,this.y+2+124);
						//todo, list whats systems are offline
				
					}else
					{
						can.fillText(this.object.nearbyHostiles.length+" enemy ships in sensor range.",this.x+10,this.y+2+32);
						can.fillText("No Weapons Lock",this.x+10,this.y+2+64);
						can.fillText("Hit "+ targetkey.key.toUpperCase()+" to choose a target",this.x+10,this.y+2+80);
						if(!this.object.systems[SystemIDs.Weapons].functional())
				{
					can.fillStyle="red";
					can.fillText("Weapons Offline!",this.x+10,this.y+2+150);
					can.fillStyle="white";
				}
				if((this.object.systems[SystemIDs.Shields].installed) && (!this.object.systems[SystemIDs.Shields].functional()))
				{
					can.fillStyle="red";
					can.fillText("Shields Offline!",this.x+10,this.y+2+166);
					can.fillStyle="white";
				}
				if(this.object.breaches>0)
				{
					can.fillStyle="red";
				
					if(this.object.breaches>1)
					{
						can.fillText("Multiple Hull Breaches!",this.x+10,this.y+2+178);
					
					}else
					{
						can.fillText("Hull Breached!",this.x+10,this.y+2+178);
					
					}
					
					can.fillStyle="white";
				}
					}
				}else if(this.object.civ===civs[playerCiv])
				{
					can.fillStyle="red";
					can.fillText("Targeting System Offline!",this.x+10,this.y+2+64);
					can.fillStyle="white";
				}
				
			}else if(this.page==4)//Systems
			{
				can.fillText(this.object.prefix+" "+this.object.name,this.x+10,this.y+2+16);
				this.damageControlButton.visible=true;
				this.damageControlButton.draw(can,camera);
				if(!this.damageControlScreen)
				{
					can.fillText("Power Managment  Power: "+this.object.power+"/"+this.object.maxPower,this.x+10,this.y+2+32);
				}else
				{
					can.fillText("Damage Control  Power: "+this.object.power+"/"+this.object.maxPower,this.x+10,this.y+2+32);
				}
				if(true)//(this.object.civ==civs[playerCiv])
				{
					for(var i=0;i<this.sysButtons.length;i++)
					{
						if(this.damageControlScreen)
						{
							this.sysButtons[i].specialDraw(can,cam,false);
						
						}else
						{
							this.sysButtons[i].draw(can,cam,true);
						}
					}
				}
			}else if(this.page==5)
			{
				can.fillText(this.object.prefix+" "+this.object.name,this.x+10,this.y+2+16);
				can.fillText("Orders & Policies: ",this.x+10,this.y+2+32);
			}else if(this.page==6) //unused
			{
				can.fillText(this.object.prefix+" "+this.object.name,this.x+10,this.y+2+16);
				can.fillText("????",this.x+10,this.y+2+32);
			}
		}else if(this.object.planet)
		{
			can.fillText(this.object.name,this.x+10,this.y+2+16);
			if(!this.object.civ)
			{
				can.fillText("Unclaimed planet",this.x+10,this.y+2+32);
			}
			else if(this.object==this.object.civ.homeworld)
			{
				can.fillText(this.object.civ.name+" Homeworld",this.x+10,this.y+2+32);
			}else
			{
				can.fillText(this.object.civ.name+" Colony",this.x+10,this.y+2+32);
			}
			can.fillText(this.object.sun.name+" system",this.x+10,this.y+2+48);
			can.fillText("HP: "+this.object.hp+"/"+this.object.maxHp,this.x+10,this.y+2+65);
			can.fillText("Shields: "+this.object.shields+"/"+this.object.maxShields,this.x+10,this.y+2+80);
			
			can.fillText("Production: "+this.object.getProduction()+" Research: "+this.object.getResearch(),this.x+10,this.y+2+96);
			
			can.fillText("Buildings: ",this.x+10,this.y+2+112);
			for(var i=0;i<this.object.buildings.length;i++)
			{
				can.fillText(this.object.buildings[i].name,this.x+10,this.y+2+128+i*16);
			}
		}else if(this.object.platform)
		{
			can.fillText(this.object.name,this.x+10,this.y+2+16);
			can.fillText(this.object.civ.name,this.x+10,this.y+2+32);
			can.fillText("HP: "+this.object.hp+"/"+this.object.maxHp,this.x+10,this.y+2+48);
			can.fillText("Shields: "+this.object.shields+"/"+this.object.maxShields,this.x+10,this.y+2+64);
			
			can.fillText("Torpedos: "+this.object.numTorpedos+" Mines: "+this.object.numMines,this.x+10,this.y+2+80);
			if(this.object.torpedoTarget)
			{
				can.fillText("Targeting: "+this.object.torpedoTarget.name,this.x+10,this.y+2+96);
			}else
			{
				can.fillText("No Weapons Lock",this.x+10,this.y+2+96);
			}
		}

		can.restore();
	};

function fuckoff()
{
	selectedShip.items.push(new shopItem(Item.RedShirt));
	selectedShip.items.push(new shopItem(Item.HandPhaser));
	var goat=new buyScreen(selectedShip,true);
	goat.setup();
	goat.defaultItemList();
	civs[playerCiv].messages.push(goat);
}

function progressBar()
{
	this.x=0;
	this.y=0;
	this.maxVal=100;
	this.scale=1;
	this.height=15;
	this.val=100;
	this.color="green";
	this.backColor="black";
	this.label="Wangs: ";
}
	progressBar.prototype.draw=function(can,cam)
	{
		can.save();
		can.font = "12pt Calibri";
		this.fillStyle="white";
		var xoff=7*this.label.length;
		can.fillRect(this.x+xoff,this.y,104,this.height+4);
		can.fillText(this.label,this.x,this.y+13);
		
		can.fillStyle=this.backColor;
		can.fillRect(this.x+xoff+2,this.y+2,100,this.height);
		can.fillStyle=this.color;
		var percent=this.val/this.maxVal*100;
		can.fillRect(this.x+xoff+3,this.y+3,percent,this.height-2);
		can.restore();
	};


function newShip(iv,startworld,capt)
{
	if(!startworld)
	{
		startworld=iv.homeworld;
	}
	var james=null;
	if(iv.civID==civIDs.Human)
		{
			james=new starShip(iv);
			james.homeworld=Earth;
			james.civ=iv;
			james.class=shipClasses[0][0];
			james.classify();
			var bah=Math.floor(Math.random()*7);
			james.x=startworld.x;
			james.y=startworld.y;
			james.orbit(startworld);
			james.prefix="U.S.S.";
			james.civ=iv;
			james.christen();
			//console.log(james.prefix+" "+james.name+" is now orbiting " +stars[0].planets[bah].name);
			james.class.name="Galaxy Class";
			james.civID=0;
			james.sprite=Sprite("ship2");
			james.maxSpeed=9;
			//james.activeShields=true;
			james.installSystem(SystemIDs.Shields);
			james.hasShields=true;
			james.maxShields=70;
			james.shields=70;
			james.alive=true;
			james.launchDate=Math.floor(theTime.years)+"."+Math.floor(theTime.days);
			if(j>0)
			{
				james.windows.push(new shipWindow());
				james.windows[0].x=-1;
				james.windows[0].y=8;
				james.windows.push(new shipWindow());
				james.windows[1].x=-2;
				james.windows[1].y=11;
				james.windows.push(new shipWindow());
				james.windows[2].x=2;
				james.windows[2].y=9;
			}
			james.crewVessel(capt);
			james.civ=iv;
			return james;
		}else if(iv.civID==civIDs.Vulcan)
		{
			james=new starShip(iv);
			james.homeworld=iv.homeworld;
			james.class=shipClasses[civIDs.Vulcan][0];
			james.civ=iv;
			james.classify();
			james.x=startworld.x;
			james.y=startworld.y;
			james.prefix="Vulcan";
			james.class.name="Capitol Ship";
			james.civID=1;
			james.christen();
			james.sprite=Sprite("ship5");
			james.maxSpeed=7;
//			james.speed=3;
			james.x=startworld.x;
			james.y=startworld.y;
			james.orbit(startworld);
			james.cruisingSpeed=4;
			//james.desiredSpeed=0;
			
			james.crewVessel(capt);
			james.alive=true;
			james.launchDate=Math.floor(theTime.years)+"."+Math.floor(theTime.days);
			return james;
		}else if(iv.civID==civIDs.Klingon)
		{
			james=new starShip(iv);
				james.class=shipClasses[civIDs.Klingon][0];
				james.civ=iv;
				james.classify();
				james.x=startworld.x;
				james.y=startworld.y;
				james.homeworld=iv.homeworld;
				james.orbit(startworld);
				james.class.name="Bird of Prey";
				james.prefix="I.K.S";
				james.sprite=Sprite("ship4");
				james.civ=iv;
				james.civID=5;
				james.christen();
				james.maxSpeed=7;
				james.addPhaser();
				//james.homing=false;
				james.speed=6;
				james.cruisingSpeed=6;
				james.crewVessel(capt);
				james.alive=true;
				james.launchDate=Math.floor(theTime.years)+"."+Math.floor(theTime.days);
				return james;
		}else if(iv.civID==civIDs.Dominion)
		{
			james=new starShip(iv);
				james.class=shipClasses[civIDs.Dominion][0];
				james.civ=iv;
				james.classify();
				james.x=startworld.x;
				james.y=startworld.y;
				james.homeworld=iv.homeworld;
				james.orbit(startworld);
				james.class.name="Dominion Battle Cruiser";
				james.prefix="Dominion";
				james.sprite=Sprite("ship9");
				james.civ=iv;
				james.civID=civIDs.Dominion;
				james.christen();
				james.maxSpeed=7;
				james.addPhaser();
				//james.homing=false;
				james.speed=6;
				james.cruisingSpeed=6;
				james.crewVessel(capt);
				james.alive=true;
				james.launchDate=Math.floor(theTime.years)+"."+Math.floor(theTime.days);
				return james;
		}else if(iv.civID==civIDs.Cardassian)
		{
			james=new starShip(iv);
			james.class=shipClasses[civIDs.Cardassian][0];
			james.civ=iv;
			james.classify();
			james.x=startworld.x;
			james.y=startworld.y;
			james.homeworld=iv.homeworld;
			james.orbit(startworld);
			james.class.name="Galor-Class";
			james.prefix="C.U.";
			james.sprite=Sprite("ship8");
			james.civ=iv;
			james.civID=civIDs.Cardassian;
			james.christen();
			james.maxSpeed=7;
			james.addPhaser();
			//james.homing=false;
			james.speed=6;
			james.cruisingSpeed=6;
			james.crewVessel(capt);
			james.alive=true;
			james.launchDate=Math.floor(theTime.years)+"."+Math.floor(theTime.days);
			return james;
			
		}else if(iv.civID==civIDs.Romulan)
		{
			james=new starShip(iv);
			james.class=shipClasses[civIDs.Romulan][0];
			james.civ=iv;
			james.classify();
			james.x=startworld.x;
			james.y=startworld.y;
			james.homeworld=iv.homeworld;
			james.prefix="IRW";
			james.class.name="Warbird";
			james.civID=4;
			james.christen();
			james.sprite=Sprite("ship6");
			james.maxSpeed=7;
			james.speed=3;
			james.cruisingSpeed=5;

			
			james.crewVessel(capt);
			james.alive=true;
			james.launchDate=Math.floor(theTime.years)+"."+Math.floor(theTime.days);
			return james;
		}else if(iv.civID==civIDs.Hirogen)
		{
			james=new starShip(iv);
			james.class=shipClasses[civIDs.Hirogen][0];
			james.civ=iv;
			james.classify();
			james.x=startworld.x;
			james.y=startworld.y;
			james.homeworld=iv.homeworld;
			james.prefix="Hunter";
			james.class.name="Hunter";
			james.civID=civIDs.Hirogen;
			james.christen();
			james.sprite=Sprite("ship10");
			james.maxSpeed=7;
			james.speed=3;
			james.cruisingSpeed=5;
			
			james.crewVessel(capt);
			james.alive=true;
			james.launchDate=Math.floor(theTime.years)+"."+Math.floor(theTime.days);
			return james;
		}else if(iv.civID==civIDs.Andorian)
		{
			james=new starShip(iv);
			james.civ=iv;
			james.class=shipClasses[civIDs.Andorian][0];
			james.classify();
			james.homeworld=iv.homeworld;
			james.x=startworld.x;
			james.y=startworld.y;
			james.desiredHeading=Math.floor(Math.random()*359);
			
			james.prefix="I.G.";
			james.class.name="Andorian";
			james.civID=civIDs.Andorian;
			james.christen();
			james.sprite=Sprite("ship15");
			james.maxSpeed=7;
			james.speed=3;
			james.cruisingSpeed=5;
			james.civ=civs[civIDs.Andorian];
			
			james.crewVessel(capt);
			james.alive=true;
			james.launchDate=Math.floor(theTime.years)+"."+Math.floor(theTime.days);
			return james;
		}else if(iv.civID==civIDs.Tellarite)
		{
			james=new starShip(iv);
			james.homeworld=iv.homeworld;
			james.class=shipClasses[civIDs.Tellarite][0];
			james.civ=civs[civIDs.Tellarite];
			james.classify();
			james.x=startworld.x;
			james.y=startworld.y;
			james.desiredHeading=Math.floor(Math.random()*359);
			
			james.prefix="";
			james.class.name="Tellarite";
			james.civID=civIDs.Tellarite;
			james.christen();
			james.sprite=Sprite("ship16");
			james.maxSpeed=7;
			james.speed=3;
			james.cruisingSpeed=5;
			
			
			james.crewVessel(capt);
			james.alive=true;
			james.launchDate=Math.floor(theTime.years)+"."+Math.floor(theTime.days);
			return james;
		}else if(iv.civID==civIDs.Breen)
		{
			james=new starShip(iv);
			james.class=shipClasses[civIDs.Breen][0];
			james.civ=iv;
			james.classify();
			james.homeworld=iv.homeworld;
			james.x=startworld.x;
			james.y=startworld.y;
			james.desiredHeading=Math.floor(Math.random()*359);
			
			james.prefix="B.C.W";
			james.class.name="Breen Warship";
			james.civID=civIDs.Breen;
			james.christen();
			james.sprite=Sprite("ship14");
			james.maxSpeed=7;
			james.speed=3;
			james.cruisingSpeed=5;
			james.civ=civs[civIDs.Breen];
			
			james.crewVessel(capt);
			james.civ=iv;
			james.alive=true;
			james.launchDate=Math.floor(theTime.years)+"."+Math.floor(theTime.days);
			return james;
		}else if(iv.civID==civIDs.Telaxian)
		{
			james=new starShip(iv);
			james.class=shipClasses[civIDs.Telaxian][0];
			james.civ=iv;
			james.classify();
			james.homeworld=iv.homeworld;
			james.x=startworld.x;
			james.y=startworld.y;
			james.desiredHeading=Math.floor(Math.random()*359);
			
			james.prefix="Telaxian";
			james.class.name="Telaxian";
			james.civID=civIDs.Telaxian;
			james.christen();
			james.sprite=Sprite("ship12");
			james.maxSpeed=7;
			james.speed=3;
			james.cruisingSpeed=5;
			
			
			james.crewVessel(capt);
			james.civ=iv;
			james.alive=true;
			james.launchDate=Math.floor(theTime.years)+"."+Math.floor(theTime.days);
			return james;
		}else if(iv.civID==civIDs.Vidiian)
		{
			james=new starShip(iv);
			james.class=shipClasses[civIDs.Vidiian][0];
			james.civ=civs[civIDs.Vidiian];
			james.classify();
			james.homeworld=iv.homeworld;
			james.x=startworld.x;
			james.y=startworld.y;
			james.desiredHeading=Math.floor(Math.random()*359);
			
			james.prefix="Vidiian";
			james.class.name="Vidiian Cruiser";
			james.civID=civIDs.Vidiian;
			james.christen();
			james.sprite=Sprite("ship13");
			james.maxSpeed=7;
			james.speed=3;
			james.cruisingSpeed=5;
			
			
			james.crewVessel(capt);
			james.civ=iv;
			james.alive=true;
			james.launchDate=Math.floor(theTime.years)+"."+Math.floor(theTime.days);
			return james;
		}else if(iv.civID==civIDs.Pakled)
		{
			james=new starShip(iv);
			james.class=shipClasses[civIDs.Pakled][0];
			james.civ=iv;
			james.classify();
			james.homeworld=iv.homeworld;
			james.x=startworld.x;
			james.y=startworld.y;
			james.desiredHeading=Math.floor(Math.random()*359);
			
			james.prefix="";
			james.class.name="Pakled Cruiser";
			james.civID=civIDs.Pakled;
			james.christen();
			james.sprite=Sprite("ship17");
			james.maxSpeed=7;
			james.speed=3;
			james.cruisingSpeed=5;
			
			james.crewVessel(capt);
			
			james.alive=true;
			james.launchDate=Math.floor(theTime.years)+"."+Math.floor(theTime.days);
			return james;
		}else if(iv.civID==civIDs.Bajoran)
		{
			james=new starShip(iv);
			james.class=shipClasses[civIDs.Bajoran][0];
			james.civ=civs[civIDs.Bajoran];
			james.classify();
			james.homeworld=iv.homeworld;
			james.x=startworld.x;
			james.y=startworld.y;
			james.desiredHeading=Math.floor(Math.random()*359);
			james.prefix="";
			james.class.name="Bajoran Cruiser";
			james.civID=civIDs.Bajoran;
			james.christen();
			james.sprite=Sprite("ship11");
			james.maxSpeed=7;
			james.speed=3;
			james.cruisingSpeed=5;
	
			
			james.crewVessel(capt);
			james.alive=true;
			james.launchDate=Math.floor(theTime.years)+"."+Math.floor(theTime.days);
			return james;
		}else if(iv.civID==civIDs.Ferengi)
		{
			james=new starShip(iv);
			james.class=shipClasses[civIDs.Ferengi][0];
			james.civ=civs[civIDs.Ferengi];
			james.classify();
			james.homeworld=iv.homeworld;
			james.x=startworld.x;
			james.y=startworld.y;
			james.desiredHeading=Math.floor(Math.random()*359);
			james.prefix="FAS";
			james.class.name="Merchant";
			james.civID=civIDs.Ferengi;
			james.christen();
			james.sprite=Sprite("ship7");
			james.maxSpeed=7;
			james.speed=3;
			james.cruisingSpeed=5;
			
						
			james.crewVessel(capt);
			james.alive=true;
			james.launchDate=Math.floor(theTime.years)+"."+Math.floor(theTime.days);
			return james;
		}else if(iv.civID==civIDs.Orion)
		{
			james=new starShip(iv);
			james.class=shipClasses[civIDs.Orion][0];
			james.civ=civs[civIDs.Orion];
			james.classify();
			james.homeworld=iv.homeworld;
			james.x=startworld.x;
			james.y=startworld.y;
			james.desiredHeading=Math.floor(Math.random()*359);
			james.prefix="Pirate";
			james.class.name="Cruiser";
			james.civID=civIDs.Orion;
			james.christen();
			james.sprite=Sprite("ship18");
			james.maxSpeed=7;
			james.speed=3;
			james.cruisingSpeed=5;
			
						
			james.crewVessel(capt);
			james.alive=true;
			james.launchDate=Math.floor(theTime.years)+"."+Math.floor(theTime.days);
			return james;
		}else if(iv.civID==civIDs.Borg)
		{
			james=new starShip(iv);
			james.class=shipClasses[civIDs.Borg][0];
			james.civ=iv;
			james.classify();
			james.homeworld=iv.homeworld;
			james.x=startworld.x;
			james.y=startworld.y;
			james.prefix="Cube";
			james.civID=9;
			james.civ=iv;
			james.christen();
			james.hp=1000;
			james.maxHp=1000;
			james.shields=100;
			
			james.oxygen=10000;
			james.class.name="Cube";
			james.sprite=Sprite("ship3");
			james.maxSpeed=10;
			james.cruisingSpeed=5;
			//james.adjustHeading(270);
			james.speed=5;
			//james.desiredSpeed=james.cruisingSpeed;
			james.autoFireRate=20;
			james.addPhaser();
			
			//james.planetTarget=Earth;
			//james.orderOrbit(james.planetTarget);
			james.crewVessel(capt);
			
			james.alive=true;
			james.launchDate=Math.floor(theTime.years)+"."+Math.floor(theTime.days);
			return james;
		}
		
}

function addShip(hip,iv)
{
	iv.ships.push(hip);
	ships=[];
	for(var i=0;i<civs.length;i++)
	{
		//ships.concat(civs[i].ships);
		for(var j=0;j<civs[i].ships.length;j++)
		{
			
			ships.push(civs[i].ships[j]);
		}
	}
		//selectedShip=ships[0];
}
var numSystems=80;
var starsDrawn=0;


var selectedSprite =Sprite("selected");
var selectedSpriteBig =Sprite("selectedbig");

var shipSelSpriteB =Sprite("shipselectedbig");
var shipSelSprite =Sprite("shipselected");

var biblam="Marklar";
if(!clean)
{
	biblam="Cat's Anus";
}
var starNames=new Array(90);
starNames= ["Eridani","Cygnus","Ceti-Alpha","Omicron Ceti","Monac","Bringold","Alnitak", "Deneb", "Acamar","Rigel","Polaris","Praxillus","Proxima Centauri", "Omicron Persei","Canopus", "Romii", "Sirius","Tahal", "Mintaka", "Vega", "Wolf", "Tau-Ceti","Eminiar","Canaris","Hydra", "Questar", "Arneb", "Amargosa", "Altiar","Draconis","Theloni","Gezid","Indi","Canaris","Sigma", "Cassius","Melona","Minara",biblam,"Detroit","Chicago","Miami","Albany","Providence","Augusta","Washington","Lexington","Moscow","Yemen","Tokyo","St. Petersburg","Berlin","New York","Patterson","Springfield","Great Neck","Manhaset","Port Washington","Honalulu","Vermont","New Hampshire","Kentucky","North Carolina","South Carolina","Florida","Texas","Huston","Oregon","Idaho","Kansas","Georgia","Arkansas","Louisiana","Ukraine","England","France","Goat land","Canada","Perth","India","Indiana","Oklahoma","Arizona","Nevada","Californa"];
var starNamesUsed=[];

var planetNames=new Array(40);
planetNames= ["Vulcan","Andoria","Arkaria","Benzar","Halii","Tellar","Teneebla","Trill","Draylax", "Coridan", "Aurelia","Ocampa","Talax","Enara Prime","Hoth","Endor","Tatooine","Carcosa","Sobaras"];

function getQuadrant(thingy){
	var quad="Theta";
	if(thingy.x<universeWidth/2)
	{
		if(thingy.y<universeHeight/2)
		{
			quad="Alpha";
		}else
		{
			quad="Delta";
		}
	}else
	{
		if(thingy.y<universeHeight/2)
		{
			quad="Beta";
		}else
		{
			quad="Gamma";
		}
	}
	return quad;
}

function romanize(num) {
	var str=" ";
	if(num===0)
	{
		str=" Prime";
	}else if(num==1)
	{
		str=" I ";
	}else if(num==2)
	{
		str=" II ";
	}else if(num==3)
	{
		str=" III ";
	}else if(num==4)
	{
		str=" IV ";
	}else if(num==5)
	{
		str=" V ";
	}else if(num==6)
	{
		str=" VI ";
	}else if(num==7)
	{
		str=" VII ";
	}else if(num==8)
	{
		str=" VIII ";
	}else if(num==9)
	{
		str=" IX ";
	}else if(num==10)
	{
		str=" X ";
	}else if(num==11)
	{
		str=" XI ";
	}else if(num==12)
	{
		str=" XII ";
	}else if(num==13)
	{
		str=" XIII ";
	}else
	{
		str=" Omega ";
	}
	
	return str;
}



function planetInfo(){
	this.pop=Math.random()*6+5;
	this.scanned=false;
	this.richness=Math.random()*6+5;
	this.fertility=Math.random()*6+5;
	this.inhabited=false;
	this.update=function()
	{
	//todo
	};
	
}

function cloud(dense){
	this.type=Math.floor(Math.random()*6);
	this.xoffset=Math.random()*dense;
	this.yoffset=Math.random()*dense;
	this.heading=Math.random()*360;
	this.size=Math.random()*2+1;
	this.alpha=0.5;
	this.sprite=Sprite("neb"+this.type);
}

function nebula(){
	this.name="Some Nebula";
	this.wtf="Nebula";
	this.x=Math.random()*universeWidth;
	this.y=Math.random()*universeHeight;
	this.numClouds=Math.random()*100+150;
	this.clouds=[];
	for(var i=0;i<this.numClouds;i++)
	{
		this.clouds[i]=new cloud(1020);
	}
}
	nebula.prototype.draw=function(can,cam){
		for(var i=0;i<this.numClouds;i++)
		{
			if(cam.isNear(this))
			{
				can.save();
				can.translate((this.x+this.clouds[i].xoffset+cam.x)*cam.zoom,(this.y+this.clouds[i].yoffset+cam.y)*cam.zoom);
				can.rotate(this.clouds[i].heading*(Math.PI/180));
				can.scale(this.clouds[i].size*cam.zoom,this.clouds[i].size*cam.zoom);
				canvas.globalAlpha=0.2;
				this.clouds[i].sprite.draw(can, -64,-64);
				can.restore();
			}
		}
		
	};
//16.075
function star(){
	this.wtf="Star";
	this.x=420;
	this.y=300;
	this.type=0;
	this.civID=0;
	this.width=96;
	this.size=1;
	this.height=96;
	this.alive=true;
	this.civs=[];
	this.cloaked=false;
	this.shields=0;
	this.shieldSprite=Sprite("shields");
	this.sprite=Sprite("sun"+Math.floor(Math.random()*3));
	this.name="Sol";
	var nami=Math.floor(Math.random()*starNames.length);
	while(true) {
        if(starNamesUsed[nami]) 
        {
            nami=Math.floor(Math.random()*starNames.length);
        }else {break;}
    }
	this.name=starNames[nami];
	starNamesUsed[nami]=true;
	this.planets=[];
	this.planetDetails=[];
	this.numPlanets=0;
	this.numAstroids=0;
	this.selected=0;
	this.discovered=false;
}
	star.prototype.cyclePlanets=function(){
		this.selected++;

		if(this.selected>this.numPlanets-1)
		{
			this.selected=0;
		}
	};
	
	star.prototype.scanAllPlanets=function(){
		for(var i=0;i<this.numPlanets;i++)
		{
			this.planetDetails[i].scanned=true;
		}
	};
	
	star.prototype.countMoons=function(){
		var ans=0;
		for(var i=0;i<this.numPlanets;i++)
		{
			 ans+=this.planets[i].numMoons;
		}
		return ans;
	};
	
	star.prototype.randomizeSystem=function(){
		var obt=Math.random()*180+70;
		var obtw=Math.random()*35+15;
		if((Math.random()*10) <5){
			var qi=Math.floor(Math.random()*40);
			for (var p=0;p<160+qi;p++)
			{
				monsta.startAstroid(40,this,(Math.random()*obtw)+obt,((Math.random()*8)+1)/8,0,true,5+Math.floor(Math.random()*2));
			}
		}
		
		var qip=Math.floor(Math.random()*8);
		
		for (var p=0;p<3+qip;p++)
		{
			var pobt=(Math.random()*240)+170;
			if(Math.abs(pobt-obt<70) )
			{
				if(obt<230)
				{
					pobt=obt-70;
				}else
				{
					pobt=obt+70;
				}
			}//decay =(Math.random()*4)/10
			monsta.startPlanet(40,this,pobt,((Math.random()*4)+1)/8,0,true,null);
		}
		
		for (var gop=0;gop<this.numPlanets;gop++)
		{
			if((Math.random()*10) <5)
			{
				var pip=Math.floor(Math.random()*8);
				for (var po=0;po<pip;po++)
				{
					monsta.startMoon(40,this.planets[gop],(Math.random()*12+11)*this.planets[gop].size,((Math.random()*8)+1)/8,0,true,null);
				}
			}
			
		}

		};
	star.prototype.draw=function(can,cam){
		if(this.alive)
		{
			can.save();
			can.translate((this.x+cam.x)*cam.zoom,(this.y+cam.y)*cam.zoom);
			can.rotate((this.heading-90)* (Math.PI / 180));//todo negatives.
			can.scale(this.size*cam.zoom,this.size*cam.zoom);
			if(this.cloaked)
			{
				canvas.globalAlpha=0.30;
			}
			this.sprite.draw(can, -this.width/2,-this.height/2);
			if((this.shields>0) &&  (this.systems[SystemIDs.Shields].functional()))
			{
				canvas.globalAlpha=this.shields/100;
				if(this.width<32)
				{
					this.shieldSprite.draw(can, -this.width,-this.height);
				}else
				{
					this.shieldSprite.draw(can, -this.width/2-14,-this.height/2-12);
				}
			}
			can.restore();
			
			//this.sprite.draw(can, this.x-cam.x-this.width/2,this.y-cam.y-this.height/2);
		}
	};


//var sun=new star();

setupOurs=function(sun)
{
	var obt=440;
	var obtw=Math.random()*35+15;
	var qi=Math.floor(Math.random()*40);
	for (var p=0;p<160+qi;p++)
	{
		monsta.startAstroid(40,sun,(Math.random()*obtw)+obt,((Math.random()*8)+1)/8,0,true,5+Math.floor(Math.random()*2));
	}

	var qip=Math.floor(Math.random()*8);
	var ptypes=[];
	ptypes[0]=2;
	ptypes[1]=2;
	ptypes[2]=0;
	ptypes[3]=2;
	ptypes[4]=4;
	ptypes[5]=5;
	ptypes[6]=4;
	ptypes[7]=4;
	ptypes[8]=3;
	
	var pmoons=[];
	pmoons[0]=0;
	pmoons[1]=0;
	pmoons[2]=1;
	pmoons[3]=2;
	pmoons[4]=63;
	pmoons[5]=31;
	pmoons[6]=32;
	pmoons[7]=18;
	pmoons[8]=3;
	for (var p=0;p<9;p++)
	{
		var pobt=(Math.random()*44)+(p+1)*130+40;
		
		monsta.startPlanet(40,sun,pobt,((Math.random()*4)+1)/16,0,true,ptypes[p]);
	}
	

	sun.planets[0].name="Mercury";
	sun.planets[1].name="Venus";
	sun.planets[2].name="Earth";
	sun.planets[3].name="Mars";
	sun.planets[4].name="Jupiter";
	sun.planets[5].name="Saturn";
	sun.planets[6].name="Uranus";
	sun.planets[7].name="Neptune";
	sun.planets[8].name="Pluto";
	
	sun.planets[0].size=1;
	sun.planets[1].size=1;
	sun.planets[2].size=2;
	sun.planets[3].size=2;
	sun.planets[4].size=5;
	sun.planets[5].size=4;
	sun.planets[6].size=3;
	sun.planets[7].size=3;
	sun.planets[8].size=0.75;
	
		for (var gop=0;gop<sun.numPlanets;gop++)
		{
			for (var po=0;po<pmoons[gop];po++)
			{
				monsta.startMoon(40,sun.planets[gop],(Math.random()*12+10)*sun.planets[gop].size,((Math.random()*8)+1)/8,0,true,null);
				//console.log(sun.planets[gop].name,sun.planets[gop].moons[po].orbitDiameter,sun.planets[gop].size);
			}
		}
	
	sun.selected=2;
	sun.discovered=true;
	Earth=sun.planets[2];
	Earth.orbitSpeed=2/16;
	Earth.orbitTrack=0;
	sun.planetDetails[2].inhabited=true;
	sun.planetDetails[2].pop=6;
	sun.planets[2].evented=true;
};



function initUniverse()
{
	for (var i=0;i<numStars;i++)
	{
		backStarsX[i]=Math.floor((Math.random()*universeWidth));
		backStarsY[i]=Math.floor((Math.random()*universeHeight));
		backStarsS[i]=Math.floor((Math.random()*2)+1);
	}
	
	stars[0]=new star();
	stars[0].name="Sol";
	stars[0].x=universeWidth/4;
	stars[0].y=universeHeight/4;
	stars[0].civs.push(civs[playerCiv]);
	camera.x=universeWidth/4;
	camera.y=universeHeight/4;
	setupOurs(stars[0]);
	//monsta.startTextured(1000000,stars[0].x-48,stars[0].y-48,0,0,0,false,false,"sun"+stars[0].type);
	
	for(var i=0;i<numNebulas;i++)
	{
		nebulas[i]=new nebula();
		//stars[i].name=names[0][Math.floor(Math.random()*10)];
		nebulas[i].x=Math.floor(Math.random()*universeWidth);
		nebulas[i].y=Math.floor(Math.random()*universeHeight);
	}
	
	for(var i=1;i<numSystems;i++)
	{
		stars[i]=new star();
		//stars[i].name=names[0][Math.floor(Math.random()*10)];
		stars[i].x=Math.floor(Math.random()*universeWidth);
		stars[i].y=Math.floor(Math.random()*universeHeight);
		var eli=false;
		while(eli)
		{
			for(var p=0;p<i;p++)
			{
				if((!eli) && (i!=p) && (distance(stars[i],stars[p])<10000))
				{
					eli=true;
				}
			}
			if(eli)
			{
				stars[i].x=Math.floor(Math.random()*universeWidth);
				stars[i].y=Math.floor(Math.random()*universeHeight);
			}
		}
		/*
		var eli=false;
		for(var p=0;p<i;p++)
		{
			if((!eli) && (i!=p) && (distance(stars[i],stars[p])<500))
			{
				eli=true;
			}
		}
		if(eli)
		{
			stars[i].x=Math.floor(Math.random()*universeWidth);
			stars[i].y=Math.floor(Math.random()*universeHeight);
		}*/
		stars[i].type=Math.floor(Math.random()*3);
		//monsta.startTextured(1000000,stars[i].x-48,stars[i].y-48,0,0,0,false,false,"sun"+stars[i].type);
	}
	for(var i=0;i<civs.length;i++)
	{
		if(i>0)
		{
			var patty=Math.floor(Math.random()*(numSystems-1))+1;
			while(stars[patty].civs.length>0)
			{
				patty=Math.floor(Math.random()*(numSystems-1))+1;
			}
			civs[i].star=patty
			stars[civs[i].star].civs.push(civs[i]);
			if(i==civIDs.Vulcan) 
			{
				stars[civs[i].star].x=56000;
				stars[civs[i].star].y=65000;
			}
			if(i==civIDs.Klingon) 
			{
				stars[civs[i].star].x=283900;
				stars[civs[i].star].y=41900;
			}
			if(i==civIDs.Romulan) 
			{
				stars[civs[i].star].x=356300;
				stars[civs[i].star].y=137400;
			}
			if(i==civIDs.Ferengi) 
			{
				stars[civs[i].star].x=246000;
				stars[civs[i].star].y=157200;
			}
			if(i==civIDs.Cardassian) 
			{
				stars[civs[i].star].x=230400;
				stars[civs[i].star].y=169500;
			}
			if(i==civIDs.Bajoran) 
			{
				stars[civs[i].star].x=240400;
				stars[civs[i].star].y=159500;
			}
			if(i==civIDs.Borg) 
			{
				stars[civs[i].star].x=83100;
				stars[civs[i].star].y=576900;
			}if(i==civIDs.Breen) 
			{
				stars[civs[i].star].x=515200;
				stars[civs[i].star].y=137400;
			}if(i==civIDs.Dominion) 
			{
				stars[civs[i].star].x=468300;
				stars[civs[i].star].y=530800;
			}
			if(i==civIDs.Hirogen) 
			{
				stars[civs[i].star].x=52600;
				stars[civs[i].star].y=544000;
			}if(i==civIDs.Andorian) 
			{
				stars[civs[i].star].x=39500;
				stars[civs[i].star].y=120900;
			}if(i==civIDs.Tellarite) 
			{
				stars[civs[i].star].x=51800;
				stars[civs[i].star].y=30400;
			}if(i==civIDs.Telaxian) 
			{
				stars[civs[i].star].x=190900;
				stars[civs[i].star].y=508600;
			}
			if(i==civIDs.Vidiian) 
			{
				stars[civs[i].star].x=107800;
				stars[civs[i].star].y=472400;
			}//todo Pakled Homeworld
		}
	}
	for(var i=1;i<numSystems;i++)
	{
		stars[i].randomizeSystem();
		//monsta.startTextured(1000000,stars[i].x-48,stars[i].y-48,0,0,0,false,false,"sun"+stars[i].type);
	}
	//camera.center(stars[0]);
	camera.x=0-stars[0].x+CANVAS_WIDTH/2;
	camera.y=0-stars[0].y+CANVAS_HEIGHT/2;
	
	for(var i=0;i<civs.length;i++)
	{
		civs[i].knowAllWorlds();
	}
	
}

function killShip(targ,attacker)
{
	targ.civ.deadShips.push(targ);
	if(targ.menu)
	{
		targ.menu.visible=false;
		targ.menu.update();
	}
	if(targ.tractorClient)
	{
		targ.tractorClient.tractorHost=null;
	}
	if(targ.tractorHost)
	{
		targ.tractorHost.tractorClient=null;
	}
	for(var i=0;i<ships.length;i++)
	{
		if (targ==ships[i])
		{
			ships.splice(i,1);
			i--;
			targ.alive=false;
			if(targ.platform)
			{
				console.log("The "+targ.name+" orbiting "+targ.orbitTarg.name+" was destroyed. ");
			}else
			{
				console.log("The "+targ.prefix+ " " +targ.name+" was destroyed. "+ targ.crew.length+ " crew were lost. ");
			}
			if(camera.isNear(targ))
			{
				monsta.explosionTextured(200,targ.x,targ.y,1,"explosion0");
			}
			if(targ==selectedShip)
			{
				camera.unFollow();
				if(civs[playerCiv].ships.length>1)
				{
					civs[playerCiv].cycleShips(camera);
				}else if(ships.length>1)
				{
					curShip++;
					if(curShip>ships.length-1) {
						curShip=0;
					}
					selectedShip=ships[curShip];
					camera.center(selectedShip);
					camera.follow(selectedShip);
				}else
				{
					selectedShip=null;
					//console.log("no more ships exist!");
					camera.follow(civs[playerCiv].homeworld);
				}
				//after delay
				
			}
		}
	}
	if(attacker)
	{
		attacker.grantXp(15);
		attacker.kills++;
		attacker.enterLog("Today we destroyed the "+targ.prefix+" "+targ.name);
	}
	if(selectedShip==targ)
	{
		camera.unFollow();
		civs[playerCiv].cycleShips();
	}
}

function newPlatform(wrld)
{
	var iv=wrld.civ;
	var jilly=new starShip(iv);
	jilly.homeworld=iv.homeworld;
	jilly.x=jilly.homeworld.x;
	jilly.y=jilly.homeworld.y;
	jilly.orbit(wrld);
	jilly.numTorpedos=200;
	jilly.platform=true;
	jilly.ship=false;
	jilly.addPhaser();
	jilly.addPhaser();
	jilly.civID=iv.ID;
	jilly.prefix="";
	//jilly.christen();
	jilly.name="Defense Platform";
	jilly.class="orbitalDefense";
	jilly.sprite=Sprite("platform");
	jilly.maxSpeed=0;
	//jilly.activeShields=true;
	jilly.maxShields=0;
	jilly.shields=0;
	jilly.alive=true;
	jilly.civ=iv;
	return jilly;
}

function newInitShips()
{
	for(var i=0;i<civs.length;i++)
	{
		if(i>0)
		{
			var blah=civs[i].star;
			var gah=Math.floor(Math.random()*stars[blah].numPlanets);
			civs[i].homeworld=stars[blah].planets[gah];
			stars[blah].planets[gah].civID=i;
			stars[blah].planets[gah].civ=civs[i];
			stars[blah].planets[gah].colonized=true;
			civs[i].worlds.push(stars[blah].planets[gah]);
			stars[blah].planets[gah].colonized=true;
			
			if(i==civIDs.Vulcan) 
			{
				stars[blah].planets[gah].name="Vulcan"; 
				stars[blah].planets[gah].civ=civs[civIDs.Vulcan];
				stars[blah].x=56000;
				stars[blah].y=65000;
			}
			if(i==civIDs.Klingon) 
			{
				stars[blah].planets[gah].name="Qo'nos"; 
				stars[blah].planets[gah].civ=civs[civIDs.Klingon];
				stars[blah].x=283900;
				stars[blah].y=41900;
			}
			if(i==civIDs.Romulan) 
			{
				stars[blah].planets[gah].name="Romulus"; 
				stars[blah].planets[gah].civ=civs[civIDs.Romulan];
				stars[blah].x=356300;
				stars[blah].y=137400;
			}
			if(i==civIDs.Ferengi) 
			{
				stars[blah].planets[gah].name="Ferenginar"; 
				stars[blah].planets[gah].civ=civs[civIDs.Ferengi];
				stars[blah].x=246000;
				stars[blah].y=157200;
			}
			if(i==civIDs.Cardassian) 
			{
				stars[blah].planets[gah].name="Cardassia"; 
				stars[blah].planets[gah].civ=civs[civIDs.Cardassian];
				stars[blah].x=230400;
				stars[blah].y=169500;
			}
			if(i==civIDs.Bajoran) 
			{
				stars[blah].planets[gah].name="Bajor"; 
				stars[blah].planets[gah].civ=civs[civIDs.Bajoran];
				stars[blah].x=240400;
				stars[blah].y=159500;
			}
			if(i==civIDs.Borg) 
			{
				stars[blah].planets[gah].name="Borg Homeworld"; 
				stars[blah].planets[gah].civ=civs[civIDs.Borg];
				stars[blah].x=83100;
				stars[blah].y=576900;
			}if(i==civIDs.Breen) 
			{
				stars[blah].planets[gah].name="Breen"; 
				stars[blah].planets[gah].civ=civs[civIDs.Breen];
				stars[blah].x=515200;
				stars[blah].y=137400;
			}if(i==civIDs.Dominion) 
			{
				stars[blah].planets[gah].name="Founder Planet"; 
				stars[blah].planets[gah].civ=civs[civIDs.Dominion];
				stars[blah].x=468300;
				stars[blah].y=530800;
			}
			if(i==civIDs.Hirogen) 
			{
				stars[blah].planets[gah].name="Hiros"; 
				stars[blah].planets[gah].civ=civs[civIDs.Hirogen];
				stars[blah].x=52600;
				stars[blah].y=544000;
			}if(i==civIDs.Andorian) 
			{
				stars[blah].planets[gah].name="Andor"; 
				stars[blah].planets[gah].civ=civs[civIDs.Andorian];
				stars[blah].x=39500;
				stars[blah].y=120900;
			}if(i==civIDs.Tellarite) 
			{
				stars[blah].planets[gah].name="Tellar"; 
				stars[blah].planets[gah].civ=civs[civIDs.Tellarite];
				stars[blah].x=51800;
				stars[blah].y=30400;
			}if(i==civIDs.Telaxian) 
			{
				stars[blah].planets[gah].name="Tellax"; 
				stars[blah].planets[gah].civ=civs[civIDs.Telaxian];
				stars[blah].x=190900;
				stars[blah].y=508600;
			}
		}else
		{
			civs[i].homeworld=stars[0].planets[2];
			stars[0].planets[2].civ=civs[0];
			civs[i].worlds.push(stars[0].planets[2]);
			stars[0].planets[2].colonized=true;
		}
		civs[i].homeworld.hasShipyard=true;
		civs[i].homeworld.buildings.push(new building(Buildings.Shipyard,civs[i].homeworld));
		var james=null;
		for(var j=0;j<civs[i].numShipsStart;j++)
		{
			
				var startworld=civs[i].homeworld;
		
			if(i==civIDs.Human)
			{
				james=new starShip(civs[i]);
				james.class=shipClasses[civIDs.Human][0];
				//james.civ=civs[i];
				james.classify();
				james.homeworld=Earth;
				var bah=Math.floor(Math.random()*7);
				james.orbit(stars[0].planets[bah]);
				james.prefix="U.S.S.";
				james.christen();
				console.log(james.prefix+" "+james.name+" is now orbiting " +stars[0].planets[bah].name);
				james.class.name="Galaxy Class";
				james.civID=0;
							//james.activeShields=true;
				james.installSystem(SystemIDs.Shields);
				james.sprite=Sprite("ship2");
				james.maxSpeed=9;
				//james.activeShields=true;
				james.crusingSpeed=7;
				//james.desiredSpeed=james.cruisingSpeed;
				james.hasShields=true;
				james.maxShields=70;
				james.shields=70;
				james.alive=true;
				james.launchDate=Math.floor(theTime.years)+"."+Math.floor(theTime.days);
				if(j>0)
				{
					james.windows.push(new shipWindow());
					james.windows[0].x=-1;
					james.windows[0].y=8;
					james.windows.push(new shipWindow());
					james.windows[1].x=-2;
					james.windows[1].y=11;
					james.windows.push(new shipWindow());
					james.windows[2].x=2;
					james.windows[2].y=9;
				}
				james.crewVessel();
				james.civ=civs[i];
				civs[i].ships.push(james);
			}else if(i==civIDs.Vulcan)
			{
				james=new starShip(civs[i]);
				james.class=shipClasses[civIDs.Vulcan][0];
				james.civ=civs[i];
				james.classify();
				james.homeworld=civs[i].homeworld;
				james.x=james.homeworld.sun.x;
				james.y=james.homeworld.sun.y;
				james.desiredHeading=Math.floor(Math.random()*359);
				james.prefix="Vulcan";
				james.class.name="Capitol Ship";
				james.civID=1;
				james.christen();
				james.sprite=Sprite("ship5");
				james.maxSpeed=7;
				//james.speed=3;
				james.x=startworld.x;
				james.y=startworld.y;
				james.orbit(startworld);
				james.cruisingSpeed=4;
				////james.desiredSpeed=james.cruisingSpeed;
				james.civ=civs[civIDs.Vulcan];
				james.crewVessel();
				
				james.alive=true;
				james.launchDate=Math.floor(theTime.years)+"."+Math.floor(theTime.days);
				civs[i].ships.push(james);
			}else if(i==civIDs.Klingon)
			{
				james=new starShip(civs[i]);
				james.class=shipClasses[civIDs.Klingon][0];
				james.civ=civs[i];
				james.classify();
				if(Math.random()*20<5)
				{
					var blah=Math.floor(Math.random()*(numSystems-1))+1;
					var gah=Math.floor(Math.random()*stars[blah].numPlanets);
					james.homeworld=civs[i].homeworld;
					james.x=james.homeworld.x;
					james.y=james.homeworld.y;
					james.orbit(james.homeworld);
					james.desiredHeading=Math.floor(Math.random()*359);
					
					if(!civs[i].worlds.colonized)
					{
						james.orbit(stars[blah].planets[gah]);
						civs[i].worlds.push(stars[blah].planets[gah]);
						stars[blah].planets[gah].civ=civs[i];
					}
					james.civID=5;
					james.civ=civs[civIDs.Klingon];
					james.homeworld=civs[i].homeworld;
					james.class.name="Bird of Prey";
					james.prefix="I.K.S";
					james.christen();
					//james.homeworld=civs[i].homeworld;
					//console.log(james.prefix+ " "+james.name+" is now orbiting " +stars[blah].planets[gah].name);
					james.sprite=Sprite("ship4");
					james.addPhaser();
					//james.homing=false;
					james.maxSpeed=7;
					james.cruisingSpeed=6;
					//james.desiredSpeed=james.cruisingSpeed;
					james.crewVessel();

					james.alive=true;
					james.launchDate=Math.floor(theTime.years)+"."+Math.floor(theTime.days);
					civs[i].ships.push(james);
					
				}else
				{
					james.homeworld=civs[i].homeworld;
					james.x=james.homeworld.x;
					james.y=james.homeworld.y;
					james.desiredHeading=Math.floor(Math.random()*359);
				
					james.class.name="Bird of Prey";
					james.prefix="I.K.S";
					james.sprite=Sprite("ship4");
					james.civ=civs[civIDs.Klingon];
					james.civID=5;
					james.christen();
					james.maxSpeed=7;
					james.addPhaser();
					//james.homing=false;
					//james.speed=6;
					james.x=startworld.x;
					james.y=startworld.y;
					james.orbit(startworld);
					james.cruisingSpeed=6;
					//james.desiredSpeed=james.cruisingSpeed;
					james.crewVessel();
					james.alive=true;
					james.launchDate=Math.floor(theTime.years)+"."+Math.floor(theTime.days);
					civs[i].ships.push(james);
				}
			}else if(i==civIDs.Dominion)
			{
				james=new starShip(civs[i]);
				james.class=shipClasses[civIDs.Dominion][0];
				james.civ=civs[i];
				james.classify();
				if(false)//Math.random()*20<5)
				{
					var blah=Math.floor(Math.random()*(numSystems-1))+1;
					var gah=Math.floor(Math.random()*stars[blah].numPlanets);
					james.homeworld=civs[i].homeworld;
					james.x=james.homeworld.x;
					james.y=james.homeworld.y;
					james.desiredHeading=Math.floor(Math.random()*359);
					if(!civs[i].worlds.colonized)
					{
						james.orbit(stars[blah].planets[gah]);
						civs[i].worlds.push(stars[blah].planets[gah]);
						stars[blah].planets[gah].civ=civs[i];
					}
					james.civID=civIDs.Dominion;
					james.civ=civs[civIDs.Dominion];
				
					james.class.name="Dominion Battle Cruiser";
					james.prefix="Dominion";
					james.christen();
					//james.homeworld=civs[i].homeworld;
					//console.log(james.prefix+ " "+james.name+" is now orbiting " +stars[blah].planets[gah].name);
					james.sprite=Sprite("ship9");
					james.addPhaser();
					//james.homing=false;
					james.maxSpeed=7;
					james.x=startworld.x;
					james.y=startworld.y;
					james.orbit(startworld);
					james.cruisingSpeed=6;
					//james.desiredSpeed=james.cruisingSpeed;
					james.crewVessel();

					james.alive=true;
					james.launchDate=Math.floor(theTime.years)+"."+Math.floor(theTime.days);
					civs[i].ships.push(james);
					
				}else
				{
					james.homeworld=civs[i].homeworld;
					james.x=james.homeworld.x;
					james.y=james.homeworld.y;
					james.desiredHeading=Math.floor(Math.random()*359);
					
					james.class.name="Dominion Battle Cruiser";
					james.prefix="Dominion";
					james.sprite=Sprite("ship9");
					james.civ=civs[civIDs.Dominion];
					james.civID=civIDs.Dominion;
					james.christen();
					james.maxSpeed=7;
					james.addPhaser();
					//james.homing=false;
					//james.speed=6;
					james.x=startworld.x;
					james.y=startworld.y;
					james.orbit(startworld);
					james.cruisingSpeed=6;
					//james.desiredSpeed=james.cruisingSpeed;
					james.crewVessel();
					james.alive=true;
					james.launchDate=Math.floor(theTime.years)+"."+Math.floor(theTime.days);
					civs[i].ships.push(james);
				}
			}else if(i==civIDs.Cardassian)
			{
				james=new starShip(civs[i]);
				james.class=shipClasses[civIDs.Cardassian][0];
				james.civ=civs[i];
				james.classify();
				if(Math.random()*20<5)
				{
					var blah=Math.floor(Math.random()*(numSystems-1))+1;
					var gah=Math.floor(Math.random()*stars[blah].numPlanets);
					james.homeworld=civs[i].homeworld;
					james.x=james.homeworld.x;
					james.y=james.homeworld.y;
					james.desiredHeading=Math.floor(Math.random()*359);
					
					if(!civs[i].worlds.colonized)
					{
						james.orbit(stars[blah].planets[gah]);
						civs[i].worlds.push(stars[blah].planets[gah]);
						stars[blah].planets[gah].civ=civs[i];
					}
					james.civID=civIDs.Cardassian;
					james.civ=civs[i];
					james.class.name="Galor-Class";
					james.prefix="C.U.";
					james.christen();
					//james.homeworld=iv.homeworld;
					//console.log(james.prefix+ " "+james.name+" is now orbiting " +stars[blah].planets[gah].name);
					james.sprite=Sprite("ship8");
					james.addPhaser();
					//james.homing=false;
					james.maxSpeed=7;
					james.cruisingSpeed=6;
					james.x=startworld.x;
					james.y=startworld.y;
					james.orbit(startworld);
					//james.desiredSpeed=james.cruisingSpeed;
					james.crewVessel();
					james.launchDate=Math.floor(theTime.years)+"."+Math.floor(theTime.days);
					james.alive=true;
					civs[i].ships.push(james);
					
				}else
				{
					james.homeworld=civs[i].homeworld;
					james.x=james.homeworld.x;
					james.y=james.homeworld.y;
					james.desiredHeading=Math.floor(Math.random()*359);
				
					james.class.name="Galor-Class";
					james.prefix="C.U.";
					james.sprite=Sprite("ship8");
					james.civ=civs[i];
					james.civID=civIDs.Cardassian;
					james.christen();
					james.maxSpeed=7;
					james.addPhaser();
					james.x=startworld.x;
					james.y=startworld.y;
					james.orbit(startworld);
					//james.homing=false;
					james.speed=6;
					james.cruisingSpeed=6;
					//james.desiredSpeed=james.cruisingSpeed;
					james.crewVessel();
					james.alive=true;
					james.launchDate=Math.floor(theTime.years)+"."+Math.floor(theTime.days);
					civs[i].ships.push(james);
				}
		}else if(i==civIDs.Romulan)
			{
				james=new starShip(civs[i]);
				james.class=shipClasses[civIDs.Romulan][0];
				james.civ=civs[i];
				james.classify();
				james.homeworld=civs[i].homeworld;
				james.x=james.homeworld.x;
				james.y=james.homeworld.y;
				james.desiredHeading=Math.floor(Math.random()*359);
				
				james.prefix="IRW";
				james.class.name="Warbird";
				james.civID=4;
				james.christen();
				james.sprite=Sprite("ship6");
				james.maxSpeed=7;
				//james.speed=3;
				james.cruisingSpeed=5;
				james.x=startworld.x;
				james.y=startworld.y;
				james.orbit(startworld);
				//james.desiredSpeed=james.cruisingSpeed;
				james.civ=civs[civIDs.Romulan];
				
				james.crewVessel();
				james.civ=civs[i];
				james.alive=true;
				james.launchDate=Math.floor(theTime.years)+"."+Math.floor(theTime.days);
				civs[i].ships.push(james);
			}else if(i==civIDs.Andorian)
			{
				james=new starShip(civs[i]);
				james.civ=civs[i];
				james.class=shipClasses[civIDs.Andorian][0];
				james.classify();
				james.homeworld=civs[i].homeworld;
				james.x=james.homeworld.x;
				james.y=james.homeworld.y;
				james.desiredHeading=Math.floor(Math.random()*359);
				
				james.prefix="I.G.";
				james.class.name="Andorian";
				james.civID=civIDs.Andorian;
				james.christen();
				james.sprite=Sprite("ship15");
				james.maxSpeed=7;
				//james.speed=3;
				james.x=startworld.x;
				james.y=startworld.y;
				james.orbit(startworld);
				james.cruisingSpeed=5;
				//james.desiredSpeed=james.cruisingSpeed;
				james.civ=civs[civIDs.Andorian];
				
				james.crewVessel();
				james.civ=civs[i];
				james.alive=true;
				james.launchDate=Math.floor(theTime.years)+"."+Math.floor(theTime.days);
				civs[i].ships.push(james);
			}else if(i==civIDs.Tellarite)
			{
				james=new starShip(civs[i]);
				james.civ=civs[i];
				james.class=shipClasses[civIDs.Tellarite][0];
				james.classify();
				james.homeworld=civs[i].homeworld;
				james.x=james.homeworld.x;
				james.y=james.homeworld.y;
				james.desiredHeading=Math.floor(Math.random()*359);
				
				james.prefix="Tellarite";
				james.class.name="Tellarite";
				james.civID=civIDs.Tellarite;
				james.christen();
				james.sprite=Sprite("ship16");
				james.maxSpeed=7;
				//james.speed=3;
				james.x=startworld.x;
				james.y=startworld.y;
				james.orbit(startworld);
				james.cruisingSpeed=5;
				//james.desiredSpeed=james.cruisingSpeed;
				james.civ=civs[civIDs.Tellarite];
				james.launchDate=Math.floor(theTime.years)+"."+Math.floor(theTime.days);
				james.crewVessel();
				james.civ=civs[i];
				james.alive=true;
				civs[i].ships.push(james);
			}else if(i==civIDs.Breen)
			{
				james=new starShip(civs[i]);
				james.civ=civs[i];
				james.class=shipClasses[civIDs.Breen][0];
				james.classify();
				james.homeworld=civs[i].homeworld;
				james.x=james.homeworld.x;
				james.y=james.homeworld.y;
				james.desiredHeading=Math.floor(Math.random()*359);
				james.x=startworld.x;
				james.y=startworld.y;
				james.orbit(startworld);
				james.prefix="B.C.W";
				james.class.name="Breen Warship";
				james.civID=civIDs.Breen;
				james.christen();
				james.sprite=Sprite("ship14");
				james.maxSpeed=7;
				//james.speed=3;
				james.cruisingSpeed=5;
				//james.desiredSpeed=james.cruisingSpeed;
				james.civ=civs[civIDs.Breen];
				james.launchDate=Math.floor(theTime.years)+"."+Math.floor(theTime.days);
				james.crewVessel();
				james.civ=civs[i];
				james.alive=true;
				civs[i].ships.push(james);
			}else if(i==civIDs.Telaxian)
			{
				james=new starShip(civs[i]);
				james.civ=civs[i];
				james.class=shipClasses[civIDs.Telaxian][0];
				james.classify();
				james.homeworld=civs[i].homeworld;
				james.x=james.homeworld.x;
				james.y=james.homeworld.y;
				james.desiredHeading=Math.floor(Math.random()*359);
				
				james.prefix="Telaxian";
				james.class.name="Telaxian";
				james.civID=civIDs.Telaxian;
				james.christen();
				james.sprite=Sprite("ship12");
				james.maxSpeed=7;
				//james.speed=3;
				james.x=startworld.x;
				james.y=startworld.y;
				james.orbit(startworld);
				james.cruisingSpeed=5;
				//james.desiredSpeed=james.cruisingSpeed;
				james.civ=civs[civIDs.Telaxian];
				james.launchDate=Math.floor(theTime.years)+"."+Math.floor(theTime.days);
				james.crewVessel();
				james.civ=civs[i];
				james.alive=true;
				civs[i].ships.push(james);
			}else if(i==civIDs.Vidiian)
			{
				james=new starShip(civs[i]);
				james.civ=civs[i];
				james.class=shipClasses[civIDs.Vidiian][0];
				james.classify();
				james.homeworld=civs[i].homeworld;
				james.x=james.homeworld.x;
				james.y=james.homeworld.y;
				james.desiredHeading=Math.floor(Math.random()*359);
				
				james.prefix="Vidiian";
				james.class.name="Vidiian Cruiser";
				james.civID=civIDs.Vidiian;
				james.christen();
				james.sprite=Sprite("ship13");
				james.maxSpeed=7;
				//james.speed=3;
				james.x=startworld.x;
				james.y=startworld.y;
				james.orbit(startworld);
				james.cruisingSpeed=5;
				//james.desiredSpeed=james.cruisingSpeed;
				james.civ=civs[civIDs.Vidiian];
				james.launchDate=Math.floor(theTime.years)+"."+Math.floor(theTime.days);
				james.crewVessel();
				james.civ=civs[i];
				james.alive=true;
				civs[i].ships.push(james);
			}else if(i==civIDs.Pakled)
			{
				james=new starShip(civs[i]);
				james.civ=civs[i];
				james.class=shipClasses[civIDs.Pakled][0];
				james.classify();
				james.homeworld=civs[i].homeworld;
				james.x=james.homeworld.x;
				james.y=james.homeworld.y;
				james.desiredHeading=Math.floor(Math.random()*359);
				
				james.prefix="Pakled";
				james.class.name="Pakled Cruiser";
				james.civID=civIDs.Pakled;
				james.christen();
				james.sprite=Sprite("ship17");
				james.maxSpeed=7;
				//james.speed=3;
				james.x=startworld.x;
				james.y=startworld.y;
				james.orbit(startworld);
				james.cruisingSpeed=5;
				//james.desiredSpeed=james.cruisingSpeed;
				james.civ=civs[civIDs.Pakled];
				james.launchDate=Math.floor(theTime.years)+"."+Math.floor(theTime.days);
				james.civ=civs[i];
				james.crewVessel();
				
				james.alive=true;
				civs[i].ships.push(james);
			}else if(i==civIDs.Hirogen)
			{
				james=new starShip(civs[i]);
				james.civ=civs[i];
				james.class=shipClasses[civIDs.Hirogen][0];
				james.classify();
				james.homeworld=civs[i].homeworld;
				james.x=james.homeworld.x;
				james.y=james.homeworld.y;
				james.desiredHeading=Math.floor(Math.random()*359);
				james.prefix="Hunter";
				james.class.name="Hunter";
				james.civID=civIDs.Hirogen;
				james.christen();
				james.sprite=Sprite("ship10");
				james.maxSpeed=7;
				//james.speed=3;
				james.x=startworld.x;
				james.y=startworld.y;
				james.orbit(startworld);
				james.cruisingSpeed=5;
				//james.desiredSpeed=james.cruisingSpeed;
				james.civ=civs[civIDs.Hirogen];
				james.launchDate=Math.floor(theTime.years)+"."+Math.floor(theTime.days);
				james.crewVessel();
				james.civ=civs[i];
				james.alive=true;
				civs[i].ships.push(james);
			}else if(i==civIDs.Bajoran)
			{
				james=new starShip(civs[i]);
				james.civ=civs[i];
				james.class=shipClasses[civIDs.Bajoran][0];
				james.classify();
				james.homeworld=civs[i].homeworld;
				james.x=james.homeworld.x;
				james.y=james.homeworld.y;
				james.desiredHeading=Math.floor(Math.random()*359);
				james.prefix="Bajoran";
				james.class.name="Bajoran Cruiser";
				james.civID=civIDs.Bajoran;
				james.christen();
				james.sprite=Sprite("ship11");
				james.maxSpeed=7;
				//james.speed=3;
				james.x=startworld.x;
				james.y=startworld.y;
				james.orbit(startworld);
				james.cruisingSpeed=5;
				//james.desiredSpeed=james.cruisingSpeed;
				james.civ=civs[civIDs.Bajoran];
				james.launchDate=Math.floor(theTime.years)+"."+Math.floor(theTime.days);
				james.crewVessel();
				james.civ=civs[i];
				james.alive=true;
				civs[i].ships.push(james);
			}else if(i==civIDs.Ferengi)
			{
				james=new starShip(civs[i]);
				james.civ=civs[i];
				james.class=shipClasses[civIDs.Ferengi][0];
				james.classify();
				james.homeworld=civs[i].homeworld;
				james.x=james.homeworld.x;
				james.y=james.homeworld.y;
				james.desiredHeading=Math.floor(Math.random()*359);
				james.prefix="FAS";
				james.class.name="Merchant";
				james.civID=civIDs.Ferengi;
				james.christen();
				james.sprite=Sprite("ship7");
				james.maxSpeed=7;
				//james.speed=3;
				james.x=startworld.x;
				james.y=startworld.y;
				james.orbit(startworld);
				james.cruisingSpeed=5;
				//james.desiredSpeed=james.cruisingSpeed;
				james.civ=civs[civIDs.Ferengi];
				james.launchDate=Math.floor(theTime.years)+"."+Math.floor(theTime.days);
				james.crewVessel();
				james.civ=civs[i];
				james.alive=true;
				civs[i].ships.push(james);
			}else if(i==civIDs.Orion)
			{
				james=new starShip(civs[i]);
				james.civ=civs[i];
				james.class=shipClasses[civIDs.Orion][0];
				james.classify();
				james.homeworld=civs[i].homeworld;
				james.x=james.homeworld.x;
				james.y=james.homeworld.y;
				james.desiredHeading=Math.floor(Math.random()*359);
				james.prefix="Pirate";
				james.class.name="Cruiser";
				james.civID=civIDs.Orion;
				james.christen();
				james.sprite=Sprite("ship18");
				james.maxSpeed=7;
				//james.speed=3;
				james.x=startworld.x;
				james.y=startworld.y;
				james.orbit(startworld);
				james.cruisingSpeed=5;
				//james.desiredSpeed=james.cruisingSpeed;
				james.civ=civs[civIDs.Orion];
				james.launchDate=Math.floor(theTime.years)+"."+Math.floor(theTime.days);
				james.crewVessel();
				james.civ=civs[i];
				james.alive=true;
				civs[i].ships.push(james);
			}else if(i==civIDs.Borg)
			{
				james=new starShip(civs[i]);
				james.civ=civs[i];
				james.civ=civs[i];
				james.class=shipClasses[civIDs.Borg][0];
				james.classify();
				james.homeworld=civs[i].homeworld;
				james.x=Math.random()*universeWidth;
				james.y=universeHeight;//todo
				james.desiredHeading=Math.floor(Math.random()*359);
				james.prefix="Borg ";
				james.civID=9;
				james.civ=civs[civIDs.Borg];
							//james.activeShields=true;
				james.installSystem(SystemIDs.Shields);
				james.systems[SystemIDs.Shields].on=true;
				james.christen();
				james.hp=1000;
				james.maxHp=1000;
				//james.activeShields=true;
				james.hasShields=true;
				james.maxShields=100;
				james.shields=100;
				james.oxygen=10000;
				james.class.name="Cube";
				james.sprite=Sprite("ship3");
				james.maxSpeed=10;
				james.cruisingSpeed=5;
				//james.desiredSpeed=james.cruisingSpeed;
				//james.adjustHeading(270);
				james.speed=5;
				james.autoFireRate=20;
				james.addPhaser();
				james.planetTarget=Earth;//civs[borgTrack].homeworld;
				james.orderOrbit(james.planetTarget);
				james.crewVessel();
				james.civ=civs[i];
				james.alive=true;
				james.launchDate=Math.floor(theTime.years)+"."+Math.floor(theTime.days);
				civs[i].ships.push(james);
				Cube=james;
			}
		}
	}
	
	
	if(playerCiv==0)
	{
	//hack
	civs[playerCiv].ships[0].width=16;
	civs[playerCiv].ships[0].height=16;
	civs[playerCiv].ships[0].numTorpedos=10;
	civs[playerCiv].ships[0].shieldSprite=Sprite("shields");
	civs[playerCiv].ships[0].class=shuttlecraft;
	civs[playerCiv].ships[0].unInstallSystem(SystemIDs.Shields);
	civs[playerCiv].ships[0].shields=0;
	civs[playerCiv].ships[0].sprite=Sprite("ship1");
	civs[playerCiv].ships[0].maxSpeed=7;
	civs[playerCiv].ships[0].maxShields=0;
	}

	ships=[];
	for(var i=0;i<civs.length;i++)
	{
		//ships.concat(civs[i].ships);
		for(var j=0;j<civs[i].ships.length;j++)
		{
			
			ships.push(civs[i].ships[j]);
		}
	}
	selectedShip=civs[playerCiv].ships[0];
	var kirk=new dude();
	var picard=new dude();
	var sisko=new dude();
	var janeway=new dude();
	kirk.name="Kirk";
	picard.name="Picard";
	sisko.name="Sisko";
	janeway.name="Janeway";
	
	kirk.civ=civs[playerCiv];
	picard.civ=civs[playerCiv];
	sisko.civ=civs[playerCiv];
	janeway.civ=civs[playerCiv];
	
	kirk.title="Commander";
	picard.title="Commander";
	sisko.title="Commander";
	janeway.title="Comander";
	
	kirk.rank=4;
	picard.rank=4;
	sisko.rank=4;
	janeway.rank=4;
	civs[playerCiv].crewPool.push(kirk);
	civs[playerCiv].captainQueue.push(kirk);
	civs[playerCiv].crewPool.push(picard);
	civs[playerCiv].captainQueue.push(picard);
	civs[playerCiv].crewPool.push(sisko);
	civs[playerCiv].captainQueue.push(sisko);	
	//civs[playerCiv].crewPool.push(janeway);
	//civs[playerCiv].captainQueue.push(janeway);
}
function drawStarfield(canv,cam){
	if(spinArt) {return;}
	//fill
	canv.fillStyle="#00001E";
	canvas.fillRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT);
	canv.fillStyle="#FFFFB2";//"#FFFF00";
	//return;
	starsDrawn=0;
	for(var i=0;i<numStars;i++)
	{
		if(((backStarsX[i]+cam.x)*camera.zoom>0) && ((backStarsX[i]+cam.x)*camera.zoom<CANVAS_WIDTH)&& ((backStarsY[i]+cam.y)*camera.zoom>0) && ((backStarsY[i]+cam.y)*camera.zoom<CANVAS_HEIGHT))
		//if((backStarsX[i]>cam.x) &&(backStarsX[i]<cam.x+CANVAS_WIDTH) && (backStarsY[i]>cam.y) && (backStarsY[i]<cam.y+CANVAS_HEIGHT))
		{
			starsDrawn++;
			//console.log("yar");
			var s=0;
			if(flicker) {
				if((Math.random()*2000)<twinkRate){
					s=Math.random()*2;
				}
			}
			canv.fillRect((backStarsX[i]+cam.x)*camera.zoom, (backStarsY[i]+cam.y)*camera.zoom, backStarsS[i]+s, backStarsS[i]+s);
			//canv.fillRect((backStarsX[i]+cam.x), (backStarsY[i]+cam.y), backStarsS[i]+s, backStarsS[i]+s);
		}
	}
}

function newDrawStarfield(canv,cam){
	if(spinArt) {return;}
	//fill
	canv.fillStyle="#00001E";
	canvas.fillRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT);
	canv.fillStyle="#FFFFB2";//"#FFFF00";
	//return;
	starsDrawn=0;
	/*for(var i=0;i<starQuads.length;i++)
	{
*/	
		//var i=getStarQuad(selectedShip);
		var nurple=shittyGetVisibleQuads(cam);
	//	console.log(nurple.length);
		for(var i=0;i<nurple.length;i++)
		{
		for(var j=0;j<nurple[i].stars.length;j++)
		{
			if(((nurple[i].stars[j].x+cam.x)*camera.zoom>0) && ((nurple[i].stars[j].x+cam.x)*camera.zoom<CANVAS_WIDTH)&& ((nurple[i].stars[j].y+cam.y)*camera.zoom>0) && ((nurple[i].stars[j].y+cam.y)*camera.zoom<CANVAS_HEIGHT))
			//if((starQuads[i].stars[j].x>cam.x) &&(starQuads[i].stars[j].x<cam.x+CANVAS_WIDTH) && (starQuads[i].stars[j].y>cam.y) && (starQuads[i].stars[j].y<cam.y+CANVAS_HEIGHT))
			{
				starsDrawn++;
				//console.log("yar");
				var s=0;
				if(flicker) {
					if((Math.random()*2000)<twinkRate){
						s=Math.random()*2;
					}
				}
				/*if(i>14)
				{
					canv.fillStyle="green";
				}else if(i>13)
				{
					canv.fillStyle="blue";
				}else if(i>12)
				{
					canv.fillStyle="red";
				}else if(i==3)
				{
					canv.fillStyle="yellow";
				}else if(i==2)
				{
					canv.fillStyle="brown";
				}else if(i==1)
				{
					canv.fillStyle="purple";
				}else*/
				{
					canv.fillStyle="white";
				}
					canv.fillRect((nurple[i].stars[j].x+cam.x)*camera.zoom, (nurple[i].stars[j].y+cam.y)*camera.zoom, nurple[i].stars[j].size+s, nurple[i].stars[j].size+s);
				//canv.fillRect((backStarsX[i]+cam.x), (backStarsY[i]+cam.y), starQuads[i].stars[j].size+s, starQuads[i].stars[j].size+s);
			}
		}
	}
}