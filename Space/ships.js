var tractorColors=["#01A9DB","#0080FF","#2E9AFE","#2E9AFE","#81BEF7","#81F7F3","#A9E2F3","#58D3F7"];
var assimilationColors=["#9FF781","#58FA58","#2EFE2E","#04B404","#088A08","#088A08","#0B3B0B","#088A29"];

function logEntry(date,author,ship,data)
{
	this.date=null;
	this.author=null;
	this.ship=null;
	this.data=null;
	if(date)
	{
		this.date=date;
	}
	if(author)
	{
		this.author=author;
	}
	if(ship)
	{
		this.ship=ship;
	}
	if(data)
	{
		this.data=data;
	}
	
}

var Orders={};
Orders.whatever=0;
Orders.Explore=1;
Orders.Colonize=2;
Orders.Escort=3;
Orders.Fleet=4;
Orders.LeadFleet=5;
Orders.Attack=6;
Orders.Tractor=7;

var borgTrack=0;
var usedEvents=[];
for(var i=0;i<100;i++)
{
	usedEvents.push(false);
}

function starShip(civ){
	//this.class=baseClass
	this.civ=civ;//s[civid];
	this.wtf="Ship";
	this.ship=true;
	this.systems=[];
	this.power=this.maxPower=1;
	this.matchSpeed=false;
	this.manualControl=false;
	//todo
	this.crusingSpeed=4.5;
	this.rooms=6;
	this.maxSystems=6;
	this.tail=[];
	this.tailLength=100;
	this.platform=false;
	this.planetBeamTrack=0;
	this.planetBeamX=0;
	this.planetBeamY=0;
	this.orders=0;
	this.civID=0;
	this.kills=0;
	this.adrift=false;
	this.tailCount=0;
	this.AIMode=AIModes.Explore;
	this.x=0;
	this.y=0;
	this.xv=0;
	this.yv=0;
	this.nearbyHostiles=[];
	this.surrendered=false;
	this.colony=false;
	this.spawnPlanet=null;
	this.canHasShields=true;
	this.hasShields=false;
	this.frieghter=false;
	this.phaserRange=500;
	this.torpedoRange=500;
	this.passengers=[];
	this.destination=null;
	this.transportRange=200;
	this.lifeSupport=true;
	this.lifeSupportRate=0.25;
	this.captainsLog=[];
	this.maxMines=100;
	this.maxTorpedos=100;

	this.numTorpedos=100;
	this.healCount=0;
	this.numMines=this.maxMines;
	this.torpedoTarget=null;
	this.tractorHost=null;
	this.tractorClient=null;
	this.shieldChargeRate=1;
	this.autoEvac=true;
	this.maxHp=100;
	this.breaches=0;
	this.oxygen=1000;
	this.homing=true;//todo
	this.selfDestructActive=false;
	this.selfDestructTick=100;
	this.healTick=0;
	this.evacRate=10;
	this.evacTick=0;
	this.evacTrack=0;
	this.evacDone=false;
	this.NCC=0;//initial random+counter?
	this.warpSignature=0;
	this.commandCode=1234;
	this.prefixCode=Math.floor(Math.random()*9999); //that bullshit from WoKhan
	this.escapePods=[];
	this.acceltick=0;
	this.accelrate=10;
	this.weaponsHot=0;
	this.phaserBanks=[];
	this.numPhasers=1;
	this.torpedoBays=[];
	this.numTorpedoBays=0;
	this.phaserBanks.push(new energyWeapon(this));
	this.shields=0;
	this.tractorDist=80;
	this.actionText="Idle.";
	this.maxShields=0;
	this.activeShields=false;
	this.activeWeapons=true;
	this.shieldSprite=Sprite("shields1");
	this.discovered=true;
	this.sensorRange=500;
	this.tractorRange=200;
	this.morale=70;
	this.cloaked=false;
	this.turnSpeed=2;
	this.acceleration=0.5;
	this.hp=100;
	this.prefix="U.S.S.";
	this.class=shipClasses[0][0];
	this.heading=Math.floor(Math.random()*359);
	this.desiredHeading=this.heading;
	this.speed=0;
	this.desiredSpeed=this.cruisingSpeed;
	this.maxSpeed=5;
	this.actionText="idle";
	this.type=0;
	this.width=32;
	this.height=32;
	this.alive=false;
	this.attackingPlanet=null;
	this.name="Tim.";
	
	if(shipNamesTrack[this.civID]>shipNames[this.civID].length)
	{
		shipNamesTrack[this.civID]=0;
	}
	this.crewCapacity=5;
	this.crewMax=0;
	this.crew=[];
	this.awayTeam=[];
	this.orbiting=false;
	this.orbitDiameter=50;
	this.captainFlees=false;
	this.orbitTarg=null;
	this.planetAttackTick=0;
	this.cruisingSpeed=this.maxSpeed;
	if(this.maxSpeed>6)
	{
		this.cruisingSpeed=this.maxSpeed-2;
	}
	this.desiredOrbitTarg=null;
	this.gotoDest=false;
	this.drawTarget=false;
	this.beamTarget=null;
	this.dest=null;
	this.homeworld=null;
	this.refitOrdered=false;
	this.baseRepair=1;
	this.autoFireTick=0;
	this.autoFireRate=40;
	this.fixCount=0;
	this.destx=0;
	this.desty=0;
	this.orby=0;
	this.orbx=0;
	this.escorting=null;
	this.inFormation=false;
	this.formationCoords=[];
	this.formationCoords.x=0;
	this.formationCoords.y=0;
	this.torpedoTarget=null;
	this.orbitTrack=Math.floor(Math.random()*359);
	this.orbitDecay=0;
	this.orbitSpeed=2;
	this.battles=0;
	this.turning=false;
	this.sensors=0;
	this.torpedoTubes=2;
	this.sprite=Sprite("ship1");
	this.artilery=[];
	this.artilery[0]=0;
	this.artilery[1]=0;
	this.impulseEngine=0;
	this.tillEvent=Math.random()*8000;
	this.armor=0;
	this.shields=0;
	this.numEscapePods=10;
	this.nameTrack=0;
	for(var i=0;i<this.numEscapePods;i++)
	{
		this.escapePods[i]=new escapePod();
	}
	this.transporter=0;
	this.crewQuarters=0;
	this.tractor=0;
	this.warpCore=0;
	this.warpEngine=0;
	this.stores=0;
	this.cafe=0;
	this.nearbySystems=[];
	this.nearbyVessels=[];
	this.nearbyPods=[];
	this.nearbyPlanets=[];
	this.lightyearsTraveled=0;
	this.crewLost=0;
	this.maxTeamSize=4;
	this.awayTeamAt=null;
	this.launchDate=0;
	this.lastYear=2000;
	this.windows=[];
	this.items=[];
		for(var i=0;i<NumSystems;i++)
	{
		var wynn=new shipSystem(this,i);
		if((wynn.type==SystemIDs.Weapons) ||(wynn.type==SystemIDs.LifeSupport)||(wynn.type==SystemIDs.DamageControl)||(wynn.type==SystemIDs.MedicalBay)||(wynn.type==SystemIDs.Engines) ||(wynn.type==SystemIDs.Scanners)||(wynn.type==SystemIDs.Targeting)||(wynn.type==SystemIDs.Navigation)||(wynn.type==SystemIDs.Tractor)||(wynn.type==SystemIDs.EscapePods)||(wynn.type==SystemIDs.Transporter)||(wynn.type==SystemIDs.MainPower)||(wynn.type==SystemIDs.Cloak))
		{
			wynn.installed=true;
			
			wynn.active=true;
			if(wynn.type==SystemIDs.MainPower)
			{
				wynn.val=7;
				//wynn.on=true;
				wynn.minPower=0;
				wynn.turnOn();
			}else if(wynn.type==SystemIDs.Cloak)
			{
				wynn.minPower=4;
			}else{
				if(this.power>wynn.minPower)
				{
					wynn.turnOn();
				}
			}
		
		}
		this.systems.push(wynn);
	}
	
	this.menu=new screenBox(this);
	this.menu.x=20;
	this.menu.y=350;
	this.menu.width=270;
	this.menu.height=270;
	this.layMine=function(){
		if(this.numMines<1) {return;}
		this.numMines--;
		var minny=new mine();
		minny.ship=this;
		minny.x=this.x-minny.width/2;
		minny.y=this.y-minny.height/2;
		minny.active=true;
		minny.range=10;
		mines.push(minny);
	};
}
	starShip.prototype.routePower=function(sys)
	{
		if(sys.on) { return false;} //todo check this?
		//if(this.power-sys.minPower>-1)
		var belly=this.power-sys.minPower;
		if(belly>-1) //PROBLEM
		{
			//if(belly<0) {belly=0;}
			this.power=belly;
			sys.power=sys.minPower;
			//playASound
			return true;
		}else
		{
			return false;
		}
	};
	
	starShip.prototype.checkSystemPower=function()
	{
		var b=this.maxPower;
		for(var i=1;i<this.systems.length;i++)
		{
			if(this.systems[i].on)
			{
				b-=this.systems[i].power;
				this.systems[i].turnOff();
				this.menu.sysButtons[this.systems[i].type].on=false;
				if(b<0)
				{
					
				}
			}
		}
	};
	
	starShip.prototype.powerDown=function(sys)
	{
		sys.on=false;
		if(sys.power<1) {return;}
		this.power+=sys.power;
		sys.power=0;
		
		//playASound
	};

	
	starShip.prototype.classify=function()
	{
		this.colony=this.class.colony;
		this.canHasShields=this.class.canHasShields;
		this.hasShields=this.class.hasShields;
		this.frieghter=this.class.frieghter;
		this.phaserRange=this.class.phaserRange;
		this.destination=this.class.destination;
		this.transportRange=this.class.transportRange;
		this.lifeSupport=this.class.lifeSupport;
		this.lifeSupportRate=this.class.lifeSupportRate;
		this.maxMines=this.class.maxMines;
		this.maxTorpedos=this.class.maxTorpedos;
		this.numTorpedos=this.class.numTorpedos;
		this.numMines=this.class.numMines;
		this.shieldChargeRate=this.class.shieldChargeRate;
		this.autoEvac=this.class.autoEvac;
		this.maxHp=this.class.maxHp;
		this.oxygen=this.class.oxygen;
		this.homing=this.class.homing;
		this.evacRate=this.class.evacRate;
		this.NCC=this.class.NCC;
		this.warpSignature=this.class.warpSignature;
		this.commandCode=this.class.commandCode;
		this.prefixCode=this.class.prefixCode; //that bullshit from WoKhan
		this.accelrate=this.class.accelrate;
		this.weaponsHot=this.class.weaponsHot;
		this.numPhasers=this.class.numPhasers;
		this.numTorpedoBays=this.class.numTorpedoBays;
		for(var v=1;v<this.numPhasers;v++){ //they already have one
			this.phaserBanks.push(new energyWeapon(this));
		}
		this.breatheTick=0;
		this.breatheRate=40;
		this.shields=this.class.shields;
		this.tractorDist=this.class.tractorDist;
		this.maxShields=this.class.maxShields;
		this.hasShields=this.class.hasShields;
		this.shieldSprite=this.class.shieldSprite;
		this.sensorRange=this.class.sensorRange;
		this.tractorRange=this.class.tractorRange;
		//this.morale=this.class.
		this.turnSpeed=this.class.turnSpeed;
		this.acceleration=this.class.acceleration;
		this.hp=this.class.hp;
		this.prefix=this.class.prefix;
		this.maxSpeed=this.class.maxSpeed;
		this.type=this.class.type;
		this.width=this.class.width;
		this.height=this.class.height;
		this.crewCapacity=this.class.crewCapacity;
		this.crewMax=this.class.crewMax;
		this.orbitDiameter=this.class.orbitDiameter;
		this.captainFlees=this.class.captainFlees;
		this.baseRepair=this.class.baseRepair;
		this.autoFireRate=this.class.autoFireRate;
		
		
		this.sensors=this.class.sensors;
		this.torpedoTubes=this.class.torpedoTubes;
		this.sprite=this.class.sprite;
		
		this.impulseEngine=this.class.impulseEngine;
		this.armor=this.class.armor;
		this.shields=this.class.shields;
		this.numEscapePods=this.class.numEscapePods;
		this.transporter=this.class.transporter;
		this.crewQuarters=this.class.crewQuarters;
		this.tractor=this.class.tractor;
		this.warpCore=this.class.warpCore;
		this.warpEngine=this.class.warpEngine;
		this.stores=this.class.stores;

		this.maxTeamSize=this.class.maxTeamSize;
		this.cruisingSpeed=this.class.cruisingSpeed;
	};
	
	starShip.prototype.prepareAwayTeam=function(num){
		if(this.crew.length<3)
		{
			console.log("not enough crew to form an away team");
			return false;
		}
		if(this.awayTeam.length>0)
		{
			console.log("alreay have an away team.");
			return false;
		}
		for(var i=0;i<num;i++)
		{
			if((this.crew.length<2) || (this.awayTeam.length>this.maxTeamSize))
			{
				return false;
			}
			this.awayTeam.push(this.crew.pop());
		}
		console.log("Away team ready");
		return true;
	};
	
	starShip.prototype.recallAwayTeam=function(){
		//beam them, check range and all?
		//if(!this.systems[SystemIDs.Transporter].functional(false)) {return;}
		for(var i=0;i<this.awayTeam.length;i++)
		{
			this.crew.push(this.awayTeam[i]);//.pop());
		}
		this.awayTeam=[];
	};
	
	starShip.prototype.beamDown=function(target){
		if(!this.systems[SystemIDs.Transporter].functional(false)) {return;}
		if(this.awayTeamAt!==null)
		{
			console.log("Away team already away!");
			return;
		}
		/*if(this.awayTeam.length<1)
		{
			console.log("You don't have an away team!");
			return;
		}*/
		if((this.shields>0) && (this.systems[SystemIDs.Shields].functional()))
		{
			console.log("Cannot beam down with shields up.");
			return;
		}
		if((target.shields>0) && (target.ship)&& (this.target.systems[SystemIDs.Shields].functional()))//todo planet shields block them?
		{
			console.log("Cannot beam through enemy shields.");
			return;
		}
		
		if(target.planet)  
		{
			if(!target.evented)
			{
				target.evented=true;
				this.generatePlanetEvent(target);
				this.grantXp(2);
			}
			this.awayTeamAt=target;
			console.log("The away team has beamed down to "+target.name);
			
		}else if(target.ship)
		{
			console.log("The away team has beamed over to the "+target.name);
		}
		this.awayTeamAt=target;
	};
	
	starShip.prototype.beamUpAwayTeam=function(){
		if(!this.systems[SystemIDs.Transporter].functional(false)) {return;}
		if((this.shields>0)  && (this.systems[SystemIDs.Shields].functional()))
		{
			console.log("Cannot beam away team back with shields up.");
			return;
		}
		if((this.awayTeamAt.shields>0)&& (this.awayTeamAt.ship)&&  (this.awayTeamAt.systems[SystemIDs.Shields].functional()))
		{
			console.log("Cannot beam through enemy shields.");
			return;
		}
		console.log("Away team beamed back to the ship");
		this.awayTeamAt=null;
		//this.recallAwayTeam();
	};
	
	starShip.prototype.beamUp=function(unt){
		if(!this.systems[SystemIDs.Transporter].functional(false)) {return;}
		if((this.shields>0) && (this.systems[SystemIDs.Shields].functional()))
		{
			console.log("Cannot beam away team back with shields up.");
			return;
		}
		if((this.awayTeamAt.shields>0) && (this.awayTeamAt.ship)&&  (this.awayTeamAt.systems[SystemIDs.Shields].functional()))
		{
			console.log("Cannot beam through enemy shields.");
			return;
		}
		console.log(unt.name+" was beamed back to the ship");
		this.crew.push(unt);
	};
	
	starShip.prototype.unTractorSomething=function(){
		//if somethign not in range return;
		
		if(this.tractorClient)
		{
			this.tractorClient.orbiting=false;
			this.tractorClient.tractorHost=null;
			this.tractorClient=null;	
		}
	
	};
	
	starShip.prototype.tractorSomething=function(something){
		//if somethign not in range return;
		if(!this.systems[SystemIDs.Tractor].functional()) {
			console.log("no functional tractor beam");
		return;}
		if(!this.inTractorRange(something)) 
		{
			console.log("Out of tractor range");
			return;
		}if((something.shields>0) && (something.systems[SystemIDs.Shields].functional()))
		{
			console.log("Cannoy tractor while their shields are up.");
			return;
		}

		if(!something.alive){ return;}
		something.orbiting=false;
		something.tractorHost=this;
		this.tractorClient=something;	
	
	};
	
	starShip.prototype.addPhaser=function()
	{
		var pim=new energyWeapon(this);
		pim.xoff=12*this.phaserBanks.length;
		pim.ship=this;
		this.phaserBanks.push(pim);
	};
	
	starShip.prototype.inPhaserRange=function(hip){
		if((Math.abs(hip.x-this.x)<this.phaserRange) && (Math.abs(hip.y-this.y)<this.phaserRange)) 
		{
			return true;
		}
		return false;
	};
	
	starShip.prototype.inTractorRange=function(hip){
		if((Math.abs(hip.x-this.x)<this.tractorRange) && (Math.abs(hip.y-this.y)<this.tractorRange)) 
		{
			return true;
		}
		return false;
	};
	
	starShip.prototype.firePhasers=function(){
		if((!this.torpedoTarget) || (!this.inPhaserRange(this.torpedoTarget))) {return;}
		if(!this.systems[SystemIDs.Weapons].functional(false)) {return;}
		for(var i=0;i<this.phaserBanks.length;i++)
		{
			
			this.phaserBanks[i].fire(this);
			
		}
		if(this.torpedoTarget.civ.autoHostile.indexOf(this.civ)==-1)
		{
			this.torpedoTarget.civ.autoHostile.push(this.civ);
			console.log("The "+this.civ.namePlural + " have pissed off the " +this.torpedoTarget.civ.namePlural+ " by firing on one of their ships");
		}
	};
	
	starShip.prototype.nearestSpecificShip=function(enemyCiv)//todo range?
	{
		var closest=enemyCiv.ships[0];
		for(var i=1;i<enemyCiv.ships.length;i++)
		{
			if(distance(enemyCiv.ships[i],this)<distance(closest,this))
			{
				closest=enemyCiv.ships[i];
			}
		
		}
		return closest;
	};
	
	starShip.prototype.setDestination=function(targ,speed)
	{
		if(targ==this) 
		{	
			console.log(this.name+" tried to rendezvous with itslef!");

			return false;
			
		}
		if(targ.planet)
		{
			this.desiredOrbitTarg=targ;
			this.destination=null;
			if((this.civ==civs[playerCiv]) || (logAll))
			{
				console.log(this.name+" heading to orbit "+targ.name);
			}
		}else if(this.destination!=targ)
		{
			this.destination=targ;
			this.desiredOrbitTarg=null;
			if((this.civ==civs[playerCiv]) || (logAll))
			{
				if(this.orders==Orders.Attack)
				{
					console.log(this.name+" heading to attack "+targ.name);
				}else
				{
					console.log(this.name+" heading to meet "+targ.name); //blaaa
				}
			}
		}
		if(this.orbiting)
		{
			this.orderLeaveOrbit();
		}
		this.desiredSpeed=speed;
		return true;
	};
	
	starShip.prototype.christen=function(){
	if(this.civ.name=="Borg")
	{
		this.name=" #"+(Math.floor(Math.random()*4999)+4000);
		return;
	}
		var nami=Math.floor(Math.random()*shipNames[this.civID].length);
		while(true) {
			if(shipNamesUsed[this.civID][this.nameTrack]) 
			{
				//nami=Math.floor(Math.random()*shipNames[this.civID].length);
				this.nameTrack++;
			}else {break;}
		}
		this.name=shipNames[this.civID][this.nameTrack];
		shipNamesUsed[this.civID][this.nameTrack]=true;
		if((this.civ===civs[playerCiv]))
		{
			//console.log(this.civ);
			if((this.civ==civs[playerCiv]) && (this.menu.nameBox))
			{
				this.menu.nameBox.text=String(this.name);
			}
		}
	};
	
	starShip.prototype.cycleBeamTarget=function()
	{
		if(!this.nearbyVessels) {return;}
		//this.unTractorSomething();
		var toon=this.nearbyVessels.concat(this.nearbyPlanets);
		//go through toon and remove ones out of tractor range!
		for(var i=0;i<toon.length;i++)
		{
			if((!this.inTractorRange(toon[i])) || ((toon[i].shields>0)  && (this.systems[SystemIDs.Shields].functional())))
			{
				toon.splice(i,1);
				i--;
			}
		}
		//if(!this.bearbyVessels) {return;}
		if(this.beamTarget==null) //todo problem with ===
		{
			//console.log("targeting selfyar?");
			this.beamTarget=toon[0];
			return;
		}
		for(var i=0;i<toon.length;i++)
		{
			if(toon[i]==this.beamTarget)
			{
				if(i==toon.length)
				{
					console.log("targeting self?");
					this.beamTarget=toon[0];
					return;
				}else
				{
					
					this.beamTarget=toon[i+1];
					return;
				}
			}
		}
	};
	
	starShip.prototype.cycleTractorTarget=function()
	{
		if(!this.nearbyVessels) {return;}
		this.unTractorSomething();
		var toon=this.nearbyVessels.concat(this.nearbyPods);
		//go through toon and remove ones out of tractor range!
		for(var i=0;i<toon.length;i++)
		{
			if(!this.inTractorRange(toon[i]))
			{
				toon.splice(i,1);
				i--;
			}
		}
		//if(!this.bearbyVessels) {return;}
		if(this.tractorTarget==null)
		{
			//console.log("targeting selfyar?");
			this.tractorTarget=toon[0];
			return;
		}
		for(var i=0;i<toon.length;i++)
		{
			if(toon[i]==this.tractorTarget)
			{
				if(i==toon.length)
				{
					console.log("targeting self?");
					this.tractorTarget=toon[0];
					return;
				}else
				{
					
					this.tractorTarget=toon[i+1];
					return;
				}
			}
		}
	};
	
	starShip.prototype.cycleTarget=function()
	{
		var bearbyVessels=null;
		if(!this.nearbyVessels) {return;}
		
		if(this.civ.targetPods)
		{
			bearbyVessels=this.nearbyVessels.concat(this.nearbyPods);
		}else
		{
			bearbyVessels=this.nearbyVessels;
		}
		for(var i=0;i<bearbyVessels.length;i++)
		{
			if(bearbyVessels[i].civ==this.civ)
			{
				//console.log("same team!");
				bearbyVessels.splice(i,1);
				i--;
			}
		}
		
		//if(!this.bearbyVessels) {return;}
		if(this.torpedoTarget==null)
		{
			//console.log("targeting selfyar?");
			this.torpedoTarget=bearbyVessels[0];
			return;
		}
		for(var i=0;i<bearbyVessels.length;i++)
		{
			if(bearbyVessels[i]==this.torpedoTarget)
			{
				if(i==bearbyVessels.length)
				{
					console.log("targeting self?");
					this.torpedoTarget=bearbyVessels[0];
					return;
				}else
				{
					
					this.torpedoTarget=bearbyVessels[i+1];
					return;
				}
			}
		}
	};

	starShip.prototype.installSystem=function(id)
	{
		//todo 
		this.systems[id].installed=true;
		this.systems[id].power=0;
		//this.systems[id].on=true;
		if(this.menu.sysButtons)
		{
			this.menu.sysButtons[id].greyed=false;
		}
	};
	
	starShip.prototype.unInstallSystem=function(id)
	{
		//todo 
		this.systems[id].installed=false;
		this.systems[id].power=0;
		this.systems[id].on=false;
		if(this.menu.sysButtons)
		{
			this.menu.sysButtons[id].greyed=true;
		}
	};

	starShip.prototype.fireTorpedo=function(){
		if(!this.systems[SystemIDs.Weapons].functional(false)) {return;}
		if(this.numTorpedos<1) {return;}
		this.numTorpedos--;
		var torpy=new torpedo();
		torpy.ship=this;
		if(!this.torpedoTarget)
		{
			var beta=this.heading;
		}else
		{			
			if((this.homing) &&(this.systems[SystemIDs.Targeting].functional()))
			{
				torpy.targ=this.torpedoTarget;
			}
			var beta=Math.atan2(this.torpedoTarget.y-this.y,this.torpedoTarget.x-this.x)* (180 / Math.PI);
		
			if (beta < 0.0)
				beta += 360.0;
			else if (beta > 360.0)
				beta -= 360;
			if(this.torpedoTarget.civ.autoHostile.indexOf(this.civ)==-1)
			{
					this.torpedoTarget.civ.autoHostile.push(this.civ);
					console.log("The "+this.civ.namePlural+ " have pissed off the " +this.torpedoTarget.civ.namePlural+ " by firing on one of their ships");
			}
			
		}
		
		torpy.heading=beta;
		torpy.x=this.x-torpy.width/2;
		torpy.y=this.y-torpy.height/2;
		//torpy.xv=this.xv;
		//torpy.yv=this.yv;
		torpy.speed=this.speed;
		if(torpy.speed<5) {torpy.speed=5;}
		torpy.active=true;
		torpedos.push(torpy);
		//console.log(torpy);
	};
	
	starShip.prototype.refit=function(){
	//calculate and subtract cost
		console.log("The "+this.prefix+ " "+this.name+" has been refit and repaired");
		if((this.canHasShields) && (this.maxShields<1) &&(this.civ.techs[Techs.EnergyShields]))
		{
			this.maxShields=100;
			this.hasShields=true;
		}
		this.repair();
		this.refitOrdered=false;
	};
	
	starShip.prototype.repair=function(){
		this.shields=this.maxShields;
		this.hp=this.maxHp;
		this.breaches=0;
		this.oxygen=100;
	};
	
	starShip.prototype.orderRefit=function(){
		this.orderOrbit(this.closestWorld(true));
		this.refitOrdered=true;
	};
	
	starShip.prototype.attackPlanet=function(plnt)
	{
		if(!this.systems[SystemIDs.Weapons].functional(false)) {return;}
		if(plnt.civ)
		{
			if((this.civ.autoHostile.indexOf(plnt.civ)==-1) && (plnt.civ!=this.civ))
			{
				//this.civ.addHostile(plnt.civ);
				this.civ.autoHostile.push(plnt.civ);
				console.log(this.civ.name+" has pissed off "+plnt.civ.name+ " by attacking their colony on "+plnt.name);
			}
			if(plnt.civ!=this.civ)
			{
				plnt.hurt(3);
			}
		}
	};
	
	starShip.prototype.closestWorld=function(refit){
		var answer=this.homeworld;
		var answerDist=distance(this,this.homeworld);
		for(var i=0;i<this.civ.worlds.length;i++)
		{
			var dost=distance(this,this.civ.worlds[i]);
			if((dost<answerDist) && ((this.civ.worlds[i].hasShipyard) || (!refit)))
			{
				answerDist=dost;
				answer=this.civ.worlds[i];
			}
		}
		return answer;
	};
	
	starShip.prototype.getDamaged=function(amt,phaser,attacker){
		if(this.systems[SystemIDs.Shields].functional())
		{
			this.shields-=amt;
			var wound=0;
			if(this.shields<0){
				wound+=this.shields;
				this.shields=0;
				if(this.civ==civs[playerCiv]){
					flashGUITick=5;
				}
			}
		}else
		{
			wound=-amt;
		}
		wound+=this.armor;//CHECK
		this.hp+=wound;
		if(this.hp<1)
		{
			killShip(this,attacker);
		}
		//todo randomly damage systems, kill crew.
		if((this.shields<1) && (!phaser))
		{
			var pete=Math.floor(Math.random()*100);
			if(pete<20)
			{
				this.breaches++;
				if((this.civ==civs[playerCiv]) || (logAll))
				{
					if(this.platform)
					{
						console.log("The "+this.name+" orbiting "+this.orbitTarg.name+"'s hull was breached!");
					}else
					{
						console.log("The " +this.prefix+ " "+this.name+"'s hull was breached!");
					}
				}
			}
		}
	};
	
	starShip.prototype.crewVessel=function(cpt){
		this.crewMax=Math.floor(Math.random()*4)+4;
		var i=0;
		{
			if(cpt)
			{
				this.crew[0]=cpt;
				i=1;
			}
		}
		for(;i<this.crewMax;i++){
			this.crew[i]=new dude();
			this.crew[i].civ=this.civ;
			if((Math.random()*100)<20)
			{
				//this.crew[i].civID="vulcan";
			}
		}
		this.crew[0].title="Captain";
		this.crew[0].rank=5;
		this.crew[1].title="Lt. Commander";
		this.crew[1].rank=3;
	};
	
	starShip.prototype.checkCrew=function(){
		
		if(this.crew.length<1)
		{
			//console.log("The crew of the "+this.name+" have been killed.  Vessel adrift.");
			return false; 
		}
		return true;
	};
	
	starShip.prototype.killRandomCrew=function(cause){
		if(cause==null) {cause=".";}
		if(this.checkCrew()){
			var vict=null;
			for(var i=0;i<this.crew.length;i++)
			{
				if(this.crew[i].hasItem[Item.RedShirt]===true)
				{
					vict=i;
				}
			}
			if(vict==null)
			{
				vict=Math.floor(Math.random()*this.crew.length);	
			}
			this.enterLog("Today we lost "+this.crew[vict].title+ " "+this.crew[vict].name+ " to "+cause);
			this.crew[vict].kill(cause);
			this.crewLost++;
			this.crew.splice(vict,1);
			//this.crewNum--;
			if(this.crew.length<1)
			{
				console.log("The crew of the "+this.prefix+ " "+this.name+" have been killed.  Vessel adrift.");
				this.adrift=true;
			}
		}
	};
	
	starShip.prototype.prepEvac=function(level){ //TODO: gets non essentail (judged by level var) personalle to escape pods.
		this.prevacuated=level*10;
	};
	
	starShip.prototype.Evac=function(targ){//TODO: shoots out pods over time, can get headstart by preping evac.
		this.evacuating=true;
	};
	
	starShip.prototype.orderOrbit=function(targ){
		if(targ==this.orbitTarg)
		{
			return; //hack
		}
		this.desiredOrbitTarg=targ;
		this.orderLeaveOrbit();
	};	
	
	starShip.prototype.orbit=function(targ){
		this.orbiting=true;
		this.orbitTarg=targ;
		this.leavingProgress=null;
	};
	
	starShip.prototype.leaveOrbit=function(){
		this.leavingProgress=null;
		this.orbiting=false;
		this.orbitTarg=null;
		this.heading=this.orbitTrack;
		this.desiredHeading=this.heading;
		this.desiredSpeed=this.cruisingSpeed;
		//this.speed=1;
	};
	
	starShip.prototype.orderLeaveOrbit=function(){ //probably not neaded anymore if you use setDestination
		this.leavingProgress=0;
		this.orbiting=false;
		this.orbitTarg=null;
		this.desiredSpeed=this.cruisingSpeed;
		this.actionText="Breaking Orbit3";
	};
	
	starShip.prototype.adjustHeading=function(targ){
		if (targ < 0.0)
			targ += 360.0;
		else if (targ > 360.0)
			targ -= 360;
		this.desiredHeading=Math.floor(targ);
	};
	
	
	starShip.prototype.generateEvent=function(){
		var j=Math.floor(Math.random()*9);
		var aRace=races[Math.floor(Math.random()*numRaces)];
		if(playerCiv>0)
		{
			return; //until we can make a system that adapts events for each race.
		}	
		if(j===0){
			if((aRace=="Vulcan") && (this.civ.fContacted[1]))
			{
				console.log("You can tell the enemy crew is sodomizing you with their eyes, but in the end they abide by the treaty.");
			}else
			{
				console.log("The crew of the "+this.name+" has been sodomized by "+ aRace+"s.  Morale is low.");
				this.morale-=20;
			}
			if((Math.floor(Math.random()*8)==1))
			{
				this.killRandomCrew(" resisting sodomy.");
			}
		}else if (j==1){
			console.log("A fire broke out aboard the "+this.name+".");
			if((Math.floor(Math.random()*6)==1))
			{
				this.killRandomCrew(" of severe burns.");
			}
		}else if (j==2){
			console.log("The crew of the "+this.name+" traveled back in time and met Mark Twain.  It was neat.");
			if((Math.floor(Math.random()*80)==1))
			{
				this.killRandomCrew(" resisting sodomy.");
			}
		}else if (j==3){
			console.log("The "+this.name+" was involved in a skirmish with a "+aRace+" battlecruiser.");
			this.hp-=20;
			if((Math.floor(Math.random()*4)==1))
			{
				this.killRandomCrew(" in the battle.");
			}
		}else if (j==4){
			console.log("The "+this.name+" has found the ruins of a long dead civilization.");
			if((Math.floor(Math.random()*20)==1))
			{
				this.killRandomCrew(" in a trap.");
			}
		}else if (j==5){
			console.log("The crew of the "+this.name+" encounters David Bowie floating in space.");
			if((Math.floor(Math.random()*8)>3))
			{
				console.log("They turn off the lights and pretend not to be home.");
			}else
			{
				console.log("He sings a groovy space tune.");
				this.moral+=10;
			}
		}else if (j==6){
			console.log("The "+this.name+"'s Holodeck became alive.  This happens more often than you might think.");
			if((Math.floor(Math.random()*10)==1))
			{
				this.killRandomCrew(" at the hands of a hologram.");
			}
		}else if (j==7){
			console.log("The "+this.name+" encountered some evil goo.");
			if((Math.floor(Math.random()*20)==1))
			{
				this.killRandomCrew(" in a random display of the creaters power.");
			}
		}else if (j==8){
			console.log("The "+this.name+" encounteres the remains of a Borg cube.");
			if((Math.floor(Math.random()*2)==1))
			{
				console.log("They salvage a transwarp coil to increase their maximum speed.");
				this.maxSpeed++;
			}else
			{
				console.log("the ship barely escapes as two more cubes are detected on long range sensors.");
			}
		}
	};
	
	starShip.prototype.manualHelm=function()
	{
		if(!this.manualControl)
		{
			this.manualControl=true;
			this.desiredOrbitTarg=null;
			this.orbiting=null;
			this.desiredHeading=this.heading;
			this.desiredSpeed=0;
		}else
		{
			this.manualControl=false;
			//this.desiredOrbitTarg=null;
			//this.desiredHeading=this.heading;
			this.desiredSpeed=this.crusingSpeed;
		
		}
	};
	
	starShip.prototype.orderSpeed=function(spd){
		this.desiredSpeed=spd;
	};
	
	starShip.prototype.accelerate=function()
	{
		if(!this.systems[SystemIDs.Engines].functional(false))  {return;}
		this.acceltick++;
		if(this.acceltick<this.accelrate)
		{
			return;
		}
		this.acceltick=0;
		if ((this.speed<this.maxSpeed)) //&& ((!this.destination) || (this.speed<this.destination.maxSpeed)))//don't go faster than lead ship!
		{
			if(!this.manualControl)
			{
				this.speed+=this.acceleration*gameSpeed;
			}else
			{
				this.speed+=0.4*gameSpeed;
			}
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
	
	starShip.prototype.decelerate=function()
	{
		this.acceltick++;
		if(this.acceltick<this.accelrate)
		{
			return;
		}
		this.acceltick=0;
		this.speed-=this.acceleration*gameSpeed*2;
		if (this.speed<0.1)
		{
			this.speed=0;
		}
	};
	
	starShip.prototype.isInSensorRange=function(thang){//todo
		if ((Math.abs(thang.x-this.x)<this.sensorRange) && (Math.abs(thang.y-this.y)<this.sensorRange))
		{
			return true;
		}
		return false;
	};
	
	starShip.prototype.isInTorpedoRange=function(thang){//todo
		if ((Math.abs(thang.x-this.x)<this.torpedoRange) && (Math.abs(thang.y-this.y)<this.torpedoRange))
		{
			return true;
		}
		return false;
	};
	
	starShip.prototype.inSensorRange=function(thangs){
		var thongs=[];
		for(var i=0;i<thangs.length;i++){
			if ((Math.abs(thangs[i].x-this.x)<this.sensorRange) && (Math.abs(thangs[i].y-this.y)<this.sensorRange))
			{
				if((thangs[i]!=this) && (!thangs[i].cloaked) && (thangs[i].alive)){  //todo, sensors that can detect cloaked ships.
					thongs.push(thangs[i]);	
					if((thangs[i].discovered===false)  && (this.civID===0)){
						thangs[i].discovered=true;
						console.log("The "+this.prefix+ " "+this.name+ " discoverd the "+thangs[i].name+" System");
						this.enterLog("Today we discoverd the "+thangs[i].name+" System.");
						
					}
					if((this.civ.fContacted[thangs[i].civID]===false) && (this.civID===0)){
						this.civ.fContacted[thangs[i].civID]=true;
						if((thangs[i].civID>0) && (thangs[i].alive) && (this.civ.civID===0))
						{
							console.log("The "+this.prefix+ " "+this.name+ " made first contact with the "+thangs[i].civ.namePlural);
							this.enterLog("Today we made first contact with the "+thangs[i].civ.namePlural);
							civs[thangs[i].civID].generateMessage(this.civ);
							
						}
					}
				}
			}
		}
		return thongs;
	};
	
	starShip.prototype.generatePlanetEvent=function(world)
	{
		var numPlanetEvents=8;
		var hich=Math.floor(Math.random()*numPlanetEvents);
		while(usedEvents[hich])
		{
			hich=Math.floor(Math.random()*numPlanetEvents);
		}
		
		if(hich===0)//find chest.
		{
			var cont=0;//Math.floor(Math.random()*3);
			if(cont===0)
			{
				var amt=Math.floor(Math.random()*6+4)*10;
				this.civ.money+=amt;
				var ned=new textbox();
				ned.setup("You find $"+amt+ " in a space chest.",150,370);
				ned.civil=this;
				ned.choicesStart=1;
				ned.optionTrack=0;
				civs[playerCiv].messages.push(ned);
				this.enterLog("We found $"+amt+ " in a space chest.");
			}
		}if(hich==1) //find dude
		{
			if(this.crew.length<this.crewMax)
			{
				this.crew.push(new dude());
				var ned=new textbox();
				ned.setup("You find a dude.  He agrees to join your crew.",150,370);
				ned.civil=this;
				ned.choicesStart=1;
				ned.optionTrack=0;
				civs[playerCiv].messages.push(ned);
				this.enterLog("We a dude and he agreed to join our crew.");
			}else
			{
				this.civ.crewPool.push(new dude());
				var ned=new textbox();
				ned.setup("You find a dude.  He agrees to join your crew but",150,370);
				ned.addText("the ship is full. You direct him to headquarters on Earth");
				ned.civil=this;
				ned.choicesStart=1;
				ned.optionTrack=0;
				civs[playerCiv].messages.push(ned);
				this.enterLog("We a dude and he agreed to join our crew, but since the ship was full we sent him back to earth");
			}
		}else if(hich==2)//find Neelix.
		{
			var cont=0;//Math.floor(Math.random()*3);
			if(cont===0)
			{
				var ned=new textbox();
				ned.setup("You find a Tellaxian named Neelix. ",150,370);
				ned.addText("    Welcome him aboard");
				ned.addText("    Leave him");
				ned.options=2;
				ned.choicesStart=1;
				ned.optionTrack=1;
				ned.object=this;

				if(this.civ.flags[Flag.MetTelaxianBountyHunters])
				{
					ned.addText("    Inquire about his murderous past");
					ned.options=3;
				}
				
					ned.optionOne=function(civil1,civil2)
					{
						var ped=new textbox();
						ped.label="Neelix:";
						ped.setup("Thanks! I'll be the chef.  And the moral officer. And..."  ,150,370);
						hasItem[Items.Neelix]=true;
						//crew.push(Neelix);
						ped.civil=civil1;
						ped.optionTrack=0;
						ped.options=0;
						civil2.messages.push(ped);
						holdEverything=true;
						this.enterLog("Today we took a Telaxian named Neelix abord.");
					};
				
					ned.optionTwo=function(civil1,civil2)
					{
						var ped=new textbox();
						ped.object=this.object;
						if(Math.random()*10<6)
						{
							ped.label="Neelix:";
							ped.setup("No pleeease don't leave me here!"  ,150,370);
							this.enterLog("We met a Telaxian on a planet, but left him to die there because he was creepy.");
							//crew.push(Neelix);
						}else
						{
							ped.label="Neelix:";
							ped.setup("Ok. but before you go can I eat your liver?"  ,150,370);
							this.object.killRandomCrew(" at the hands of a psychotic Telaxian."); //killrandomawayteam
						}
						ped.civil=civil1;
						ped.optionTrack=0;
						ped.options=0;
						civil2.messages.push(ped);
						holdEverything=true;
					};
					ned.optionThree=function(civil1,civil2)
					{
						//console.log(civil2);
						var led=new textbox();
						led.object=this.object;
						if(Math.random()*10<6)
						{
							led.label="Neelix:";
							led.setup("A mere misunderstanding!  I'm being persecuted for my religious "  ,150,370);
							led.addText("beliefs.");
							led.addText("    Welcome him aboard");
							led.addText("    Leave him");
							led.civil=civil1;
							led.options=2;
							led.choicesStart=2;
							led.optionTrack=2;
							//crew.push(Neelix);
							led.optionOne=function(civil1,civil2)
							{
								//console.log(civil2);
								var hed=new textbox();
								hed.label="Neelix:";
								hed.setup("Thanks! I'll be the chef.  And the moral officer. And..."  ,150,370);
								hasItem[Items.Neelix]=true;
								//crew.push(Neelix);
								hed.civil=civil1;
								hed.optionTrack=0;
								hed.options=0;
								civil2.messages.push(hed);
								holdEverything=true;
								this.enterLog("Today we took a Telaxian named Neelix abord, despite some concerns about him possibly being a serial murderer.");
							};
						
							led.optionTwo=function(civil1,civil2)
							{
								//console.log(civil2);
								var hed=new textbox();
								if(Math.random()*10<6)
								{
									hed.label="Neelix:";
									hed.setup("No pleeease don't leave me here!"  ,150,370);
									this.enterLog("We met a Telaxian on a planet, but left him to die there because we heard he was a serial killer");
									//crew.push(Neelix);
								}else
								{
									hed.label="Neelix:";
									hed.setup("Ok. but before you go can I eat your liver?"  ,150,370);
									this.object.killRandomCrew(" at the hands of a psychotic Telaxian."); //killrandomawayteam
								}
								hed.civil=civil1;
								civil2.messages.push(hed);
								holdEverything=true;
							};
							civil2.messages.push(led);
					}else
					{
						led.label="Neelix:";
						led.setup("Murders? well, it's easier to just show you."  ,150,370);
						led.object.killRandomCrew(" at the hands of a psychotic Telaxian."); //killrandomawayteam
					}
					led.civil=civil1;
					civil2.messages.push(led);
					holdEverything=true;
				};
				
				ned.civil=this;
				civs[playerCiv].messages.push(ned);
				usedEvents[hich]=true;
			}
		}else if(hich==3)//find Romulan
		{
			var cont=0;//Math.floor(Math.random()*3);
			if(cont===0)
			{
				var ned=new textbox();
				hasItem[Items.RomulanPrisoner]=true;
				ned.setup("You find a Romulan officer in a stasis pod.",150,370);
				ned.civil=this;
				ned.choicesStart=0;
				ned.choices=0;
				ned.optionTrack=0;
				civs[playerCiv].messages.push(ned);
				usedEvents[hich]=true;
				if(clean)
				{
					this.enterLog("We found a romulan officer in a stasis pod.  Prehaps if we returned him to his people, our relations might improve.");
				}else
				{
					this.enterLog("We found a romulan officer in a stasis pod.  Prehaps if we returned him to his people, they might chill the fuck out a little.");
				}
			}
		}else if(hich==4)//find tech
		{
			var cont=0;//Math.floor(Math.random()*3);
			if(cont===0)
			{
				var ned=new textbox();
				var hurh=Math.floor(Math.random()*civs[playerCiv].techs.length);
				civs[playerCiv].techs[hurh]=true;
				ned.setup("You find alien blueprints that help you develop",150,370);
				ned.addText("the technology of "+techNames[hurh]);
				ned.civil=this;
				ned.choicesStart=0;
				ned.choices=0;
				ned.optionTrack=0;
				civs[playerCiv].messages.push(ned);
				this.enterLog("We found alien blueprints that helped us develop the technology of "+techNames[hurh]);
			}
		}else if(hich==5)
		{
			var ned=new textbox();
			ned.setup("You find an old Romulan artifact.",150,370);
			hasItem[Items.RomulanArtifact]=true;
			ned.civil=this;
			ned.choicesStart=1;
			ned.optionTrack=0;
			civs[playerCiv].messages.push(ned);
			usedEvents[hich]=true;
			this.enterLog("We found an old Romulan artifact.");
		}else if(hich==6)
		{
			var ned=new textbox();
			ned.setup("You find an old Klingon artifact, the Sword of Khaless",150,370);
			hasItem[Items.KlingonArtifact]=true;
			ned.civil=this;
			ned.choicesStart=1;
			ned.optionTrack=0;
			civs[playerCiv].messages.push(ned);
			usedEvents[hich]=true;
			this.enterLog("We found an old Klingon artifact, the Sword of Khaless");
		}else if(hich==7)
		{
			var ned=new textbox();
			ned.setup("You find an old Cardassian artifact.",150,370);
			hasItem[Items.CardassianArtifact]=true;
			ned.civil=this;
			ned.choicesStart=1;
			ned.optionTrack=0;
			civs[playerCiv].messages.push(ned);
			usedEvents[hich]=true;
			this.enterLog("We found an old Cardassian artifact.");
		}
	};
	
	starShip.prototype.getRepairRate=function()
	{
		//todo only engineering crew.
		return this.crew.length*this.baseRepair;
	};
	
	starShip.prototype.escort=function(hip){
		this.escorting=hip;
	};
	
	starShip.prototype.cancelEscort=function(){
		this.escorting=null;
	};
	
	starShip.prototype.offerSurrender=function(iv)
	{
		//option to say no, like borg
		this.enterLog("With no other options availible, we must surrender to the "+iv.name+".");
		if(iv.noSurrender)
		{
			console.log("The "+iv.name+" will not accept surrender.");
			return;
		}
		//take prisoners
		console.log("The "+this.prefix+" "+this.name+" surrendered to the "+iv.name);
		this.surrendered=true;
	};
	
	starShip.prototype.grantXp=function(amt)
	{
		for(var i=0;i<this.crew.length;i++)
		{
			this.crew[i].grantXp(amt);
		}
	};
	
	starShip.prototype.enterLog=function(txt){
		this.captainsLog.push(new logEntry(theTime.years+"."+theTime.days,this.crew[0],this,txt));
	};
	
	starShip.prototype.logLog=function(){
		for(var i=0;i<this.captainsLog.length;i++)
		{
			console.log(this.captainsLog[i].author.title+" "+this.captainsLog[i].author.name+ ", Stardate: "+this.captainsLog[i].date);
			console.log(this.captainsLog[i].data);
		}
	};
	
	starShip.prototype.rechargeShields=function()
	{
		if(!this.systems[SystemIDs.Shields].functional(false)) {return;}
		if(this.shields>this.maxShields-1)
		{
			this.shields=this.maxShields;
			return;
		}
		this.healTick+=1*gameSpeed;
		if(this.healTick>100)
		{
			this.healTick=0;
			this.shields+=this.shieldChargeRate;
		}
	};
	
	starShip.prototype.sortNearbyVessels=function()
	{
		if(!this.nearbyVessels) {return;}
		var closest=0;
		var swapped=true;
		while(swapped){
			swapped=false;
			for(var i=0;i<this.nearbyVessels.length;i++)
			{
				if(distance(this.nearbyVessels[i],this)<distance(this.nearbyVessels[closest],this))
				{
					var temp=this.nearbyVessels[closest];
					this.nearbyVessels[closest]=this.nearbyVessels[i];
					this.nearbyVessels[i]=temp;
					swapped=true;
				}
			}
		}
	};
	
	starShip.prototype.scanNearby=function(thangs)
	{
		this.nearbyHostiles=[];
		this.nearbyVessels=this.inSensorRange(thangs);
		for(var i=0;i<this.nearbyVessels.length;i++)
		{
			if(this.civ.autoHostile.indexOf(this.nearbyVessels[i].civ)>-1)
			{
				this.nearbyHostiles.push(this.nearbyVessels[i]);
			}
		}
	};
	
	starShip.prototype.breathe=function()
	{
		this.breatheTick+=1*gameSpeed;
		if(this.breatheTick<this.breatheRate) {return;}
		this.breatheTick=0;
		var peet=this.crew.length;
		if(!this.systems[SystemIDs.LifeSupport].functional())
		{
			this.oxygen-=peet;
			if(this.oxygen<0) {this.oxygen=0;}
		}
	};
	
	starShip.prototype.bodyDisposal=function()
	{
		for(var i=0;i<this.crew.length;i++)
		{
			if(!this.crew[i].alive)
			{
				this.crew.splice(i,1);
				i--;
			}
		}
	};
	
	starShip.prototype.update=function(){
		if(!this.alive){return;}
		//if(!this.systems[SystemIDs.Shields].functional(false)) {this.activeSheilds=false;}
		if(!this.systems[SystemIDs.Tractor].functional()) {this.unTractorSomething();}
		this.menu.update();
		this.breathe();
		this.bodyDisposal();
		if(this.systems[SystemIDs.Cloak].functional())
		{
			this.cloaked=true;
		}else
		{
			this.cloaked=false;
		}
		if(theTime.years>this.lastYear)
		{
			this.lastYear=theTime.years;
			this.grantXp(10);
		}
		if(this.hasShields)
		{
			this.rechargeShields();
		}
		
		for(var i=0;i<this.systems.length;i++)
		{
			this.systems[i].update();
		}
		
		if(this.attackingPlanet)
		{
			this.planetBeamTrack+=1*gameSpeed;
			if(this.planetBeamTrack>30)
			{
				this.planetBeamTrack=0;
				this.planetBeamX=Math.random()*10;
				this.planetBeamy=Math.random()*5;
			}
		}
		if(this.surrendered)
		{
			this.attacking=false;
			this.torpedoTarget=null;
			for(var i=0;i<this.phaserBanks.length;i++)
			{
				this.phaserBanks[i].firing=false;
				this.phaserBanks[i].target=null;
			}
		}
		if(!this.systems[SystemIDs.Weapons].functional())
		{
			for(var i=0;i<this.phaserBanks.length;i++)
			{
				this.phaserBanks[i].firing=false;
			}
		}
		if(this.selfDestructActive)
		{
			this.selfDestructTick-=1*gameSpeed;
			if(this.selfDestructTick <0)
			{
				killShip(this);
				//explosion!
				this.torpedoTarget=null;
			}
		}

		if((this.platform) && (this.orbitTarg))
		{
			this.orbx=this.orbitTarg.x;
			this.orby=this.orbitTarg.y;
			this.heading=this.orbitTrack+90;//TODO
			this.orbitTrack+=this.orbitSpeed*gameSpeed;
			this.orbitDiameter-=this.orbitDecay*this.orbitSpeed*gameSpeed;
			if(this.orbitDiameter<1) 
			{
				this.alive=false;
				console.log("You flew into the sun moron.");
			}

			if (this.orbitTrack>360){ this.orbitTrack=0;}
			this.x=this.orbx+Math.cos(this.orbitTrack* (Math.PI / 180))*this.orbitDiameter;
			this.y=this.orby+Math.sin(this.orbitTrack*(Math.PI / 180))*this.orbitDiameter;
			this.y+=this.yv;
			for(var i=0;i<this.nearbyVessels.length;i++)
			{
				//if(this.civ.autoHostile[this.nearbyVessels[i].civ])
				if(this.civ.autoHostile.indexOf(this.nearbyVessels[i].civ)>-1)
				{
					
					if((!this.nearbyVessels[i].surrendered) && (!this.surrendered) && (this.isInTorpedoRange(this.nearbyVessels[i])))
					{
						this.torpedoTarget=this.nearbyVessels[i];
						this.attacking=true;
						if(this.inPhaserRange(this.torpedoTarget))
						{
								this.firePhasers();
						}
					}
				}
			}
			if((!this.torpedoTarget) || (!this.torpedoTarget.alive))
			{
				this.attacking=false;
			}
			if((this.attacking)  && (this.torpedoTarget))
			{
				this.autoFireTick+=1*gameSpeed;
				if(this.autoFireTick>this.autoFireRate)
				{
					this.autoFireTick=0;
					this.fireTorpedo();
				}
			}
			for(var i=0;i<this.phaserBanks.length;i++)
			{
				this.phaserBanks[i].update(this);
			}
			for(var i=0;i<this.windows.length;i++)
			{
				this.windows[i].update();
			}
				
			
			if((this.torpedoTarget) && (!this.torpedoTarget.alive))
			{
				this.torpedoTarget=null;
			}
			
			return;

		}	

		if(this.awayTeamAt)
		{
			if ((Math.abs(this.awayTeamAt.x-this.x)>this.sensorRange) || (Math.abs(this.awayTeamAt.y-this.y)>this.sensorRange)) //should that be sensor range?
			{
				console.log(this.prefix+ " "+this.name+ " is now out of range of their away team!");
				var t=this.awayTeam.length;
				for(var i=0;i<t;i++)
				{
					looseCrew.push(this.awayTeam.pop());
				}
				this.awayTeamAt=null;
				this.awayTeam=[];
				this.awayTeam.length=0;
			}
		}
		if((this.beamTarget) &&((!this.beamTarget.alive) || (!this.isInSensorRange(this.beamTarget))))
		{
			this.beamTarget=null;
		}
		
		if((this.torpedoTarget) &&((!this.torpedoTarget.alive) || (!this.isInTorpedoRange(this.torpedoTarget))))
		{
			this.torpedoTarget=null;
			for(var i=0;i<this.phaserBanks.length;i++)
			{
				this.phaserBanks[i].target=null;
			}
			this.battles++;
		}
		
		if((this.tractorTarget) &&((!this.tractorTarget.alive) || (!this.inTractorRange(this.tractorTarget))))
		{
			this.tractorTarget.tractorHost=null;
			this.tractorClient=null;
		}
		
		/*if(this.breaches>0)//repairs!
		{
			var fixrate=this.getRepairRate();
			this.fixCount+=fixrate*gameSpeed;
			if(this.fixCount>100)
			{
				this.fixCount=0;
				if(this.breaches>0)
				{
					this.breaches--;
				}
			}
		}*/
		
		if(this.tractorHost)
		{
			if((Math.abs(this.x-this.tractorHost.x)<this.tractorHost.tractorDist) && (Math.abs(this.y-this.tractorHost.y)<this.tractorHost.tractorDist))
			{
				this.heading=this.tractorHost.heading;
				//this.speed=this.tractorHost.speed
				this.xv=Math.cos((Math.PI / 180)*Math.floor(this.heading));
				this.yv=Math.sin((Math.PI / 180)*Math.floor(this.heading));
				this.x+=this.xv*gameSpeed*this.tractorHost.speed;
				this.y+=this.yv*gameSpeed*this.tractorHost.speed;
			}else
			{
				this.heading=this.tractorHost.heading;
				var peta=Math.atan2(this.tractorHost.y-this.y,this.tractorHost.x-this.x)* (180 / Math.PI);
				this.xv=Math.cos((Math.PI / 180)*Math.floor(peta));
				this.yv=Math.sin((Math.PI / 180)*Math.floor(peta));
				this.x+=this.xv*gameSpeed*(this.tractorHost.speed+1);
				this.y+=this.yv*gameSpeed*(this.tractorHost.speed+1);
			}
			//this.yv=this.tractorHost.yv;
		}else if(this.manualControl)
		{
			if(this.speed>0)
			{
				this.speed-=0.02;
				if(this.speed<0)
				{
					this.speed=0;
				}
			}
			
			if(firekey.check())
			{
				this.fireTorpedo();
			}
			
			if(keydown.up)
			{
				if(this.speed<this.maxSpeed)
				{
					this.speed+=0.3;
					if(this.speed>this.maxSpeed)
					{
						this.speed=this.maxSpeed;
					}
				}
			}else if(keydown.down)
			{
				if(this.speed>0)
				{
					this.speed-=0.2;
					if(this.speed<0)
					{
						this.speed=0;
					}
				}
			}
			if(keydown.left)
			{
				this.desiredHeading--;
					if (beta < 0.0)
					beta += 360.0;
				else if (beta > 360.0)
					beta -= 360;
			}else if(keydown.right)
			{
				this.desiredHeading++;
				if (beta < 0.0)
					beta += 360.0;
				else if (beta > 360.0)
					beta -= 360;
			}
			
				var differenceHeading = Math.abs(this.desiredHeading - this.heading);
				//if we need to turn clockwise
				if(differenceHeading>15)
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
				
				this.xv=Math.cos((Math.PI / 180)*Math.floor(this.heading));
				this.yv=Math.sin((Math.PI / 180)*Math.floor(this.heading));
				this.x+=this.xv*gameSpeed*this.speed;
				this.y+=this.yv*gameSpeed*this.speed;
		}else if(this.escorting) 
		{
			if(!this.escorting.alive)
			{
				this.escorting=null;
				return;
			}
			this.orbiting=false;
			this.actionText="Escorting the "+this.escorting.prefix+" "+this.escorting.name+".";
			var beta=Math.atan2(this.escorting.y-this.y,this.escorting.x-this.x)* (180 / Math.PI);
			
			if (beta < 0.0)
				beta += 360.0;
			else if (beta > 360.0)
				beta -= 360;
			this.desiredHeading=beta;
			if(distance(this,this.escorting)>50)
			{
				this.desiredSpeed=this.maxSpeed;
			}else
			{
				this.desiredSpeed=this.escoring.speed;
			}
			
				//todo why do I have do copy this.
			if(this.speed<this.desiredSpeed)
			{
				this.accelerate();
			}else if(this.speed>this.desiredSpeed)
			{
				this.decelerate();
			}
			if((!this.systems[SystemIDs.Engines].functional(false))  && (this.speed>0))
			{
				this.decelerate();
			}
			//turn to desired heading
			var differenceHeading = Math.abs(this.desiredHeading - this.heading);
			//if we need to turn clockwise
			if(differenceHeading>15)
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

			if((Math.abs(this.x-this.escorting.x)<100) && (Math.abs(this.y-this.escorting.y)<100) && (this.escorting!=this)) 
			{
				//console.log(this.name+ " met with fleet.");
				//this.destination=null;
				//this.desiredSpeed=0;
				//this.inFormation=true;
				//this.desiredSpeed=0;
			}else
			{
				this.desiredHeading=beta;
				this.xv=Math.cos((Math.PI / 180)*Math.floor(this.heading));
				this.yv=Math.sin((Math.PI / 180)*Math.floor(this.heading));
				this.x+=this.xv*gameSpeed*this.speed;
				this.y+=this.yv*gameSpeed*this.speed;
			}
		}else if((this.destination) && (this.destination!=this))//TODO change to if destination, then if goal orbit or park.
		{
			if(this.destination.alive)
			{
				this.orbiting=false;
				if(this.orders==Orders.MeetFleet)
				{
					this.actionText="Enroute to meet with the fleet";
				}else if(this.civ.autoHostile.indexOf(this.destination.civ)>-1)
				{
					this.actionText="Enroute to attack "+this.destination.prefix+" "+this.destination.name;
					this.orders==Orders.Attack
				}else 
				{
					this.actionText="Enroute to rendezvous with the "+this.destination.prefix+" "+this.destination.name;
				}
				var beta=Math.atan2(this.destination.y-this.y,this.destination.x-this.x)* (180 / Math.PI);
				
				if (beta < 0.0)
					beta += 360.0;
				else if (beta > 360.0)
					beta -= 360;
				this.desiredHeading=beta;
				/*if(distance(this,this.destination)>50)
				{
					this.desiredSpeed=this.maxSpeed;
				}else*/
				if(this.matchSpeed)
				{
					if(this.destination.speed)
					{
						this.desiredSpeed=this.destination.speed;
					}else
					{
						this.desiredSpeed=this.cruisingSpeed;
					}
				}
					
				
					//todo why do I have do copy this.
				if(this.speed<this.desiredSpeed)
				{
					this.accelerate();
				}else if(this.speed>this.desiredSpeed)
				{
					this.decelerate();
				}
				if((!this.systems[SystemIDs.Engines].functional(false)) && (this.speed>0))
				{
					this.decelerate();
				}
				//turn to desired heading
				var differenceHeading = Math.abs(this.desiredHeading - this.heading);
				//if we need to turn clockwise
				if(differenceHeading>15)
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


				if((Math.abs(this.x-this.destination.x)<500) && (Math.abs(this.y-this.destination.y)<100) && (this.destination!=this)) 
				{
					//console.log(this.name+ " met with fleet.");
					this.destination=null;
					//this.desiredSpeed=0;
					this.inFormation=true;
					this.desiredSpeed=0;
				}else
				{
					this.desiredHeading=beta;
					this.xv=Math.cos((Math.PI / 180)*Math.floor(this.heading));
					this.yv=Math.sin((Math.PI / 180)*Math.floor(this.heading));
					this.x+=this.xv*gameSpeed*this.speed;
					this.y+=this.yv*gameSpeed*this.speed;
				}
			}else
			{
				this.destination=null;
			}
		}else if(this.orbiting)
		{
			if((this.destination) && (this.destination!=this.orbitTarg))
			{
				this.orbiting=false;
			}else if((this.colony) && (this.orders=Orders.Colonize))
			{
				this.orbiting=false;
			}else
			{
				this.orbx=this.orbitTarg.x;
				this.orby=this.orbitTarg.y;
				this.heading=this.orbitTrack+90;//TODO
				this.orbitTrack+=this.orbitSpeed*gameSpeed;
				this.speed=1;//this.orbitSpeed;
				this.orbitDiameter-=this.orbitDecay*this.orbitSpeed*gameSpeed;
				if(this.orbitDiameter<1) 
				{
					this.alive=false;
					console.log("You flew into the sun moron.");
				}
				//if((this.shrinking) && (this.orbitDiameter>1)) {this.orbitDiameter--;}
				/*if(this.leavingProgress!==null) 
				{
					this.leavingProgress+=1*gameSpeed;
					this.actionText="Breaking Orbit";
					//if(Math.floor(this.leavingProgress)==Math.floor(this.desiredHeading))
					if(this.leavingProgress>90)
					{
						this.leaveOrbit();
						this.leavingProgress=0;
					}
					
				}else
				{*/
				if((!this.attackingPlanet) && (this.orbitTarg))
				{
					this.actionText="Orbiting "+this.orbitTarg.name;
				}
				if (this.orbitTrack>360){ this.orbitTrack=0;}
				this.x=this.orbx+Math.cos(this.orbitTrack* (Math.PI / 180))*this.orbitDiameter*this.orbitTarg.size;
				this.y=this.orby+Math.sin(this.orbitTrack*(Math.PI / 180))*this.orbitDiameter*this.orbitTarg.size;
				this.y+=this.yv;
			}
		}else if(this.desiredOrbitTarg)//TODO
		{
				this.actionText="Enroute to "+this.desiredOrbitTarg.name;
				//console.log("yaaaar");
				var beta=Math.atan2(this.desiredOrbitTarg.y-this.y,this.desiredOrbitTarg.x-this.x)* (180 / Math.PI);
				
				if (beta < 0.0)
					beta += 360.0;
				else if (beta > 360.0)
					beta -= 360;
				this.desiredHeading=beta;
				var differenceHeading = Math.abs(this.desiredHeading - this.heading);
				//if we need to turn clockwise
				if(differenceHeading>15)
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
				
				if(this.speed<this.desiredSpeed)
				{
					this.accelerate();
				}else if(this.speed>this.desiredSpeed)
				{
					this.decelerate();
				}		
				if((!this.systems[SystemIDs.Engines].functional(false)) && (this.speed>0))
				{
					this.decelerate();
				}				
				this.xv=Math.cos((Math.PI / 180)*Math.floor(this.heading));
				this.yv=Math.sin((Math.PI / 180)*Math.floor(this.heading));
				this.x+=this.xv*gameSpeed*this.speed;
				this.y+=this.yv*gameSpeed*this.speed;
				/*if(this.speed<1)
				{
					this.desiredSpeed=this.cruisingSpeed;
				}*/
				if((Math.abs(this.x-this.desiredOrbitTarg.x)<50) && (Math.abs(this.y-this.desiredOrbitTarg.y)<50)) 
				{
					if((logAll) ||(this.civ===civs[playerCiv]))
					{
						console.log(this.prefix+ " "+this.name+ " has arrived in orbit of "+this.desiredOrbitTarg.name);
					}
					this.enterLog("The "+this.prefix+ " "+this.name+ " has arrived in orbit of "+this.desiredOrbitTarg.name);
					if(this.orders==Orders.Attack)
					{
						this.planetTarget=this.desiredOrbitTarg;
					}
					if((this.colony) && (this.orders=Orders.Colonize))
					{
						this.civ.colonize(this.desiredOrbitTarg);
						console.log(this.prefix+ " "+this.name+ " successfully colonized "+this.desiredOrbitTarg.name);
						this.enterLog("The "+this.prefix+ " "+this.name+ " successfully colonized "+this.desiredOrbitTarg.name);
						this.alive=false;
					}
					this.orbit(this.desiredOrbitTarg);
					this.desiredOrbitTarg=null;
					if(this.refitOrdered)
					{
						this.refit();
					}
				}
				
		}else if(!this.orbiting)
		{
				//accel or decel to desired speed
			if(this.speed<this.desiredSpeed)
			{
				this.accelerate();
			}else if(this.speed>this.desiredSpeed)
			{
				this.decelerate();
			}
			if((!this.systems[SystemIDs.Engines].functional(false)) && (this.speed>0))
			{
				this.decelerate();
			}
			
			
			var differenceHeading = Math.abs(this.desiredHeading - this.heading);
			//if we need to turn clockwise
			if(differenceHeading>15)
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

			//MessageBox.Show(headingDifference + "");
			//just for now
			//heading = targetHeading;

			if(this.heading > 359)
			{
				this.heading = 0;
			}
			if(this.heading < 0)
			{
				this.heading += 360;
			}
			
			if(this.desiredHeading > 359)
			{
				this.desiredHeading = 0;
			}
			if(this.desiredHeading < 0)
			{
				this.desiredHeading += 360;
			}
			
			this.xv=Math.cos((Math.PI / 180)*Math.floor(this.heading));
			this.yv=Math.sin((Math.PI / 180)*Math.floor(this.heading));
			this.x+=this.xv*gameSpeed*this.speed;
			this.y+=this.yv*gameSpeed*this.speed;
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
		}
		this.tillEvent-=1*gameSpeed;
		if((this.tillEvent<1) && (this.civID===0)) //todo race vs civ
		{
			//this.generateEvent();
			this.tillEvent=Math.random()*8000;
		}

		/*this.heading++;
		if (this.heading>359) { this.heading=0;}*/
		if((this.evacuating)) //&& (!this.evacDone))
		{
			this.evacTick+=this.evacRate*gameSpeed;
			if(this.evacTick>100)
			{
				this.evacTick=0;
				if(this.crew.length<1) 
				{
					this.evacuating=false;
					this.evacDone=true;
					this.adrift=true;
					return;
				}
				this.escapePods[this.evacTrack].passenger=this.crew.pop();
				//this.crewNum--;
				this.escapePods[this.evacTrack].launch(this,this.homeworld);
				escapes.push(this.escapePods[this.evacTrack]);
				this.evacTrack++;
				var turp=2;
				if(this.captainFlees)
				{
					turp=1;
				}
				if((this.evacTrack>this.numEscapePods-1) || (this.crew.length<2))//todo escape again for captian to flee.
				{
					/*if(this.captainFlees){
						this.evacDone=true;
						this.adrift=true;
						console.log("The "+this.name+" has been evacuated");
						this.evacuating=false;
					}else
					{*/
						this.evacuating=false;
						//todo ship adrift
						if(this.crew.length<1)
						{
							if((this.civ==civs[playerCiv]) || (logAll))
							{
								console.log("The "+this.prefix+ " "+this.name+" has been evacuated");
							}
							this.adrift=true;
						}else if(this.crew.length<2){
							if((this.civ==civs[playerCiv]) || (logAll))
							{
								console.log("The "+this.prefix+ " "+this.name+" has been evacuated, except for the captain.");
							}
						}
					//}
				}
			}
		}
		if(this.oxygen>0)
		{
			this.oxygen-=Math.floor(this.breaches*2*gameSpeed);
			if(this.oxygen<0) {this.oxygen=0;}
		}else
		{
			for(var n=0;n<this.crew.length;n++)
			{
				var phillip=this.crew[n].hurt(5," of suffocation");
				if(phillip)
				{
					this.enterLog("Today we lost "+phillip.title+ " "+phillip.name+" to suffocation.");
				}
			}
		}
		
	
		for(var i=0;i<this.nearbyVessels.length;i++)
		{
			//if(this.civ.autoHostile[this.nearbyVessels[i].civ])
			if(this.civ.autoHostile.indexOf(this.nearbyVessels[i].civ)>-1)
			{
				if(true)//don't always attack! sometimes flee!
				{
					if((!this.nearbyVessels[i].surrendered)  && (!this.surrendered)&& (this.isInTorpedoRange(this.nearbyVessels[i])))
					{
						this.torpedoTarget=this.nearbyVessels[i];
						if((this.civID===0) || (this.nearbyVessels[i].civID===0))
						{
							//console.log(this.nearbyVessels[i].surrendered,this.surrendered);
						}
						this.attacking=true;
						if(this.inPhaserRange(this.torpedoTarget))
						{
								this.firePhasers();
						}
					}else
					{
						this.attacking=false;
					}
				}
			}else if((this.civ.hostileOnContact) && (this.civ!=this.nearbyVessels[i].civ))
			{
				this.civ.autoHostile.push(this.nearbyVessels[i].civ);
				console.log("The "+this.nearbyVessels[i].civ.namePlural+" have pissed off the "+this.civ.namePlural+" by existing.");
			}else if((this.civ.hostileOnIncursion) && (this.civ!=this.nearbyVessels[i].civ) && (this.civ.inOurSpace(this.nearbyVessels[i])))
			{
				this.civ.autoHostile.push(this.nearbyVessels[i].civ);
				console.log("The "+this.nearbyVessels[i].civ.namePlural+" have pissed off the "+this.civ.namePlural+" by entering their space.");
			}
		}
		if((!this.torpedoTarget) || (!this.torpedoTarget.alive))
		{
			this.attacking=false;
		}
		if((this.attacking) && (this.torpedoTarget))
		{
			this.autoFireTick+=1*gameSpeed;
			if(this.autoFireTick>this.autoFireRate)
			{
				this.autoFireTick=0;
				this.fireTorpedo();
			}
			this.actionText="Attacking "+this.torpedoTarget.civ.name+ " ship "+this.torpedoTarget.name;
		}
		for(var i=0;i<this.phaserBanks.length;i++)
		{
			this.phaserBanks[i].update(this);
		}
		for(var i=0;i<this.windows.length;i++)
		{
			this.windows[i].update();
		}
		
		if((this.hp<15) && (this.autoEvac) && (!this.evacuating) && (!this.evacDone)&& (this.crew.length>0))
		{
			this.Evac(this.civ.homeworld);
			this.enterLog("The crew is abandoning ship, I will remain behind for now.");
			if((this.civ==civs[playerCiv]) || (logAll))
			{
				console.log(this.prefix+ " "+this.name+ "'s crew is abandoning ship.");
			}
		}
		
			if((this.planetTarget) &&(this.planetTarget.civ==this.civ))
			{
				this.planetTarget=null;
			}
		
			if((this.orbiting) &&(this.orbitTarg==this.planetTarget) &&(!this.torpedoTarget))
			{
				this.attackingPlanet=this.planetTarget;
				this.planetAttackTick+=1*gameSpeed;
				
				if(this.planetAttackTick>50)
				{
					this.attackPlanet(this.planetTarget);
					this.planetAttackTick=0;
					var doof="";
					if(this.planetTarget.civ)
					{
						doof= this.planetTarget.civ.name;
					}
					this.actionText="Attacking "+doof+ " colony on "+this.planetTarget.name;
				}
				if(this.planetTarget.civ==null)
				{
					this.civ.conquer(this.planetTarget);
					this.leaveOrbit();
					this.planetTarget=null;
					this.attackingPlanet=null;
					this.desiredOrbitTarg=null;
					this.destination=null;
					if(this.civ==civs[civIDs.Borg])
					{
						borgTrack++;
						if(borgTrack==civIDs.Borg)
						{
							borgTrack++;
						}

						
						if(borgTrack>17)
						{
							console.log("The Borg have assimilated all inhabited planets.  Oh well.");
						}else
						{
							for(var h=0;h<this.civ.ships.length;h++)
							{
								this.civ.ships[h].orderOrbit(civs[borgTrack].homeworld);
								this.civ.ships[h].desiredSpeed=7;
								this.civ.ships[h].planetTarget=civs[borgTrack].homeworld;
								this.civ.ships[h].actionText="Enroute to assimilate "+civs[borgTrack].homeworld.name;
							}
						}
					}
				}
			}else
			{
				this.attackingPlanet=null;
			}
			this.tailCount++;
			var taleRate=150;
			if(gameSpeed<0.5)
			{
				taleRate=5000;
			}else if(gameSpeed<1)
			{
				taleRate=2500;
			}else if(gameSpeed<2)
			{
				taleRate=1000;
			}else if(gameSpeed<3)
			{
				taleRate=800;
			}else if(gameSpeed<4)
			{
				taleRate=600;
			}
			else if(gameSpeed<5)
			{
				taleRate=450;
			}else if(gameSpeed<6)
			{
				taleRate=300;
			}
			else if(gameSpeed<7)
			{
				taleRate=250;
			}else if(gameSpeed<8)
			{
				taleRate=200;
			}else if(gameSpeed<9)
			{
				taleRate=175;
			}
			if(this.tailCount>taleRate)
			{
				var til={};
				til.x=this.x;
				til.y=this.y;
				this.tail.push(til);
				if(this.tail.length>this.tailLength)
				{
					this.tail.splice(0,1);
				}
				this.tailCount=0;
			}
	};
	
	starShip.prototype.draw=function(can,cam){
		if((this.alive) &&(cam.isNear(this)))
		{
			//can.fillRect(this.x+cam.x-this.width/2, this.y+cam.y-this.height/2, this.width, this.height);
			can.save();
			can.translate((this.x+cam.x)*cam.zoom,(this.y+cam.y)*cam.zoom);
			if(this.orbiting)
			{
				can.rotate((this.orbitTrack)* (Math.PI / 180));
				//can.rotate((this.orbitTrack-this.leavingProgress)* (Math.PI / 180));
			}else
			{
				can.rotate((this.heading-90)* (Math.PI / 180));//todo negatives.
			}
			if(this.cloaked)
			{
				canvas.globalAlpha=0.18;
			}
			can.scale(cam.zoom,cam.zoom);
			canvas.fillStyle = "red";
			//can.fillRect(0-this.width/2, 0-this.height/2, this.width, this.height);
			this.sprite.draw(can, -this.width/2,-this.height/2);
			for(var i=0;i<this.windows.length;i++)
			{
				this.windows[i].draw(can,cam);
			}
			if((this.shields>0) && (this.systems[SystemIDs.Shields].functional()))
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
			if((this.torpedoTarget) &&(this.drawTarget))
			{
				can.save();
				can.translate((this.torpedoTarget.x+cam.x)*cam.zoom,(this.torpedoTarget.y+cam.y)*cam.zoom);
				if(this.torpedoTarget.orbiting)
				{
					can.rotate((this.torpedoTarget.orbitTrack)* (Math.PI / 180));
					//can.rotate((this.torpedoTarget.orbitTrack-this.torpedoTarget.leavingProgress)* (Math.PI / 180));
				}else
				{
					can.rotate((this.torpedoTarget.heading-90)* (Math.PI / 180));//todo negatives.
				}
				can.scale(cam.zoom,cam.zoom);
				targetSprite.draw(can, -this.torpedoTarget.width/2,-this.torpedoTarget.height/2);
				can.restore();
			}
			if((this.tractorTarget) &&(this.drawTarget))
			{
				can.save();
				can.translate((this.tractorTarget.x+cam.x)*cam.zoom,(this.tractorTarget.y+cam.y)*cam.zoom);
				if(this.tractorTarget.orbiting)
				{
					can.rotate((this.tractorTarget.orbitTrack)* (Math.PI / 180));
					//can.rotate((this.tractorTarget.orbitTrack-this.tractorTarget.leavingProgress)* (Math.PI / 180));
				}else
				{
					can.rotate((this.tractorTarget.heading-90)* (Math.PI / 180));//todo negatives.
				}
				can.scale(cam.zoom,cam.zoom);
				tractorTargetSprite.draw(can, -this.tractorTarget.width/2,-this.tractorTarget.height/2);
				can.restore();
			}
			if((this.beamTarget) &&(this.drawTarget))
			{
				can.save();
				can.translate((this.beamTarget.x+cam.x)*cam.zoom,(this.beamTarget.y+cam.y)*cam.zoom);
				
				//can.rotate((this.beamTarget.heading-90)* (Math.PI / 180));//todo negatives.
				can.scale(cam.zoom,cam.zoom);
				beamTargetSprite.draw(can, -this.beamTarget.width/2,-this.beamTarget.height/2);
				can.restore();
			}
			for(var i=0;i<this.phaserBanks.length;i++)
			{
				this.phaserBanks[i].draw(can,cam);
			}

			if((this.tractorClient) && (this.tractorClient.alive))
			{
				can.save();
				for(var i=0;i<12;i++) //todo draw better.
				{
			
					can.strokeStyle = tractorColors[Math.floor(Math.random()*7)];
					can.globalAlpha=0.50;
					can.beginPath();
					can.lineWidth = (Math.random()*3)*cam.zoom;
					var xoffs=(Math.random()*this.tractorClient.width)-this.tractorClient.width/2;
					var yoffs=(Math.random()*this.tractorClient.height)-this.tractorClient.height/2;
					can.moveTo((this.x+cam.x)*cam.zoom,(this.y+cam.y)*cam.zoom);
					can.lineTo((this.tractorClient.x+xoffs+cam.x)*cam.zoom,(this.tractorClient.y+yoffs+cam.y)*cam.zoom);
					
					can.closePath();
					can.stroke();
				}
				can.restore();
			}
			if(this.attackingPlanet)
			{
				if(this.civID==civIDs.Borg)
				{
					can.save();
					for(var i=0;i<12;i++) //todo draw better.
					{
				
						can.strokeStyle = assimilationColors[Math.floor(Math.random()*7)];
						can.globalAlpha=0.50;
						can.beginPath();
						can.lineWidth = (Math.random()*3)*cam.zoom;
						var xoffs=(Math.random()*this.attackingPlanet.width)-this.attackingPlanet.width/2;
						var yoffs=(Math.random()*this.attackingPlanet.height)-this.attackingPlanet.height/2;
						can.moveTo((this.x+cam.x)*cam.zoom,(this.y+cam.y)*cam.zoom);
						can.lineTo((this.attackingPlanet.x+xoffs+cam.x)*cam.zoom,(this.attackingPlanet.y+yoffs+cam.y)*cam.zoom);
						
						can.closePath();
						can.stroke();
					}
					can.restore();
				}else
				{
					can.save();
					can.strokeStyle = bColors[Math.floor(Math.random()*7)];
					can.globalAlpha=0.50;
					can.beginPath();
					can.lineWidth = ((Math.random()*3)+3)*cam.zoom;
					var xoffs=this.planetBeamX+this.planetBeamTrack;
					var yoffs=this.planetBeamY+this.planetBeamTrack;
					can.moveTo((this.x+cam.x)*cam.zoom,(this.y+cam.y)*cam.zoom);
					
					can.lineTo((this.attackingPlanet.x+xoffs+cam.x)*cam.zoom,(this.attackingPlanet.y+yoffs+cam.y)*cam.zoom);
					//monsta.shootTextured(this.attackingPlanet.x+xoffs,this.attackingPlanet.y+yoffs,270,.5,"explosion0");

					can.closePath();
					can.stroke();
					can.restore();
				}
			}
			//this.sprite.draw(can, this.x-cam.x-this.width/2,this.y-cam.y-this.height/2);
			if((this==selectedShip)&&(this.nearbyVessels.length>0))
			{
				var k=1;
				var nicky=null;
				for(var i=this.nearbyVessels.length-1;i>-1;i--)
				{
					if(!cam.isOn(this.nearbyVessels[i]))
					{
						nicky=this.nearbyVessels[i];
						//break;
					}
				}
				if((nicky))// && (!cam.isOn(nicky)))
				{
					if(nicky.civ==this.civ)
					{
						k=0;
					}else if(this.civ.autoHostile.indexOf(nicky.civ)>-1)
					{
						k=2;
					}
					var peta=Math.atan2(nicky.y-this.y,nicky.x-this.x)* (180 / Math.PI);
					can.save();
					can.globalAlpha=0.40;
					can.translate((this.x+cam.x)*cam.zoom,(this.y+cam.y+6)*cam.zoom);
					can.rotate((peta)* (Math.PI / 180));
					//can.rotate((this.beamTarget.heading-90)* (Math.PI / 180));//todo negatives.
					can.scale(cam.zoom,cam.zoom);
					arrowSprite[k].draw(can, 0,0);
					can.restore();
				}
			}	
		}
	};

function fleet(){
	this.ships=[];
	this.x=0;
	this.y=0;
	this.xv=0;
	this.yv=0;
	this.attacking=false;
	this.prototype.addShip=function(shoap)
	{
		if(this.ships){
			shoap.setDestination(this.ships[0],this.ships[0].crusingSpeed);
		}
		
		if(shoap.destination)
		{
			var beta=Math.atan2(shoap.destination.y-shoap.y,shoap.x-shoap.x)* (180 / Math.PI);
			if (beta < 0.0)
				beta += 360.0;
				else if (beta > 360.0)
					beta -= 360;
				shoap.desiredHeading=beta;
				shoap.desiredSpeed=this.maxSpeed;
		}
		this.ships.push(shoap);

	};
	
	this.prototype.orderAttack=function(){
		
	};
	
	this.prototype.getFormationCoords=function(){
		//if(this.formation===0){
		for(var i=0;i<this.ships.length;i++)
		{
			if(this.i===0){
				this.ships[i].formationCoords.x=0;
				this.ships[i].formationCoords.y=0;
			}else if(this.i==1){
				this.ships[i].formationCoords.x=-40;
				this.ships[i].formationCoords.y=32;
			}else if(this.i==2){
				this.ships[i].formationCoords.x=40;
				this.ships[i].formationCoords.y=32;
			}else
			{
				this.ships[i].formationCoords.x=0;
				this.ships[i].formationCoords.y=40*i+20;
			}
		}
	};
	this.prototype.orderShips=function()
	{
		for(var i=0;i<this.ships.length;i++)
		{
			if(!this.ships[i].alive)
			{
				this.ships.splice(i,1);
				i--;
			}else
			{
				this.ships[i].inFormation=false;
				if(!this.ships[i].destination)
				{
					this.ships[i].setDestination(this.ships[0],this.ships[i].maxSpeed);
				}
				if((Math.abs(this.ships[i].x-this.ships[i].destination.x+this.ships[i].formationCoords.x)<50) && (Math.abs(this.ships[i].y-this.ships[i].destination.y+this.ships[i].formationCoords.y)<50)) 
				{
					this.ships[i].inFormation=true;
				}
			
				if(this.ships[i].inFormation)
				{
					this.ships[i].desiredSpeed=this.ships[0].desiredSpeed;
					this.ships[i].desiredHeading=this.ships[0].desiredHeading;
					if(this.ships[0].torpedoTarget)
					{
						this.ships[i].torpedoTarget=this.ships[0].torpedoTarget;
					}
				}else
				{
					//this.ships[i].destination=this.ships[0];
				}
				if((this.attacking))
				{
					/*if(this.ships[i].torpedoTarget)
					{
						this.ships[i].autoFireTick+=1*gameSpeed;
						if(this.ships[i].autoFireTick>this.ships[i].autoFireRate)
						{
							this.ships[i].autoFireTick=0;
							this.ships[i].fireTorpedo();
						}
						
					}*/
					ships[i].attacking=true;
					if((!ships[0].torpedoTarget) || (ships[0].torpedoTarget.surrendered))
					{
						this.attacking=false;
					}else
					{
						if(ships[i].inPhaserRange(ships[0].torpedoTarget))
						{
							ships[i].torpedoTarget=ships[0].torpedoTarget;
							ships[i].firePhasers();
						}
					}
				}
			}
			//todo if lead vessel is attacking something, join in!;
		}
	};
	this.prototype.countCrew=function(){
		var persons=0;
		for(var i=0;i<this.ships.length;i++)
		{
			persons+=this.ships[i].crew.length;
		}
		return persons;
	};
}