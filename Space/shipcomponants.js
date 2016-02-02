/*var oshipNames=new Array(40);
oshipNames= ["Enterprise","Hood","Voyager","Defiant","Intrepid","Akira","Excalibur","Lexington","Ohio","Rhode Island","Raven","Gandhi","Exter","Horatio","Yamaguchi","Valdemar","Summit","Dakota","Devore","Drake","Hermes","Agamemnon","Apollo","Ajax","Prokofiev","Constellation","Gettysburg","Magellen","Hathaway", "Stargazer", "Constitution", "Yorktown","Potemkin","Pegasus","Farragut","Valiant","Kelvin","Bozeman"];*/

var shipNames=new Array(40);
var shipNamesTrack=new Array(40);
/*for (var q=0;q<18;q++)
{
	shipNames[q]=["one","two","three","four","five","six","seven","eight","nine","ten","eleven","twelve","thirteen","fourteen","fifteen","sixteen","seventeen","Testicles","18","19","20","21","22","23","24","25","26","27","28","29","30","31","32","33","34","35","36","37","38","39","40","41","42","43","44","45","46","47","48","49","50","51","52","53","54","55","56","57","58","59","60","61","62","63","64","65","66","67","68","69","70","71","72","73","74","75","76","77","78","79","80","81","82","83","84","85","86","87","88","89"];
	shipNamesTrack[q]=0;
}*/
for (var q=0;q<18;q++)
{
	shipNames[q]=[];
}

var niblam="Rio Grand";
if(!clean)
{
	niblam="Goatfucker"; //I'm not sure why I went though that trouble to save the USS Goatfucker.
}
shipNames[0]=["Enterprise","Hood","Voyager","Defiant","Intrepid","Akira","Excalibur","Lexington","Ohio","Rhode Island","Raven","Gandhi","Exter","Horatio","Yamaguchi","Summit","Dakota","Snook","Jucovy","Balls","Potemkin",niblam,"Obama","Bastile"];
shipNames[1]=["D'Kyr","D'Vahl","Tal'Kir","Ti'Mur","T'Pau","T'Vran","Ni'Var","Nyran","Seleya","Sh'Raan","Vaankara","Vahklas","Yarahla"];
shipNames[4]=["Belak","D'Ridthau","Decius","Devoras","Dividices","Genorex","Haakona","Khazara","Makar"];
shipNames[5]=["Amar","B'Moth","Bortas","Ch'Tang","Fek'lhr","Gr'oth","Hegh'ta","Hor'Cha","Rotarran","Par'tok","Ya'Vang",];
shipNames[8]=["Aldara","Barkano","Bok'Nor","Groumall","Koranak","Kornaire","Kraxon","Prakesh","Rabol","Ravinok","Reklar","Trager","Vetar"];

for (var q=0;q<18;q++)
{
	var po=1;
	while(shipNames[q].length<2999)
	{
		shipNames[q].push(po);
		po++;
	}
		
}

var escapes=[];
var mines=[];
var torpedos=[];
var looseCrew=[]; //crew stranded on a planet or in the mirror universe

var targetSprite=Sprite("shiptargetedbig");

var tractorTargetSprite=Sprite("tractortargetedbig");

var beamTargetSprite=Sprite("beamtargetedbig");

SystemIDs={};
SystemIDs.LifeSupport=1;
SystemIDs.DamageControl=10;
SystemIDs.Shields=2;
SystemIDs.Medical=3;
SystemIDs.Weapons=4;
SystemIDs.Targeting=5;
SystemIDs.Scanners=6;
SystemIDs.AuxPower=17;//?
SystemIDs.Engines=8;
SystemIDs.Communication=9;
SystemIDs.MainPower=0;//?
SystemIDs.ComputerCore=11; //the computer! 
SystemIDs.ScienceLab=12;
SystemIDs.CargoBay=13;
SystemIDs.Cloak=14;
SystemIDs.ShuttleBay=15;
SystemIDs.Transporter=16;
SystemIDs.Navigation=7;
SystemIDs.Holodeck=18;
SystemIDs.EscapePods=19;
SystemIDs.Tractor=20;
//2 eggrolls chicken fried rice

var NumSystems=21;



function shipSystem(hip,t)
{
	this.name="Billy.";
	this.installed=false;
	this.ship=hip;
	this.type=t;
	if(t==SystemIDs.MainPower) {this.name="Main Power";}
	if(t==SystemIDs.DamageControl) {this.name="Dmg. Control";}
	if(t==SystemIDs.Shields) {this.name="Shields";}
	if(t==SystemIDs.Medical) {this.name="Medical Bay";}
	if(t==SystemIDs.Weapons) {this.name="Weapons";}
	if(t==SystemIDs.Targeting) {this.name="Targeting";}
	if(t==SystemIDs.Scanners) {this.name="Scanners";}
	if(t==SystemIDs.Navigation) {this.name="Navigation";}
	if(t==SystemIDs.Engines) {this.name="Engines";}
	if(t==SystemIDs.Communication) {this.name="Communication";}
	if(t==SystemIDs.LifeSupport) {this.name="Life Support";}
	if(t==SystemIDs.ComputerCore) {this.name="Computer";}
	if(t==SystemIDs.ScienceLab) {this.name="Science";}
	if(t==SystemIDs.CargoBay) {this.name="Cargo Bay";}
	if(t==SystemIDs.Cloak) {this.name="Cloak";}
	if(t==SystemIDs.ShuttleBay) {this.name="Shuttle Bay";}
	if(t==SystemIDs.Transporter) {this.name="Transporter";}
	if(t==SystemIDs.AuxPower) {this.name="Aux Power";}
	if(t==SystemIDs.Holodeck) {this.name="Holodeck";}
	if(t==SystemIDs.EscapePods) {this.name="Escape Pods";}
	if(t==SystemIDs.Tractor) {this.name="Tractor Beam";}
	if(t==21) {this.name="";}
	this.alive=true;
	this.active=false;
	this.on=false;//this is the player disabling things
	this.installed=false;
	this.learningCurve=1; //eventually.
	this.boobyTrapped=false;//eventually.
	this.overloadChance=0;//eventually.
	this.hp=this.maxHp=100;
	this.repairTime=0;
	this.hitChange=10;
	this.manned=null;
	this.power=0;
	this.val=0; //when this was one it was getting reset to one each frame...
	this.minPower=1;
	this.maxPower=0; //"Thanks, I got it off a hair dryer."
	this.turnOff=function(alert)
	{
		if(!this.on){return;}
		if(this.type==SystemIDs.MainPower)
		{
			this.on=false;
			//this.power=0;
			this.ship.maxPower-=this.val;
			this.ship.power-=this.val;
			this.ship.checkSystemPower();
			//return;
		}
		this.ship.powerDown(this);
		this.on=false;
		this.active=false;
		if(alert)
		{
			console.log(this.ship.name+"'s "+this.name+" turned off");
		}
	};
	this.turnOn=function(alert)
	{
		

		if(this.on) {return;}
		if(this.type==SystemIDs.MainPower)
		{
			this.active=true;
			this.on=true;
			this.ship.maxPower+=this.val;
			this.ship.power+=this.val;
			return true;
		}
		if(this.ship.routePower(this))
		{
			this.active=true;
			this.on=true;
			/*if((this.ship.civ)&&(this.ship.civ==civs[playerCiv])){
				console.log("turning on "+this.ship.name+"s "+this.name);
			}*/
			return true;
		}else
		{
			if((this.ship.civ)&&(this.ship.civ==civs[playerCiv])){
				console.log("Not enough power for "+this.ship.name+"s "+this.name);
			}
			//console.log("Not enough power!");
			return false;
		}
	};
	this.disable=function(alert)
	{
		this.power=0;
		this.active=false;
		if(alert)
		{
			console.log(this.ship.name+"'s "+this.name+" disabled.");
		}
	};
	this.takeHit=function(dmg)
	{
		this.hp-=dmg;
		if(this.hp<1)
		{
			this.hp=0;
			this.alive=false;
			this.disable();
		}
		
	};
	
	this.functional=function(manned)
	{
		if(this.type==SystemIDs.MainPower)
		{
			//return true;//todo
			if((this.power>this.minPower-1) && (this.installed)&& (this.alive) && (this.on))
			{
				return true;
			}else
			{
				return false;
			}
		}else
		{
			
			if((this.power>this.minPower-1) && (this.on)&& (this.installed)&& (this.alive))//&& (this.active))
			{
				if(manned)
				{
					if(this.manned!==null)
					{
						return true;
					}else
					{
						return false;
					}
				}else
				{
					return true;
				}
			}
				return false;
		}
	
	};
	var leela=false;
	this.update=function()
	{
		if((this.type==SystemIDs.MainPower) && (!this.functional())&&(true))
		{
			/*if(!leela)
			{
				console.log(this.alive,this.power,this.installed,this.on); //true true 0 false.
				leela=true;
			}*/
			if(!this.ship.systems[SystemIDs.AuxPower].functional())
			{
				this.ship.maxPower=0;
			}else
			{
				this.ship.maxPower=this.ship.systems[SystemIDs.AuxPower].val;
			}
			
			var elaine=this.ship.maxPower;
			for(var i=1;i<this.ship.systems.length;i++)
			{
				if(true)//(elaine<this.ship.systems[i].power)
				{
					this.ship.powerDown(this.ship.systems[i]);
				}
			}
			this.ship.power=elaine;
		}
		if(!this.functional()) {return;}
		//switch case for all passive effects.
		if(this.type==SystemIDs.LifeSupport)
		{
			if(this.ship.oxygen<1000)
			{
				this.ship.oxygen+=this.ship.lifeSupportRate*gameSpeed;
				if(this.ship.oxygen>1000)
				{
					this.ship.oxygen=1000;
				}
			}
		}if(this.type==SystemIDs.MainPower)
		{
			this.ship.maxPower=this.val;
			//console.log(this.val);
			var elaine=this.ship.maxPower;
			for(var i=0;i<this.ship.systems.length;i++)
			{
				elaine-=this.ship.systems[i].power;
			}
			this.ship.power=elaine;
		}else if(this.type==SystemIDs.DamageControl)
		{
			var fixrate=this.ship.getRepairRate();
			if(this.ship.breaches>0)//repairs!
			{
				this.ship.fixCount+=fixrate*gameSpeed;
				if(this.ship.fixCount>100)
				{
					this.ship.fixCount=0;
					if(this.ship.breaches>0)
					{
						this.ship.breaches--;
					}
				}
			}else if((this.ship.hp<this.ship.maxHp)&&(!this.ship.torpedoTarget))//repair hull
			{
				this.ship.fixCount+=fixrate*gameSpeed;
				if(this.ship.fixCount>1000)
				{
					this.ship.hp++;
					this.ship.fixCount=0;
				}
			}
		}else if(this.type==SystemIDs.MedicalBay)
		{
			var healrate=this.ship.getRepairRate(); //todo
			this.ship.healCount+=healrate*gameSpeed;
			if(this.ship.healCount>1000)
			{
				for(var i=0;i<this.ship.crew.length;i++)
				{
					if(this.ship.crew[i].hp<this.ship.crew[i].maxHp)
					{
						this.ship.crew[i].hp++;
					}
				}
			}
		}
	};
}

function shipWindow()
{
	this.alive=true;
	this.x=0;
	this.y=0;
	this.blinkRate=10;
	this.blinkTrack=0;
	this.colorTrack=0;
	this.alpha=1;
	this.colors=yellowColors;
	this.blinkRate=Math.random()*100;
	this.colorTrack=Math.floor(Math.random()*this.colors.length);
	this.size=1;
	this.update=function()
	{
		this.blinkTrack+=1*gameSpeed;
		if(this.blinkTrack>this.blinkRate)
		{
			this.blinkTrack=0;
			this.colorTrack++;
			if(this.colorTrack>this.colors.length)
			{
				this.colorTrack=0;
			}
		}
	};
	this.draw=function(can,cam)
	{
		can.save();
		can.fillStyle=this.colors[this.colorTrack];
		can.fillRect(this.x, this.y, this.size, this.size);
		can.restore();
	};
	/*
		this.draw=function(can,cam)
	{
		can.save();
		can.globalAlpha=this.alpha;
		can.fillStyle=this.colors[this.colorTrack];
		can.fillRect((this.x+cam.x)*camera.zoom, (this.y+cam.y)*camera.zoom, this.x+this.size, this.y+this.size);
		can.restore();
	};*/
}

updateEscapes=function()
{
	for(var i=0;i<escapes.length;i++)
	{
		if(!escapes[i].active)
		{
			escapes.splice(i,1);
			i--;
		}else
		{
			escapes[i].update();
		}
	}
};

updateMines=function(thangs){
	for(var i=0;i<mines.length;i++)
	{
		if(!mines[i].active)
		{
			mines.splice(i,1);
			//i--;
		}else
		{
			mines[i].update(thangs);
		}
	}
};

updateTorpedos=function(thangs){
	for(var i=0;i<torpedos.length;i++)
	{
		if(!torpedos[i].active)
		{
			torpedos.splice(i,1);
			i--;
		}else
		{
			torpedos[i].update(thangs);
		}
	}
};

/*or (var ci=0;ci<20;ci++)
{
	shipNames[9][ci]="Cube #"+Math.floor(Math.random()*9999);
}*/

var numShipNames=38;
var races=new Array(40);
races= ["Human","Vulcan","Andorian","Tellerite","Romulan","Klingon","Betazed","Vidiian","Cardassian","Borg","Orion","Telaxian","Ferengi","Pakled","Bajoran","Breen","Hirogen","Dominion"];
racesPlural= ["Humans","Vulcans","Andorians","Tellerites","Romulans","Klingons","Betazoids","Vidiians","Cardassians","Borg","Orion Pirates","Telaxians","Ferengi","Pakled","Bajorans","Breen","Hirogen","Dominion"];

var civIDs={};
civIDs.Human=0;
civIDs.Vulcan=1;
civIDs.Andorian=2;
civIDs.Tellarite=3;
civIDs.Romulan=4;
civIDs.Klingon=5;
civIDs.Betazoid=6;
civIDs.Vidiian=7;
civIDs.Cardassian=8;
civIDs.Borg=9;
civIDs.Orion=10;
civIDs.Telaxian=11;
civIDs.Ferengi=12;
civIDs.Pakled=13;
civIDs.Bajoran=14;
civIDs.Breen=15;
civIDs.Hirogen=16;
civIDs.Dominion=17;
var numRaces=18;
var shipNamesUsed=[];

for(var ipk=0;ipk<numRaces;ipk++){
	shipNamesUsed[ipk]=[];
}
var totalItems=9;
Item={};
Item.RedShirt=1;
Item.HandPhaser=0;
Item.PhaserRifle=2;
Item.Tricorder=3;
Item.MedKit=4;
Item.EmergencyTransport=5;
Item.Bomb=6;
Item.PersonalCloak=7; //jem'hdar
Item.PersonalShield=8; //borg

function dude() 
{
	this.gender=0;
	this.name=names[this.gender][Math.floor(Math.random()*40)];
	this.hp=100;
	this.maxHp=100;
	this.alive=true;
	this.station=0;
	this.level=1;
	this.moveSpeed=1;
	this.hasItem=[];
	for(var i=0;i<totalItems;i++)
	{
		this.hasItem.push(false);
	}
	this.hasItem[0]=true;//everyone gets a phaser!
	this.civ=civs[playerCiv];
	this.xp=0;
	this.nextLevel=100;
	this.ID=0;
	this.raceID=0;
	this.civID=0;
	this.rank=0;
	this.title="Crewman";
	this.AIDS=false;
	this.manStation=function(st)
	{
		if(!st)
		{ 
			st=this.station;
		}
		//todo!
		if(!st.manned)
		{
			st.manned=this;
			return true;
		}else
		{
			return false;
		}
	};
	this.hurt=function(amt,because)
	{
		if(!this.alive){return;}
		this.hp-=amt;
		if(this.hp<1)
		{
			this.kill(because);
			return this;
		}
		return false;
	};
	this.kill=function(cause)
	{
		if(!cause)
		{
			cause=" of unkown causes";
		}
		if((this.civ==civs[playerCiv]) || (logAll))
		console.log(this.title+" "+this.name+ " has died"+cause);
		this.alive=false;
	};
	
	this.setTitle=function()
	{
		if (this.rank===0)
		{
			this.title="Crewman";
		}else if (this.rank==1)
		{
			this.title="Ensign";
		}else if (this.rank==2)
		{
			this.title="Lieutenant";
		}else if (this.rank==3)
		{
			this.title="Lt. Commander";
		}else if (this.rank==4)
		{
			this.title="Commander";
		}else if (this.rank==5)
		{
			this.title="Captain";
		}
		
	};
	
	this.grantXp=function(amt)
	{
		this.xp+=amt;
		if(this.xp>this.nextLevel)
		{
			this.xp=0;
			this.level++;
			if(this.civ)
			{
				if((logAll) ||(this.civ==civs[playerCiv]))
				{
					console.log(this.name+" has gained a level!");
					this.maxHp++;
				}
			}else
			{
				console.log(this,"Doesn't have a civ?");
			}
			if((this.level%5===0) && (this.rank<4))
			{
				this.rank++;
				this.setTitle();
				if((logAll) ||(this.civ==civs[playerCiv]))
				{
					console.log(this.name+" was promoted to "+this. title);
				}
				if(this.rank==4)
				{
					this.civ.captainQueue.push(this);
				}
			}
		}
	
	};
}

function energyWeapon(hip)
{
	this.x=hip.x;
	this.y=hip.y;
	this.xoff=0;
	this.target=null;
	this.strength=1;
	this.target=null;
	this.pierce=0;
	this.damageRate=1;
	this.ship=hip;
	this.range=hip.phaserRange;
	this.charge=1;
	this.firing=false;
	this.type=0;
	this.colorTrack=Math.floor(Math.random()*7);
	this.damageTrack=0;

	this.update=function(hip){
		this.x=hip.x+this.xoff;
		this.y=hip.y;
		if(hip.torpedoTarget)
		{
			this.target=hip.torpedoTarget;
		}
		if((!this.target) || (!this.target.alive)||(this.target.surrendered)||(this.surrendered))
		{
			this.firing=false;
			return;
		}
		if((Math.abs(this.x-this.target.x)>this.range) || (Math.abs(this.y-this.target.y)>this.range))//todo dist formula
		{
			this.firing=false;
			return;
		}
		this.colorTrack+=1*gameSpeed*2;
		if(this.colorTrack>10)
		{
			this.colorTrack=0;
		}
		
		this.damageTrack+=this.damageRate*gameSpeed;
		if(this.damageTrack>10)
		{
			this.damageTrack=0;
			this.target.getDamaged(this.strength,true,this.ship);
		}
		
		//console.log(this.firing);
	};
	
	this.fire=function(hip){
		this.target=hip.torpedoTarget;
		if(!this.target) 
		{
			return;
		}
		this.firing=true;
		
	};
	
	this.draw=function(can,cam){
		if(!this.firing){
			return;
		}
		//todo, hit things
		can.save();
		for(var i=0;i<12;i++) //todo draw better.
		{
		
			can.strokeStyle = bColors[Math.floor(this.colorTrack)];
			can.beginPath();
			can.lineWidth = 4*cam.zoom;
			can.globalAlpha=0.40;
			can.moveTo((this.x+cam.x)*cam.zoom,(this.y+cam.y)*cam.zoom);
			can.lineTo((this.target.x+cam.x)*cam.zoom,(this.target.y+cam.y)*cam.zoom);
		
		}
		can.closePath();
		can.stroke();
		can.restore();
	};
}

function torpedo(){
	this.x=0;
	this.y=0;
	this.xv=0;
	this.yv=0;
	this.acceltick=0;
	this.accelrate=10;
	this.acceleration=10;
	this.maxxv=50;
	this.maxyv=50;
	this.range=40;
	this.delayTick=15;
	this.yield=15;
	this.width=8;
	this.speed=15;
	this.desiredSpeed=25;
	this.maxSpeed=25;
	this.targ=null;
	this.homing=true;
	this.ship=null;
	this.age=0;
	this.height=8;
	this.active=false;
	this.sprite=Sprite("torpedo");
	this.armedsprite=Sprite("torpedoarmed");
	//this.homing=false;//todo!
	this.draw=function(can,cam){
		if(this.active)
		{
			can.save();
			can.translate((this.x+cam.x)*cam.zoom,(this.y+cam.y)*cam.zoom);
			can.rotate((this.heading-90)* (Math.PI / 180));//todo negatives.
			if(this.cloaked)
			{
				canvas.globalAlpha=0.30;
			}
			can.scale(cam.zoom,cam.zoom);
			if(this.delayTick<1)
			{
				this.armedsprite.draw(can, -this.width/2,-this.height/2);
			}else
			{
				this.sprite.draw(can, -this.width/2,-this.height/2);
			}
			can.restore();
		}
	};
	
	this.accelerate=function()
	{
		this.acceltick+=1*gameSpeed;;
		if(this.acceltick<this.accelrate)
		{
			return;
		}
		this.acceltick=0;
		if ((this.speed<this.maxSpeed)) //&& ((!this.destination) || (this.speed<this.destination.maxSpeed)))//don't go faster than lead ship!
		{
			this.speed+=this.acceleration
		}
		if(this.speed>this.maxSpeed)
		{
			this.speed=this.maxSpeed;
		}
		if(this.speed>this.desiredSpeed)
		{
			this.speed=this.desiredSpeed;
		}
	};
	
	this.decelerate=function()
	{
		this.acceltick+=1*gameSpeed;;
		if(this.acceltick<this.accelrate)
		{
			return;
		}
		this.acceltick=0;
		this.speed-=this.acceleration
		if (this.speed<0.1)
		{
			this.speed=0;
		}
	};
	
	this.update=function(thangs){ //acceleration?
		if((this.homing) && (this.targ))
		{
			var beta=Math.atan2(this.targ.y-this.y,this.targ.x-this.x)* (180 / Math.PI);
		
			if (beta < 0.0)
				beta += 360.0;
			else if (beta > 360.0)
				beta -= 360;
			this.heading=beta;
			if(!this.targ.alive)
			{
				this.targ=null;
			}
		}
		if(this.speed<this.desiredSpeed)
		{
			this.accelerate();
		}else if(this.speed>this.desiredSpeed)
		{
			this.decelerate();
		}	
		this.xv=Math.cos((Math.PI / 180)*Math.floor(this.heading));
		this.yv=Math.sin((Math.PI / 180)*Math.floor(this.heading));

		var martina=gameSpeed*this.speed;
		//var martinay=this.yv*gameSpeed*this.speed;

		/*if(martinax>this.maxxv)
		{
			martinax=this.maxxv;
		}
		if(martinay>this.maxyv)
		{
			martinay=this.maxyv;
		}*/
		
		//if ((this.homing) && (this.targ) && (distance(piss,this.targ)<distance(this,this.targ)))
		
		if(martina>150)
		{
			martina=150;
		}
		
		this.x+=this.xv*martina;
		this.y+=this.yv*martina;
		
		this.age++;
		if(this.age>2000)
		{
			this.active=false;
		}
		if(this.delayTick>0)
		{
			this.delayTick-=1*gameSpeed;
		}else
		{
			var thongs=[];
			for(var i=0;i<thangs.length;i++){
				//if ((Math.abs(thangs[i].x-this.x)<this.range) && (Math.abs(thangs[i].y-this.y)<this.range))
				var centerx=thangs[i].x-thangs[i].width/2;
				var centery=thangs[i].y-thangs[i].height/2;
				
				if((this.x>centerx) && (this.x<centerx+thangs[i].width) && (this.y>centery) &&(this.y<centery+thangs[i].height))
				{
					this.detonate();
					thangs[i].getDamaged(this.yield,false,this.ship);
				}
			}
		}
	};
	this.detonate=function(){
		//do damage on ships in range
		if(camera.isNear(this))
		{
			monsta.explosionTextured(100,this.x,this.y,2,"explosionsmall");
		}
		this.active=false;
	};
}

function mine(){
	this.x=0;
	this.y=0;
	this.range=40;
	this.delayTick=50;
	this.yield=15;
	this.width=8;
	this.ship=null;
	this.height=8;
	this.active=false;
	this.sprite=Sprite("mine");
	this.armedsprite=Sprite("minearmed");
	this.magnetic=false;//todo!
	this.draw=function(can,cam){
		if(this.active)
		{
			can.save();
			can.translate((this.x+cam.x)*cam.zoom,(this.y+cam.y)*cam.zoom);
			//can.rotate((this.heading-90)* (Math.PI / 180));//todo negatives.
			if(this.cloaked)
			{
				canvas.globalAlpha=0.30;
			}
			can.scale(cam.zoom,cam.zoom);
			if(this.delayTick<1)
			{
				this.armedsprite.draw(can, -this.width/2,-this.height/2);
			}else
			{
				this.sprite.draw(can, -this.width/2,-this.height/2);
			}
			can.restore();
		}
	};
	
	this.getDamaged=function()
	{
		this.detonate();
	};

	
	this.update=function(thangs){
		if(this.delayTick>0)
		{
			this.delayTick-=1*gameSpeed;
		}else
		{
			var thongs=[];
			for(var i=0;i<thangs.length;i++){
				//if ((Math.abs(thangs[i].x-this.x)<this.range) && (Math.abs(thangs[i].y-this.y)<this.range))
				var centerx=thangs[i].x-thangs[i].width/2;
				var centery=thangs[i].y-thangs[i].height/2;
				var ourx=this.x;//+this.width/2;
				var oury=this.y;//+this.height/2;
				if((ourx>centerx) && (ourx<centerx+thangs[i].width) && (oury>centery) &&(oury<centery+thangs[i].height))
				{
					this.detonate();
					thangs[i].getDamaged(this.yield,false,this.ship);
				}
			}
		}
	};
	this.detonate=function(){
		//do damage on ships in range
		if(camera.isNear(this))
		{
			monsta.explosionTextured(100,this.x,this.y,2,"explosionsmall");
		}
		//console.log("boom");
		this.active=false;
	};
}

function escapePod(){
	this.x=0;
	this.y=0;
	this.wtf="EscapePod";
	this.alive=true;
	this.hp=10;
	this.active=false;
	this.capacity=1;
	this.statis=false;
	this.surrendered=false;
	this.warpSpeed=false;
	this.width=8;
	this.height=8;
	this.maxSpeed=3;
	this.civ=null;
	this.tractorHost=null;
	this.armor=0;
	this.desiredSpeed=0;
	this.speed=0;
	this.sprite=Sprite("pod");
	this.destination=null;
	this.heading=0;
	this.desiredHeading=0;
	this.passenger=null;
	this.crewCapacity=1;
	this.seatsFull=0;
	this.seats=[];
	this.acceltick=0;
	this.acceleration=.5;
	this.cloak=false;
	this.shields=0;
	this.turning=false;
}
	escapePod.prototype.launch=function(source,dest){
		this.x=source.x+16;
		this.y=source.y+16;
		this.xv=source.xv;
		this.civ=source.civ;
		this.yv=source.yv;
		this.destination=dest;
		var beta=Math.atan2(this.destination.y-this.y,this.destination.x-this.x)* (180 / Math.PI);
		
		if (beta < 0.0)
			beta += 360.0;
		else if (beta > 360.0)
			beta -= 360;
		this.desiredHeading=beta;
		this.active=true;
		this.speed=0;
		this.active=true;
		this.desiredSpeed=this.maxSpeed;
	};
	
	escapePod.prototype.getDamaged=function()
	{
		if(this.passenger)
		{
			this.passenger.kill(" when their escape pod was destroyed");
		}
		this.active=false;
		this.alive=false;
		//todo small explosion
	};
	
	escapePod.prototype.accelerate=function()
	{
		this.acceltick++;
		if(this.acceltick<this.accelrate*gameSpeed)
		{
			return;
		}
		this.acceltick=0;
		if (this.speed<this.maxSpeed)
		{
			this.speed+=this.acceleration;
		}
	};
	
	escapePod.prototype.decelerate=function()
	{
		this.acceltick++;
		if(this.acceltick<this.accelrate*gameSpeed)
		{
			return;
		}
		this.acceltick=0;
		if (this.speed>0)
		{
			this.speed-=this.acceleration;
		}
	};
	
	escapePod.prototype.update=function(){
		//accel or decel to desired speed
		if((!this.active) || (!this.alive)) {
			return;
		}
		
		if((Math.abs(this.x-this.destination.x)<20) && (Math.abs(this.y-this.destination.y)<20)) 
		{
			if(this.passenger)
			{
				if((logAll) ||(this.passenger.civ==civs[playerCiv]))
				{
					console.log(this.passenger.title+" "+this.passenger.name+"'s escape pod arrived at "+this.destination.name);
				}
				this.civ.crewPool.push(this.passenger);	
			}else
			{
			console.log("An empty escape pod arrived at "+this.destination.name);
			}
			this.active=false;
			this.alive=false;
		}
		if(this.tractorHost)
		{
			this.heading=this.tractorHost.heading;
			this.speed=this.tractorHost.speed;
			//this.yv=this.tractorHost.yv;
		}else
		{
			if(this.speed<Math.floor(this.desiredSpeed))
			{
				this.accelerate();
			}else if(this.speed>Math.floor(this.desiredSpeed))
			{
				this.decelerate();
			}
			
			//update desired heading
			var beta=Math.atan2(this.destination.y-this.y,this.destination.x-this.x)* (180 / Math.PI);
		
			if (beta < 0.0)
				beta += 360.0;
			else if (beta > 360.0)
				beta -= 360;
			this.heading=beta;
			this.desiredHeading=beta;
			//turn to desired heading
			var differenceHeading = Math.abs(this.desiredHeading - this.heading);
			//if we need to turn clockwise
			if(differenceHeading>2)
			{
				if(isTurnCCW(this.heading, this.desiredHeading))
				{
					//Turn right
					this.heading-=this.turnSpeed*gameSpeed;
						this.turning=true;
				}else
				{
					this.heading+=this.turnSpeed*gameSpeed;
						this.turning=true;
				}
			}else{
				this.turning=false;//totodo
			}
			if(this.heading > 359)
			{
				this.heading = 0;
			}
			if(this.heading < 0)
			{
				this.heading += 360;
			}
		}
		
		if(this.tractorHost)
		{
			if((Math.abs(this.x-this.tractorHost.x)<20) && (Math.abs(this.y-this.tractorHost.y)<20)) 
			{
				if(this.passenger)
				{
					if(this.tractorHost.civ==this.passenger.civ){
						console.log(this.tractorHost.name+" recovered "+this.passenger.title+" "+this.passenger.name+"'s escape pod.");
						this.tractorHost.crew.push(this.passenger);	
					}else
					{
						if(this.tractorHost.civ.autoHostile.indexOf(this.passenger.civ)>-1)
						{
							console.log(this.tractorHost.name+" captured a "+this.passenger.civ.name+" officer");
							this.tractorHost.civ.prisoners.push(this.passenger);
						}else
						{
							console.log(this.tractorHost.name+" saved a "+this.passenger.civ.name+" officer");
							this.tractorHost.passengers.push(this.passenger);
						}
					}
				}else
				{
					console.log(this.tractorHost.name+" pulled in an empty escape pod.");
				}
			this.active=false;
			this.alive=false;
			}else
			{
				var peta=Math.atan2(this.tractorHost.y-this.y,this.tractorHost.x-this.x)* (180 / Math.PI);
				this.xv=Math.cos((Math.PI / 180)*Math.floor(peta));
				this.yv=Math.sin((Math.PI / 180)*Math.floor(peta));
				this.x+=this.xv*gameSpeed*(this.speed+1);
				this.y+=this.yv*gameSpeed*(this.speed+1);
			}
		}else
		{
			this.xv=Math.cos((Math.PI / 180)*Math.floor(this.heading));
			this.yv=Math.sin((Math.PI / 180)*Math.floor(this.heading));
			this.x+=this.xv*gameSpeed*this.speed;
			this.y+=this.yv*gameSpeed*this.speed;
			
		}

		if(this.x<0)
		{
			this.x=0;
		}
		if(this.y<0)
		{
			this.y=0;
		}
		if(this.x>universeWidth)
		{
			this.x=universeWidth;
		}
		if(this.y>universeHeight)
		{
			this.y=universeHeight;
		}
	};
	escapePod.prototype.draw=function(can,cam){
		if((this.alive) && (this.active))
		{
			can.save();
			can.translate((this.x+cam.x)*cam.zoom,(this.y+cam.y)*cam.zoom);
			can.rotate((this.heading-90)* (Math.PI / 180));//todo negatives.
			if(this.cloaked)
			{
				canvas.globalAlpha=0.30;
			}
			can.scale(cam.zoom,cam.zoom);
			this.sprite.draw(can, -this.width/2,-this.height/2);
			if((this.shields>0) && (this.activeShields))
			{
				canvas.globalAlpha=this.shields/100;
				this.shieldSprite.draw(can, -this.width,-this.height);
			}
			can.restore();
			
			//this.sprite.draw(can, this.x-cam.x-this.width/2,this.y-cam.y-this.height/2);
		}
	};
